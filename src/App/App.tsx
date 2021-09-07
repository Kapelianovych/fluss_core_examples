import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Pages } from './components/Pages';
import { Header } from './components/Header';

import './App.less';

export const App = () => (
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Pages />
    </BrowserRouter>
  </React.StrictMode>
);
