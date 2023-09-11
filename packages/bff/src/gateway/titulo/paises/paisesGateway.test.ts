import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import createHttpError from 'http-errors';
import { tituloApiGateway } from '../tituloApiGateway';
import { getPais, getPaises, TITULO_PAISES_ERRORS } from './paisesGateway';
import {
  paisesGetRequests,
  paises,
  id,
  paisRequests,
  pais,
} from './paisesGateway.mock';

describe('paisesGateway', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('getPaises', () => {
    it('test getPaises request success', async () => {
      paisesGetRequests(mockAdapter);

      await expect(getPaises()).resolves.toEqual(paises);
    });

    it('test getPaises request error', async () => {
      paisesGetRequests(mockAdapter, true);

      await expect(getPaises()).rejects.toEqual(
        createHttpError(401, TITULO_PAISES_ERRORS.UNAUTHORIZED),
      );

      await expect(getPaises()).rejects.toEqual(
        createHttpError(403, TITULO_PAISES_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(getPaises()).rejects.toEqual(
        createHttpError(500, TITULO_PAISES_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(getPaises()).rejects.toEqual(
        createHttpError(503, TITULO_PAISES_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('getPais', () => {
    it('test getPais request success', async () => {
      paisRequests(mockAdapter);

      await expect(getPais(id)).resolves.toEqual(pais);
    });

    it('test getPais request error', async () => {
      paisRequests(mockAdapter, true);

      await expect(getPais(id)).rejects.toEqual(
        createHttpError(401, TITULO_PAISES_ERRORS.UNAUTHORIZED),
      );

      await expect(getPais(id)).rejects.toEqual(
        createHttpError(403, TITULO_PAISES_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(getPais(id)).rejects.toEqual(
        createHttpError(404, TITULO_PAISES_ERRORS.NOT_FOUND),
      );

      await expect(getPais(id)).rejects.toEqual(
        createHttpError(500, TITULO_PAISES_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(getPais(id)).rejects.toEqual(
        createHttpError(503, TITULO_PAISES_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });
});
