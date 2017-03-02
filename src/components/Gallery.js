import React, { Component } from 'react';

import { Link } from 'react-router'

export default class Gallery extends Component {
  render() {
  	return (
  	  <div className="container">
  	    <div><Link to="/post/test">Post</Link></div>
  	  </div>
	)
  }
}
