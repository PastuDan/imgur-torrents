import React, { Component } from 'react';
import { Link } from 'react-router'

import Gallery from './Gallery'

export default class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#primary-navbar-collapse" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">
              	<img src="/img/brand.svg" height="20" alt="imgur" />
              </Link>
            </div>
            <div className="collapse navbar-collapse" id="primary-navbar-collapse">
              <ul className="nav navbar-nav">
                <li><Link to="/">Explore</Link></li>
              </ul>
              <form className="navbar-form navbar-left">
                <div className="form-group">
                  <div className="input-group">
                  	<input type="text" className="form-control" placeholder="Search" />
                  	<div className="input-group-btn">
                	  <button type="submit" className="btn btn-default">
                	  	<i className="fa fa-search" />
                	  </button>
                	</div>
              	  </div>
                </div>
              </form>
            </div>
          </div>
        </nav>
        <div className="main-container" role="main">
          {this.props.children || <Gallery />}
        </div>
      </div>
    )
  }
}
