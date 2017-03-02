import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router'

import App from './components/App';
import routes from './config/routes'



ReactDOM.render(
  <Router
      history={withExampleBasename(browserHistory, __dirname)}
      routes={routes} />,
  document.getElementById('root')
);
