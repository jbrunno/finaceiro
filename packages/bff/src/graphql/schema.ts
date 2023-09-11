import { Environment, rootPath } from '@bff/config';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { lexicographicSortSchema, printSchema } from 'graphql';
import { builder } from '@bff/graphql/builder';

import '@bff/graphql/scalar';
import './resolvers';

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema({});
const schemaAsString = printSchema(lexicographicSortSchema(schema));

if (!existsSync(rootPath('data'))) mkdirSync(rootPath('data'));

if (process.env.ENV === Environment.Development) {
  writeFileSync(rootPath('data/schema.gql'), schemaAsString);
}
