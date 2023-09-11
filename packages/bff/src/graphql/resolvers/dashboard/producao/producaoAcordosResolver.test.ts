import { gqlTestRequest } from '@test-utils/gqlTestRequest';
import { dashboardApiGateway } from '@/gateway';
import { PRODUCAO_ACORDOS_ERROR_MESSAGES } from '@/adapters/dashboard/producao/producaoAcordosAdapter';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { ProducaoAcordos } from '@/domain/dashboard/producao/producaoAcordosDomain';
import { ProducaoAcordosComparativo } from '@/domain/dashboard/producao/producaoAcordosComparativoDomain';
import { ProducaoAcordosSintetizado } from '@/domain/dashboard/producao/producaoAcordosSintetizadoDomain';
import {
  token,
  PRODUCAO_ACORDOS,
  producoesAcordos,
  producoesAcordosRequests,
  producoesAcordosSintetizadoRequests,
  PRODUCAO_ACORDOS_SINTETIZADO,
  producoesAcordosSintetizado,
  producoesAcordosComparativoRequests,
  PRODUCAO_ACORDOS_COMPARATIVO,
  producoesAcordosComparativo,
} from './producaoAcordosResolver.mock';

describe('producaoAcordosResolver', () => {
  const mockAdapter = makeMockAdapter(dashboardApiGateway);

  describe('producaoAcordos', () => {
    it('test producaoAcordos query success', async () => {
      producoesAcordosRequests(mockAdapter);

      const response = await gqlTestRequest(PRODUCAO_ACORDOS, {
        headers: { Authorization: token },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.producaoAcordos).toEqual(
        new ProducaoAcordos(producoesAcordos),
      );
    });

    it('test producaoAcordos query error', async () => {
      producoesAcordosRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(PRODUCAO_ACORDOS, {
          headers: { Authorization: token },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_BAD_REQUEST,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });

  describe('producaoAcordosSintetizado', () => {
    it('test producaoAcordosSintetizado query success', async () => {
      producoesAcordosSintetizadoRequests(mockAdapter);

      const response = await gqlTestRequest(PRODUCAO_ACORDOS_SINTETIZADO, {
        headers: { Authorization: token },
        variables: { date: new Date() },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.producaoAcordosSintetizado).toEqual(
        new ProducaoAcordosSintetizado(producoesAcordosSintetizado),
      );
    });

    it('test producaoAcordosSintetizado query error', async () => {
      producoesAcordosSintetizadoRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(PRODUCAO_ACORDOS_SINTETIZADO, {
          headers: { Authorization: token },
          variables: { date: new Date() },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_BAD_REQUEST,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });

  describe('producaoAcordosComparativo', () => {
    it('test producaoAcordosComparativo query success', async () => {
      producoesAcordosComparativoRequests(mockAdapter);

      const response = await gqlTestRequest(PRODUCAO_ACORDOS_COMPARATIVO, {
        headers: { Authorization: token },
      });

      response.data.producaoAcordosComparativo =
        response.data.producaoAcordosComparativo.map(
          (acordosComparativo: ProducaoAcordosComparativo) => {
            const comparativo = { ...acordosComparativo };
            comparativo.data = new Date(comparativo.data);
            return comparativo;
          },
        );

      expect(response.errors).toBeUndefined();
      expect(response.data.producaoAcordosComparativo).toEqual(
        producoesAcordosComparativo.items.map(
          (x) => new ProducaoAcordosComparativo(x),
        ),
      );
    });

    it('test producaoAcordosComparativo query error', async () => {
      producoesAcordosComparativoRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(PRODUCAO_ACORDOS_COMPARATIVO, {
          headers: { Authorization: token },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_BAD_REQUEST,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });
});
