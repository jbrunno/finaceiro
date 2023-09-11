import { CLIENTE_ERROR_MESSAGES } from '@/adapters/acionamento/cliente/clienteAdapter';
import { FollowUp } from '@/domain/acionamento/followUp/followUpDomain';
import { Cliente } from '@/domain/titulo/cliente/clienteDomain';
import { acionamentoApiGateway } from '@/gateway';
import { Pagination } from '@bff/domain/pagination';
import { faker } from '@faker-js/faker';
import { gqlTestRequest } from '@test-utils/gqlTestRequest';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { Situacao } from '@/domain/acionamento/followUp/situacaoDomain';
import { Titulo } from '@/domain/titulo/titulo/tituloDomain';
import { UsuarioById } from '@/domain/usuario/usuarioByIdDomain';
import {
  FOLLOWUP,
  POST_FOLLOWUPS,
  clienteFollowUpsPaginationRequests,
  clienteId,
  followInputPost,
  followUpPostRequests,
  followUps,
  id,
  situacao,
  situacaoRequests,
  token,
  usuario,
  usuarioByIdRequests,
} from './clienteResolver.mock';

describe('followUpsResolver', () => {
  const mockAdapter = makeMockAdapter(acionamentoApiGateway);

  describe('getFollowUpsPagination', () => {
    const { totalItems, ...args } = followUps.pagination;

    it('test getFollowUpsPagination query success', async () => {
      situacaoRequests(mockAdapter);
      // usuarioByIdRequests(mockAdapter);
      clienteFollowUpsPaginationRequests(mockAdapter);

      const followUpsPagination = new Pagination({
        pagination: followUps.pagination,
        items: followUps.items.map((followUp) => {
          const { usuarioId, situacaoId, ...clienteFollowUp } = new FollowUp(
            followUp,
          );
          return {
            ...clienteFollowUp,
            // usuario: new UsuarioById(usuario),
            situacao: new Situacao(situacao),
          };
        }),
      });

      const response = await gqlTestRequest(FOLLOWUP, {
        variables: { id: Cliente.toGlobalId(id), pagination: args },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.followUps.items).toEqual(followUpsPagination.items);
      expect(response.data.followUps.pageInfo).toEqual(
        followUpsPagination.pageInfo,
      );
    });

    it('test getFollowUpsPagination query error', async () => {
      clienteFollowUpsPaginationRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(FOLLOWUP, {
          variables: { pagination: args, id: FollowUp.toGlobalId(id) },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_INVALID_CREDENTIALS,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });

  describe('registrarClienteFollowUp', () => {
    const input = {
      ...followInputPost,
      clienteId: Cliente.toGlobalId(clienteId),
      situacaoFollowUpId: Situacao.toGlobalId(
        followInputPost.situacaoFollowUpId,
      ),
      tituloId: Titulo.toGlobalId(followInputPost.tituloId),
    };

    it('test registrarClienteFollowUp mutation success', async () => {
      followUpPostRequests(mockAdapter);

      const response = await gqlTestRequest(POST_FOLLOWUPS, {
        variables: { input },
        headers: { Authorization: token },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.registrarClienteFollowUp.id).toEqual(
        FollowUp.toGlobalId(id),
      );
    });

    it('test clienteFollowUpsPost mutation error', async () => {
      followUpPostRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(POST_FOLLOWUPS, {
          variables: { input },
          headers: { Authorization: token },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_BAD_REQUEST,
      );

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_INVALID_CREDENTIALS,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.ACIONAMENTO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });
});
