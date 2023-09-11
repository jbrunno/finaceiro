import { gqlTestRequest } from '@test-utils/gqlTestRequest';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { CLIENTE_ERROR_MESSAGES } from '@/adapters/titulo/cliente/clienteAdapter';
import { Pagination } from '@bff/domain/pagination';
import { tituloApiGateway } from '@/gateway';
import { faker } from '@faker-js/faker';
import { Cliente } from '@/domain/titulo/cliente/clienteDomain';
import { ContatoEmail } from '@/domain/titulo/contato/contatoEmailDomain';
import { ContatoEndereco } from '@/domain/titulo/contato/contatoEnderecoDomain';
import {
  contatoEmailPatchRequest,
  contatoEnderecoPatchRequests,
  contatoTelefonePatchRequests,
} from '@/gateway/titulo/contato/contatoGateway.mock';
import { CONTATO_ERROR_MESSAGES } from '@/adapters/titulo/contato/contatoAdapter';
import {
  contatoEmailPatchAdapter,
  contatoEnderecoPatchAdpter,
} from '@/adapters/titulo/contato/contatoAdapter.mock';
import { ContatoTelefone } from '@/domain/titulo/contato/contatoTelefoneDomain';
import { Pais } from '@/domain/titulo/paises/paisDomain';
import {
  telefones,
  id,
  idContato,
  clienteContatoTelefonePaginationRequests,
  clienteContatoEmailPaginationRequests,
  BUSCA_TELEFONES,
  emails,
  BUSCA_EMAILS,
  enderecos,
  BUSCA_ENDERECOS,
  clienteContatoEnderecoPaginationRequests,
  PATCH_CONTATO_TELEFONE,
  contatoTelefonePatchAdapter,
  PATCH_CONTATO_ENDERECO,
  PATCH_CONTATO_EMAIL,
  paisRequests,
  pais,
} from './contatoResolver.mock';

describe('contatoResolver', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('getTelefonesPagination', () => {
    const { totalItems, ...args } = telefones.pagination;

    it('test getContatoTelefonePagination query success', async () => {
      clienteContatoTelefonePaginationRequests(mockAdapter);

      const telefonesPagination = new Pagination({
        pagination: telefones.pagination,
        items: telefones.items.map((telefone) => new ContatoTelefone(telefone)),
      });

      const response = await gqlTestRequest(BUSCA_TELEFONES, {
        variables: { id: Cliente.toGlobalId(id), pagination: args },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.telefones.items).toEqual(telefonesPagination.items);
      expect(response.data.telefones.pageInfo).toEqual(
        telefonesPagination.pageInfo,
      );
    });

    it('test getContatoTelefonePagination query error', async () => {
      clienteContatoTelefonePaginationRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(BUSCA_TELEFONES, {
          variables: { pagination: args, id: Cliente.toGlobalId(id) },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });

  describe('getEmailsPagination', () => {
    const { totalItems, ...args } = emails.pagination;

    it('test getContatoEmailPagination query success', async () => {
      clienteContatoEmailPaginationRequests(mockAdapter);

      const emailsPagination = new Pagination({
        pagination: emails.pagination,
        items: emails.items.map((email) => new ContatoEmail(email)),
      });

      const response = await gqlTestRequest(BUSCA_EMAILS, {
        variables: { id: Cliente.toGlobalId(id), pagination: args },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.emails.items).toEqual(emailsPagination.items);
      expect(response.data.emails.pageInfo).toEqual(emailsPagination.pageInfo);
    });

    it('test getContatoEmailPagination query error', async () => {
      clienteContatoEmailPaginationRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(BUSCA_EMAILS, {
          variables: { pagination: args, id: Cliente.toGlobalId(id) },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });

  describe('getEnderecosPagination', () => {
    const { totalItems, ...args } = enderecos.pagination;

    it('test getContatoEnderecoPagination query success', async () => {
      paisRequests(mockAdapter);
      clienteContatoEnderecoPaginationRequests(mockAdapter);

      const enderecosPagination = new Pagination({
        pagination: enderecos.pagination,
        items: enderecos.items.map((endereco) => {
          const { paisId, ...contatoEndereco } = new ContatoEndereco(endereco);
          return {
            ...contatoEndereco,
            pais: new Pais(pais),
          };
        }),
      });

      const response = await gqlTestRequest(BUSCA_ENDERECOS, {
        variables: { id: Cliente.toGlobalId(id), pagination: args },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.enderecos.items).toEqual(enderecosPagination.items);
      expect(response.data.enderecos.pageInfo).toEqual(
        enderecosPagination.pageInfo,
      );
    });

    it('test getContatoEnderecoPagination query error', async () => {
      clienteContatoEnderecoPaginationRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(BUSCA_ENDERECOS, {
          variables: { pagination: args, id: Cliente.toGlobalId(id) },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });

  describe('patchContatoTelefoneById', () => {
    it('test patchContatoTelefoneById mutation success', async () => {
      contatoTelefonePatchRequests(mockAdapter);

      const response = await gqlTestRequest(PATCH_CONTATO_TELEFONE, {
        variables: {
          input: {
            ...contatoTelefonePatchAdapter,
            id: ContatoTelefone.toGlobalId(idContato),
          },
        },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.telefonePatch).toEqual(contatoTelefonePatchAdapter);
    });

    it('test patchContatoTelefoneById mutation error', async () => {
      contatoTelefonePatchRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(PATCH_CONTATO_TELEFONE, {
          variables: {
            input: {
              ...contatoTelefonePatchAdapter,
              id: ContatoTelefone.toGlobalId(idContato),
            },
          },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_BAD_REQUEST,
      );

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_INVALID_CREDENTIALS,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });

  describe('patchContatoEnderecoById', () => {
    it('test patchContatoEnderecoById mutation success', async () => {
      contatoEnderecoPatchRequests(mockAdapter);

      const response = await gqlTestRequest(PATCH_CONTATO_ENDERECO, {
        variables: {
          input: {
            ...contatoEnderecoPatchAdpter,
            id: ContatoEndereco.toGlobalId(idContato),
          },
        },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.enderecoPatch).toEqual(contatoEnderecoPatchAdpter);
    });

    it('test patchContatoEnderecoById mutation error', async () => {
      contatoEnderecoPatchRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(PATCH_CONTATO_ENDERECO, {
          variables: {
            input: {
              ...contatoEnderecoPatchAdpter,
              id: ContatoEndereco.toGlobalId(idContato),
            },
          },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_BAD_REQUEST,
      );

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_INVALID_CREDENTIALS,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });

  describe('patchContatoEmailById', () => {
    it('test patchContatoEmailById mutation success', async () => {
      contatoEmailPatchRequest(mockAdapter);

      const response = await gqlTestRequest(PATCH_CONTATO_EMAIL, {
        variables: {
          input: {
            ...contatoEmailPatchAdapter,
            id: ContatoEmail.toGlobalId(idContato),
          },
        },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.emailPatch).toEqual(contatoEmailPatchAdapter);
    });

    it('test patchContatoEmailById mutation error', async () => {
      contatoEmailPatchRequest(mockAdapter, true);

      const response = () =>
        gqlTestRequest(PATCH_CONTATO_EMAIL, {
          variables: {
            input: {
              ...contatoEmailPatchAdapter,
              id: ContatoEmail.toGlobalId(idContato),
            },
          },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_BAD_REQUEST,
      );

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_INVALID_CREDENTIALS,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        CONTATO_ERROR_MESSAGES.TITULO_CONTATO_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });
});
