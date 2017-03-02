import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import App from './components/App'
import Messages from './components/Messages'
import Notifications from './components/Notifications'
import Login from './components/Login'
import Logout from './components/Logout'
import Memegen from './components/Memegen'
import Post from './components/Post'
import Profile from './components/Profile'
import ProfileFavorites from './components/ProfileFavorites'
import Register from './components/Register'
import Search from './components/Search'
import Upload from './components/Upload'
import NotFound from './components/NotFound'

render((
  <Router
    history={browserHistory}
  >
  	<Route path="/" component={App}>
      <Route path="messages" component={Messages} />
      <Route path="notifications" component={Notifications} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="new" component={Upload} />
      <Route path="new/meme" component={Memegen} />
      <Route path="post/:hash" component={Post} />
      <Route path="user/:username" component={Profile} />
      <Route path="user/:username/favorites" component={ProfileFavorites} />
      <Route path="register" component={Register} />
      <Route path="search" component={Search} />
  	</Route>
  	<Route path="*" component={NotFound} />
  </Router>
), document.getElementById('root'))
