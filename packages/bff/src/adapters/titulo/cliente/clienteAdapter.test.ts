import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { GraphQLError } from 'graphql';
import { Cliente } from '@/domain/titulo/cliente/clienteDomain';
import { ContatoEmail } from '@/domain/titulo/contato/contatoEmailDomain';
import { ContatoEndereco } from '@/domain/titulo/contato/contatoEnderecoDomain';
import { ContatoTelefone } from '@/domain/titulo/contato/contatoTelefoneDomain';
import { Titulo } from '@/domain/titulo/titulo/tituloDomain';
import { tituloApiGateway } from '@/gateway';
import {
  getClienteById,
  getClientesPagination,
  CLIENTE_ERROR_MESSAGES,
  patchClienteById,
  getContatoTelefonePagination,
  getContatoEmailPagination,
  getContatoEnderecoPagination,
  postContatoEnderecoByClienteId,
  postContatoEmailByClienteId,
  postContatoTelefoneByClienteId,
  postCliente,
  getTitulosByClienteId,
  postTituloByClienteId,
} from './clienteAdapter';
import {
  id,
  clienteRequests,
  clientePaginationRequests,
  clientes,
  cliente,
  paginationInput,
  clientePatchRequests,
  clientePatchAdapter,
  clienteContatoTelefonePaginationRequests,
  telefones,
  clienteContatoEmailPaginationRequests,
  emails,
  clienteContatoEnderecoPaginationRequests,
  enderecos,
  clienteContatoEnderecoPostRequests,
  clienteContatoEnderecoAdapter,
  clienteContatoEmailPostRequests,
  clienteContatoEmailAdapter,
  clienteContatoTelefoneInputAdapter,
  clienteContatoTelefonePostRequests,
  telefonePostMock,
  clientePostRequests,
  clienteInputPostAdapterMock,
  titulosRequests,
  titulos,
  tituloPostRequests,
  tituloInputPost,
} from './clienteAdapter.mock';

