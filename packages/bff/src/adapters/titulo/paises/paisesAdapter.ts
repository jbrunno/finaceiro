import { catchAdapterError } from '@bff/helpers';
import {
  TITULO_PAISES_ERRORS,
  getPais,
  getPaises,
} from '@/gateway/titulo/paises/paisesGateway';
import { Pais } from '@/domain/titulo/paises/paisDomain';

export const PAISES_ERROR_MESSAGES = {
  [TITULO_PAISES_ERRORS.SOMETHING_WENT_WRONG]: 'Algo inesperado aconteceu',
  [TITULO_PAISES_ERRORS.UNAUTHORIZED]: 'Credenciais não autorizada',
  [TITULO_PAISES_ERRORS.INVALID_CREDENTIALS]: 'Credenciais inválidas',
  [TITULO_PAISES_ERRORS.NOT_FOUND]: 'O item especificado não foi encontrado',
  [TITULO_PAISES_ERRORS.SERVICE_UNAVAILABLE]:
    'O serviço de titulo está indisponível',
};

export const getPaisesList = async (): Promise<Array<Pais>> =>
  getPaises()
    .then((paises) => {
      return paises.items.map((pais) => new Pais(pais));
    })
    .catch(catchAdapterError(PAISES_ERROR_MESSAGES));

export const getPaisById = async (id: string): Promise<Pais> =>
  getPais(id)
    .then((pais) => new Pais(pais))
    .catch(catchAdapterError(PAISES_ERROR_MESSAGES));
