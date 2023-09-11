import { logError, logInfo } from '@bff/logger';
import { catchStatusCodeError } from '@bff/helpers';
import { APIPaginationInput } from '@bff/models/apiPaginationModel';
import { FollowUpPaginationModel } from '../followUp/models/followUpModel';
import {
  ACIONAMENTO_CLIENTES_FOLLOW_UPS_ENDPOINT,
  acionamentoApiGateway,
} from '../acionamentoApiGateway';

export enum ACIONAMENTO_CLIENTE_ERRORS {
  BAD_REQUEST = 'ACIONAMENTO_CLIENTE_ERROR_BAD_REQUEST',
  UNAUTHORIZED = 'ACIONAMENTO_CLIENTE_ERROR_UNAUTHORIZED',
  NOT_FOUND = 'ACIONAMENTO_CLIENTE_ERROR_NOT_FOUND',
  SOMETHING_WENT_WRONG = 'ACIONAMENTO_CLIENTE_ERROR_SOMETHING_WENT_WRONG',
  SERVICE_UNAVAILABLE = 'ACIONAMENTO_CLIENTE_ERROR_SERVICE_UNAVAILABLE',
  INVALID_CREDENTIALS = 'ACIONAMENTO_CLIENTE_ERROR_INVALID_CREDENTIALS',
}

export async function getClienteFollowUps(
  id: string,
  paginationInput: APIPaginationInput,
): Promise<FollowUpPaginationModel> {
  const { pageNumber, pageSize, sortField, sortOrder } = paginationInput;

  return acionamentoApiGateway
    .get<FollowUpPaginationModel>(
      ACIONAMENTO_CLIENTES_FOLLOW_UPS_ENDPOINT.replace(':id', id),
      {
        params: {
          PageSize: pageSize || 10,
          PageNumber: pageNumber || 1,
          SortField: sortField || null,
          SortOrder: sortOrder || null,
        },
      },
    )
    .then((response) => response.data)
    .then(logInfo('ACIONAMENTO_CLIENTE', 'getClienteFollowUps'))
    .catch(
      catchStatusCodeError({
        401: ACIONAMENTO_CLIENTE_ERRORS.UNAUTHORIZED,
        403: ACIONAMENTO_CLIENTE_ERRORS.INVALID_CREDENTIALS,
        500: ACIONAMENTO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG,
        503: ACIONAMENTO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('ACIONAMENTO_CLIENTE', 'getClienteFollowUps'));
}

export type FollowUpInputPost = {
  situacaoFollowUpId: string;
  tituloId: string;
  descricao?: string | null;
};

export async function postClienteFollowUp(
  clienteId: string,
  followUp: FollowUpInputPost,
): Promise<{ id: string }> {
  return acionamentoApiGateway
    .post<{ id: string }>(
      ACIONAMENTO_CLIENTES_FOLLOW_UPS_ENDPOINT.replace(':id', clienteId),
      followUp,
    )
    .then((response) => response.data)
    .then(logInfo('ACIONAMENTO_CLIENTES', 'postClienteFollowUp'))
    .catch(
      catchStatusCodeError({
        400: ACIONAMENTO_CLIENTE_ERRORS.BAD_REQUEST,
        401: ACIONAMENTO_CLIENTE_ERRORS.UNAUTHORIZED,
        403: ACIONAMENTO_CLIENTE_ERRORS.INVALID_CREDENTIALS,
        500: ACIONAMENTO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG,
        503: ACIONAMENTO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('ACIONAMENTO_CLIENTES', 'postClienteFollowUp'));
}
