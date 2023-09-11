import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import createHttpError from 'http-errors';
import { tituloApiGateway } from '../tituloApiGateway';
import { getCbos, getCbo, TITULO_CBO_ERRORS } from './cboGateway';
import {
  id,
  cboRequests,
  cbo,
  cboPaginationRequests,
  cbos,
  paginationInput,
} from './cboGateway.mock';

describe('cboGateway', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('getCbos', () => {
    it('test getCbos request success', async () => {
      cboPaginationRequests(mockAdapter);

      await expect(getCbos(paginationInput, 'teste')).resolves.toEqual(cbos);
    });

    it('test getCbos request error', async () => {
      cboPaginationRequests(mockAdapter, true);

      await expect(getCbos(paginationInput, 'teste')).rejects.toEqual(
        createHttpError(401, TITULO_CBO_ERRORS.UNAUTHORIZED),
      );

      await expect(getCbos(paginationInput, 'teste')).rejects.toEqual(
        createHttpError(403, TITULO_CBO_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(getCbos(paginationInput, 'teste')).rejects.toEqual(
        createHttpError(500, TITULO_CBO_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(getCbos(paginationInput, 'teste')).rejects.toEqual(
        createHttpError(503, TITULO_CBO_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });

  describe('getCbo', () => {
    it('test getCbo request success', async () => {
      cboRequests(mockAdapter);

      await expect(getCbo(id)).resolves.toEqual(cbo);
    });

    it('test getCbo request error', async () => {
      cboRequests(mockAdapter, true);

      await expect(getCbo(id)).rejects.toEqual(
        createHttpError(401, TITULO_CBO_ERRORS.UNAUTHORIZED),
      );

      await expect(getCbo(id)).rejects.toEqual(
        createHttpError(403, TITULO_CBO_ERRORS.INVALID_CREDENTIALS),
      );

      await expect(getCbo(id)).rejects.toEqual(
        createHttpError(404, TITULO_CBO_ERRORS.NOT_FOUND),
      );

      await expect(getCbo(id)).rejects.toEqual(
        createHttpError(500, TITULO_CBO_ERRORS.SOMETHING_WENT_WRONG),
      );

      await expect(getCbo(id)).rejects.toEqual(
        createHttpError(503, TITULO_CBO_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });
});
