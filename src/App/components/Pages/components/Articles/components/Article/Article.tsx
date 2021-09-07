import * as React from 'react';
import { Brand, maybe, none, Option, pipe } from '@fluss/core';

import {
  Author,
  Date as DateClass,
  Reference as ReferenceClass,
  ArticleContainer,
} from './Article.module.less';

export type ArticleId = Brand<string, 'ArticleId'>;

export interface Reference {
  readonly url: string;
  readonly name: string;
}

export interface IArticle {
  readonly id: ArticleId;
  readonly name: string;
  readonly avatar: string;
  readonly author: string;
  readonly content: string;
  readonly createdAt: string;
  readonly reference?: Reference; // to a previous part article
}

export interface ArticleProps {
  readonly article: IArticle;
}

const date = (value: string) =>
  new Intl.DateTimeFormat('en-US').format(new Date(value));

export const Article = ({ article }: ArticleProps) => {
  const [reference, setReference] = React.useState<Option<Reference>>(none);

  React.useEffect(
    pipe(() => article.reference, maybe, setReference),
    [],
  );

  return (
    <article className={ArticleContainer}>
      <h2>{article.name}</h2>
      <p className={DateClass}>{date(article.createdAt)}</p>
      <p>{article.content}</p>
      {reference
        .map(({ url, name }) => (
          <a className={ReferenceClass} href={url}>
            {name}
          </a>
        ))
        .fill(() => <p className={ReferenceClass}>No reference.</p>)
        .extract()}
      <address className={Author}>
        Author:&nbsp;
        <a href='#' rel='author'>
          {article.author}
        </a>
      </address>
    </article>
  );
};
