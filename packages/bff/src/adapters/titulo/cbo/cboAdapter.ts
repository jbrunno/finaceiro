import {
  TITULO_CBO_ERRORS,
  getCbos,
  getCbo,
} from '@/gateway/titulo/cbo/cboGateway';
import { Cbo, CboPagination } from '@/domain/titulo/cbo/cboDomain';
import { APIPaginationInput } from '@bff/models/apiPaginationModel';
import { catchAdapterError } from '@bff/helpers';

export const CBO_ERROR_MESSAGES = {
  [TITULO_CBO_ERRORS.SOMETHING_WENT_WRONG]: 'Algo inesperado aconteceu',
  [TITULO_CBO_ERRORS.UNAUTHORIZED]: 'Credenciais não autorizada',
  [TITULO_CBO_ERRORS.INVALID_CREDENTIALS]: 'Credenciais inválidas',
  [TITULO_CBO_ERRORS.NOT_FOUND]: 'O item especificado não foi encontrado',
  [TITULO_CBO_ERRORS.BAD_REQUEST]: 'Algo inesperado aconteceu',
  [TITULO_CBO_ERRORS.SERVICE_UNAVAILABLE]:
    'O serviço de titulo está indisponível',
};

export const getCbosPagination = async (
  args: APIPaginationInput,
  filter?: string | null,
): Promise<CboPagination> =>
  getCbos(args, filter)
    .then((cbos) => ({
      ...cbos,
      items: cbos.items.map((cbo) => new Cbo(cbo)),
    }))
    .catch(catchAdapterError(CBO_ERROR_MESSAGES));

export const getCboById = async (id: string): Promise<Cbo> =>
  getCbo(id)
    .then((cbo) => new Cbo(cbo))
    .catch(catchAdapterError(CBO_ERROR_MESSAGES));
