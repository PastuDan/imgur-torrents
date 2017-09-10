import React, { Component } from 'react';
import Post from './Post';
import PeerList from './PeerList';
import FileList from './FileList';
import SideGallery from './SideGallery';
import WebTorrent from 'webtorrent';

const host = 'swoosh.io:3100';

export default class App extends Component {
    state = {
        posts: [],
        peerList: [],
        postIndex: 0,
        tab: 'peers'
    };

    client = new WebTorrent();
    torrent = null;

    componentDidMount() {
        window.fetch(`http://${host}/torrent`).then(res => res.blob()).then(res => {
            this.client.add(res, null, this.onTorrent);
        }).catch(err => {
            console.log(err);
        });

        window.fetch(`http://${host}/posts`).then(res => res.json()).then(res => {
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
            if (this.state.peerList.map(peer => peer.remoteAddress + peer.remotePort).includes(peer.remoteAddress + peer.remotePort)) {
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

        // if post response came back before torrent response (or was ready),
        // then this triggers a re-render now that the torrent is available
        setTimeout(() => {
            this.setState({ torrent });
        }, 1000)
        //TODO why is this timeout necessary ^?


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
        const postMeta = this.state.posts[this.state.postIndex];

        return (
            <div className="imgur-app">
                <header>
                    <div className="logo"/>
                </header>
                <div className="app content">
                    <div className="panel post">
                        {postMeta ? <Post postMeta={postMeta} torrent={this.state.torrent}/> :
                            <div className="loading">Loading...</div>}
                    </div>
                    <div className="panel right-rail nav-buttons">
                        <button className="secondary" onClick={this.nav.bind(this, -1)}>Prev</button>
                        <button className="primary" onClick={this.nav.bind(this, 1)}>Next</button>
                    </div>
                    <div className="panel right-rail stats">
                        <div>Downloaded: {Math.round(this.state.downloaded / 1024 / 1024)}MB</div>
                        <div>Speed: {Math.round(this.state.downloadSpeed / 1024).toLocaleString()}KB/s</div>
                        <div className="progress">
                            <div className="progress-inner" style={{ width: this.state.progress * 100 + '%' }}/>
                        </div>
                        <div className="tab-bar cf">
                            <h1 className={`tab-button ${this.state.tab === 'peers' ? 'active' : ''}`}
                                onClick={this.setState.bind(this, { tab: 'peers' }, null)}>Peers</h1>
                            <h1 className={`tab-button ${this.state.tab === 'files' ? 'active' : ''}`}
                                onClick={this.setState.bind(this, { tab: 'files' }, null)}>Files</h1>
                        </div>
                        {this.state.tab === 'peers' ? <PeerList peerList={this.state.peerList}/> :
                            <FileList torrent={this.state.torrent}/>}
                    </div>
                    <SideGallery className="right-rail sidegallery"
                                 posts={this.state.posts}
                                 postIndex={this.state.postIndex}/>
                </div>
                <footer>
                    The CDN-less Imgur App
                </footer>
            </div>
        );
    }
}