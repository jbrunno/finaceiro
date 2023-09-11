import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import createHttpError from 'http-errors';
import { dashboardApiGateway } from '../dashboardApiGateway';
import {
  DASHBOARD_PRODUCOES_ACORDOS_ERRORS,
  getAcordosSintetizado,
  getAcordos,
  getAcordosComparativo,
} from './producoesGateway';
import {
  producoesAcordos,
  producoesAcordosRequests,
  producoesAcordosSintetizado,
  producoesAcordosSintetizadoRequests,
  producoesAcordosComparativo,
  producoesAcordosComparativoRequests,
} from './producoesGateway.mock';

describe('producoesGateway', () => {
  const mockAdapter = makeMockAdapter(dashboardApiGateway);

  describe('getAcordos', () => {
    it('test getAcordos request success', async () => {
      producoesAcordosRequests(mockAdapter);

      await expect(getAcordos()).resolves.toEqual(producoesAcordos);
    });

    it('test getProducaoAcordos request error', async () => {
      producoesAcordosRequests(mockAdapter, true);

      await expect(getAcordos()).rejects.toEqual(
        createHttpError(400, DASHBOARD_PRODUCOES_ACORDOS_ERRORS.BAD_REQUEST),
      );
      await expect(getAcordos()).rejects.toEqual(
        createHttpError(
          500,
          DASHBOARD_PRODUCOES_ACORDOS_ERRORS.SOMETHING_WENT_WRONG,
        ),
      );
      await expect(getAcordos()).rejects.toEqual(
        createHttpError(
          503,
          DASHBOARD_PRODUCOES_ACORDOS_ERRORS.SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('getAcordosSintetizado', () => {
    it('test getAcordosSintetizado request success', async () => {
      producoesAcordosSintetizadoRequests(mockAdapter);

      await expect(getAcordosSintetizado(new Date())).resolves.toEqual(
        producoesAcordosSintetizado,
      );
    });

    it('test getAcordosSintetizado request error', async () => {
      producoesAcordosSintetizadoRequests(mockAdapter, true);

      await expect(getAcordosSintetizado(new Date())).rejects.toEqual(
        createHttpError(400, DASHBOARD_PRODUCOES_ACORDOS_ERRORS.BAD_REQUEST),
      );
      await expect(getAcordosSintetizado(new Date())).rejects.toEqual(
        createHttpError(
          500,
          DASHBOARD_PRODUCOES_ACORDOS_ERRORS.SOMETHING_WENT_WRONG,
        ),
      );
      await expect(getAcordosSintetizado(new Date())).rejects.toEqual(
        createHttpError(
          503,
          DASHBOARD_PRODUCOES_ACORDOS_ERRORS.SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('getAcordosComparativo', () => {
    it('test getAcordosComparativo request success', async () => {
      producoesAcordosComparativoRequests(mockAdapter);

      await expect(getAcordosComparativo()).resolves.toEqual(
        producoesAcordosComparativo,
      );
    });

    it('test getAcordosComparativo request error', async () => {
      producoesAcordosComparativoRequests(mockAdapter, true);

      await expect(getAcordosComparativo()).rejects.toEqual(
        createHttpError(400, DASHBOARD_PRODUCOES_ACORDOS_ERRORS.BAD_REQUEST),
      );
      await expect(getAcordosComparativo()).rejects.toEqual(
        createHttpError(
          500,
          DASHBOARD_PRODUCOES_ACORDOS_ERRORS.SOMETHING_WENT_WRONG,
        ),
      );
      await expect(getAcordosComparativo()).rejects.toEqual(
        createHttpError(
          503,
          DASHBOARD_PRODUCOES_ACORDOS_ERRORS.SERVICE_UNAVAILABLE,
        ),
      );
    });
  });
});
