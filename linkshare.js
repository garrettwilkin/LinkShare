/*
 *
 * Simple class for retrieving linkshare links. Original use case was for generating clickable iTunes links. Theoretically it can be used with any LinkShare merchant ID and URL.
 * Author: Garrett Wilkin
 * Date  : 2011/02/28
 *
 */

var querystring = require('querystring');
var http = require('http');

/*
 * Constructor takes all information required by LinkShare to generate links.
 */
function LinkShare(token, merchant, url) {
    this.token = token;
    this.merchant = merchant;
    this.url = url;
    this.server = 'feed.linksynergy.com';
    this.server = 'getdeeplink.linksynergy.com';
    this.path = '/createcustomlink.shtml',
    this.trackingUrl =  '';
};
exports.LinkShare = LinkShare;

/*
 * Concatenates all parameter names and values for interacting with linkshare.
 */
LinkShare.prototype.getQuery = function() {
  return {
    token: this.token,
    mid: this.merchant,
    murl: this.url,
  }
};

/*
 * Fires off a request to linkshare to generate a click tracking URL.  executes callback on completion of returned data.
 */
LinkShare.prototype.getLink = function(callback) {
    var self = this;
    var request = http.get({
      host: this.server,
      path: this.path + '?' + querystring.stringify(this.getQuery()),
    });
    request.end();
    request.on('response', function(response) {
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            self.trackingUrl+=chunk;
        });
        response.on('end',function() {
            callback(self.trackingUrl);
        });
    });
};
