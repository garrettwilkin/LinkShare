/*
 * Author: Garrett Wilkin garrett.wilkin@gmail.com @garrettwilkin geethink.com/blog
 * Simple demonstration of the iTunes class. 
 */

var iTunes = require('itunes').iTunes;
var LinkShare = require('../linkshare').LinkShare;

/*
 * Demo of LinkShare class.
 */

console.log('Use of LinkShare WebServices API for generating referral links for iTunes albums.');
console.log('Valid linkshare Web Services Token required.');


function Track(artist, album) {
    this.artist = artist;
    this.album = album;
    this.itunesLink = '';
};

function getLinkShareAlbumsLinks() {
    var itunesClient = new iTunes();

    function getStoreLink(track) {
        itunesClient.lookupAlbum({artist: track.artist, album: track.album}, function(error, album) {
            if (error) {
                console.log('Could not find album ' + track.album + ' by ' + track.artist);
            } else {
                track.itunesLink = album.storeUrl;
                console.log('iTunes Store URL: ' + track.itunesLink);
                var token = '51513f78fd1448d3e722ccf3cd4d79d5af7ac710b4badea2f1bd0a685bd2b85e';
                var merchantId = '13508';
                var linkshare = new LinkShare(token,merchantId,track.itunesLink);
                linkshare.getLink(function(link) {
                    console.log('LinkShare URL: ' + link);
                });
            };
        });
    }

    var track1 = new Track('Miles Davis','Kind of Blue');
    var track2 = new Track('Smashing Pumpkins','Siamese Dream');
    var track3 = new Track('Aerosmith','Get a Grip');
    var lastTrack = new Track('Beastie Boys','Pauls Boutique');

    var tracks = [track1,
                  track2,
                  track3,
                  lastTrack];
    for (i in tracks)
    {
        getStoreLink(tracks[i]);
    };

};

getLinkShareAlbumsLinks();
