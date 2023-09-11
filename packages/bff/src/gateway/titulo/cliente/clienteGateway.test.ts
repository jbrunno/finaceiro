import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import createHttpError from 'http-errors';
import { tituloApiGateway } from '../tituloApiGateway';
import {
  getCliente,
  getClientes,
  getTitulos,
  getClientesContatosEmails,
  getClientesContatosEnderecos,
  getClientesContatosTelefones,
  patchCliente,
  postClientes,
  postContatoEmail,
  postContatoEndereco,
  postContatoTelefone,
  TITULO_CLIENTE_ERRORS,
  postTitulo,
} from './clienteGateway';
import {
  id,
  cliente,
  clientePaginationRequests,
  clienteRequests,
  clientes,
  paginationInput,
  clientePatchRequests,
  clientePatch,
  clienteContatoTelefonePaginationRequests,
  telefones,
  clienteContatoEmailPaginationRequests,
  emails,
  clienteContatoEnderecoPaginationRequests,
  enderecos,
  clienteContatoEnderecoPostRequests,
  enderecoPost,
  clienteContatoEmailPostRequests,
  emailPost,
  clienteContatoTelefonePostRequests,
  telefonePostMock,
  telefoneInputPostMock,
  clientePostRequests,
  clienteInputPostMock,
  titulosRequests,
  titulos,
  tituloPostRequests,
  tituloInputPost,
} from './clienteGateway.mock';

