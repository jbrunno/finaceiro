import { mockApiClient } from '@test-utils/api-testing';
import { renderHook } from '@test-utils/hook-testing';
import { BUSCA_QUERY } from '../Busca.gql';
import { useBusca } from './useBusca';
import { clientes } from './useBusca.mock';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [new URLSearchParams({ search: 'test' })],
}));

mockApiClient.setRequestHandler(BUSCA_QUERY, () =>
  Promise.resolve({ data: { clientes } }),
);

describe('useBusca', () => {
  const { result, rerender } = renderHook(() => useBusca());

  it('test busca query', () => {
    rerender();
    expect(result.current.data?.clientes).toEqual(clientes);
  });

  it('test searchParam', () => {
    expect(result.current.searchParam).toBe('test');
  });

  it('test loading', () => {
    expect(result.current.loading).toBeFalsy();
  });

  it('test loadMore function', () => {
    expect(result.current.loadMore).toBeDefined();
  });
});
