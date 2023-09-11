import { logError, logInfo } from '@bff/logger';
import { catchStatusCodeError } from '@bff/helpers';
import {
  dashboardApiGateway,
  DASHBOARD_PRODUCOES_ACORDOS_ENDPOINT,
  DASHBOARD_PRODUCOES_ACORDOS_COMPARATIVO_ENDPOINT,
  DASHBOARD_PRODUCOES_ACORDOS_SINTETIZADO_ENDPOINT,
} from '../dashboardApiGateway';
import { ProducoesAcordosComparativoListModel } from './model/producoesAcordosComparativoModel';
import { ProducoesAcordosModel } from './model/producoesAcordosModel';
import { ProducoesAcordosSintetizadoModel } from './model/producoesAcordosSintetizadoModel';

export enum DASHBOARD_PRODUCOES_ACORDOS_ERRORS {
  BAD_REQUEST = 'DASHBOARD_PRODUCOES_ACORDOS_ERROR_BAD_REQUEST',
  SOMETHING_WENT_WRONG = 'DASHBOARD_PRODUCOES_ACORDOS_ERROR_SOMETHING_WENT_WRONG',
  SERVICE_UNAVAILABLE = 'DASHBOARD_PRODUCOES_ACORDOS_ERROR_SERVICE_UNAVAILABLE',
}

export async function getAcordos(): Promise<ProducoesAcordosModel> {
  return dashboardApiGateway
    .get<ProducoesAcordosModel>(DASHBOARD_PRODUCOES_ACORDOS_ENDPOINT)
    .then((response) => response.data)
    .then(logInfo('DASHBOARD_PRODUCOES_ACORDOS', 'getAcordos'))
    .catch(
      catchStatusCodeError({
        400: DASHBOARD_PRODUCOES_ACORDOS_ERRORS.BAD_REQUEST,
        500: DASHBOARD_PRODUCOES_ACORDOS_ERRORS.SOMETHING_WENT_WRONG,
        503: DASHBOARD_PRODUCOES_ACORDOS_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('DASHBOARD_PRODUCOES_ACORDOS', 'getAcordos'));
}

export async function getAcordosComparativo(): Promise<ProducoesAcordosComparativoListModel> {
  return dashboardApiGateway
    .get<ProducoesAcordosComparativoListModel>(
      DASHBOARD_PRODUCOES_ACORDOS_COMPARATIVO_ENDPOINT,
    )
    .then((response) => response.data)
    .then(logInfo('DASHBOARD_PRODUCOES_ACORDOS', 'getAcordosComparativo'))
    .catch(logError('DASHBOARD_PRODUCOES_ACORDOS', 'getAcordosComparativo'))
    .catch(
      catchStatusCodeError({
        400: DASHBOARD_PRODUCOES_ACORDOS_ERRORS.BAD_REQUEST,
        500: DASHBOARD_PRODUCOES_ACORDOS_ERRORS.SOMETHING_WENT_WRONG,
        503: DASHBOARD_PRODUCOES_ACORDOS_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('DASHBOARD_PRODUCOES_ACORDOS', 'getAcordosComparativo'));
}

export async function getAcordosSintetizado(
  date: Date,
): Promise<ProducoesAcordosSintetizadoModel> {
  return dashboardApiGateway
    .get<ProducoesAcordosSintetizadoModel>(
      DASHBOARD_PRODUCOES_ACORDOS_SINTETIZADO_ENDPOINT,
      {
        params: {
          periodoInicial: date,
        },
      },
    )
    .then((response) => response.data)
    .then(logInfo('DASHBOARD_PRODUCOES_ACORDOS', 'getAcordosSintetizado'))
    .catch(logError('DASHBOARD_PRODUCOES_ACORDOS', 'getAcordosSintetizado'))
    .catch(
      catchStatusCodeError({
        400: DASHBOARD_PRODUCOES_ACORDOS_ERRORS.BAD_REQUEST,
        500: DASHBOARD_PRODUCOES_ACORDOS_ERRORS.SOMETHING_WENT_WRONG,
        503: DASHBOARD_PRODUCOES_ACORDOS_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('DASHBOARD_PRODUCOES_ACORDOS', 'getAcordosSintetizado'));
}
