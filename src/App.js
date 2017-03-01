import React, {Component} from 'react';
import Post from './Post';
import PeerList from './PeerList';
import SideGallery from './SideGallery';

export default class App extends Component {
    state = {
        posts: [],
        peerList: [],
        postIndex: 0
    };

    componentDidMount() {
        window.fetch('https://api.imgur.com/3/gallery/hot/viral/day/0?album_previews=true', {
            headers: new Headers({'Authorization': 'Client-ID aa587c2ff1c3c66'}),
        }).then((res)=>{
            return res.json();
        }).then((res)=>{
            this.setState({
                posts: res.data,
            })
        }).catch((err) => {
            console.log(err);
        })
    }

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
                    <SideGallery className="right-rail sidegallery" posts={this.state.posts} postIndex={this.state.postIndex}/>
                </div>
                <footer>
                    &copy; 2017 - Dan's Classy Imgur App
                </footer>
            </div>
        );
    }
}