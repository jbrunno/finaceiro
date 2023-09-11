import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import createHttpError from 'http-errors';

import { clienteId } from '@/adapters/acionamento/cliente/clienteAdapter.mock';
import {
  ACIONAMENTO_CLIENTE_ERRORS,
  getClienteFollowUps,
  postClienteFollowUp,
} from './clienteGateway';
import {
  id,
  paginationInput,
  clienteFollowUpsPaginationRequests,
  followUps,
  followUpPostRequests,
  followInputPost,
} from './clienteGateway.mock';
import { acionamentoApiGateway } from '../acionamentoApiGateway';

describe('clienteGateway', () => {
  const mockAdapter = makeMockAdapter(acionamentoApiGateway);

  describe('getClienteFollowUps', () => {
    it('test getClienteFollowUps request success', async () => {
      clienteFollowUpsPaginationRequests(mockAdapter);

      await expect(getClienteFollowUps(id, paginationInput)).resolves.toEqual(
        followUps,
      );
    });

    it('test getClienteFollowUps request error', async () => {
      clienteFollowUpsPaginationRequests(mockAdapter, true);

      await expect(getClienteFollowUps(id, paginationInput)).rejects.toEqual(
        createHttpError(401, ACIONAMENTO_CLIENTE_ERRORS.UNAUTHORIZED),
      );

      await expect(getClienteFollowUps(id, paginationInput)).rejects.toEqual(
        createHttpError(403, ACIONAMENTO_CLIENTE_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(getClienteFollowUps(id, paginationInput)).rejects.toEqual(
        createHttpError(500, ACIONAMENTO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(getClienteFollowUps(id, paginationInput)).rejects.toEqual(
        createHttpError(503, ACIONAMENTO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('postClienteFollowUp', () => {
    it('test postClienteFollowUp request success', async () => {
      followUpPostRequests(mockAdapter);

      await expect(
        postClienteFollowUp(clienteId, followInputPost),
      ).resolves.toEqual({
        id,
      });
    });

    it('test postClienteFollowUp request error', async () => {
      followUpPostRequests(mockAdapter, true);

      await expect(
        postClienteFollowUp(clienteId, followInputPost),
      ).rejects.toEqual(
        createHttpError(400, ACIONAMENTO_CLIENTE_ERRORS.BAD_REQUEST),
      );

      await expect(
        postClienteFollowUp(clienteId, followInputPost),
      ).rejects.toEqual(
        createHttpError(401, ACIONAMENTO_CLIENTE_ERRORS.UNAUTHORIZED),
      );

      await expect(
        postClienteFollowUp(clienteId, followInputPost),
      ).rejects.toEqual(
        createHttpError(403, ACIONAMENTO_CLIENTE_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(
        postClienteFollowUp(clienteId, followInputPost),
      ).rejects.toEqual(
        createHttpError(500, ACIONAMENTO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(
        postClienteFollowUp(clienteId, followInputPost),
      ).rejects.toEqual(
        createHttpError(503, ACIONAMENTO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });
});
