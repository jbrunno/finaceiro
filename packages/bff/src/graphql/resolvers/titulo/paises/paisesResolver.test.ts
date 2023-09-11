import { gqlTestRequest } from '@test-utils/gqlTestRequest';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { tituloApiGateway } from '@/gateway';
import {
  id,
  pais,
  paisRequests,
  paises,
  paisesGetRequests,
} from '@/gateway/titulo/paises/paisesGateway.mock';
import { Pais } from '@/domain/titulo/paises/paisDomain';
import { PAISES_ERROR_MESSAGES } from '@/adapters/titulo/paises/paisesAdapter';
import { PAIS, PAISES, token } from './paisesResolver.mock';

describe('paisResolver', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('paises', () => {
    it('test paises query success', async () => {
      paisesGetRequests(mockAdapter);

      const response = await gqlTestRequest(PAISES, {
        headers: { Authorization: token },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.paises).toEqual(
        paises.items.map((pais) => new Pais(pais)),
      );
    });

    it('test paises query error', async () => {
      paisesGetRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(PAISES, {
          headers: { Authorization: token },
        });

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_INVALID_CREDENTIALS,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });

  describe('pais', () => {
    it('test pais query success', async () => {
      paisRequests(mockAdapter);

      const response = await gqlTestRequest(PAIS, {
        variables: { id: Pais.toGlobalId(id) },
        headers: { Authorization: token },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.pais).toEqual(new Pais(pais));
    });

    it('test pais query error', async () => {
      paisRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(PAIS, {
          variables: { id: Pais.toGlobalId(id) },
          headers: { Authorization: token },
        });

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_INVALID_CREDENTIALS,
      );

      const [error404] = (await response()).errors || [];
      expect(error404?.message).toEqual(
        PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_NOT_FOUND,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        PAISES_ERROR_MESSAGES.TITULO_PAISES_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });
});
