const request = require('request');
const async = require('async');
const parseTorrent = require('parse-torrent');
const express = require('express');
const WebTorrent = require('webtorrent-hybrid');
const cors = require('cors');
const fs = require('fs');

const client = new WebTorrent({
    // wrtc: true,
    tracker: {
        announceList: ['http://swoosh.io', 'ws://swoosh.io'], // list of tracker server urls
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
        var options = {
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

            this.posts = body.data;
            let images = body.data.filter(post => post.images).map(post => post.images).concat();
            images = [].concat.apply([], images);
            const hashes = images.map(image => image.id);

            this.fetchImages(hashes);
        });
    },

    fetchImages: function(hashes) {
        const start = now();
        hashes = hashes.slice(0,1); //tmp slice just for testing
        async.eachLimit(hashes, 25, (hash, callback) => {
            request({
                method: 'GET',
                url: `http://i.imgur.com/${hash}.jpg`,
                encoding: null,
            }, (error, response, image) => {
                image.name = `/${hash}.jpg`; // use the imgur image hash as the filename for when we create the torrent
                this.images.push(image);

                fs.writeFile(`./${hash}.jpg`, image, function() {
                    callback();
                });

                const mem = process.memoryUsage();
                Object.keys(mem).forEach(key => {
                    mem[key] = (mem[key]/1024/1024).toFixed(1);
                });
                console.log(`fetched ${hash} - RSS: ${mem.rss}MB - Heap: ${mem.heapUsed}/${mem.heapTotal}Mb - External: ${mem.external}Mb`);
            });
        }, () => {
            console.log(`Fetched all images in ${(now() - start).toFixed(3)} ms`);
            // console.log(this.images);
            const imageFiles = hashes.map(hash => `${hash}.jpg`)
            const torrent = client.seed(`./images/`, {
                name: 'imgur.com',
                path: './',
                announceList: [['http://swoosh.io/announce'], ['ws://swoosh.io/announce']]
            }, this.onSeed.bind(this));

            console.log('INITIAL PROGRESS: '+torrent.progress);

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

        fs.writeFile('dan.torrent', this.torrentFile)
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