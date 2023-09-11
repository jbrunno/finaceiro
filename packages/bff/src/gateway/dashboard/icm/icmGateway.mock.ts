import { faker } from '@faker-js/faker/locale/pt_BR';
import MockAdapter from 'axios-mock-adapter';
import { DASHBOARD_ICM_ENDPOINT } from '../dashboardApiGateway';
import { IcmModel } from './models/icmModel';

export const icmRequests = (mockAdapter: MockAdapter, error?: boolean) => {
  const ENDPOINT = DASHBOARD_ICM_ENDPOINT;

  return !error
    ? mockAdapter.onGet(ENDPOINT).replyOnce<IcmModel>(200, icm)
    : mockAdapter
        .onGet(ENDPOINT)
        .replyOnce(400)
        .onGet(ENDPOINT)
        .replyOnce(500)
        .onGet(ENDPOINT)
        .replyOnce(503);
};

export const icm: IcmModel = {
  percentualDaMetaBatidaTotal: faker.datatype.number(),
  percentualDaMetaBatidaDeEntradaEaVista: faker.datatype.number(),
  totalDeValoresPagosNoMesDeEntradasEaVista: faker.datatype.number(),
  totalDeValoresPagosNoMesDeEntradasAVistaEColchao: faker.datatype.number(),
  percentualDaEficienciaNoMesDeEntradasAVistaEColchao: faker.datatype.number(),
};
