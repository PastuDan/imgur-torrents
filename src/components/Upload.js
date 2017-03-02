import React, { Component } from 'react';

export default class Upload extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron text-center">
          <h1><i className="fa fa-cloud-upload"></i></h1>
          <h2>Drag and drop or paste images anywhere to upload</h2>
          <p className="lead">You can also <label className="label-link" for="global-upload-input">browse from your computer</label> or <a href="#">add image URLs</a>.</p>
        </div>
      </div>
    )
  }
}

