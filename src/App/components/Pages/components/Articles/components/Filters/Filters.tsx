import * as React from 'react';
import { filter, List, map, toArray, transduce } from '@fluss/core';

import { ArticleId, IArticle } from '../Article';

import {
  Showed,
  Filters as FiltersClass,
  DataList,
} from './Filters.module.less';

export interface FiltersProps {
  readonly articles: List<IArticle>;
}

export interface ArticleCard {
  readonly id: ArticleId;
  readonly name: string;
  readonly date: string;
}

const articlesToPreview = (articles: List<IArticle>) => (search: string) =>
  transduce(articles)(toArray<JSX.Element>())(
    filter<ReadonlyArray<JSX.Element>, IArticle>(({ name }) =>
      name.toLowerCase().includes(search.toLowerCase()),
    ),
    map<ReadonlyArray<JSX.Element>, IArticle, ArticleCard>(
      ({ id, name, createdAt }) => ({ id, name, date: createdAt }),
    ),
    map<ReadonlyArray<JSX.Element>, ArticleCard, JSX.Element>(
      ({ id, name, date }) => (
        <div key={id}>
          <span>{name}</span> - <span>{new Date(date).getFullYear()}</span>
        </div>
      ),
    ),
  );

export const Filters = ({ articles }: FiltersProps) => {
  const [search, setSearch] = React.useState<string>('');

  return (
    <div className={FiltersClass}>
      <input
        type='search'
        value={search}
        onInput={({ target }) => setSearch((target as HTMLInputElement).value)}
      />
      <div className={`${DataList} ${search !== '' ? Showed : ''}`}>
        {articlesToPreview(articles)(search)}
      </div>
    </div>
  );
};
