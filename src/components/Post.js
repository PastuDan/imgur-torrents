import React, { Component } from 'react';
import { Link } from 'react-router';

import CommentList from './CommentList'

export default class Post extends Component {
  render() {
  	return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">

            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-8">
                      <h3 style={{
                        margin: 0
                      }}>Post Title</h3>
                      <strong>Post Author</strong>
                    </div>
                    <div className="col-md-4 text-right">
                      <Link to="/post/prev" className="btn btn-lg btn-default"><i className="fa fa-caret-left"></i></Link>
                      <Link to="/post/prev" className="btn btn-lg btn-primary">Next</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                Images and descriptions go in here...
              </div>
              <div className="panel-footer">
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-inline">
                      <li><button className="btn btn-lg btn-default"><i className="fa fa-arrow-up"></i></button></li>
                      <li><button className="btn btn-lg btn-default"><i className="fa fa-arrow-down"></i></button></li>
                      <li><button className="btn btn-lg btn-default"><i className="fa fa-heart"></i></button></li>
                    </ul>
                    <ul className="list-inline text-muted">
                      <li><i className="fa fa-arrow-up"></i> 8,623 Points</li>
                      <li><i className="fa fa-eye"></i> 460 View</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <p/>
                    <ul className="list-inline text-right">
                      <li><button className="btn btn-default"><i className="fa fa-facebook"></i></button></li>
                      <li><button className="btn btn-default"><i className="fa fa-twitter"></i></button></li>
                      <li><button className="btn btn-default"><i className="fa fa-pinterest"></i></button></li>
                      <li><button className="btn btn-default"><i className="fa fa-reddit"></i></button></li>
                    </ul>
                    <ul className="list-inline text-right">
                      <li>
                        <span className="label label-default">zelda</span>&nbsp;
                        <span className="label label-default">motosf</span>&nbsp;
                        <span className="label label-default">memes</span>
                      </li>
                      <li>
                        <div className="btn-group">
                          <button type="button" className="btn btn-xs btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-ellipsis-h"></i>
                          </button>
                          <ul className="dropdown-menu">
                            <li><a href="#" data-toggle="modal">Report Post</a></li>
                            <li><a href="#">Download Post</a></li>
                            <li><a href="#">Embed Post</a></li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <CommentList />

          </div>
          <div className="col-md-3">
            LE SIDEBAR
          </div>
        </div>
      </div>
    )
  }
}
