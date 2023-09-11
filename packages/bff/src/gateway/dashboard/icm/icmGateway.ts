import { logError, logInfo } from '@bff/logger';
import { catchStatusCodeError } from '@bff/helpers';
import { IcmModel } from './models/icmModel';
import {
  dashboardApiGateway,
  DASHBOARD_ICM_ENDPOINT,
} from '../dashboardApiGateway';

export enum DASHBOARD_ICM_ERRORS {
  BAD_REQUEST = 'DASHBOARD_ICM_ERROR_BAD_REQUEST',
  SOMETHING_WENT_WRONG = 'DASHBOARD_ICM_ERROR_SOMETHING_WENT_WRONG',
  SERVICE_UNAVAILABLE = 'DASHBOARD_ICM_ERROR_SERVICE_UNAVAILABLE',
}

export async function getIcm(): Promise<IcmModel> {
  return dashboardApiGateway
    .get<IcmModel>(DASHBOARD_ICM_ENDPOINT)
    .then((response) => response.data)
    .then(logInfo('DASHBOARD_ICM', 'getIcm'))
    .catch(
      catchStatusCodeError({
        400: DASHBOARD_ICM_ERRORS.BAD_REQUEST,
        500: DASHBOARD_ICM_ERRORS.SOMETHING_WENT_WRONG,
        503: DASHBOARD_ICM_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('DASHBOARD_ICM', 'getIcm'));
}
