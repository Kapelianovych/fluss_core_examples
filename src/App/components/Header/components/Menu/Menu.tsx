import * as React from 'react';
import { Link } from 'react-router-dom';
import { binary, fork } from '@fluss/core';

import { RouteNameToPath } from '~src/App/components/Pages';

import {
  Link as LinkClass,
  Opened,
  MenuButton,
  MenuContent,
  MenuContainer,
} from './Menu.module.less';

const capitalize = fork(
  (word: string) => word.charAt(0).toUpperCase(),
  (word: string) => word.slice(1).toLowerCase(),
)(binary('+'));

export const Menu = () => {
  const [opened, setOpened] = React.useState(false);

  return (
    <div className={MenuContainer}>
      <button
        onClick={() => setOpened(!opened)}
        className={`${MenuButton} ${opened ? Opened : ''}`}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`${MenuContent} ${opened ? Opened : ''}`}>
        {Object.entries(RouteNameToPath).map(([name, path]) => (
          <Link
            to={path}
            key={name}
            onClick={() => setOpened(false)}
            className={LinkClass}
          >
            {capitalize(name)}
          </Link>
        ))}
      </div>
    </div>
  );
};
