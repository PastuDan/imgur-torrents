const request = require('request');
const async = require('async');
const express = require('express');
const WebTorrent = require('webtorrent-hybrid');
const cors = require('cors');
const fs = require('fs');

const client = new WebTorrent({
    tracker: {
        announceList: ['http://swoosh.io:8900', 'ws://swoosh.io:8900'], // list of tracker server urls
        getAnnounceOpts: function () {
            // Provide a callback that will be called whenever announce() is called
            // internally (on timer), or by the user
            return {
                uploaded: 0,
                downloaded: 0,
                left: 0,
                customParam: 'blah' // custom parameters supported
            }
        }
    },
    dht: false
});
const app = express();
const clientId = 'aa587c2ff1c3c66';
const now = require('performance-now');
const downloadDir = 'images';

// // get the number of seeders for a particular torrent
// server.torrents[infoHash].complete
//
// // get the number of leechers for a particular torrent
// server.torrents[infoHash].incomplete
//
// // get the peers who are in a particular torrent swarm

const tracker = {
    images: [],
    torrentFile: null,
    posts: null,

    fetchImgurPosts: function() {
        const options = {
            method: 'GET',
            url: 'https://api.imgur.com/3/gallery/hot/viral/day/0',
            qs: {
                showViral: 'true',
                mature: 'false',
                album_previews: 'true'},
            headers: {
                authorization: `Client-ID ${clientId}`
            },
            json: true
        };
        request(options, (error, response, body) => {
            if (error) {
                console.log(error);
            }

            // limit number of posts
            this.posts = body.data.slice(0,20);

            // create a flattened array of all the images
            const albumImages = this.posts.filter(post => post.is_album).map(post => post.images);
            const singleImages = this.posts.filter(post => !post.is_album);
            const images = [].concat.apply([], albumImages).concat(singleImages);

            console.log(`${this.posts.length} posts, ${images.length} images`)

            this.fetchImages(images);
        });
    },

    fetchImages: function(images) {
        const start = now();
        async.eachLimit(images, 10, (image, callback) => {
            image.downloadUrl = image.mp4 || image.link
            image.filename = `${downloadDir}/${image.downloadUrl.split('/').pop()}`;

            fs.exists(image.filename, exists => {
                if (exists) {
                    callback();
                    return;
                }

                const httpStream = request(image.downloadUrl);

                httpStream.pipe(fs.createWriteStream(image.filename));

                httpStream.on('error', function(err){
                    console.log(`http download error - ${image.id}`, err)
                    callback();
                });

                httpStream.on('end', function () {
                    console.log(`downloaded ${image.filename}`);
                    callback();
                });

            });
        }, () => {
            console.log(`Fetched all images in ${(now() - start).toFixed(3)} ms`);
            const fileList = images.map(image => image.filename)
            const torrent = client.seed(fileList, {
                name: downloadDir,
                path: './',
                announceList: [['http://swoosh.io:8900/announce'], ['ws://swoosh.io:8900/announce']]
            }, this.onSeed.bind(this));

            torrent.on('warning', function (err) {
                console.log('TORRENT WARNING: ', err.message)
            })
        });
    },

    startApiServer: function(){
        app.use(cors());

        app.get('/torrent', (req, res) => {
            res.send(this.torrentFile);
        });

        app.get('/posts', (req, res) => {
            res.send(this.posts);
        });

        app.listen(3100, function () {
            console.log('API server listening on port 3100')
        })
    },

    onSeed: function (torrent) {
        console.log('Client is seeding:', torrent.infoHash);
        console.log(`progress: ${torrent.progress}`);

        this.torrentFile = torrent.torrentFile;
        this.startApiServer();

        setInterval(() => {
            console.log(torrent.numPeers);
        }, 1000);
    }
};

tracker.fetchImgurPosts();
