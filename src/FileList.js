import React, { Component } from 'react';

export default class FileList extends Component {
    render() {
        if (!this.props.torrent) {
            return null;
        }

        return (
            <ul className="filelist">
                {this.props.torrent.files.map(file => <li key={file.name}>{file.name} - {file.done ? 'done' : ''}</li>)}
            </ul>
        );
    }
}