import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import App from './components/App'
import Post from './components/Post'
import NotFound from './components/NotFound'

render((
  <Router
    history={browserHistory}
  >
  	<Route path="/" component={App}>
  	  <Route path="post/:hash" component={Post} />
  	</Route>
  	<Route path="*" component={NotFound} />
  </Router>
), document.getElementById('root'))
