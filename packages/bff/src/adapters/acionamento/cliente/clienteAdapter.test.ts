import { FollowUp } from '@/domain/acionamento/followUp/followUpDomain';
import { acionamentoApiGateway } from '@/gateway';
import { clienteFollowUpsPaginationRequests } from '@/gateway/acionamento/cliente/clienteGateway.mock';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { GraphQLError } from 'graphql';
import {
  CLIENTE_ERROR_MESSAGES,
  getClienteFollowUpsPagination,
  postFollowUp,
} from './clienteAdapter';
import {
  clienteId,
  followInputPost,
  followUpId,
  followUpPostRequests,
  followUps,
  id,
  paginationInput,
} from './clienteAdapter.mock';

describe('clienteAdapter', () => {
  const mockAdapter = makeMockAdapter(acionamentoApiGateway);

  describe('getClienteFollowUps', () => {
    it('test getClienteFollowUpsPagination adapter success', async () => {
      clienteFollowUpsPaginationRequests(mockAdapter);

      await expect(
        getClienteFollowUpsPagination(id, paginationInput),
      ).resolves.toEqual({
        ...followUps,
        items: followUps.items.map((followUp) => new FollowUp(followUp)),
      });
    });

    it('test getClienteFollowUpsPagination adapter error', async () => {
      clienteFollowUpsPaginationRequests(mockAdapter, true);

      await expect(
        getClienteFollowUpsPagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(
        getClienteFollowUpsPagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(
        getClienteFollowUpsPagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(
        getClienteFollowUpsPagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('postFollowUp', () => {
    it('test postFollowUp adapter success', async () => {
      followUpPostRequests(mockAdapter);

      await expect(postFollowUp(clienteId, followInputPost)).resolves.toEqual({
        id: FollowUp.toGlobalId(followUpId),
      });
    });

    it('test postFollowUp adapter error', async () => {
      followUpPostRequests(mockAdapter, true);

      await expect(postFollowUp(clienteId, followInputPost)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_BAD_REQUEST,
        ),
      );

      await expect(postFollowUp(clienteId, followInputPost)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(postFollowUp(clienteId, followInputPost)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(postFollowUp(clienteId, followInputPost)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(postFollowUp(clienteId, followInputPost)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });
});
