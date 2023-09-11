import {
  Situacao,
  SituacaoPagination,
} from '@/domain/acionamento/followUp/situacaoDomain';
import {
  ACIONAMENTO_FOLLOWUP_ERRORS,
  getSituacaoById,
  getSituacoes,
} from '@/gateway/acionamento/followUp/followUpGateway';
import { APIPaginationInput } from '@bff/models/apiPaginationModel';
import { catchAdapterError } from '@bff/helpers';

export const FOLLOWUP_ERROR_MESSAGES = {
  [ACIONAMENTO_FOLLOWUP_ERRORS.SOMETHING_WENT_WRONG]:
    'Algo inesperado aconteceu',
  [ACIONAMENTO_FOLLOWUP_ERRORS.UNAUTHORIZED]: 'Credenciais não autorizada',
  [ACIONAMENTO_FOLLOWUP_ERRORS.INVALID_CREDENTIALS]: 'Credenciais inválidas',
  [ACIONAMENTO_FOLLOWUP_ERRORS.NOT_FOUND]:
    'O item especificado não foi encontrado',
  [ACIONAMENTO_FOLLOWUP_ERRORS.BAD_REQUEST]: 'Algo inesperado aconteceu',
  [ACIONAMENTO_FOLLOWUP_ERRORS.SERVICE_UNAVAILABLE]:
    'O serviço de acionamento está indisponível',
};

export const situacaoById = async (id: string): Promise<Situacao> =>
  getSituacaoById(id)
    .then((situacao) => new Situacao(situacao))
    .catch(catchAdapterError(FOLLOWUP_ERROR_MESSAGES));

export const getSituacoesPagination = async (
  args: APIPaginationInput,
  keyword?: string | null,
): Promise<SituacaoPagination> =>
  getSituacoes(args, keyword)
    .then((situacoes) => ({
      ...situacoes,
      items: situacoes.items.map(
        (situacaoModel) => new Situacao(situacaoModel),
      ),
    }))
    .catch(catchAdapterError(FOLLOWUP_ERROR_MESSAGES));
