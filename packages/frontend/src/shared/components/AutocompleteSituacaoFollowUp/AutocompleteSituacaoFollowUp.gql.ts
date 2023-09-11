import { gql } from '@apollo/client';

export const AUTOCOMPLETE_SITUACAO_FOLLOWUP_QUERY = gql`
  query Situacoes($pagination: PaginationInput!, $filter: String) {
    situacoes(pagination: $pagination, filter: $filter) {
      items {
        node {
          id
          codigo
          nome
          descricaoObrigatoria
          textoPadrao
          tempoTrava
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

export type AutocompleteSituacaoFollowUpQueryVariables = {
  pagination: PaginationInput;
  filter?: string;
};

export type FollowUpSituacao = {
  id: string;
  codigo: string;
  nome: string;
  descricaoObrigatoria: boolean;
  textoPadrao: string;
  tempoTrava: number;
};

export type AutocompleteSituacaoFollowUpData = {
  situacoes: {
    items: Array<{
      node: FollowUpSituacao;
    }>;
    pageInfo: {
      totalItems: number;
      hasNextPage: boolean;
    };
  };
};
