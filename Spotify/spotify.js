/*
 * Spotify VINHDAT — standalone Shadowrocket/Surge network script
 * Repository target: vdatdv/LocketGold/scripts/spotify.js
 *
 * Independently implemented dispatcher + minimal Protocol Buffers field editor.
 * Compatibility research: app2smile/rules (MIT License),
 * https://github.com/app2smile/rules
 *
 * Not an official Spotify script. Does NOT grant paid subscription entitlements.
 * Use only if you understand HTTPS interception and trust the certificate/profile.
 */
(() => {
  'use strict';
  const PREFIX = '[Spotify VINHDAT]';
  const MAX_BYTES = 4 * 1024 * 1024;
  const logger = (message) => {
    if (typeof console !== 'undefined' && console.log) console.log(`${PREFIX} ${message}`);
  };

  // App-facing feature attributes: not a server-issued Premium entitlement.
  // These flags may be ignored by Spotify or stop working after app updates.
  const ATTRIBUTES = [
    ['type', 'string', 'premium'],
    ['ads', 'bool', false],
    ['shuffle', 'bool', false],
    ['pick-and-shuffle', 'bool', false],
    ['on-demand', 'bool', true],
    ['unrestricted', 'bool', true],
    ['high-bitrate', 'bool', true],
    ['player-license', 'string', 'premium']
  ];

  function bytesFrom(value) {
    if (value instanceof Uint8Array) return value;
    if (value instanceof ArrayBuffer) return new Uint8Array(value);
    if (ArrayBuffer.isView(value)) return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    return null;
  }

  function encodeVarint(num) {
    if (!Number.isSafeInteger(num) || num < 0) throw Error('Invalid varint');
    const out = [];
    do {
      let b = num % 128;
      num = Math.floor(num / 128);
      if (num > 0) b |= 0x80;
      out.push(b);
    } while (num > 0);
    return Uint8Array.from(out);
  }

  function readVarint(buf, offset) {
    let result = 0;
    let power = 1;
    for (let i = 0; i < 10 && offset < buf.length; i++) {
      const b = buf[offset++];
      result += (b & 127) * power;
      if ((b & 128) === 0) {
        if (!Number.isSafeInteger(result)) throw Error('Varint too large');
        return [result, offset];
      }
      power *= 128;
    }
    throw Error('Truncated varint');
  }

  function parseFields(bytes) {
    const out = [];
    let offset = 0;
    while (offset < bytes.length) {
      const start = offset;
      const tag = readVarint(bytes, offset);
      const wire = tag[0] & 7;
      const number = Math.floor(tag[0] / 8);
      if (!number) throw Error('Invalid protobuf field');
      offset = tag[1];
      let payloadStart = -1;
      let payloadEnd = -1;
      if (wire === 0) {
        // Unknown integer fields are copied unchanged; never convert to JS numbers.
        let count = 0;
        while (true) {
          if (offset >= bytes.length || count++ >= 10) throw Error('Bad integer field');
          if ((bytes[offset++] & 128) === 0) break;
        }
      } else if (wire === 1 || wire === 5) {
        offset += (wire === 1 ? 8 : 4);
      } else if (wire === 2) {
        const size = readVarint(bytes, offset);
        offset = size[1];
        payloadStart = offset;
        payloadEnd = offset + size[0];
        offset = payloadEnd;
      } else {
        throw Error('Unsupported protobuf wire type');
      }
      if (offset > bytes.length) throw Error('Truncated protobuf field');
      out.push({ number, wire, start, end: offset, payloadStart, payloadEnd });
    }
    return out;
  }

  function join(...arrays) {
    let length = 0;
    for (const array of arrays) length += array.length;
    if (length > MAX_BYTES) throw Error('Output exceeds safety size limit');
    const out = new Uint8Array(length);
    let offset = 0;
    for (const array of arrays) {
      out.set(array, offset);
      offset += array.length;
    }
    return out;
  }

  function stringBytes(text) {
    // TextEncoder isn't present in every script engine, so UTF-8 ASCII is enough
    // for the protocol keys used by this script.
    const out = [];
    for (let i = 0; i < text.length; i++) {
      if (text.charCodeAt(i) > 127) throw Error('Non-ASCII protobuf key');
      out.push(text.charCodeAt(i));
    }
    return Uint8Array.from(out);
  }

  function fieldBytes(number, payload) {
    return join(encodeVarint(number * 8 + 2), encodeVarint(payload.length), payload);
  }

  function encodeAccountEntry(key, type, value) {
    // AccountAttributesResponse.accountAttributes: map<string, AccountAttribute> field 1
    // AccountAttribute boolValue: field 2; stringValue: field 4
    const inner = type === 'bool'
      ? join(encodeVarint(2 * 8), encodeVarint(value ? 1 : 0))
      : fieldBytes(4, stringBytes(value));
    const entry = join(fieldBytes(1, stringBytes(key)), fieldBytes(2, inner));
    return fieldBytes(1, entry);
  }

  function appendAttributes(message) {
    // Validate account-attributes response before appending map entries.
    parseFields(message);
    const entries = ATTRIBUTES.map(([key, type, value]) => encodeAccountEntry(key, type, value));
    return join(message, ...entries);
  }

  function replaceNested(message, path, index = 0) {
    if (index === path.length) return appendAttributes(message);
    const fields = parseFields(message);
    const target = fields.find((field) => field.number === path[index] && field.wire === 2);
    if (!target) throw Error(`Missing expected protobuf field ${path[index]} at level ${index}`);
    const inner = message.slice(target.payloadStart, target.payloadEnd);
    const patched = replaceNested(inner, path, index + 1);
    const newField = fieldBytes(target.number, patched);
    return join(message.slice(0, target.start), newField, message.slice(target.end));
  }

  try {
    const request = typeof $request !== 'undefined' ? $request : null;
    const response = typeof $response !== 'undefined' ? $response : null;
    if (!request || typeof request.url !== 'string') {
      logger('No request context; unchanged');
      $done({});
      return;
    }
    const url = request.url;
    const isCustomize = /\/user-customization-service\/v1\/customize(?:\?|$)/.test(url);
    const isBootstrap = /\/bootstrap\/v1\/bootstrap(?:\?|$)/.test(url);
    const isMetadata = /\/(?:artistview\/v1\/artist|album-entity-view\/v2\/album)\//.test(url);

    if (!response) {
      if (isCustomize) {
        const headers = { ...(request.headers || {}) };
        for (const key of Object.keys(headers)) {
          if (key.toLowerCase() === 'if-none-match') delete headers[key];
        }
        logger('Removed conditional-cache request header');
        $done({ headers });
      } else if (isMetadata) {
        const changed = url.replace('com:443', 'com').replace('platform=iphone', 'platform=ipad');
        logger(changed === url ? 'Metadata request unchanged' : 'Adjusted metadata URL');
        $done(changed === url ? {} : { url: changed });
      } else {
        $done({});
      }
      return;
    }

    const status = String(response.statusCode || response.status || '200');
    const code = status.match(/\b\d{3}\b/);
    if (!code || code[0] !== '200' || (!isCustomize && !isBootstrap)) {
      $done({});
      return;
    }
    const body = bytesFrom(response.bodyBytes != null ? response.bodyBytes : response.body);
    if (!body || body.length === 0 || body.length > MAX_BYTES) {
      logger('Response is not a supported binary buffer');
      $done({});
      return;
    }
    // BootstrapResponse > ucsResponseV0 > success > customization > success >
    // accountAttributesSuccess; customize > success > accountAttributesSuccess.
    const path = isBootstrap ? [2, 1, 1, 1, 3] : [1, 3];
    const patched = replaceNested(body, path);
    logger(`Updated app-facing attributes: ${isBootstrap ? 'bootstrap' : 'customize'}`);
    $done({ body: patched });
  } catch (error) {
    logger(`Skipped modification: ${error && error.message ? error.message : String(error)}`);
    $done({});
  }
})();
