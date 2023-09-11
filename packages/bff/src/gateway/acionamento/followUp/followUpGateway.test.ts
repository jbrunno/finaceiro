import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import createHttpError from 'http-errors';
import { acionamentoApiGateway } from '../acionamentoApiGateway';
import {
  id,
  situacao,
  situacaoRequests,
  situacoes,
  situacoesPaginationInput,
  situacoesRequests,
} from './followUpGateway.mock';
import {
  ACIONAMENTO_FOLLOWUP_ERRORS,
  getSituacaoById,
  getSituacoes,
} from './followUpGateway';

describe('followupGateway', () => {
  const mockAdapter = makeMockAdapter(acionamentoApiGateway);

  describe('getSituacoes', () => {
    it('test getSituacoes request sucess', async () => {
      situacoesRequests(mockAdapter);

      await expect(getSituacoes(situacoesPaginationInput)).resolves.toEqual(
        situacoes,
      );
    });

    it('test getSituacoes request errors', async () => {
      situacoesRequests(mockAdapter, true);

      await expect(getSituacoes(situacoesPaginationInput)).rejects.toEqual(
        createHttpError(400, ACIONAMENTO_FOLLOWUP_ERRORS.BAD_REQUEST),
      );

      await expect(getSituacoes(situacoesPaginationInput)).rejects.toEqual(
        createHttpError(401, ACIONAMENTO_FOLLOWUP_ERRORS.UNAUTHORIZED),
      );

      await expect(getSituacoes(situacoesPaginationInput)).rejects.toEqual(
        createHttpError(403, ACIONAMENTO_FOLLOWUP_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(getSituacoes(situacoesPaginationInput)).rejects.toEqual(
        createHttpError(500, ACIONAMENTO_FOLLOWUP_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(getSituacoes(situacoesPaginationInput)).rejects.toEqual(
        createHttpError(503, ACIONAMENTO_FOLLOWUP_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('getSituacaoById', () => {
    it('test getSituacaoById request sucess', async () => {
      situacaoRequests(mockAdapter);

      await expect(getSituacaoById(id)).resolves.toEqual(situacao);
    });

    it('test getSituacoes request errors', async () => {
      situacaoRequests(mockAdapter, true);

      await expect(getSituacaoById(id)).rejects.toEqual(
        createHttpError(400, ACIONAMENTO_FOLLOWUP_ERRORS.BAD_REQUEST),
      );

      await expect(getSituacaoById(id)).rejects.toEqual(
        createHttpError(401, ACIONAMENTO_FOLLOWUP_ERRORS.UNAUTHORIZED),
      );

      await expect(getSituacaoById(id)).rejects.toEqual(
        createHttpError(403, ACIONAMENTO_FOLLOWUP_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(getSituacaoById(id)).rejects.toEqual(
        createHttpError(500, ACIONAMENTO_FOLLOWUP_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(getSituacaoById(id)).rejects.toEqual(
        createHttpError(503, ACIONAMENTO_FOLLOWUP_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });
});