describe('clienteAdapter', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('clientes', () => {
    it('test getClientesPagination adapter success', async () => {
      clientePaginationRequests(mockAdapter);

      await expect(
        getClientesPagination('teste', paginationInput),
      ).resolves.toEqual({
        ...clientes,
        items: clientes.items.map((cliente) => new Cliente(cliente)),
      });
    });

    it('test getClientesPagination adapter error', async () => {
      clientePaginationRequests(mockAdapter, true);

      await expect(
        getClientesPagination('teste', paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
        ),
      );

      await expect(
        getClientesPagination('teste', paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(
        getClientesPagination('teste', paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(
        getClientesPagination('teste', paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(
        getClientesPagination('teste', paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('postCliente', () => {
    it('test postCliente adapter success', async () => {
      clientePostRequests(mockAdapter);

      await expect(postCliente(clienteInputPostAdapterMock)).resolves.toEqual({
        id: Cliente.toGlobalId(id),
      });
    });

    it('test postCliente adapter error', async () => {
      clientePostRequests(mockAdapter, true);

      await expect(postCliente(clienteInputPostAdapterMock)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
        ),
      );

      await expect(postCliente(clienteInputPostAdapterMock)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(postCliente(clienteInputPostAdapterMock)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(postCliente(clienteInputPostAdapterMock)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_DOCUMENT,
        ),
      );

      await expect(postCliente(clienteInputPostAdapterMock)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(postCliente(clienteInputPostAdapterMock)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('getClienteById', () => {
    it('test getClienteById adapter success', async () => {
      clienteRequests(mockAdapter);

      await expect(getClienteById(id)).resolves.toEqual(new Cliente(cliente));
    });

    it('test getClienteById adapter error', async () => {
      clienteRequests(mockAdapter, true);

      await expect(getClienteById(id)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
        ),
      );

      await expect(getClienteById(id)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(getClienteById(id)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(getClienteById(id)).rejects.toEqual(
        new GraphQLError(CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_NOT_FOUND),
      );

      await expect(getClienteById(id)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(getClienteById(id)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('getTitulosByClienteId', () => {
    it('test getTitulosByClienteId adapter success', async () => {
      titulosRequests(mockAdapter);

      await expect(getTitulosByClienteId(id)).resolves.toEqual({
        ...titulos,
        items: titulos.items.map((titulo) => new Titulo(titulo)),
      });
    });

    it('test getTitulosByClienteId adapter error', async () => {
      titulosRequests(mockAdapter, true);

      await expect(getTitulosByClienteId(id)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(getTitulosByClienteId(id)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(getTitulosByClienteId(id)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(getTitulosByClienteId(id)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('postTituloByClienteId', () => {
    it('test postTituloByClienteId adapter success', async () => {
      tituloPostRequests(mockAdapter);

      await expect(postTituloByClienteId(id, tituloInputPost)).resolves.toEqual(
        {
          id: Titulo.toGlobalId(id),
        },
      );
    });

    it('test postTituloByClienteId adapter error', async () => {
      tituloPostRequests(mockAdapter, true);

      await expect(postTituloByClienteId(id, tituloInputPost)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
        ),
      );

      await expect(postTituloByClienteId(id, tituloInputPost)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(postTituloByClienteId(id, tituloInputPost)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(postTituloByClienteId(id, tituloInputPost)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(postTituloByClienteId(id, tituloInputPost)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('patchClienteById', () => {
    it('test patchClienteById adapter success', async () => {
      clientePatchRequests(mockAdapter);

      await expect(patchClienteById(id, clientePatchAdapter)).resolves.toEqual({
        id: Cliente.toGlobalId(id),
      });
    });

    it('test patchClienteById adapter error', async () => {
      clientePatchRequests(mockAdapter, true);

      await expect(patchClienteById(id, clientePatchAdapter)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
        ),
      );

      await expect(patchClienteById(id, clientePatchAdapter)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(patchClienteById(id, clientePatchAdapter)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(patchClienteById(id, clientePatchAdapter)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(patchClienteById(id, clientePatchAdapter)).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('getClientesContatosTelefones', () => {
    it('test getContatoTelefonePagination adapter success', async () => {
      clienteContatoTelefonePaginationRequests(mockAdapter);

      await expect(
        getContatoTelefonePagination(id, paginationInput),
      ).resolves.toEqual({
        ...telefones,
        items: telefones.items.map((telefone) => new ContatoTelefone(telefone)),
      });
    });

    it('test getContatoTelefonePagination adapter error', async () => {
      clienteContatoTelefonePaginationRequests(mockAdapter, true);

      await expect(
        getContatoTelefonePagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(
        getContatoTelefonePagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(
        getContatoTelefonePagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(
        getContatoTelefonePagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('getClientesContatosEmails', () => {
    it('test getContatoEmailPagination adapter success', async () => {
      clienteContatoEmailPaginationRequests(mockAdapter);

      await expect(
        getContatoEmailPagination(id, paginationInput),
      ).resolves.toEqual({
        ...emails,
        items: emails.items.map((email) => new ContatoEmail(email)),
      });
    });

    it('test getContatoEmailPagination adapter error', async () => {
      clienteContatoEmailPaginationRequests(mockAdapter, true);

      await expect(
        getContatoEmailPagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(
        getContatoEmailPagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(
        getContatoEmailPagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(
        getContatoEmailPagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('getClientesContatosEnderecos', () => {
    it('test getContatoEnderecoPagination adapter success', async () => {
      clienteContatoEnderecoPaginationRequests(mockAdapter);

      await expect(
        getContatoEnderecoPagination(id, paginationInput),
      ).resolves.toEqual({
        ...enderecos,
        items: enderecos.items.map((endereco) => new ContatoEndereco(endereco)),
      });
    });

    it('test getContatoEnderecoPagination adapter error', async () => {
      clienteContatoEnderecoPaginationRequests(mockAdapter, true);

      await expect(
        getContatoEnderecoPagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(
        getContatoEnderecoPagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(
        getContatoEnderecoPagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(
        getContatoEnderecoPagination(id, paginationInput),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('postClienteContatoEndereco', () => {
    it('test postClienteContatoEndereco adapter success', async () => {
      clienteContatoEnderecoPostRequests(mockAdapter);

      await expect(
        postContatoEnderecoByClienteId(id, clienteContatoEnderecoAdapter),
      ).resolves.toEqual({
        id: ContatoEndereco.toGlobalId(clienteContatoEnderecoAdapter.id),
      });
    });

    it('test postClienteContatoEndereco adapter error', async () => {
      clienteContatoEnderecoPostRequests(mockAdapter, true);

      await expect(
        postContatoEnderecoByClienteId(id, clienteContatoEnderecoAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
        ),
      );

      await expect(
        postContatoEnderecoByClienteId(id, clienteContatoEnderecoAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(
        postContatoEnderecoByClienteId(id, clienteContatoEnderecoAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(
        postContatoEnderecoByClienteId(id, clienteContatoEnderecoAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(
        postContatoEnderecoByClienteId(id, clienteContatoEnderecoAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('postClienteContatoEmail', () => {
    it('test postClienteContatoEmail adapter success', async () => {
      clienteContatoEmailPostRequests(mockAdapter);

      await expect(
        postContatoEmailByClienteId(id, clienteContatoEmailAdapter),
      ).resolves.toEqual({
        id: ContatoEmail.toGlobalId(clienteContatoEmailAdapter.id),
      });
    });

    it('test postClienteContatoEmail adapter error', async () => {
      clienteContatoEmailPostRequests(mockAdapter, true);

      await expect(
        postContatoEmailByClienteId(id, clienteContatoEmailAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
        ),
      );

      await expect(
        postContatoEmailByClienteId(id, clienteContatoEmailAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(
        postContatoEmailByClienteId(id, clienteContatoEmailAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(
        postContatoEmailByClienteId(id, clienteContatoEmailAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(
        postContatoEmailByClienteId(id, clienteContatoEmailAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('postClienteContatoTelefone', () => {
    it('test postClienteContatoTelefone adapter success', async () => {
      clienteContatoTelefonePostRequests(mockAdapter);

      await expect(
        postContatoTelefoneByClienteId(id, clienteContatoTelefoneInputAdapter),
      ).resolves.toEqual(new ContatoTelefone(telefonePostMock));
    });

    it('test postClienteContatoTelefone adapter error', async () => {
      clienteContatoTelefonePostRequests(mockAdapter, true);

      await expect(
        postContatoTelefoneByClienteId(id, clienteContatoTelefoneInputAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_BAD_REQUEST,
        ),
      );

      await expect(
        postContatoTelefoneByClienteId(id, clienteContatoTelefoneInputAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(
        postContatoTelefoneByClienteId(id, clienteContatoTelefoneInputAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(
        postContatoTelefoneByClienteId(id, clienteContatoTelefoneInputAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(
        postContatoTelefoneByClienteId(id, clienteContatoTelefoneInputAdapter),
      ).rejects.toEqual(
        new GraphQLError(
          CLIENTE_ERROR_MESSAGES.TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });
});
