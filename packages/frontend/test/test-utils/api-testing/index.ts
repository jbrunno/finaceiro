import { InMemoryCache } from '@apollo/client';
import { createMockClient, createMockSubscription } from 'mock-apollo-client';

export const mockApiClient = createMockClient({
  cache: new InMemoryCache({
    addTypename: true,
  }),
});
export const mockApiSubscription = createMockSubscription();
