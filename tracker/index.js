const Server = require('bittorrent-tracker').Server;
const request = require('request');
const async = require('async');
const createTorrent = require('create-torrent');
const parseTorrent = require('parse-torrent');
const express = require('express');
const WebTorrent = require('webtorrent');
const cors = require('cors');



const client = new WebTorrent();
const app = express();
const clientId = 'aa587c2ff1c3c66';
const now = require("performance-now");

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

    fetchImages: function(posts) {
        const start = now();
        posts = posts.slice(0,1); //tmp slice just for testing
        async.eachLimit(posts, 25, (hash, callback) => {
            request({
                method: 'GET',
                url: `http://i.imgur.com/${hash}.jpg`,
                encoding: null,
            }, (error, response, image) => {
                image.name = `/${hash}.jpg`; // use the imgur image hash as the filename for when we create the torrent
                this.images.push(image);
                const mem = process.memoryUsage();
                Object.keys(mem).forEach(key => {
                    mem[key] = (mem[key]/1024/1024).toFixed(1);
                });
                console.log(`fetched ${hash} - RSS: ${mem.rss}MB - Heap: ${mem.heapUsed}/${mem.heapTotal}Mb - External: ${mem.external}Mb`);
                callback();
            });
        }, () => {
            console.log(`Fetched all images in ${(now() - start).toFixed(3)} ms`);
            client.seed(this.images, {
                name: 'imgur.com',
                announceList: [['ws://swoosh.io:8900/announce'], ['http://swoosh.io:8900/announce']]
            }, this.onSeed.bind(this));
        });
    },

    startApiServer: function(){
        app.use(cors());

        app.get('/torrent', (req, res) => {
            // res.send({
            //     torrent: this.torrentFile.toString('base64'),
            //     posts: this.posts
            // });

            res.send(this.torrentFile);
        });

        app.get('/torrent-parsed', (req, res) => {
            // res.send({
            //     torrent: this.torrentFile.toString('base64'),
            //     posts: this.posts
            // });

            res.send(parseTorrent(this.torrentFile));
        });

        app.get('/posts', (req, res) => {
            res.send(this.posts);
        });

        app.listen(3100, function () {
            console.log('API server listening on port 3100')
        })
    },

    onSeed: function (torrent) {
        this.torrentFile = torrent.torrentFile;
        this.startApiServer();

        console.log(`progress: ${torrent.progress}`);
        //
        // torrent.wires.forEach(function (wire) {
        //     console.log(wire.remoteAddress)
        // })
        //
        // // print out ips of new wires the client connects to
        // torrent.on('wire', function (wire, addr) {
        //     console.log(addr);
        // })
        //
        // torrent.on('noPeers', function (announceType) {
        //     console.warn('no peers found!')
        // })
    }
};

tracker.fetchImgurPosts();