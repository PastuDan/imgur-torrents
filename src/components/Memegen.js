import React, { Component } from 'react';

export default class Memegen extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="well well-meme">
              <div className="well-meme-inner">
                <p>Select your template</p>
                <p>or</p>
                <p><a href="#" className="btn btn-default">Upload your own</a></p>
              </div>
            </div>
            <form>
              <div className="form-group">
                <input className="form-control input-lg" placeholder="Top Text"/>
              </div>
              <div className="form-group">
                <input className="form-control input-lg" placeholder="Bottom Text"/>
              </div>
              <button type="submit" className="btn btn-block btn-lg btn-primary">Make a Meme!</button>
            </form>
          </div>
          <div className="col-md-6">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <form>
                    <div className="form-group">
                      <div className="input-group">
                        <input type="text" className="form-control input-lg" placeholder="Search meme templates..."/>
                        <span className="input-group-btn">
                          <button type="submit" className="btn btn-lg btn-default"><i className="fa fa-search"></i></button>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row">

                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>
                <div className="col-lg-3">
                  <p><a href="#"><img src="http://placehold.it/250x250" className="img-responsive" alt="meme type"/></a></p>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

