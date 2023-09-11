import { faker } from '@faker-js/faker/locale/pt_BR';
import { gql } from 'graphql-tag';

export * from '@/gateway/titulo/cbo/cboGateway.mock';

export const token = `Bearer ${faker.random.alphaNumeric(64)}`;

export const CBO_PAGINATION = gql`
  query cboPagination($pagination: PaginationInput!, $filter: String!) {
    cbos(pagination: $pagination, filter: $filter) {
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
          codigo
          ocupacao
        }
      }
    }
  }
`;
