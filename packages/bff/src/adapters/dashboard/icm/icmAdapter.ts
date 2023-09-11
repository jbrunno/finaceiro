import { Icm } from '@/domain/dashboard/icm/icmDomain';
import {
  DASHBOARD_ICM_ERRORS,
  getIcm,
} from '@/gateway/dashboard/icm/icmGateway';

import { catchAdapterError } from '@bff/helpers';

export const ICM_ERROR_MESSAGES = {
  [DASHBOARD_ICM_ERRORS.SOMETHING_WENT_WRONG]: 'Algo inesperado aconteceu',
  [DASHBOARD_ICM_ERRORS.BAD_REQUEST]: 'Algo inesperado aconteceu',
  [DASHBOARD_ICM_ERRORS.SERVICE_UNAVAILABLE]:
    'O serviço de dashboard está indisponível',
};

export const icm = async (): Promise<Icm> =>
  getIcm()
    .then((icm) => new Icm(icm))
    .catch(catchAdapterError(ICM_ERROR_MESSAGES));
