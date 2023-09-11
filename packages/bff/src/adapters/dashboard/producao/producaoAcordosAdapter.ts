import {
  DASHBOARD_PRODUCOES_ACORDOS_ERRORS,
  getAcordosSintetizado,
  getAcordos,
  getAcordosComparativo,
} from '@/gateway/dashboard/producoes/producoesGateway';

import { ProducaoAcordosComparativo } from '@/domain/dashboard/producao/producaoAcordosComparativoDomain';
import { ProducaoAcordosSintetizado } from '@/domain/dashboard/producao/producaoAcordosSintetizadoDomain';
import { ProducaoAcordos } from '@/domain/dashboard/producao/producaoAcordosDomain';
import { catchAdapterError } from '@bff/helpers';

export const PRODUCAO_ACORDOS_ERROR_MESSAGES = {
  [DASHBOARD_PRODUCOES_ACORDOS_ERRORS.SOMETHING_WENT_WRONG]:
    'Algo inesperado aconteceu',
  [DASHBOARD_PRODUCOES_ACORDOS_ERRORS.BAD_REQUEST]: 'Algo inesperado aconteceu',
  [DASHBOARD_PRODUCOES_ACORDOS_ERRORS.SERVICE_UNAVAILABLE]:
    'O serviço de dashboard está indisponível',
};

export const producaoAcordos = async (): Promise<ProducaoAcordos> =>
  getAcordos()
    .then((producaoAcordos) => new ProducaoAcordos(producaoAcordos))
    .catch(catchAdapterError(PRODUCAO_ACORDOS_ERROR_MESSAGES));

export const producaoAcordosSintetizado = async (
  date: Date,
): Promise<ProducaoAcordosSintetizado> =>
  getAcordosSintetizado(date)
    .then(
      (acordosSintetizado) =>
        new ProducaoAcordosSintetizado(acordosSintetizado),
    )
    .catch(catchAdapterError(PRODUCAO_ACORDOS_ERROR_MESSAGES));

export const producaoAcordosComparativo = async (): Promise<
  Array<ProducaoAcordosComparativo>
> =>
  getAcordosComparativo()
    .then((acordosComparativos) => {
      return acordosComparativos.items.map(
        (acordosComparativo) =>
          new ProducaoAcordosComparativo(acordosComparativo),
      );
    })
    .catch(catchAdapterError(PRODUCAO_ACORDOS_ERROR_MESSAGES));
