import { gql } from '@apollo/client';

export const AUTOCOMPLETE_OCUPACAO_QUERY = gql`
  query Cbos($pagination: PaginationInput!, $filter: String) {
    cbos(pagination: $pagination, filter: $filter) {
      items {
        node {
          codigo
          id
          ocupacao
        }
      }
      pageInfo {
        totalItems
        hasNextPage
      }
    }
  }
`;

export type PaginationInput = {
  pageNumber: number;
  pageSize: number;
};

export type AutocompleteOcupacaoQueryVariables = {
  pagination: PaginationInput;
  filter?: string;
};

export type Cbo = {
  id: string;
  codigo: string;
  ocupacao: string;
};

export type AutocompleteOcupacaoData = {
  cbos: {
    items: Array<{
      node: Cbo;
    }>;
    pageInfo: {
      totalItems: number;
      hasNextPage: boolean;
    };
  };
};
