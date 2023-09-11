import { faker } from '@faker-js/faker/locale/pt_BR';
import { gql } from 'graphql-tag';

export { clientePatchAdapter } from '@/adapters/titulo/cliente/clienteAdapter.mock';

export const token = `Bearer ${faker.random.alphaNumeric(64)}`;

export const BUSCA_SITUACOES_FOLLOW_UP = gql`
  query SituacoesFollowUp($pagination: PaginationInput!, $keyword: String) {
    situacoesFollowUp(pagination: $pagination, keyword: $keyword) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        pageNumber
        pageSize
        totalItems
      }
      items {
        cursor
        node {
          id
          descricaoObrigatoria
          codigo
          nome
          tempoTrava
          textoPadrao
        }
      }
    }
  }
`;
