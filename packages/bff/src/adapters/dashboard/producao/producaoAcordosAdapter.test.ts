import { dashboardApiGateway } from '@/gateway/dashboard/dashboardApiGateway';
import { ProducaoAcordos } from '@/domain/dashboard/producao/producaoAcordosDomain';
import { ProducaoAcordosSintetizado } from '@/domain/dashboard/producao/producaoAcordosSintetizadoDomain';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { ProducaoAcordosComparativo } from '@/domain/dashboard/producao/producaoAcordosComparativoDomain';
import { GraphQLError } from 'graphql';
import {
  producaoAcordos,
  producaoAcordosSintetizado,
  producaoAcordosComparativo,
  PRODUCAO_ACORDOS_ERROR_MESSAGES,
} from './producaoAcordosAdapter';
import {
  producoesAcordos as producoesAcordosMock,
  producoesAcordosSintetizado as producoesAcordosSintetizadoMock,
  producoesAcordosComparativo as producoesAcordosComparativoMock,
  producoesAcordosRequests,
  producoesAcordosSintetizadoRequests,
  producoesAcordosComparativoRequests,
} from './producaoAcordosAdapter.mock';

describe('producaoAcordosAdapter', () => {
  const mockAdapter = makeMockAdapter(dashboardApiGateway);

  describe('producaoAcordos', () => {
    it('test producaoAcordos adapter success', async () => {
      producoesAcordosRequests(mockAdapter);

      await expect(producaoAcordos()).resolves.toEqual(
        new ProducaoAcordos(producoesAcordosMock),
      );
    });

    it('test producaoAcordos adapter error', async () => {
      producoesAcordosRequests(mockAdapter, true);

      await expect(producaoAcordos()).rejects.toEqual(
        new GraphQLError(
          PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_BAD_REQUEST,
        ),
      );

      await expect(producaoAcordos()).rejects.toEqual(
        new GraphQLError(
          PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_SOMETHING_WENT_WRONG,
        ),
      );
      await expect(producaoAcordos()).rejects.toEqual(
        new GraphQLError(
          PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('producaoAcordosSintetizado', () => {
    it('test producaoAcordosSintetizado adapter success', async () => {
      producoesAcordosSintetizadoRequests(mockAdapter);

      await expect(producaoAcordosSintetizado(new Date())).resolves.toEqual(
        new ProducaoAcordosSintetizado(producoesAcordosSintetizadoMock),
      );
    });

    it('test acordosSintetizado adapter error', async () => {
      producoesAcordosSintetizadoRequests(mockAdapter, true);

      await expect(producaoAcordosSintetizado(new Date())).rejects.toEqual(
        new GraphQLError(
          PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_BAD_REQUEST,
        ),
      );

      await expect(producaoAcordosSintetizado(new Date())).rejects.toEqual(
        new GraphQLError(
          PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_SOMETHING_WENT_WRONG,
        ),
      );
      await expect(producaoAcordosSintetizado(new Date())).rejects.toEqual(
        new GraphQLError(
          PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('producaoAcordosComparativo', () => {
    it('test producaoAcordosComparativo adapter success', async () => {
      producoesAcordosComparativoRequests(mockAdapter);

      await expect(producaoAcordosComparativo()).resolves.toEqual(
        producoesAcordosComparativoMock.items.map(
          (acordosComparativo) =>
            new ProducaoAcordosComparativo(acordosComparativo),
        ),
      );
    });

    it('test producaoAcordosComparativo adapter error', async () => {
      producoesAcordosComparativoRequests(mockAdapter, true);

      await expect(producaoAcordosComparativo()).rejects.toEqual(
        new GraphQLError(
          PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_BAD_REQUEST,
        ),
      );

      await expect(producaoAcordosComparativo()).rejects.toEqual(
        new GraphQLError(
          PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(producaoAcordosComparativo()).rejects.toEqual(
        new GraphQLError(
          PRODUCAO_ACORDOS_ERROR_MESSAGES.DASHBOARD_PRODUCOES_ACORDOS_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });
});
