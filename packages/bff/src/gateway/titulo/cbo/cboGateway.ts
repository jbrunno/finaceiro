import { logError, logInfo } from '@bff/logger';
import { catchStatusCodeError } from '@bff/helpers';
import { APIPaginationInput } from '@bff/models/apiPaginationModel';
import { CboModel, CboPaginationModel } from './model/cboModel';
import {
  tituloApiGateway,
  TITULO_CBOS_ENDPOINT,
  TITULO_CBO_ENDPOINT,
} from '../tituloApiGateway';

export enum TITULO_CBO_ERRORS {
  BAD_REQUEST = 'TITULO_CBO_ERROR_BAD_REQUEST',
  UNAUTHORIZED = 'TITULO_CBO_ERROR_UNAUTHORIZED',
  NOT_FOUND = 'TITULO_CBO_ERROR_NOT_FOUND',
  SOMETHING_WENT_WRONG = 'TITULO_CBO_ERROR_SOMETHING_WENT_WRONG',
  SERVICE_UNAVAILABLE = 'TITULO_CBO_ERROR_SERVICE_UNAVAILABLE',
  INVALID_CREDENTIALS = 'TITULO_CBO_ERROR_INVALID_CREDENTIALS',
}

export async function getCbos(
  paginationInput: APIPaginationInput,
  filter?: string | null,
): Promise<CboPaginationModel> {
  const { pageNumber, pageSize, sortField, sortOrder } = paginationInput;

  return tituloApiGateway
    .get<CboPaginationModel>(TITULO_CBOS_ENDPOINT, {
      params: {
        PageSize: pageSize || 10,
        PageNumber: pageNumber || 1,
        SortField: sortField || null,
        SortOrder: sortOrder || null,
        Filter: filter,
      },
    })
    .then((response) => response.data)
    .then(logInfo('TITULO_CBOS', 'getCbos'))
    .catch(
      catchStatusCodeError({
        401: TITULO_CBO_ERRORS.UNAUTHORIZED,
        403: TITULO_CBO_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_CBO_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CBO_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CBOS', 'getCbos'));
}

export async function getCbo(id: string): Promise<CboModel> {
  return tituloApiGateway
    .get<CboModel>(TITULO_CBO_ENDPOINT.replace(':id', id))
    .then((response) => response.data)
    .then(logInfo('TITULO_CBO', 'getCbo'))
    .catch(
      catchStatusCodeError({
        401: TITULO_CBO_ERRORS.UNAUTHORIZED,
        403: TITULO_CBO_ERRORS.INVALID_CREDENTIALS,
        404: TITULO_CBO_ERRORS.NOT_FOUND,
        500: TITULO_CBO_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CBO_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CBO', 'getCbo'));
}
