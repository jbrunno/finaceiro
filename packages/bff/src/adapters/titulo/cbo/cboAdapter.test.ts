import { Cbo } from '@/domain/titulo/cbo/cboDomain';
import { tituloApiGateway } from '@/gateway';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { GraphQLError } from 'graphql';
import {
  getCbosPagination,
  CBO_ERROR_MESSAGES,
  getCboById,
} from './cboAdapter';
import {
  id,
  cboRequests,
  cbo,
  cboPaginationRequests,
  cbos,
  paginationInput,
} from './cboAdapter.mock';

describe('cboAdapter', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('getCbosPagination', () => {
    it('test getCbos adapter success', async () => {
      cboPaginationRequests(mockAdapter);

      await expect(
        getCbosPagination(paginationInput, 'teste'),
      ).resolves.toEqual({
        ...cbos,
        items: cbos.items.map((cbo) => new Cbo(cbo)),
      });
    });

    it('test getCbosPagination adapter error', async () => {
      cboPaginationRequests(mockAdapter, true);

      await expect(getCbosPagination(paginationInput, 'teste')).rejects.toEqual(
        new GraphQLError(CBO_ERROR_MESSAGES.TITULO_CBO_ERROR_UNAUTHORIZED),
      );

      await expect(getCbosPagination(paginationInput, 'teste')).rejects.toEqual(
        new GraphQLError(
          CBO_ERROR_MESSAGES.TITULO_CBO_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(getCbosPagination(paginationInput, 'teste')).rejects.toEqual(
        new GraphQLError(
          CBO_ERROR_MESSAGES.TITULO_CBO_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(getCbosPagination(paginationInput, 'teste')).rejects.toEqual(
        new GraphQLError(
          CBO_ERROR_MESSAGES.TITULO_CBO_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('getCboById', () => {
    it('test getCboById adapter success', async () => {
      cboRequests(mockAdapter);

      await expect(getCboById(id)).resolves.toEqual(new Cbo(cbo));
    });

    it('test getCboById adapter error', async () => {
      cboRequests(mockAdapter, true);

      await expect(getCboById(id)).rejects.toEqual(
        new GraphQLError(CBO_ERROR_MESSAGES.TITULO_CBO_ERROR_UNAUTHORIZED),
      );

      await expect(getCboById(id)).rejects.toEqual(
        new GraphQLError(
          CBO_ERROR_MESSAGES.TITULO_CBO_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(getCboById(id)).rejects.toEqual(
        new GraphQLError(CBO_ERROR_MESSAGES.TITULO_CBO_ERROR_NOT_FOUND),
      );

      await expect(getCboById(id)).rejects.toEqual(
        new GraphQLError(
          CBO_ERROR_MESSAGES.TITULO_CBO_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(getCboById(id)).rejects.toEqual(
        new GraphQLError(
          CBO_ERROR_MESSAGES.TITULO_CBO_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });
});
