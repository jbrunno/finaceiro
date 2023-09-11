import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import createHttpError from 'http-errors';
import { permissionamentoApiGateway } from '../permissionamentoApiGateway';
import {
  PERMISSIONAMENTO_USUARIO_ERRORS,
  getUsuarios,
  getUsuarioById,
} from './usuarioGateway';
import {
  id,
  paginationInput,
  usuario,
  usuarioByIdRequests,
  usuarios,
  usuariosRequests,
} from './usuarioGateway.mock';

describe('usuarioGateway', () => {
  const mockAdapter = makeMockAdapter(permissionamentoApiGateway);

  describe('getUsuariosById', () => {
    it('test getUsuarioById request success', async () => {
      usuarioByIdRequests(mockAdapter);

      await expect(getUsuarioById(id)).resolves.toEqual(usuario);
    });

    it('test getUsuarioById request error', async () => {
      usuarioByIdRequests(mockAdapter, true);

      await expect(getUsuarioById(id)).rejects.toEqual(
        createHttpError(400, PERMISSIONAMENTO_USUARIO_ERRORS.BAD_REQUEST),
      );
      await expect(getUsuarioById(id)).rejects.toEqual(
        createHttpError(
          500,
          PERMISSIONAMENTO_USUARIO_ERRORS.SOMETHING_WENT_WRONG,
        ),
      );
      await expect(getUsuarioById(id)).rejects.toEqual(
        createHttpError(
          503,
          PERMISSIONAMENTO_USUARIO_ERRORS.SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('getUsuarios', () => {
    it('test getUsuarios request success', async () => {
      usuariosRequests(mockAdapter);

      await expect(getUsuarios(paginationInput)).resolves.toEqual(usuarios);
    });

    it('test getUsuarios request error', async () => {
      usuariosRequests(mockAdapter, true);

      await expect(getUsuarios(paginationInput)).rejects.toEqual(
        createHttpError(
          500,
          PERMISSIONAMENTO_USUARIO_ERRORS.SOMETHING_WENT_WRONG,
        ),
      );
      await expect(getUsuarios(paginationInput)).rejects.toEqual(
        createHttpError(
          503,
          PERMISSIONAMENTO_USUARIO_ERRORS.SERVICE_UNAVAILABLE,
        ),
      );
    });
  });
});
