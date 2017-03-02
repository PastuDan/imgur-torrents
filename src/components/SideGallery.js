import React, {Component} from 'react';

export default class SideGallery extends Component {
    render() {
        let posts = this.props.posts.slice(0,10);
        posts = posts.map(post => {
            const selected = this.props.posts[this.props.postIndex].id === post.id ? ' selected' : '';
            return <li key={post.id} className={`cf ${selected}`}>
                <div className="thumb" style={{background: `url(http://i.imgur.com/${post.is_album ? post.cover : post.id}b.jpg)`}} />
                <h1>{post.title}</h1>
            </li>;
        });

        return (
            <ul className={this.props.className}>
                {posts}
            </ul>
        );
    }
}