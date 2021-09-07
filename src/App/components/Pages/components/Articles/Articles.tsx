import * as React from 'react';
import { identity, list, List } from '@fluss/core';

import { Filters } from './components/Filters';
import { Pagination } from './components/Pagination';
import { request, toJSON } from '~src/App/helpers/request';
import { Article, IArticle } from './components/Article';

const articlesPerPage = 10;

const lastPage = (count: number) => Math.ceil(count / articlesPerPage);

const fetchArticles = request('/articles')()
  .apply(toJSON<ReadonlyArray<IArticle>>())
  .chain(identity)
  .map(({ data }) => list(data ?? []));

export const Articles = () => {
  const [page, setPage] = React.useState<number>(1);
  const [articles, setArticles] = React.useState<List<IArticle>>(list());

  React.useEffect(() => fetchArticles.start(setArticles, console.error), []);

  return (
    <React.Fragment>
      <h1>Articles</h1>
      <Filters articles={articles} />
      {articles
        .skip(articlesPerPage * (page - 1))
        .take(articlesPerPage)
        .map((item) => <Article key={item.id} article={item} />)
        .asArray()}
      <Pagination
        page={page}
        setPage={setPage}
        last={lastPage(articles.size())}
      />
    </React.Fragment>
  );
};
