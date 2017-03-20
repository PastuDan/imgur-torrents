import React, {Component} from 'react';
import Post from './Post';
import PeerList from './PeerList';
import SideGallery from './SideGallery';
import WebTorrent from 'webtorrent';
// import parseTorrent from 'parse-torrent';
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
            this.client.add(res, null, this.onTorrent);
        }).catch(err => {
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
            console.log(wire)
        });

        // print out ips of new wires the client connects to
        torrent.on('wire', function (wire, addr) {
            console.log(wire, addr);
            console.log(wire.peerId.toString());
            console.log(wire.remoteAddress);
        });

        torrent.on('noPeers', function (announceType) {
            // console.warn('no peers found!')
        });

        torrent.files[0].getBuffer((err, buffer) => {
            let posts = this.state.posts;
            posts[0].images[0].memoryURL = URL.createObjectURL(buffer);
            this.setState({posts})
        })
    }

    nav(delta) {
        let postIndex = this.state.postIndex + delta;
        postIndex = Math.min(this.state.posts.length, Math.max(0, postIndex));
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