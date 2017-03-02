import React, { Component } from 'react';

import { Link } from 'react-router'

export default class NotFound extends Component {
  render() {
  	return (
  	  <div>
  	    <h1>Page Not Found</h1>
  	    <p>Return to <Link to="/">Home</Link></p>
  	  </div>
	)
  }
}
