import * as React from 'react';
import { when } from '@fluss/core';

import {
  CentralPageNumber,
  PaginationContainer,
} from './Pagination.module.less';

export interface PaginationProps {
  readonly page: number;
  readonly last: number;
  readonly setPage: React.Dispatch<React.SetStateAction<number>>;
}

const start = when(
  (page: number, _setPage: React.Dispatch<React.SetStateAction<number>>) =>
    page <= 1,
)(
  () => <></>,
  (page, setPage) => (
    <button onClick={() => setPage(page - 1)}>{page - 1}</button>
  ),
);

const end = when(
  (
    page: number,
    last: number,
    _setPage: React.Dispatch<React.SetStateAction<number>>,
  ) => page >= last,
)(
  () => <></>,
  (page, _last, setPage) => (
    <button onClick={() => setPage(page + 1)}>{page + 1}</button>
  ),
);

export const Pagination = ({ page, setPage, last }: PaginationProps) => (
  <div className={PaginationContainer}>
    {start(page, setPage)}
    <span className={CentralPageNumber}>{page}</span>
    {end(page, last, setPage)}
  </div>
);
