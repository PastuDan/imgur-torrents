import React, { Component } from 'react';

export default class Post extends Component {
  render() {
  	return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="panel panel-default">
              <div className="panel-heading">
                Post Title
              </div>
              <div className="panel-body">
                Images...
              </div>
              <div className="panel-footer">
                Post Meta
              </div>
            </div>
          </div>
          <div className="col-md-3">
            LE SIDEBAR
          </div>
        </div>
      </div>
    )
  }
}
