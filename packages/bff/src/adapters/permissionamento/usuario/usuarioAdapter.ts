import { APIPaginationInput } from '@bff/models/apiPaginationModel';
import { Usuarios, UsuariosPagination } from '@/domain/usuario/usuariosDomain';
import { UsuarioById } from '@/domain/usuario/usuarioByIdDomain';
import {
  getUsuarioById,
  PERMISSIONAMENTO_USUARIO_ERRORS,
  getUsuarios,
} from '@/gateway/permissionamento/usuario/usuarioGateway';

import { catchAdapterError } from '@bff/helpers';

export const USUARIO_ERROR_MESSAGES = {
  [PERMISSIONAMENTO_USUARIO_ERRORS.SOMETHING_WENT_WRONG]:
    'Algo inesperado aconteceu',
  [PERMISSIONAMENTO_USUARIO_ERRORS.BAD_REQUEST]: 'Algo inesperado aconteceu',
  [PERMISSIONAMENTO_USUARIO_ERRORS.SERVICE_UNAVAILABLE]:
    'O serviço de permissionamento está indisponível',
};

export const usuarioById = async (id: string): Promise<UsuarioById> =>
  getUsuarioById(id)
    .then((usuario) => new UsuarioById(usuario))
    .catch(catchAdapterError(USUARIO_ERROR_MESSAGES));

export const usuarios = async (
  args: APIPaginationInput,
): Promise<UsuariosPagination> =>
  getUsuarios(args)
    .then((users) => ({
      ...users,
      items: users.items.map((user) => new Usuarios(user)),
    }))
    .catch(catchAdapterError(USUARIO_ERROR_MESSAGES));
