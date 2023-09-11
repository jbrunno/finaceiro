import { faker } from '@faker-js/faker/locale/pt_BR';
import { gql } from 'graphql-tag';

export * from '@/gateway/dashboard/icm/icmGateway.mock';

export const token = `Bearer ${faker.random.alphaNumeric(64)}`;

export const ICM = gql`
  query Icm {
    icm {
      porcentagemTotal
      porcentagemEntrada
      porcentagemParcelasPagas
      valorEntrada
      valorParcelasPagas
    }
  }
`;
