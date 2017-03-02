import React, { Component } from 'react';

import Comment from './Comment'

export default class CommentList extends Component {
  render() {
    return (
      <div>
        <h3 className="page-title">Comments (0)</h3>
        <div className="">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    )
  }
}
