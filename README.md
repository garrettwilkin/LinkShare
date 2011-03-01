LinkShare: An Implementation of the LinkShare WebServices API in Node.js
========================================================================

Authored by Garrett Wilkin (http://geethink.com/blog)

LinkShare is the service to use to programmers in the US that wish to generate traffic tracking URLs for iTunes store links.  This API essentially involves taking an already identified link to a particular item of merchandise and bouncing it off linkshare.  They then give you a link that, when clicked by a visitor to the site, will generate trackable traffic.  

My original use case was linking to the iTunes store, but there are many other retailers on there on linkshare.

A very basic use of the LinkShare library:

    // Take your unique & secret linkshare token!
    var token = '61513f782d1448d3e722acf3cd42a8a6bd7ac710b4badea2f1be0a685bd1b85e';

    // Use the iTunes merchant ID
    var merchantId = '13508';

    // pass these values to the LinkShare constructor with a previously queried iTunes store URL.
    var linkshare = new LinkShare(token,merchantId,track.itunesLink);

    // Now fire off a request to the linkshare API.  Supply your own callback function.
    linkshare.getLink(function(link) {
      console.log('LinkShare URL: ' + link);
    });

NOTE : You will see 'invalid token specified' unless you change the demo to use your own valid token.


Check out the demos for an example.

Enjoy!
