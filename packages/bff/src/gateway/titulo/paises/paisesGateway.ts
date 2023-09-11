import { logError, logInfo } from '@bff/logger';
import { catchStatusCodeError } from '@bff/helpers';

import { PaisModel, PaisesListModel } from './model/paisModel';
import {
  TITULO_PAISES_ENDPOINT,
  TITULO_PAIS_ENDPOINT,
  tituloApiGateway,
} from '../tituloApiGateway';

export enum TITULO_PAISES_ERRORS {
  UNAUTHORIZED = 'TITULO_PAISES_ERROR_UNAUTHORIZED',
  NOT_FOUND = 'TITULO_PAISES_ERROR_NOT_FOUND',
  SOMETHING_WENT_WRONG = 'TITULO_PAISES_ERROR_SOMETHING_WENT_WRONG',
  SERVICE_UNAVAILABLE = 'TITULO_PAISES_ERROR_SERVICE_UNAVAILABLE',
  INVALID_CREDENTIALS = 'TITULO_PAISES_ERROR_INVALID_CREDENTIALS',
}

export async function getPaises(): Promise<PaisesListModel> {
  return tituloApiGateway
    .get<PaisesListModel>(TITULO_PAISES_ENDPOINT)
    .then((response) => response.data)
    .then(logInfo('TITULO_PAISES', 'getPaises'))
    .catch(
      catchStatusCodeError({
        401: TITULO_PAISES_ERRORS.UNAUTHORIZED,
        403: TITULO_PAISES_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_PAISES_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_PAISES_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_PAISES', 'getPaises'));
}

export async function getPais(id: string): Promise<PaisModel> {
  return tituloApiGateway
    .get<PaisModel>(TITULO_PAIS_ENDPOINT.replace(':id', id))
    .then((response) => response.data)
    .then(logInfo('TITULO_PAISES', 'getPais'))
    .catch(
      catchStatusCodeError({
        401: TITULO_PAISES_ERRORS.UNAUTHORIZED,
        403: TITULO_PAISES_ERRORS.INVALID_CREDENTIALS,
        404: TITULO_PAISES_ERRORS.NOT_FOUND,
        500: TITULO_PAISES_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_PAISES_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_PAISES', 'getPais'));
}
