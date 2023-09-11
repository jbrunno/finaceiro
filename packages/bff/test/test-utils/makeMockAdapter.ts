import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const makeMockAdapter = (apiGateway: AxiosInstance) => {
  const mockAdapter = new MockAdapter(apiGateway, {
    onNoMatch: 'throwException',
  });

  afterEach(() => {
    mockAdapter.reset();
  });

  return mockAdapter;
};
