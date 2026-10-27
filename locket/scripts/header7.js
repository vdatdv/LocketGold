/* Distribution: vinhdat | https://github.com/vdatdv
 * Based on Nightmarket source; original license and attribution retained.
 */
/***********************************************
> deleteHeader by NightmarketServer
***********************************************/

const version = 'V1.0.2';


function setHeaderValue(e,a,d){var r=a.toLowerCase();r in e?e[r]=d:e[a]=d}var modifiedHeaders=$request.headers;setHeaderValue(modifiedHeaders,"X-RevenueCat-ETag",""),$done({headers:modifiedHeaders});
