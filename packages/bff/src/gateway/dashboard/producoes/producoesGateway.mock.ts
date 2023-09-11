import { faker } from '@faker-js/faker/locale/pt_BR';
import MockAdapter from 'axios-mock-adapter';
import {
  DASHBOARD_PRODUCOES_ACORDOS_COMPARATIVO_ENDPOINT,
  DASHBOARD_PRODUCOES_ACORDOS_ENDPOINT,
  DASHBOARD_PRODUCOES_ACORDOS_SINTETIZADO_ENDPOINT,
} from '../dashboardApiGateway';
import { ProducoesAcordosComparativoListModel } from './model/producoesAcordosComparativoModel';
import { ProducoesAcordosModel } from './model/producoesAcordosModel';
import { ProducoesAcordosSintetizadoModel } from './model/producoesAcordosSintetizadoModel';

export const producoesAcordosRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = DASHBOARD_PRODUCOES_ACORDOS_ENDPOINT;

  return !error
    ? mockAdapter
        .onGet(ENDPOINT)
        .replyOnce<ProducoesAcordosModel>(200, producoesAcordos)
    : mockAdapter
        .onGet(ENDPOINT)
        .replyOnce(400)
        .onGet(ENDPOINT)
        .replyOnce(500)
        .onGet(ENDPOINT)
        .replyOnce(503);
};

export const producoesAcordosSintetizadoRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = DASHBOARD_PRODUCOES_ACORDOS_SINTETIZADO_ENDPOINT;

  return !error
    ? mockAdapter
        .onGet(ENDPOINT, {
          params: { periodoInicial: new Date() },
        })
        .replyOnce<ProducoesAcordosSintetizadoModel>(
          200,
          producoesAcordosSintetizado,
        )
    : mockAdapter
        .onGet(ENDPOINT)
        .replyOnce(400)
        .onGet(ENDPOINT)
        .replyOnce(500)
        .onGet(ENDPOINT)
        .replyOnce(503);
};

export const producoesAcordosComparativoRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = DASHBOARD_PRODUCOES_ACORDOS_COMPARATIVO_ENDPOINT;

  return !error
    ? mockAdapter
        .onGet(ENDPOINT)
        .replyOnce<ProducoesAcordosComparativoListModel>(
          200,
          producoesAcordosComparativo,
        )
    : mockAdapter
        .onGet(ENDPOINT)
        .replyOnce(400)
        .onGet(ENDPOINT)
        .replyOnce(500)
        .onGet(ENDPOINT)
        .replyOnce(503);
};

export const producoesAcordos = {
  totalDeAcordosNegociadosNaData: faker.datatype.number(),
  totalDeValoresNegociadosNaData: faker.datatype.number(),
  totalDeParcelasComVencimentoNaData: faker.datatype.number(),
  totalPercentualConversao: faker.datatype.number(),
};

export const producoesAcordosSintetizado = {
  acordosEPromessasDePagamento: faker.datatype.number(),
  valorTotalAcordosGerados: faker.datatype.number(),
  valorTotalAcordosPagos: faker.datatype.number(),
  quantidadeAcordosPagos: faker.datatype.number(),
  quantidadeAcordosQuebrados: faker.datatype.number(),
  quantidadeParcelasAVencer: faker.datatype.number(),
};

export const producoesAcordosComparativo = {
  items: [
    {
      dataHoraConsulta: faker.date.future().toString(),
      totalProducaoIndividualNaData: faker.datatype.number(),
      totalProducaoMediaDaCarteiraNaData: faker.datatype.number(),
    },
    {
      dataHoraConsulta: faker.date.future().toString(),
      totalProducaoIndividualNaData: faker.datatype.number(),
      totalProducaoMediaDaCarteiraNaData: faker.datatype.number(),
    },
  ],
};
