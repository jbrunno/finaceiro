import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { GraphQLError } from 'graphql';
import { tituloApiGateway } from '@/gateway';
import { Pais } from '@/domain/titulo/paises/paisDomain';
import {
  PAISES_ERROR_MESSAGES,
  getPaisById,
  getPaisesList,
} from './paisesAdapter';
import {
  paisesGetRequests,
  paises,
  paisRequests,
  id,
  pais,
} from './paisesAdapter.mock';

describe('cboAdapter', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('getPaisesList', () => {
    it('test getPaisesList adapter success', async () => {
      paisesGetRequests(mockAdapter);

      await expect(getPaisesList()).resolves.toEqual(
        paises.items.map((pais) => new Pais(pais)),
      );
    });

    it('test getPaisesList adapter error', async () => {
      paisesGetRequests(mockAdapter, true);

      await expect(getPaisesList()).rejects.toEqual(
        new GraphQLError(
          PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(getPaisesList()).rejects.toEqual(
        new GraphQLError(
          PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(getPaisesList()).rejects.toEqual(
        new GraphQLError(
          PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(getPaisesList()).rejects.toEqual(
        new GraphQLError(
          PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('getPaisById', () => {
    it('test getPaisById adapter success', async () => {
      paisRequests(mockAdapter);

      await expect(getPaisById(id)).resolves.toEqual(new Pais(pais));
    });

    it('test getPaisById adapter error', async () => {
      paisRequests(mockAdapter, true);

      await expect(getPaisById(id)).rejects.toEqual(
        new GraphQLError(
          PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(getPaisById(id)).rejects.toEqual(
        new GraphQLError(
          PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(getPaisById(id)).rejects.toEqual(
        new GraphQLError(PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_NOT_FOUND),
      );

      await expect(getPaisById(id)).rejects.toEqual(
        new GraphQLError(
          PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(getPaisById(id)).rejects.toEqual(
        new GraphQLError(
          PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });
});
