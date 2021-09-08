import * as React from 'react';
import { consequent, when } from '@fluss/core';

import { ButtonContainer, Password } from './Consequence.module.less';

const random = (max: number) => Math.floor(Math.random() * (max + 1));

const symbols = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '_',
];

const generateRandomPassword = consequent(
  (length = 8) =>
    new Promise<string>((resolve) => {
      let password = '';

      const stamp: NodeJS.Timer = setInterval(
        when(() => password.length >= length)(
          () => (clearInterval(stamp), resolve(password)),
          () => (password += symbols[random(symbols.length - 1)]),
        ),
        500,
      );
    }),
);

export const Consequence = () => {
  const [password, setPassword] = React.useState<string>('');
  const [refresh, setRefresh] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log('effect');
    generateRandomPassword().map((value) => value.then(setPassword));
  }, [refresh]);

  return (
    <React.Fragment>
      <h1>consequent</h1>
      <p className={Password}>{password}</p>
      <div className={ButtonContainer}>
        <button onClick={() => setRefresh(!refresh)}>Refresh</button>
      </div>
    </React.Fragment>
  );
};
