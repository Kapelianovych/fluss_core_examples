import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from './components/Home';
import { Stream } from './components/Stream';
import { Articles } from './components/Articles';
import { Debounce } from './components/Debounce';
import { Consequence } from './components/Consequence';

export enum RouteNameToPath {
  STREAM = '/stream',
  ARTICLES = '/articles',
  DEBOUNCE = '/debounce',
  CONSEQUENT = '/consequent',
}

export const Pages = () => (
  <Switch>
    <Route exact path='/'>
      <Home />
    </Route>
    <Route path={RouteNameToPath.DEBOUNCE}>
      <Debounce />
    </Route>
    <Route path={RouteNameToPath.STREAM}>
      <Stream />
    </Route>
    <Route path={RouteNameToPath.ARTICLES}>
      <Articles />
    </Route>
    <Route path={RouteNameToPath.CONSEQUENT}>
      <Consequence />
    </Route>
  </Switch>
);
