import { APIPaginationInput } from '@bff/models/apiPaginationModel';
import { catchAdapterError } from '@bff/helpers';
import {
  ACIONAMENTO_CLIENTE_ERRORS,
  FollowUpInputPost,
  getClienteFollowUps,
  postClienteFollowUp,
} from '@/gateway/acionamento/cliente/clienteGateway';
import {
  FollowUp,
  FollowUpPagination,
} from '@/domain/acionamento/followUp/followUpDomain';

export const CLIENTE_ERROR_MESSAGES = {
  [ACIONAMENTO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG]:
    'Algo inesperado aconteceu',
  [ACIONAMENTO_CLIENTE_ERRORS.UNAUTHORIZED]: 'Credenciais não autorizada',
  [ACIONAMENTO_CLIENTE_ERRORS.INVALID_CREDENTIALS]: 'Credenciais inválidas',
  [ACIONAMENTO_CLIENTE_ERRORS.NOT_FOUND]:
    'O item especificado não foi encontrado',
  [ACIONAMENTO_CLIENTE_ERRORS.BAD_REQUEST]: 'Algo inesperado aconteceu',
  [ACIONAMENTO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE]:
    'O serviço de acionamento está indisponível',
};

export const getClienteFollowUpsPagination = async (
  id: string,
  args: APIPaginationInput,
): Promise<FollowUpPagination> =>
  getClienteFollowUps(id, args)
    .then((followUps) => ({
      ...followUps,
      items: followUps.items.map((followUp) => new FollowUp(followUp)),
    }))
    .catch(catchAdapterError(CLIENTE_ERROR_MESSAGES));

export type FollowInputPostAdapter = FollowUpInputPost;

export const postFollowUp = async (
  clienteId: string,
  followUp: FollowInputPostAdapter,
): Promise<{ id: string }> =>
  postClienteFollowUp(clienteId, followUp)
    .then(({ id }) => ({ id: FollowUp.toGlobalId(id) }))
    .catch(catchAdapterError(CLIENTE_ERROR_MESSAGES));
