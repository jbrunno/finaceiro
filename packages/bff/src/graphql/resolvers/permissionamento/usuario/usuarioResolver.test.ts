import { Usuarios } from '@/domain/usuario/usuariosDomain';
import { Pagination } from '@bff/domain/pagination';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { gqlTestRequest } from '@test-utils/gqlTestRequest';
import { UsuarioById } from '@/domain/usuario/usuarioByIdDomain';
import { permissionamentoApiGateway } from '@/gateway';
import { USUARIO_ERROR_MESSAGES } from '@/adapters/permissionamento/usuario/usuarioAdapter';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import {
  id,
  token,
  usuario,
  USUARIOS,
  usuarios,
  USUARIO_BY_ID,
  usuarioByIdRequests,
  usuariosRequests,
} from './usuarioResolver.mock';

describe('usuarioResolver', () => {
  const mockAdapter = makeMockAdapter(permissionamentoApiGateway);

  describe('usuarioById', () => {
    it('test usuarioById query success', async () => {
      usuarioByIdRequests(mockAdapter);

      const response = await gqlTestRequest(USUARIO_BY_ID, {
        variables: { id: UsuarioById.toGlobalId(id) },
        headers: { Authorization: token },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.usuarioById).toEqual(new UsuarioById(usuario));
    });

    it('test usuarioById query error', async () => {
      usuarioByIdRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(USUARIO_BY_ID, {
          variables: { id: UsuarioById.toGlobalId(id) },
          headers: { Authorization: token },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        USUARIO_ERROR_MESSAGES.PERMISSIONAMENTO_USUARIO_ERROR_BAD_REQUEST,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        USUARIO_ERROR_MESSAGES.PERMISSIONAMENTO_USUARIO_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        USUARIO_ERROR_MESSAGES.PERMISSIONAMENTO_USUARIO_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });

  describe('usuarios', () => {
    const { totalItems, ...args } = usuarios.pagination;

    it('test usuarios query success', async () => {
      usuariosRequests(mockAdapter);

      const usuariosPagination = new Pagination({
        pagination: usuarios.pagination,
        items: usuarios.items.map((user) => new Usuarios(user)),
      });

      const response = await gqlTestRequest(USUARIOS, {
        variables: { pagination: args },
        headers: { Authorization: `Bearer ${faker.random.alphaNumeric(64)}` },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.usuarios.items).toEqual(usuariosPagination.items);
      expect(response.data.usuarios.pageInfo).toEqual(
        usuariosPagination.pageInfo,
      );
    });

    it('test usuarios query error', async () => {
      usuariosRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(USUARIOS, {
          variables: { pagination: args },
          headers: { Authorization: token },
        });

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        USUARIO_ERROR_MESSAGES.PERMISSIONAMENTO_USUARIO_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        USUARIO_ERROR_MESSAGES.PERMISSIONAMENTO_USUARIO_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });
});
