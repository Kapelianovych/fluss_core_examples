import { done, task } from '@fluss/core';

export interface RequestResponse<T> {
  readonly data?: T;
}

export const toJSON = <T>() =>
  done((response: Response) =>
    task<RequestResponse<T>>((done, fail) =>
      response.json().then((data) => done({ data }), fail),
    ),
  );

export const request = (path: string) => (options?: RequestInit) =>
  task<Response>((done, fail) =>
    fetch(`${process.env.API_ENDPOINT}${path}`, options).then(done, fail),
  );
