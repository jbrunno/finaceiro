import { tituloApiGateway } from '@/gateway';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { GraphQLError } from 'graphql';
import { Titulo } from '@/domain/titulo/titulo/tituloDomain';
import {
  TITULO_ERROR_MESSAGES,
  editarAssinaturaTitulo,
  getTituloById,
  patchTituloById,
  postAssinaturaTitulo,
} from './tituloAdapter';
import {
  assinaturaInputPostMock,
  patchAssinaturaRequests,
  id,
  tituloGetRequests,
  tituloInputPatch,
  tituloMock,
  tituloPatchRequests,
  assinaturaPostRequests,
  editarAssinaturaInput,
} from './tituloAdapter.mock';

describe('tituloAdapter', () => {
  const mockAdapter = makeMockAdapter(tituloApiGateway);

  describe('getTituloById', () => {
    it('test getTituloById adapter success', async () => {
      tituloGetRequests(mockAdapter);

      await expect(getTituloById(id)).resolves.toEqual(new Titulo(tituloMock));
    });

    it('test getTituloById adapter erros', async () => {
      tituloGetRequests(mockAdapter, true);

      await expect(getTituloById(id)).rejects.toEqual(
        new GraphQLError(TITULO_ERROR_MESSAGES.TITULO_ERROR_BAD_REQUEST),
      );

      await expect(getTituloById(id)).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(getTituloById(id)).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(getTituloById(id)).rejects.toEqual(
        new GraphQLError(TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_NOT_FOUND),
      );

      await expect(getTituloById(id)).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(getTituloById(id)).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('patchTituloById', () => {
    it('test patchTituloById adapter success', async () => {
      tituloPatchRequests(mockAdapter);

      await expect(patchTituloById(id, tituloInputPatch)).resolves.toEqual({
        id: Titulo.toGlobalId(id),
      });
    });

    it('test patchTituloById adapter error', async () => {
      tituloPatchRequests(mockAdapter, true);

      await expect(patchTituloById(id, tituloInputPatch)).rejects.toEqual(
        new GraphQLError(TITULO_ERROR_MESSAGES.TITULO_ERROR_BAD_REQUEST),
      );

      await expect(patchTituloById(id, tituloInputPatch)).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(patchTituloById(id, tituloInputPatch)).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(patchTituloById(id, tituloInputPatch)).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(patchTituloById(id, tituloInputPatch)).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('postAssinaturaTitulo', () => {
    it('postAssinaturaTitulo adapter success', async () => {
      assinaturaPostRequests(mockAdapter);

      await expect(
        postAssinaturaTitulo(id, assinaturaInputPostMock),
      ).resolves.toEqual({
        id: Titulo.toGlobalId(id),
      });
    });

    it('postAssinaturaTitulo adapter errors', async () => {
      assinaturaPostRequests(mockAdapter, true);

      await expect(
        postAssinaturaTitulo(id, assinaturaInputPostMock),
      ).rejects.toEqual(
        new GraphQLError(TITULO_ERROR_MESSAGES.TITULO_ERROR_BAD_REQUEST),
      );

      await expect(
        postAssinaturaTitulo(id, assinaturaInputPostMock),
      ).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(
        postAssinaturaTitulo(id, assinaturaInputPostMock),
      ).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(
        postAssinaturaTitulo(id, assinaturaInputPostMock),
      ).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(
        postAssinaturaTitulo(id, assinaturaInputPostMock),
      ).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('editarAssinaturaTitulo', () => {
    it('test editarAssinaturaTitulo adapter success', async () => {
      patchAssinaturaRequests(mockAdapter);

      await expect(
        editarAssinaturaTitulo(id, editarAssinaturaInput),
      ).resolves.toEqual({
        id: Titulo.toGlobalId(id),
      });
    });

    it('test editarAssinaturaTitulo adapter error', async () => {
      patchAssinaturaRequests(mockAdapter, true);

      await expect(
        editarAssinaturaTitulo(id, editarAssinaturaInput),
      ).rejects.toEqual(
        new GraphQLError(TITULO_ERROR_MESSAGES.TITULO_ERROR_BAD_REQUEST),
      );

      await expect(
        editarAssinaturaTitulo(id, editarAssinaturaInput),
      ).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_UNAUTHORIZED,
        ),
      );

      await expect(
        editarAssinaturaTitulo(id, editarAssinaturaInput),
      ).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_INVALID_CREDENTIALS,
        ),
      );

      await expect(
        editarAssinaturaTitulo(id, editarAssinaturaInput),
      ).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SOMETHING_WENT_WRONG,
        ),
      );

      await expect(
        editarAssinaturaTitulo(id, editarAssinaturaInput),
      ).rejects.toEqual(
        new GraphQLError(
          TITULO_ERROR_MESSAGES.TITULO_TITULO_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });
});
