import React, { Component } from 'react';
import { Link } from 'react-router'

import Gallery from './Gallery'

export default class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-static-top">
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
              <form method="get" action="/search" className="navbar-form navbar-left">
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" name="q" className="form-control" placeholder="Search" />
                    <div className="input-group-btn">
                    <button type="submit" className="btn btn-default">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                  </div>
                </div>
              </form>
              <ul className="nav navbar-nav">
                <li><Link to="/">Explore</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="/register">Sign Up</a></li>
                <li><a href="/login">Sign In</a></li>
              </ul>

              <ul className="nav navbar-nav navbar-right">
                <li><a href="/messages"><i className="fa fa-comments-o"></i></a></li>
                <li><a href="/notifications"><i className="fa fa-bell-o"></i></a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    faux
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="/user/faux">Your profile</a></li>
                    <li><a href="/user/faux/favorites">Your favorites</a></li>
                    <li><a href="https://help.imgur.com/">Help</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="/settings/profile">Settings</a></li>
                    <li><a href="/logout">Sign out</a></li>
                  </ul>
                </li>
              </ul>

              <ul className="nav navbar-nav navbar-right">
                <li>
                  <div className="btn-group navbar-btn">
                    <a href="/new" className="btn btn-success"><i className="fa fa-cloud-upload"></i> Upload</a>
                    <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="caret"></span>
                      <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                      <li><a href="/new">Upload Images</a></li>
                      <li><a href="/new/meme">Make a Meme</a></li>
                    </ul>
                  </div>
                </li>
              </ul>
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
