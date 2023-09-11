import '@bff/graphql/builder';
import * as adapters from '@/adapters';
import { GraphQLUser } from '@bff/graphql/api';

declare module '@bff/graphql/builder' {
  type SchemaGraphQLContext = {
    adapters: typeof adapters;
    user: U extends true ? GraphQLUser : null;
  };
}