describe('clienteGateway', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('postCliente', () => {
    it('test postCliente request success', async () => {
      clientePostRequests(mockAdapter);

      await expect(postClientes(clienteInputPostMock)).resolves.toEqual({ id });
    });

    it('test postCliente request error', async () => {
      clientePostRequests(mockAdapter, true);

      await expect(postClientes(clienteInputPostMock)).rejects.toEqual(
        createHttpError(400, TITULO_CLIENTE_ERRORS.BAD_REQUEST),
      );

      await expect(postClientes(clienteInputPostMock)).rejects.toEqual(
        createHttpError(401, TITULO_CLIENTE_ERRORS.UNAUTHORIZED),
      );

      await expect(postClientes(clienteInputPostMock)).rejects.toEqual(
        createHttpError(403, TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(postClientes(clienteInputPostMock)).rejects.toEqual(
        createHttpError(406, TITULO_CLIENTE_ERRORS.INVALID_DOCUMENT),
      );

      await expect(postClientes(clienteInputPostMock)).rejects.toEqual(
        createHttpError(500, TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(postClientes(clienteInputPostMock)).rejects.toEqual(
        createHttpError(503, TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('getClientes', () => {
    it('test getClientes request success', async () => {
      clientePaginationRequests(mockAdapter);

      await expect(getClientes('teste', paginationInput)).resolves.toEqual(
        clientes,
      );
    });

    it('test getClientes request error', async () => {
      clientePaginationRequests(mockAdapter, true);

      await expect(getClientes('teste', paginationInput)).rejects.toEqual(
        createHttpError(400, TITULO_CLIENTE_ERRORS.BAD_REQUEST),
      );

      await expect(getClientes('teste', paginationInput)).rejects.toEqual(
        createHttpError(401, TITULO_CLIENTE_ERRORS.UNAUTHORIZED),
      );

      await expect(getClientes('teste', paginationInput)).rejects.toEqual(
        createHttpError(403, TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(getClientes('teste', paginationInput)).rejects.toEqual(
        createHttpError(500, TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(getClientes('teste', paginationInput)).rejects.toEqual(
        createHttpError(503, TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('getCliente', () => {
    it('test getCliente request success', async () => {
      clienteRequests(mockAdapter);

      await expect(getCliente(id)).resolves.toEqual(cliente);
    });

    it('test getCliente request error', async () => {
      clienteRequests(mockAdapter, true);

      await expect(getCliente(id)).rejects.toEqual(
        createHttpError(400, TITULO_CLIENTE_ERRORS.BAD_REQUEST),
      );

      await expect(getCliente(id)).rejects.toEqual(
        createHttpError(401, TITULO_CLIENTE_ERRORS.UNAUTHORIZED),
      );

      await expect(getCliente(id)).rejects.toEqual(
        createHttpError(403, TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(getCliente(id)).rejects.toEqual(
        createHttpError(404, TITULO_CLIENTE_ERRORS.NOT_FOUND),
      );

      await expect(getCliente(id)).rejects.toEqual(
        createHttpError(500, TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(getCliente(id)).rejects.toEqual(
        createHttpError(503, TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('getTitulos', () => {
    it('test getTitulos request success', async () => {
      titulosRequests(mockAdapter);

      await expect(getTitulos(id)).resolves.toEqual(titulos);
    });

    it('test getTitulos request error', async () => {
      titulosRequests(mockAdapter, true);

      await expect(getTitulos(id)).rejects.toEqual(
        createHttpError(401, TITULO_CLIENTE_ERRORS.UNAUTHORIZED),
      );

      await expect(getTitulos(id)).rejects.toEqual(
        createHttpError(403, TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(getTitulos(id)).rejects.toEqual(
        createHttpError(500, TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(getTitulos(id)).rejects.toEqual(
        createHttpError(503, TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('postTitulo', () => {
    it('test postTitulo request success', async () => {
      tituloPostRequests(mockAdapter);

      await expect(postTitulo(id, tituloInputPost)).resolves.toEqual({ id });
    });

    it('test postTitulo request error', async () => {
      tituloPostRequests(mockAdapter, true);

      await expect(postTitulo(id, tituloInputPost)).rejects.toEqual(
        createHttpError(400, TITULO_CLIENTE_ERRORS.BAD_REQUEST),
      );

      await expect(postTitulo(id, tituloInputPost)).rejects.toEqual(
        createHttpError(401, TITULO_CLIENTE_ERRORS.UNAUTHORIZED),
      );

      await expect(postTitulo(id, tituloInputPost)).rejects.toEqual(
        createHttpError(403, TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(postTitulo(id, tituloInputPost)).rejects.toEqual(
        createHttpError(500, TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(postTitulo(id, tituloInputPost)).rejects.toEqual(
        createHttpError(503, TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('patchCliente', () => {
    it('test patchCliente request success', async () => {
      clientePatchRequests(mockAdapter);

      await expect(patchCliente(id, clientePatch)).resolves.toEqual({ id });
    });

    it('test patchCliente request error', async () => {
      clientePatchRequests(mockAdapter, true);

      await expect(patchCliente(id, clientePatch)).rejects.toEqual(
        createHttpError(400, TITULO_CLIENTE_ERRORS.BAD_REQUEST),
      );

      await expect(patchCliente(id, clientePatch)).rejects.toEqual(
        createHttpError(401, TITULO_CLIENTE_ERRORS.UNAUTHORIZED),
      );

      await expect(patchCliente(id, clientePatch)).rejects.toEqual(
        createHttpError(403, TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(patchCliente(id, clientePatch)).rejects.toEqual(
        createHttpError(500, TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(patchCliente(id, clientePatch)).rejects.toEqual(
        createHttpError(503, TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('getClientesContatosTelefones', () => {
    it('test getClientesContatosTelefones request success', async () => {
      clienteContatoTelefonePaginationRequests(mockAdapter);

      await expect(
        getClientesContatosTelefones(id, paginationInput),
      ).resolves.toEqual(telefones);
    });

    it('test getClientesContatosTelefones request error', async () => {
      clienteContatoTelefonePaginationRequests(mockAdapter, true);

      await expect(
        getClientesContatosTelefones(id, paginationInput),
      ).rejects.toEqual(
        createHttpError(401, TITULO_CLIENTE_ERRORS.UNAUTHORIZED),
      );

      await expect(
        getClientesContatosTelefones(id, paginationInput),
      ).rejects.toEqual(
        createHttpError(403, TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(
        getClientesContatosTelefones(id, paginationInput),
      ).rejects.toEqual(
        createHttpError(500, TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(
        getClientesContatosTelefones(id, paginationInput),
      ).rejects.toEqual(
        createHttpError(503, TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('getClientesContatosEmails', () => {
    it('test getClientesContatosEmails request success', async () => {
      clienteContatoEmailPaginationRequests(mockAdapter);

      await expect(
        getClientesContatosEmails(id, paginationInput),
      ).resolves.toEqual(emails);
    });

    it('test getClientesContatosEmails request error', async () => {
      clienteContatoEmailPaginationRequests(mockAdapter, true);

      await expect(
        getClientesContatosEmails(id, paginationInput),
      ).rejects.toEqual(
        createHttpError(401, TITULO_CLIENTE_ERRORS.UNAUTHORIZED),
      );

      await expect(
        getClientesContatosEmails(id, paginationInput),
      ).rejects.toEqual(
        createHttpError(403, TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(
        getClientesContatosEmails(id, paginationInput),
      ).rejects.toEqual(
        createHttpError(500, TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(
        getClientesContatosEmails(id, paginationInput),
      ).rejects.toEqual(
        createHttpError(503, TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('getClientesContatosEnderecos', () => {
    it('test getClientesContatosEnderecos request success', async () => {
      clienteContatoEnderecoPaginationRequests(mockAdapter);

      await expect(
        getClientesContatosEnderecos(id, paginationInput),
      ).resolves.toEqual(enderecos);
    });

    it('test getClientesContatosEnderecos request error', async () => {
      clienteContatoEnderecoPaginationRequests(mockAdapter, true);

      await expect(
        getClientesContatosEnderecos(id, paginationInput),
      ).rejects.toEqual(
        createHttpError(401, TITULO_CLIENTE_ERRORS.UNAUTHORIZED),
      );

      await expect(
        getClientesContatosEnderecos(id, paginationInput),
      ).rejects.toEqual(
        createHttpError(403, TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(
        getClientesContatosEnderecos(id, paginationInput),
      ).rejects.toEqual(
        createHttpError(500, TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(
        getClientesContatosEnderecos(id, paginationInput),
      ).rejects.toEqual(
        createHttpError(503, TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('postClienteContatoEndereco', () => {
    it('test postClienteContatoEndereco request success', async () => {
      clienteContatoEnderecoPostRequests(mockAdapter);

      await expect(postContatoEndereco(id, enderecoPost)).resolves.toEqual(
        enderecoPost,
      );
    });

    it('test postClienteContatoEndereco request error', async () => {
      clienteContatoEnderecoPostRequests(mockAdapter, true);

      await expect(postContatoEndereco(id, enderecoPost)).rejects.toEqual(
        createHttpError(400, TITULO_CLIENTE_ERRORS.BAD_REQUEST),
      );

      await expect(postContatoEndereco(id, enderecoPost)).rejects.toEqual(
        createHttpError(401, TITULO_CLIENTE_ERRORS.UNAUTHORIZED),
      );

      await expect(postContatoEndereco(id, enderecoPost)).rejects.toEqual(
        createHttpError(403, TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(postContatoEndereco(id, enderecoPost)).rejects.toEqual(
        createHttpError(500, TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(postContatoEndereco(id, enderecoPost)).rejects.toEqual(
        createHttpError(503, TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('postClienteContatoEmail', () => {
    it('test postClienteContatoEmail request success', async () => {
      clienteContatoEmailPostRequests(mockAdapter);

      await expect(postContatoEmail(id, emailPost)).resolves.toEqual(emailPost);
    });

    it('test postClienteContatoEndereco request error', async () => {
      clienteContatoEmailPostRequests(mockAdapter, true);

      await expect(postContatoEmail(id, emailPost)).rejects.toEqual(
        createHttpError(400, TITULO_CLIENTE_ERRORS.BAD_REQUEST),
      );

      await expect(postContatoEmail(id, emailPost)).rejects.toEqual(
        createHttpError(401, TITULO_CLIENTE_ERRORS.UNAUTHORIZED),
      );

      await expect(postContatoEmail(id, emailPost)).rejects.toEqual(
        createHttpError(403, TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(postContatoEmail(id, emailPost)).rejects.toEqual(
        createHttpError(500, TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(postContatoEmail(id, emailPost)).rejects.toEqual(
        createHttpError(503, TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('postClienteContatoTelefone', () => {
    it('test postClienteContatoTelefone request success', async () => {
      clienteContatoTelefonePostRequests(mockAdapter);

      await expect(
        postContatoTelefone(id, telefoneInputPostMock),
      ).resolves.toEqual(telefonePostMock);
    });

    it('test postClienteContatoTelefone request error', async () => {
      clienteContatoTelefonePostRequests(mockAdapter, true);

      await expect(
        postContatoTelefone(id, telefoneInputPostMock),
      ).rejects.toEqual(
        createHttpError(400, TITULO_CLIENTE_ERRORS.BAD_REQUEST),
      );

      await expect(
        postContatoTelefone(id, telefoneInputPostMock),
      ).rejects.toEqual(
        createHttpError(401, TITULO_CLIENTE_ERRORS.UNAUTHORIZED),
      );

      await expect(
        postContatoTelefone(id, telefoneInputPostMock),
      ).rejects.toEqual(
        createHttpError(403, TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(
        postContatoTelefone(id, telefoneInputPostMock),
      ).rejects.toEqual(
        createHttpError(500, TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(
        postContatoTelefone(id, telefoneInputPostMock),
      ).rejects.toEqual(
        createHttpError(503, TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });
});
