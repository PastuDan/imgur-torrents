import React, { Component } from 'react';

import { Link } from 'react-router'

export default class App extends Component {
  render() {
    return (
      <div>
        <Link to="/post/test" activeClassName="active">Post</Link>
        {this.props.children}
      </div>
    )
  }
}
