import React, { Component } from 'react';
import { Link } from 'react-router'

export default class Gallery extends Component {
  render() {
    return (
      <div className="container-pull-top">
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#pagehead-navbar-collapse" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="pagehead-navbar-collapse">
              <ul className="nav navbar-nav navbar-left">
                <li className="active"><a href="/explore">Most Viral</a></li>
                <li><a href="/explore/rising">Rising</a></li>
                <li><a href="/explore/new">Newest</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <div className="btn-group navbar-btn">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Sort: <b>Popularity</b> <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li className="active"><a href="#">Popularity <span className="sr-only">(current)</span></a></li>
                      <li><a href="#">Newest First</a></li>
                      <li><a href="#">Highest Scoring</a></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-md-3">
              <Link to="/post/rAnDoM" className="thumbnail">
                <img src="http://placehold.it/350x350" alt="img-block" />
              </Link>
            </div>
            <div className="col-sm-4 col-md-3">
              <Link to="/post/rAnDoM" className="thumbnail">
                <img src="http://placehold.it/350x350" alt="img-block" />
              </Link>
            </div>
            <div className="col-sm-4 col-md-3">
              <Link to="/post/rAnDoM" className="thumbnail">
                <img src="http://placehold.it/350x350" alt="img-block" />
              </Link>
            </div>
            <div className="col-sm-4 col-md-3">
              <Link to="/post/rAnDoM" className="thumbnail">
                <img src="http://placehold.it/350x350" alt="img-block" />
              </Link>
            </div>
            <div className="col-sm-4 col-md-3">
              <Link to="/post/rAnDoM" className="thumbnail">
                <img src="http://placehold.it/350x350" alt="img-block" />
              </Link>
            </div>
            <div className="col-sm-4 col-md-3">
              <Link to="/post/rAnDoM" className="thumbnail">
                <img src="http://placehold.it/350x350" alt="img-block" />
              </Link>
            </div>
            <div className="col-sm-4 col-md-3">
              <Link to="/post/rAnDoM" className="thumbnail">
                <img src="http://placehold.it/350x350" alt="img-block" />
              </Link>
            </div>
            <div className="col-sm-4 col-md-3">
              <Link to="/post/rAnDoM" className="thumbnail">
                <img src="http://placehold.it/350x350" alt="img-block" />
              </Link>
            </div>
            <div className="col-sm-4 col-md-3">
              <Link to="/post/rAnDoM" className="thumbnail">
                <img src="http://placehold.it/350x350" alt="img-block" />
              </Link>
            </div>
            <div className="col-sm-4 col-md-3">
              <Link to="/post/rAnDoM" className="thumbnail">
                <img src="http://placehold.it/350x350" alt="img-block" />
              </Link>
            </div>
            <div className="col-sm-4 col-md-3">
              <Link to="/post/rAnDoM" className="thumbnail">
                <img src="http://placehold.it/350x350" alt="img-block" />
              </Link>
            </div>
            <div className="col-sm-4 col-md-3">
              <Link to="/post/rAnDoM" className="thumbnail">
                <img src="http://placehold.it/350x350" alt="img-block" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
