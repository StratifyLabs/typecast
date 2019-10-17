import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Counter from './components/Counter';

export default () => (
  <App>
    <Switch>
      <Route path={routes.HOME} component={HomePage} />
      <Route path={routes.COUNTER} component={Counter} />
    </Switch>
  </App>
);
