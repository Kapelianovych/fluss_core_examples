import * as React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from './components/Menu';

import { Header as HeaderClass, HomeLink } from './Header.module.less';

export const Header = () => (
  <header className={HeaderClass}>
    <Link className={HomeLink} to='/'>
      🛖
    </Link>
    <Menu />
  </header>
);
