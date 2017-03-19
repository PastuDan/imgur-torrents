import React, {Component} from 'react';
import Post from './Post';
import PeerList from './PeerList';
import SideGallery from './SideGallery';
import WebTorrent from 'webtorrent';
import parseTorrent from 'parse-torrent';
// import createTorrent from 'create-torrent';
// var Client = require('bittorrent-tracker');



export default class App extends Component {
    state = {
        posts: [],
        peerList: [],
        postIndex: 0
    };

    client = new WebTorrent();
    torrent = null;

    componentDidMount() {
        // window.fetch('https://api.imgur.com/3/gallery/hot/viral/day/0?album_previews=true', {
        //     headers: new Headers({'Authorization': 'Client-ID aa587c2ff1c3c66'}),
        // }).then(res => res.json()).then(res => {
        //     this.setState({
        //         posts: res.data,
        //     });
        //     this.loadPost(res.data[0]);
        // }).catch((err) => {
        //     console.log(err);
        // });

        window.fetch('http://localhost:3100/torrent').then(res => res.blob()).then(res => {
            // this.setState({
            //     posts: res.posts,
            // });

            console.log(res)

            // this.torrent = this.b64toBlob(res.torrent);
            // console.log(this.torrent, typeof this.torrent);
            // console.log(parseTorrent(this.torrent));
            // console.log('torrent length', res.torrent.length);
            this.client.add(res, null, this.onTorrent);
        }).catch((err) => {
            console.log(err);
        });

        window.fetch('http://localhost:3100/posts').then(res => res.json()).then(res => {
            this.setState({
                posts: res,
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    onTorrent(torrent) {
        torrent.wires.forEach(function (wire) {
            console.log(wire.remoteAddress)
        })

        // print out ips of new wires the client connects to
        torrent.on('wire', function (wire, addr) {
            console.log(addr);
        })

        torrent.on('noPeers', function (announceType) {
            console.warn('no peers found!')
        })

        torrent.files[0].getBuffer((err, buffer) => {
            let posts = this.state.posts;
            posts[0].images[0].memoryURL = URL.createObjectURL(buffer);
            this.setState({posts})
        })
    }

    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    // loadPost(post) {
    //     post.images.forEach(image => {
    //         this.loadImage(post, image);
    //     });
    // };
    //
    // loadImage(post, image) {
    //     window.fetch(image.link).then(res => res.blob())
    //         .then((res) => {
    //             let posts = this.state.posts;
    //             posts[0].images[0].memoryURL = URL.createObjectURL(res);
    //
    //             // const torrentOpts = {
    //             //     name: image.id,            // name of the torrent (default = basename of `path`, or 1st file's name)
    //             //     createdBy: 'imgur',       // name and version of program used to create torrent
    //             //     announceList: [['wss://localhost:8800']],// custom trackers (array of arrays of strings) (see [bep12](http://www.bittorrent.org/beps/bep_0012.html))
    //             //     urlList: `http://i.imgur.com/${image.id}`        // web seed urls (see [bep19](http://www.bittorrent.org/beps/bep_0019.html))
    //             // };
    //
    //             // createTorrent(input, torrentOpts, (err, torrent) => {
    //             //     posts[0].images[0].torrent = torrent;
    //             //
    //             //     this.setState({
    //             //         posts: posts
    //             //     })
    //             //
    //             //     this.
    //             // });
    //         });
    //
    // };

    nav(delta) {
        let postIndex = this.state.postIndex + delta;
        postIndex = Math.min(this.state.posts.length, Math.max(0, postIndex));
        console.log(postIndex);
        this.setState({
            postIndex: postIndex // limit index to range of posts
        })
    }

    render() {
        var postMeta = this.state.posts[this.state.postIndex];

        return (
            <div className="imgur-app">
                <header>
                    <div className="logo"></div>
                </header>
                <div className="app content">
                    <div className="panel post">
                        {postMeta ? <Post {...postMeta}/> : <div className="loading">Loading...</div>}
                    </div>
                    <div className="panel right-rail nav-buttons">
                        <button className="secondary" onClick={this.nav.bind(this, -1)}>Prev</button>
                        <button className="primary" onClick={this.nav.bind(this, 1)}>Next</button>
                    </div>
                    <PeerList className="panel right-rail peerlist" peerList={this.state.peerList}/>
                    <SideGallery className="right-rail sidegallery"
                                 posts={this.state.posts}
                                 postIndex={this.state.postIndex}/>
                </div>
                <footer>
                    &copy; 2017 - The CDN-less Imgur App
                </footer>
            </div>
        );
    }
}