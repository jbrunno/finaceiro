import { Titulo } from '@/domain/titulo/titulo/tituloDomain';
import { tituloApiGateway } from '@/gateway';
import {
  assinaturaInputPostMock,
  assinaturaPostRequests,
  id,
  tituloGetRequests,
  tituloInputPatch,
  tituloMock,
  tituloPatchRequests,
} from '@/gateway/titulo/titulo/tituloApiGateway.mock';
import { gqlTestRequest } from '@test-utils/gqlTestRequest';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { faker } from '@faker-js/faker';
import { TITULO_ERROR_MESSAGES } from '@/adapters/titulo/titulo/tituloAdapter';
import {
  BUSCA_TITULO,
  PATCH_TITULO,
  POST_ASSINAR_TITULO,
  EDITAR_ASSINATURA_TITULO,
  patchAssinaturaRequests,
  editarAssinaturaInput,
} from './tituloResolver.mock';

describe('tituloResolver', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('getTituloById', () => {
    it('test getTituloById query success', async () => {
      tituloGetRequests(mockAdapter);

      const response = await gqlTestRequest(BUSCA_TITULO, {
        variables: { tituloId: Titulo.toGlobalId(id) },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.titulo).toEqual(new Titulo(tituloMock));
    });

    it('test getTituloById query error', async () => {
      tituloGetRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(BUSCA_TITULO, {
          variables: { tituloId: Titulo.toGlobalId(id) },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_ERROR_BAD_REQUEST,
      );

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_INVALID_CREDENTIALS,
      );

      const [error404] = (await response()).errors || [];
      expect(error404?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_NOT_FOUND,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });

  describe('patchTituloById', () => {
    it('test patchTituloById query success', async () => {
      tituloPatchRequests(mockAdapter);

      const response = await gqlTestRequest(PATCH_TITULO, {
        variables: {
          input: {
            ...tituloInputPatch,
            id: Titulo.toGlobalId(id),
          },
        },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.tituloPatch.id).toEqual(Titulo.toGlobalId(id));
    });

    it('test patchTituloById query error', async () => {
      tituloPatchRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(PATCH_TITULO, {
          variables: {
            input: {
              ...tituloInputPatch,
              id: Titulo.toGlobalId(id),
            },
          },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_ERROR_BAD_REQUEST,
      );

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_INVALID_CREDENTIALS,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });

  describe('assinarTituloPost', () => {
    it('test assinarTituloPost mutation success', async () => {
      assinaturaPostRequests(mockAdapter);

      const response = await gqlTestRequest(POST_ASSINAR_TITULO, {
        variables: {
          input: {
            ...assinaturaInputPostMock,
            id: Titulo.toGlobalId(id),
          },
        },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.assinarTituloPost.id).toEqual(Titulo.toGlobalId(id));
    });

    it('test assinarTituloPost mutation error', async () => {
      assinaturaPostRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(POST_ASSINAR_TITULO, {
          variables: {
            input: {
              ...assinaturaInputPostMock,
              id: Titulo.toGlobalId(id),
            },
          },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_ERROR_BAD_REQUEST,
      );

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_INVALID_CREDENTIALS,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });

  describe('editarAssinaturaTitulo', () => {
    it('test editarAssinaturaTitulo mutation success', async () => {
      patchAssinaturaRequests(mockAdapter);

      const response = await gqlTestRequest(EDITAR_ASSINATURA_TITULO, {
        variables: {
          input: {
            ...editarAssinaturaInput,
            id: Titulo.toGlobalId(id),
          },
        },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.editarAssinaturaTitulo.id).toEqual(
        Titulo.toGlobalId(id),
      );
    });

    it('test editarAssinaturaTitulo mutation error', async () => {
      patchAssinaturaRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(EDITAR_ASSINATURA_TITULO, {
          variables: {
            input: {
              ...editarAssinaturaInput,
              id: Titulo.toGlobalId(id),
            },
          },
          headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_ERROR_BAD_REQUEST,
      );

      const [error401] = (await response()).errors || [];
      expect(error401?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_UNAUTHORIZED,
      );

      const [error403] = (await response()).errors || [];
      expect(error403?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_INVALID_CREDENTIALS,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });
});
