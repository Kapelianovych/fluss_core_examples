import * as React from 'react';
import { debounce } from '@fluss/core';

import { Result, InputContainer, Input } from './Debounce.module.less';

const onInput =
  (setValue: React.Dispatch<React.SetStateAction<string>>) =>
  ({ target }: React.SyntheticEvent<HTMLInputElement, InputEvent>) =>
    setValue((target as HTMLInputElement).value);

export const Debounce = () => {
  const [value, setValue] = React.useState<string>('');

  return (
    <React.Fragment>
      <h1 className='Title'>Debounce</h1>
      <p className={Result}>Result: {value}</p>
      <div className={InputContainer}>
        <input
          type='text'
          className={Input}
          onInput={debounce(onInput(setValue), 20)}
        />
      </div>
    </React.Fragment>
  );
};
