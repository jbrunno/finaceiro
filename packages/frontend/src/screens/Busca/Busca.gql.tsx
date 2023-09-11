import { gql } from '@apollo/client';
import { CardCliente } from './components/CardCliente/CardCliente';
import { ClienteData } from './components/CardCliente/CardCliente.gql';

export const BUSCA_QUERY = gql`
  query Clientes($pagination: PaginationInput!, $keyword: String!) {
    clientes(pagination: $pagination, keyword: $keyword) {
      items {
        node {
          ...CARD_CLIENTE_FRAGMENT
        }
      }
      pageInfo {
        totalItems
        hasNextPage
      }
    }
  }

  ${CardCliente.fragments.cliente}
`;

export type PaginationInput = {
  pageNumber: number;
  pageSize: number;
};

export type BuscaQueryVariables = {
  pagination: PaginationInput;
  keyword: string;
};

export type BuscaData = {
  clientes: {
    items: Array<{
      node: ClienteData;
    }>;
    pageInfo: {
      totalItems: number;
      hasNextPage: boolean;
    };
  };
};
