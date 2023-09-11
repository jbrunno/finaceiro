import { acionamentoApiGateway } from '@/gateway';
import { Pagination } from '@bff/domain/pagination';
import { faker } from '@faker-js/faker';
import { gqlTestRequest } from '@test-utils/gqlTestRequest';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import {
  situacoes as situacoesMock,
  situacoesRequests,
} from '@/gateway/acionamento/followUp/followUpGateway.mock';
import { Situacao } from '@/domain/acionamento/followUp/situacaoDomain';
import { FOLLOWUP_ERROR_MESSAGES } from '@/adapters/acionamento/followUp/followUpAdapter';
import { BUSCA_SITUACOES_FOLLOW_UP } from './followUpResolver.mock';

describe('followUpsResolver', () => {
  const mockAdapter = makeMockAdapter(acionamentoApiGateway);

  describe('getSituacoesFollowUp', () => {
    const { totalItems, ...args } = situacoesMock.pagination;

    it('test getSituacoesFollowUp query succes', async () => {
      situacoesRequests(mockAdapter);

      const situacoesPagination = new Pagination({
        pagination: situacoesMock.pagination,
        items: situacoesMock.items.map(
          (situacaoModel) => new Situacao(situacaoModel),
        ),
      });

      const response = await gqlTestRequest(BUSCA_SITUACOES_FOLLOW_UP, {
        variables: { pagination: args, keyword: faker.random.word() },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.error).toBeUndefined();
      expect(response.data.situacoesFollowUp.items).toEqual(
        situacoesPagination.items,
      );
      expect(response.data.situacoesFollowUp.pageInfo).toEqual(
        situacoesPagination.pageInfo,
      );
    });

    it('test getSituacoesFollowUp query error', async () => {
      situacoesRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(BUSCA_SITUACOES_FOLLOW_UP, {
          variables: { pagination: args, keyword: faker.random.word() },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_BAD_REQUEST,
      );

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_INVALID_CREDENTIALS,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });
});
