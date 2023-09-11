import { logError, logInfo } from '@bff/logger';
import { catchStatusCodeError } from '@bff/helpers';
import { APIPaginationInput } from '@bff/models/apiPaginationModel';
import { UsuarioByIdModel } from './models/usuarioByIdModel';
import { UsuariosPaginationModel } from './models/usuariosModel';
import {
  permissionamentoApiGateway,
  PERMISSIONAMENTO_USUARIO_USUARIO_BY_ID_ENDPOINT,
  PERMISSIONAMENTO_USUARIO_USUARIOS_ENDPOINT,
} from '../permissionamentoApiGateway';

export enum PERMISSIONAMENTO_USUARIO_ERRORS {
  BAD_REQUEST = 'PERMISSIONAMENTO_USUARIO_ERROR_BAD_REQUEST',
  SOMETHING_WENT_WRONG = 'PERMISSIONAMENTO_USUARIO_ERROR_SOMETHING_WENT_WRONG',
  SERVICE_UNAVAILABLE = 'PERMISSIONAMENTO_USUARIO_ERROR_SERVICE_UNAVAILABLE',
}

export async function getUsuarioById(id: string): Promise<UsuarioByIdModel> {
  return permissionamentoApiGateway
    .get<UsuarioByIdModel>(
      PERMISSIONAMENTO_USUARIO_USUARIO_BY_ID_ENDPOINT.replace(':id', id),
    )
    .then((response) => response.data)
    .then(logInfo('PERMISSIONAMENTO_USUARIO', 'getUsuarioById'))
    .catch(
      catchStatusCodeError({
        400: PERMISSIONAMENTO_USUARIO_ERRORS.BAD_REQUEST,
        500: PERMISSIONAMENTO_USUARIO_ERRORS.SOMETHING_WENT_WRONG,
        503: PERMISSIONAMENTO_USUARIO_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('PERMISSIONAMENTO_USUARIO', 'getUsuarioById'));
}

export async function getUsuarios(
  paginationInput: APIPaginationInput,
): Promise<UsuariosPaginationModel> {
  const { pageNumber, pageSize, sortField, sortOrder } = paginationInput;

  return permissionamentoApiGateway
    .get<UsuariosPaginationModel>(PERMISSIONAMENTO_USUARIO_USUARIOS_ENDPOINT, {
      params: {
        PageSize: pageSize || 10,
        PageNumber: pageNumber || 1,
        SortField: sortField || null,
        SortOrder: sortOrder || null,
      },
    })
    .then((response) => response.data)
    .then(logInfo('PERMISSIONAMENTO_USUARIO', 'getUsuarios'))
    .catch(
      catchStatusCodeError({
        500: PERMISSIONAMENTO_USUARIO_ERRORS.SOMETHING_WENT_WRONG,
        503: PERMISSIONAMENTO_USUARIO_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('PERMISSIONAMENTO_USUARIO', 'getUsuarios'));
}
