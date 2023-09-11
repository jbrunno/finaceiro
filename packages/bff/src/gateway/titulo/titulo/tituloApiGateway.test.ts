import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import createHttpError from 'http-errors';
import { tituloApiGateway } from '../tituloApiGateway';
import {
  assinaturaInputPostMock,
  assinaturaPostRequests,
  id,
  tituloGetRequests,
  tituloInputPatch,
  tituloMock,
  tituloPatchRequests,
  patchAssinaturaRequests,
  editarAssinaturaInput,
} from './tituloApiGateway.mock';
import {
  TITULO_TITULO_ERRORS,
  getTitulo,
  patchTitulo,
  postAssinatura,
  patchAssinatura,
} from './tituloGateway';

describe('tituloGateway', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('getTitulo', () => {
    it('test getTitulo request success', async () => {
      tituloGetRequests(mockAdapter);

      await expect(getTitulo(id)).resolves.toEqual(tituloMock);
    });

    it('test getTitulo request erro', async () => {
      tituloGetRequests(mockAdapter, true);

      await expect(getTitulo(id)).rejects.toEqual(
        createHttpError(400, TITULO_TITULO_ERRORS.BAD_REQUEST),
      );

      await expect(getTitulo(id)).rejects.toEqual(
        createHttpError(401, TITULO_TITULO_ERRORS.UNAUTHORIZED),
      );

      await expect(getTitulo(id)).rejects.toEqual(
        createHttpError(403, TITULO_TITULO_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(getTitulo(id)).rejects.toEqual(
        createHttpError(404, TITULO_TITULO_ERRORS.NOT_FOUND),
      );

      await expect(getTitulo(id)).rejects.toEqual(
        createHttpError(500, TITULO_TITULO_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(getTitulo(id)).rejects.toEqual(
        createHttpError(503, TITULO_TITULO_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('patchTitulo', () => {
    it('test patchTitulo request success', async () => {
      tituloPatchRequests(mockAdapter);

      await expect(patchTitulo(id, tituloInputPatch)).resolves.toEqual({ id });
    });

    it('test patchTitulo request error', async () => {
      tituloPatchRequests(mockAdapter, true);

      await expect(patchTitulo(id, tituloInputPatch)).rejects.toEqual(
        createHttpError(400, TITULO_TITULO_ERRORS.BAD_REQUEST),
      );

      await expect(patchTitulo(id, tituloInputPatch)).rejects.toEqual(
        createHttpError(401, TITULO_TITULO_ERRORS.UNAUTHORIZED),
      );

      await expect(patchTitulo(id, tituloInputPatch)).rejects.toEqual(
        createHttpError(403, TITULO_TITULO_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(patchTitulo(id, tituloInputPatch)).rejects.toEqual(
        createHttpError(500, TITULO_TITULO_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(patchTitulo(id, tituloInputPatch)).rejects.toEqual(
        createHttpError(503, TITULO_TITULO_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('postAssinatura', () => {
    it('postAssinatura request success', async () => {
      assinaturaPostRequests(mockAdapter);

      await expect(
        postAssinatura(id, assinaturaInputPostMock),
      ).resolves.toEqual({ id });
    });

    it('postAssinatura request errors', async () => {
      assinaturaPostRequests(mockAdapter, true);

      await expect(postAssinatura(id, assinaturaInputPostMock)).rejects.toEqual(
        createHttpError(400, TITULO_TITULO_ERRORS.BAD_REQUEST),
      );

      await expect(postAssinatura(id, assinaturaInputPostMock)).rejects.toEqual(
        createHttpError(401, TITULO_TITULO_ERRORS.UNAUTHORIZED),
      );

      await expect(postAssinatura(id, assinaturaInputPostMock)).rejects.toEqual(
        createHttpError(403, TITULO_TITULO_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(postAssinatura(id, assinaturaInputPostMock)).rejects.toEqual(
        createHttpError(500, TITULO_TITULO_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(postAssinatura(id, assinaturaInputPostMock)).rejects.toEqual(
        createHttpError(503, TITULO_TITULO_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('patchAssinatura', () => {
    it('test patchAssinatura request success', async () => {
      patchAssinaturaRequests(mockAdapter);

      await expect(patchAssinatura(id, editarAssinaturaInput)).resolves.toEqual(
        {
          id,
        },
      );
    });

    it('test patchAssinatura request error', async () => {
      patchAssinaturaRequests(mockAdapter, true);

      await expect(patchAssinatura(id, editarAssinaturaInput)).rejects.toEqual(
        createHttpError(400, TITULO_TITULO_ERRORS.BAD_REQUEST),
      );

      await expect(patchAssinatura(id, editarAssinaturaInput)).rejects.toEqual(
        createHttpError(401, TITULO_TITULO_ERRORS.UNAUTHORIZED),
      );

      await expect(patchAssinatura(id, editarAssinaturaInput)).rejects.toEqual(
        createHttpError(403, TITULO_TITULO_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(patchAssinatura(id, editarAssinaturaInput)).rejects.toEqual(
        createHttpError(500, TITULO_TITULO_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(patchAssinatura(id, editarAssinaturaInput)).rejects.toEqual(
        createHttpError(503, TITULO_TITULO_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });
});
