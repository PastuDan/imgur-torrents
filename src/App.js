import React, { Component } from 'react';
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
        postIndex: 0,
    };

    client = new WebTorrent();
    torrent = null;

    componentDidMount() {
        window.fetch('http://swoosh.io:3100/torrent').then(res => res.blob()).then(res => {
            this.client.add(res, null, this.onTorrent);
        }).catch(err => {
            console.log(err);
        });

        window.fetch('http://swoosh.io:3100/posts').then(res => res.json()).then(res => {
            this.setState({
                posts: res,
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    onTorrent = (torrent) => {
        // print out ips of new wires the client connects to
        torrent.on('wire', peer => {
            // keep peerList deduped
            if (this.state.peerList.map(peer => peer.remoteAddress).includes(peer.remoteAddress)) {
                return;
            }

            this.state.peerList.push(peer);
            this.setState({
                peerList: this.state.peerList
            })
        });

        torrent.on('download', bytes => {
            this.setState({
                downloaded: torrent.downloaded,
                downloadSpeed: torrent.downloadSpeed,
                progress: torrent.progress


            })
        })

        // immediately prioritize the first image
        const currentHash = this.state.posts[this.state.postIndex].images[0].id;
        torrent.files.find(file => file.name.substr(0,file.name.length-4) === currentHash).getBuffer((err, buffer) => {
            let posts = this.state.posts;
            posts[0].images[0].memoryURL = URL.createObjectURL(new Blob([buffer], { type: "image/jpeg" }));
            this.setState({ posts })
        })

        //todo remove
        window.torrent = torrent
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
                    <ul className="panel right-rail stats">
                        <li>Downloaded: {Math.round(this.state.downloaded/1024/1024)}MB</li>
                        <li>Speed: {Math.round(this.state.downloadSpeed/1024).toLocaleString()}KB/s</li>
                        <li className="progress">
                            <div className="progress-inner" style={{width: this.state.progress*100+'%'}}></div>
                        </li>
                    </ul>
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