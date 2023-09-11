import { mockApiClient } from '@test-utils/api-testing';
import { renderHook } from '@test-utils/hook-testing';
import {
  DASHBOARD_ACORDOS_PERIODO_QUERY,
  DASHBOARD_PRODUCAO_GRAFICO_QUERY,
  ICM_QUERY,
} from '../Dashboard.gql';
import { useDashboard } from './useDashboard';
import {
  icm,
  producaoAcordosComparativo,
  producaoAcordosSintetizado,
} from './useDashboard.mock';

type HookType = Record<'current', ReturnType<typeof useDashboard>>;

mockApiClient.setRequestHandler(ICM_QUERY, () =>
  Promise.resolve({ data: { icm } }),
);

mockApiClient.setRequestHandler(DASHBOARD_PRODUCAO_GRAFICO_QUERY, () =>
  Promise.resolve({ data: { producaoAcordosComparativo } }),
);

mockApiClient.setRequestHandler(DASHBOARD_ACORDOS_PERIODO_QUERY, () =>
  Promise.resolve({ data: { producaoAcordosSintetizado } }),
);

describe('useDashboard', () => {
  let resultHook: HookType;

  beforeEach(() => {
    const { result } = renderHook(() => useDashboard());
    resultHook = result;
  });

  it('test icm query', () => {
    expect(resultHook.current.data.icm).toEqual(icm);
  });

  it('test producaoAcordosComparativo query', () => {
    expect(resultHook.current.data.producaoAcordosComparativo).toEqual(
      producaoAcordosComparativo,
    );
  });

  it('test producaoAcordosSintetizado query', () => {
    expect(resultHook.current.data.producaoAcordosSintetizado).toEqual(
      producaoAcordosSintetizado,
    );
  });
});
