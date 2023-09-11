import { acionamentoApiGateway } from '@/gateway/acionamento/acionamentoApiGateway';
import { GraphQLError } from 'graphql';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { Situacao } from '@/domain/acionamento/followUp/situacaoDomain';
import {
  id,
  situacao,
  situacaoRequests,
  situacoes as situacoesMock,
  situacoesPaginationInput,
  situacoesRequests,
} from './followUpAdpter.mock';
import {
  FOLLOWUP_ERROR_MESSAGES,
  getSituacoesPagination,
  situacaoById,
} from './followUpAdapter';

describe('followupAdpter', () => {
  const mockAdapter = makeMockAdapter(acionamentoApiGateway);

  describe('situacaoById', () => {
    it('test situacaoById adapter success', async () => {
      situacaoRequests(mockAdapter);

      await expect(situacaoById(id)).resolves.toEqual(new Situacao(situacao));
    });

    it('test situacaoById adpter errors', async () => {
      situacaoRequests(mockAdapter, true);

      await expect(situacaoById(id)).rejects.toEqual(
        new GraphQLError(
          FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_BAD_REQUEST,
        ),
      );

      await expect(situacaoById(id)).rejects.toEqual(
        new GraphQLError(
          FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(situacaoById(id)).rejects.toEqual(
        new GraphQLError(
          FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(situacaoById(id)).rejects.toEqual(
        new GraphQLError(
          FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(situacaoById(id)).rejects.toEqual(
        new GraphQLError(
          FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('situacoes', () => {
    it('test getSituacoesPagination adapter success', async () => {
      situacoesRequests(mockAdapter);

      await expect(
        getSituacoesPagination(situacoesPaginationInput),
      ).resolves.toEqual({
        ...situacoesMock,
        items: situacoesMock.items.map(
          (situacaoModel) => new Situacao(situacaoModel),
        ),
      });
    });

    it('test getSituacoesPagination adpter errors', async () => {
      situacoesRequests(mockAdapter, true);

      await expect(
        getSituacoesPagination(situacoesPaginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_BAD_REQUEST,
        ),
      );

      await expect(
        getSituacoesPagination(situacoesPaginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(
        getSituacoesPagination(situacoesPaginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(
        getSituacoesPagination(situacoesPaginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(
        getSituacoesPagination(situacoesPaginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          FOLLOWUP_ERROR_MESSAGES.ACIONAMENTO_FOLLOWUP_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });
});
