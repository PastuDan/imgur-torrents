import React, {Component} from 'react';

export default class PeerList extends Component {
    render() {
        const peers = this.props.peerList.map(peer => {
            return <li key={peer.remoteAddress}>{`${peer.remoteAddress}:${peer.remotePort}`} - {(peer.downloaded/1024/1024).toFixed(1)}MB</li>;
        });

        return (
            <div className={this.props.className}>
                <h1 className="header">Peer List</h1>
                <ul className="peers">{peers}</ul>
            </div>
        );
    }
}