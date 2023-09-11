import { InMemoryCacheConfig } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

export const cache: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        telefones: relayStylePagination(),
        emails: relayStylePagination(),
        enderecos: relayStylePagination(),
      },
    },
  },
};
