import { permissionamentoApiGateway } from '@/gateway/permissionamento/permissionamentoApiGateway';
import { Usuarios } from '@/domain/usuario/usuariosDomain';
import { UsuarioById } from '@/domain/usuario/usuarioByIdDomain';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { GraphQLError } from 'graphql';
import {
  usuarios,
  usuarioById,
  USUARIO_ERROR_MESSAGES,
} from './usuarioAdapter';
import {
  usuarios as usuariosMock,
  paginationInput,
  id,
  usuario,
  usuarioByIdRequests,
  usuariosRequests,
} from './usuarioAdapter.mock';

describe('usuarioAdapter', () => {
  const mockAdapter = makeMockAdapter(permissionamentoApiGateway);

  describe('usuarioById', () => {
    it('test usuarioById adapter success', async () => {
      usuarioByIdRequests(mockAdapter);

      await expect(usuarioById(id)).resolves.toEqual(new UsuarioById(usuario));
    });

    it('test usuarioById adapter error', async () => {
      usuarioByIdRequests(mockAdapter, true);

      await expect(usuarioById(id)).rejects.toEqual(
        new GraphQLError(
          USUARIO_ERROR_MESSAGES.PERMISSIONAMENTO_USUARIO_ERROR_BAD_REQUEST,
        ),
      );

      await expect(usuarioById(id)).rejects.toEqual(
        new GraphQLError(
          USUARIO_ERROR_MESSAGES.PERMISSIONAMENTO_USUARIO_ERROR_SOMETHING_WENT_WRONG,
        ),
      );
      await expect(usuarioById(id)).rejects.toEqual(
        new GraphQLError(
          USUARIO_ERROR_MESSAGES.PERMISSIONAMENTO_USUARIO_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('usuarios', () => {
    it('test usuarios adapter success', async () => {
      usuariosRequests(mockAdapter);

      await expect(usuarios(paginationInput)).resolves.toEqual({
        ...usuariosMock,
        items: usuariosMock.items.map((usuario) => new Usuarios(usuario)),
      });
    });

    it('test usuarios adapter error', async () => {
      usuariosRequests(mockAdapter, true);

      await expect(usuarios(paginationInput)).rejects.toEqual(
        new GraphQLError(
          USUARIO_ERROR_MESSAGES.PERMISSIONAMENTO_USUARIO_ERROR_SOMETHING_WENT_WRONG,
        ),
      );
      await expect(usuarios(paginationInput)).rejects.toEqual(
        new GraphQLError(
          USUARIO_ERROR_MESSAGES.PERMISSIONAMENTO_USUARIO_ERROR_SERVICE_UNAVAILABLE,
        ),
      );
    });
  });
});
