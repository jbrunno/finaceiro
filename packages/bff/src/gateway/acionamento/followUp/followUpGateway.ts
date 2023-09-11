import { APIPaginationInput } from '@bff/core/dist/models/apiPaginationModel';
import { logError, logInfo } from '@bff/logger';
import { catchStatusCodeError } from '@bff/helpers';
import { SituacaoModel, SituacaoPaginationModel } from './models/situacaoModel';
import {
  ACIONAMENTO_FOLLOWUPS_SITUACAO_BY_ID_ENDPOINT,
  ACIONAMENTO_FOLLOWUPS_SITUACOES_ENDPOINT,
  acionamentoApiGateway,
} from '../acionamentoApiGateway';

export enum ACIONAMENTO_FOLLOWUP_ERRORS {
  BAD_REQUEST = 'ACIONAMENTO_FOLLOWUP_ERROR_BAD_REQUEST',
  UNAUTHORIZED = 'ACIONAMENTO_FOLLOWUP_ERROR_UNAUTHORIZED',
  NOT_FOUND = 'ACIONAMENTO_FOLLOWUP_ERROR_NOT_FOUND',
  SOMETHING_WENT_WRONG = 'ACIONAMENTO_FOLLOWUP_ERROR_SOMETHING_WENT_WRONG',
  SERVICE_UNAVAILABLE = 'ACIONAMENTO_FOLLOWUP_ERROR_SERVICE_UNAVAILABLE',
  INVALID_CREDENTIALS = 'ACIONAMENTO_FOLLOWUP_ERROR_INVALID_CREDENTIALS',
}

export async function getSituacoes(
  paginationInput: APIPaginationInput,
  keyword?: string | null,
): Promise<SituacaoPaginationModel> {
  const { pageNumber, pageSize, sortField, sortOrder } = paginationInput;

  return acionamentoApiGateway
    .get(ACIONAMENTO_FOLLOWUPS_SITUACOES_ENDPOINT, {
      params: {
        pageSize: pageSize || 10,
        pageNumber: pageNumber || 1,
        sortField: sortField || null,
        sortOrder: sortOrder || null,
        keyword,
      },
    })
    .then((response) => response.data)
    .then(logInfo('ACIONAMENTO_FOLLOWUPS', 'getSituacoes'))
    .catch(
      catchStatusCodeError({
        400: ACIONAMENTO_FOLLOWUP_ERRORS.BAD_REQUEST,
        401: ACIONAMENTO_FOLLOWUP_ERRORS.UNAUTHORIZED,
        403: ACIONAMENTO_FOLLOWUP_ERRORS.INVALID_CREDENTIALS,
        500: ACIONAMENTO_FOLLOWUP_ERRORS.SOMETHING_WENT_WRONG,
        503: ACIONAMENTO_FOLLOWUP_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('ACIONAMENTO_FOLLOWUPS', 'getSituacoes'));
}

export async function getSituacaoById(id: string): Promise<SituacaoModel> {
  return acionamentoApiGateway
    .get(ACIONAMENTO_FOLLOWUPS_SITUACAO_BY_ID_ENDPOINT.replace(':id', id))
    .then((response) => response.data)
    .then(logInfo('ACIONAMENTO_FOLLOWUPS', 'getSituacaoById'))
    .catch(
      catchStatusCodeError({
        400: ACIONAMENTO_FOLLOWUP_ERRORS.BAD_REQUEST,
        401: ACIONAMENTO_FOLLOWUP_ERRORS.UNAUTHORIZED,
        403: ACIONAMENTO_FOLLOWUP_ERRORS.INVALID_CREDENTIALS,
        500: ACIONAMENTO_FOLLOWUP_ERRORS.SOMETHING_WENT_WRONG,
        503: ACIONAMENTO_FOLLOWUP_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('ACIONAMENTO_FOLLOWUPS', 'getSituacaoById'));
}
