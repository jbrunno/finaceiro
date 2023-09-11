import { ApolloServer } from '@apollo/server';
import { DocumentNode, print } from 'graphql';
import request from 'supertest';
import Koa from 'koa';
import http from 'http';
import { schema } from '@/graphql/schema';
import { graphqlContext } from '@bff/graphql/api';
import { koaMiddleware } from '@as-integrations/koa';
import koaBody from 'koa-body';

let cachedServer: http.Server;

const createServer = async () => {
  const app = new Koa();
  const server = new ApolloServer({
    schema,
  });

  await server.start();
  app.use(koaBody());
  app.use(
    koaMiddleware(server, {
      context: graphqlContext,
    }),
  );

  const httpServer = http.createServer(app.callback());
  return httpServer;
};

export const gqlTestRequest = async (
  query: DocumentNode,
  {
    variables = {},
    headers = {},
  }: {
    variables?: Record<string, unknown>;
    headers?: Record<string, string>;
  } = {},
) => {
  const server = cachedServer ?? (await createServer());
  cachedServer = server;

  const requestBuilder = request(server).post('/graphql');

  Object.entries(headers).forEach(([key, value]) => {
    requestBuilder.set(key, value);
  });

  const { text } = await requestBuilder.send({
    variables,
    query: print(query),
  });

  return JSON.parse(text);
};
