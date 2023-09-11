import { gqlTestRequest } from '@test-utils/gqlTestRequest';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { Pagination, PaginationItem } from '@bff/domain/pagination';
import { faker } from '@faker-js/faker';
import { CLIENTE_ERROR_MESSAGES } from '@/adapters/titulo/cliente/clienteAdapter';
import { Cliente } from '@/domain/titulo/cliente/clienteDomain';
import { tituloApiGateway } from '@/gateway';
import { Cbo } from '@/domain/titulo/cbo/cboDomain';
import { ClienteModel } from '@/gateway/titulo/cliente/models/clienteModel';
import {
  clienteContatoEmailAdapter,
  clienteContatoEmailPostRequests,
  clienteContatoEnderecoAdapter,
  emailPost,
  enderecoPost,
  clienteInputPostAdapterMock,
  titulosRequests,
  titulos,
  tituloPostRequests,
  tituloInputPost,
} from '@/adapters/titulo/cliente/clienteAdapter.mock';
import { ContatoEnderecoModel } from '@/gateway/titulo/cliente/models/contatoModel';
import { ContatoEndereco } from '@/domain/titulo/contato/contatoEnderecoDomain';
import { Titulo } from '@/domain/titulo/titulo/tituloDomain';
import {
  BUSCA_CLIENTES,
  BUSCA_CLIENTE,
  PATCH_CLIENTE,
  clientePaginationRequests,
  clienteRequests,
  clientes,
  cliente,
  clientePatchAdapter,
  clientePostRequests,
  id,
  cbo,
  cboRequests,
  clientePatchRequests,
  clienteContatoEnderecoPostRequests,
  POST_CLIENTE_CONTATO_ENDERECO,
  POST_CLIENTE_CONTATO_EMAIL,
  emailMock,
  POST_CLIENTE,
  BUSCA_CLIENTES_TITULOS,
  POST_TITULO,
} from './clienteResolver.mock';

