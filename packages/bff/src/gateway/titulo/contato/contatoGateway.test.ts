import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import createHttpError from 'http-errors';
import { tituloApiGateway } from '../tituloApiGateway';
import {
  getContatoEndereco,
  getContatoTelefone,
  patchContatoEmail,
  patchContatoEndereco,
  patchContatoTelefone,
  TITULO_CONTATO_ERRORS,
} from './contatoGateway';
import {
  id,
  contatoTelefonePatchRequests,
  contatoTelefonePatch,
  contatoEnderecoPatchRequests,
  contatoEnderecoPatch,
  contatoEmailPatchRequest,
  contatoEmailPatch,
  contatoTelefoneGetRequests,
  contatoTelefoneResponseGetMock,
  contatoEnderecoGetRequests,
  contatoEnderecoResponseGetMock,
} from './contatoGateway.mock';

describe('contatoGateway', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('getContatoTelefone', () => {
    it('test getContatoTelefone request success', async () => {
      contatoTelefoneGetRequests(mockAdapter);

      await expect(getContatoTelefone(id)).resolves.toEqual(
        contatoTelefoneResponseGetMock,
      );
    });

    it('test getContatoTelefone request error', async () => {
      contatoTelefoneGetRequests(mockAdapter, true);

      await expect(getContatoTelefone(id)).rejects.toEqual(
        createHttpError(401, TITULO_CONTATO_ERRORS.UNAUTHORIZED),
      );

      await expect(getContatoTelefone(id)).rejects.toEqual(
        createHttpError(403, TITULO_CONTATO_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(getContatoTelefone(id)).rejects.toEqual(
        createHttpError(404, TITULO_CONTATO_ERRORS.NOT_FOUND),
      );

      await expect(getContatoTelefone(id)).rejects.toEqual(
        createHttpError(500, TITULO_CONTATO_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(getContatoTelefone(id)).rejects.toEqual(
        createHttpError(503, TITULO_CONTATO_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('patchContatoTelefone', () => {
    it('test patchContatoTelefone request success', async () => {
      contatoTelefonePatchRequests(mockAdapter);

      await expect(
        patchContatoTelefone(id, contatoTelefonePatch),
      ).resolves.toEqual({
        contatoId: id,
      });
    });

    it('test patchContatoTelefone request error', async () => {
      contatoTelefonePatchRequests(mockAdapter, true);

      await expect(
        patchContatoTelefone(id, contatoTelefonePatch),
      ).rejects.toEqual(
        createHttpError(400, TITULO_CONTATO_ERRORS.BAD_REQUEST),
      );

      await expect(
        patchContatoTelefone(id, contatoTelefonePatch),
      ).rejects.toEqual(
        createHttpError(401, TITULO_CONTATO_ERRORS.UNAUTHORIZED),
      );

      await expect(
        patchContatoTelefone(id, contatoTelefonePatch),
      ).rejects.toEqual(
        createHttpError(403, TITULO_CONTATO_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(
        patchContatoTelefone(id, contatoTelefonePatch),
      ).rejects.toEqual(
        createHttpError(500, TITULO_CONTATO_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(
        patchContatoTelefone(id, contatoTelefonePatch),
      ).rejects.toEqual(
        createHttpError(503, TITULO_CONTATO_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('getContatoEndereco', () => {
    it('test getContatoEndereco request success', async () => {
      contatoEnderecoGetRequests(mockAdapter);

      await expect(getContatoEndereco(id)).resolves.toEqual(
        contatoEnderecoResponseGetMock,
      );
    });

    it('test getContatoEndereco request error', async () => {
      contatoEnderecoGetRequests(mockAdapter, true);

      await expect(getContatoEndereco(id)).rejects.toEqual(
        createHttpError(401, TITULO_CONTATO_ERRORS.UNAUTHORIZED),
      );

      await expect(getContatoEndereco(id)).rejects.toEqual(
        createHttpError(403, TITULO_CONTATO_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(getContatoEndereco(id)).rejects.toEqual(
        createHttpError(404, TITULO_CONTATO_ERRORS.NOT_FOUND),
      );

      await expect(getContatoEndereco(id)).rejects.toEqual(
        createHttpError(500, TITULO_CONTATO_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(getContatoEndereco(id)).rejects.toEqual(
        createHttpError(503, TITULO_CONTATO_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('patchContatoEndereco', () => {
    it('test patchContatoEndereco request success', async () => {
      contatoEnderecoPatchRequests(mockAdapter);
      await expect(
        patchContatoEndereco(id, contatoEnderecoPatch),
      ).resolves.toEqual({ contatoId: id });
    });

    it('test patchContatoEndereco request error', async () => {
      contatoEnderecoPatchRequests(mockAdapter, true);

      await expect(
        patchContatoEndereco(id, contatoEnderecoPatch),
      ).rejects.toEqual(
        createHttpError(400, TITULO_CONTATO_ERRORS.BAD_REQUEST),
      );

      await expect(
        patchContatoEndereco(id, contatoEnderecoPatch),
      ).rejects.toEqual(
        createHttpError(401, TITULO_CONTATO_ERRORS.UNAUTHORIZED),
      );

      await expect(
        patchContatoEndereco(id, contatoEnderecoPatch),
      ).rejects.toEqual(
        createHttpError(403, TITULO_CONTATO_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(
        patchContatoEndereco(id, contatoEnderecoPatch),
      ).rejects.toEqual(
        createHttpError(500, TITULO_CONTATO_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(
        patchContatoEndereco(id, contatoEnderecoPatch),
      ).rejects.toEqual(
        createHttpError(503, TITULO_CONTATO_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('patchContatoEmail', () => {
    it('test patchContatoEmail request success', async () => {
      contatoEmailPatchRequest(mockAdapter);

      await expect(patchContatoEmail(id, contatoEmailPatch)).resolves.toEqual({
        contatoId: id,
      });
    });

    it('test patchContatoEmail request error', async () => {
      contatoEmailPatchRequest(mockAdapter, true);

      await expect(patchContatoEmail(id, contatoEmailPatch)).rejects.toEqual(
        createHttpError(400, TITULO_CONTATO_ERRORS.BAD_REQUEST),
      );

      await expect(patchContatoEmail(id, contatoEmailPatch)).rejects.toEqual(
        createHttpError(401, TITULO_CONTATO_ERRORS.UNAUTHORIZED),
      );

      await expect(patchContatoEmail(id, contatoEmailPatch)).rejects.toEqual(
        createHttpError(403, TITULO_CONTATO_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(patchContatoEmail(id, contatoEmailPatch)).rejects.toEqual(
        createHttpError(500, TITULO_CONTATO_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(patchContatoEmail(id, contatoEmailPatch)).rejects.toEqual(
        createHttpError(503, TITULO_CONTATO_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });
});
