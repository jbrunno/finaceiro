import { faker } from '@faker-js/faker';
import { ProducaoAcordosSintetizadoData } from '../components/DashboardAcordosPeriodo/DashboardAcordosPeriodo.gql';
import { IcmData } from '../components/DashboardIcm/DashboardIcm.gql';

type WithTypename<T> = T & { __typename: string };

export const icm: WithTypename<IcmData> = {
  __typename: 'Icm',
  porcentagemTotal: faker.datatype.float({ max: 99 }),
  porcentagemEntrada: faker.datatype.float({ max: 99 }),
  valorEntrada: faker.datatype.number(1000),
  valorParcelasPagas: faker.datatype.number(12),
  porcentagemParcelasPagas: faker.datatype.float({ max: 99 }),
};

export const producaoAcordosSintetizado: WithTypename<ProducaoAcordosSintetizadoData> =
  {
    __typename: 'ProducaoAcordosSintetizado',
    acordosEPromessasDePagamento: faker.datatype.number(12),
    quantidadeAcordosPagos: faker.datatype.number(12),
    quantidadeAcordosQuebrados: faker.datatype.number(12),
    quantidadeParcelasAVencer: faker.datatype.number(12),
    valorTotalAcordosGerados: faker.datatype.number(3000),
    valorTotalAcordosPagos: faker.datatype.number(2000),
  };

export const producaoAcordosComparativo = {
  __typename: 'ProducaoAcordosComparativo',
  ...[
    {
      data: faker.datatype.datetime().toISOString(),
      quantidadeIndividual: faker.datatype.number(30),
      quantidadeMedia: faker.random.numeric(3),
    },
  ],
};