describe('clienteResolver', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('getClientesPagination', () => {
    const { totalItems, ...args } = clientes.pagination;

    it('test getClientesPagination query success', async () => {
      cboRequests(mockAdapter);
      clientePaginationRequests(mockAdapter);

      const clientesPagination = new Pagination({
        pagination: clientes.pagination,
        items: clientes.items.map((cliente) => {
          const { cboId, ...client } = new Cliente(cliente);
          return { ...client, cbo: new Cbo(cbo) };
        }),
      });

      const response = await gqlTestRequest(BUSCA_CLIENTES, {
        variables: { pagination: args, keyword: faker.random.word() },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.clientes.items).toEqual(clientesPagination.items);
      expect(response.data.clientes.pageInfo).toEqual(
        clientesPagination.pageInfo,
      );
    });

    it('test getClientesPagination query error', async () => {
      clientePaginationRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(BUSCA_CLIENTES, {
          variables: { pagination: args, keyword: faker.random.word() },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
      );

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

  describe('getClienteById', () => {
    it('test getClienteById query success', async () => {
      cboRequests(mockAdapter);
      clienteRequests(mockAdapter);

      const clienteMock = (cliente: ClienteModel, cbo: Cbo) => {
        const { cboId, ...client } = new Cliente(cliente);
        return { ...client, cbo: new Cbo(cbo) };
      };
      const response = await gqlTestRequest(BUSCA_CLIENTE, {
        variables: { id: Cliente.toGlobalId(id) },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.cliente).toEqual(clienteMock(cliente, cbo));
    });

    it('test getClienteById query error', async () => {
      clienteRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(BUSCA_CLIENTE, {
          variables: { id: Cliente.toGlobalId(id) },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
      );

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
      );

      const [error404] = (await response()).errors || [];
      expect(error404?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_NOT_FOUND,
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

  describe('getTitulosByClienteId', () => {
    it('test getTitulosByClienteId query success', async () => {
      titulosRequests(mockAdapter);

      const titulosPagination = new Pagination({
        pagination: titulos.pagination,
        items: titulos.items.map((titulo) => new Titulo(titulo)),
      });

      const response = await gqlTestRequest(BUSCA_CLIENTES_TITULOS, {
        variables: { clienteId: Cliente.toGlobalId(id) },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(
        response.data.titulos.items.map(
          (item: PaginationItem<Titulo>) => item.node,
        ),
      ).toEqual(titulosPagination.items.map((item) => item.node));
    });

    it('test getTitulosByClienteId query error', async () => {
      titulosRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(BUSCA_CLIENTES_TITULOS, {
          variables: { clienteId: Cliente.toGlobalId(id) },
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

  describe('postTituloByClienteId', () => {
    it('test postTituloByClienteId query success', async () => {
      tituloPostRequests(mockAdapter);

      const response = await gqlTestRequest(POST_TITULO, {
        variables: {
          input: {
            ...tituloInputPost,
            id: Cliente.toGlobalId(id),
          },
        },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.tituloPost.id).toEqual(Titulo.toGlobalId(id));
    });

    it('test postTituloByClienteId query error', async () => {
      tituloPostRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(POST_TITULO, {
          variables: {
            input: {
              ...tituloInputPost,
              id: Cliente.toGlobalId(id),
            },
          },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
      );

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

  describe('patchClienteById', () => {
    it('test patchClienteById mutation success', async () => {
      cboRequests(mockAdapter);
      clienteRequests(mockAdapter);
      clientePatchRequests(mockAdapter);

      const clienteMock = (cliente: ClienteModel, cbo: Cbo) => {
        const { cboId, ...client } = new Cliente(cliente);
        return { ...client, cbo: new Cbo(cbo) };
      };

      const response = await gqlTestRequest(PATCH_CLIENTE, {
        variables: {
          input: {
            ...clientePatchAdapter,
            id: Cliente.toGlobalId(String(cliente.id)),
            cboId: clientePatchAdapter.cboId
              ? Cbo.toGlobalId(String(clientePatchAdapter.cboId))
              : null,
          },
        },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.clientePatch.cliente).toEqual(
        clienteMock(cliente, cbo),
      );
    });

    it('test patchClienteById mutation error', async () => {
      clientePatchRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(PATCH_CLIENTE, {
          variables: {
            input: {
              ...clientePatchAdapter,
              id: Cliente.toGlobalId(String(cliente.id)),
              cboId: clientePatchAdapter.cboId
                ? Cbo.toGlobalId(String(clientePatchAdapter.cboId))
                : null,
            },
          },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
      );

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

  describe('postCliente', () => {
    it('test postCliente query success', async () => {
      clientePostRequests(mockAdapter);

      const response = await gqlTestRequest(POST_CLIENTE, {
        variables: { input: clienteInputPostAdapterMock },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.clientePost.id).toEqual(Cliente.toGlobalId(id));
    });

    it('test postCliente query error', async () => {
      clientePostRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(POST_CLIENTE, {
          variables: { input: clienteInputPostAdapterMock },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
      );

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
      );

      const [error406] = (await response()).errors || [];
      expect(error406?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_DOCUMENT,
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

  describe('postClienteContatoEndereco', () => {
    it('test postClienteContatoEndereco mutation success', async () => {
      clienteContatoEnderecoPostRequests(mockAdapter);

      const enderecoMock = (contatoEndereco: ContatoEnderecoModel) => {
        return new ContatoEndereco(contatoEndereco);
      };

      const response = await gqlTestRequest(POST_CLIENTE_CONTATO_ENDERECO, {
        variables: {
          input: {
            ...clienteContatoEnderecoAdapter,
            id: Cliente.toGlobalId(String(cliente.id)),
          },
        },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.clienteContatoEnderecoPost).toEqual(
        enderecoMock(enderecoPost),
      );
    });

    it('test postClienteContatoEndereco mutation error', async () => {
      clienteContatoEnderecoPostRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(POST_CLIENTE_CONTATO_ENDERECO, {
          variables: {
            input: {
              ...clienteContatoEnderecoAdapter,
              id: Cliente.toGlobalId(String(cliente.id)),
            },
          },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
      );

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

  describe('postClienteContatoEmail', () => {
    it('test postClienteContatoEmail mutation success', async () => {
      clienteContatoEmailPostRequests(mockAdapter);

      const response = await gqlTestRequest(POST_CLIENTE_CONTATO_EMAIL, {
        variables: {
          input: {
            ...clienteContatoEmailAdapter,
            id: Cliente.toGlobalId(String(cliente.id)),
          },
        },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.clienteContatoEmailPost).toEqual(
        emailMock(emailPost),
      );
    });

    it('test postClienteContatoEmail mutation error', async () => {
      clienteContatoEmailPostRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(POST_CLIENTE_CONTATO_EMAIL, {
          variables: {
            input: {
              ...clienteContatoEmailAdapter,
              id: Cliente.toGlobalId(String(cliente.id)),
            },
          },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
      );

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
});
