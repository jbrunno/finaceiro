import { ClienteContatosEmailTable } from '@/shared/components/ClienteContato/components/ClienteContatosEmailTable/ClienteContatosEmailTable';
import { ClienteContatosEmail } from '@/shared/components/ClienteContato/components/ClienteContatosEmailTable/ClienteContatosEmailTable.gql';
import { ClienteContatosEnderecoTable } from '@/shared/components/ClienteContato/components/ClienteContatosEnderecoTable/ClienteContatosEnderecoTable';
import { ClienteContatosEndereco } from '@/shared/components/ClienteContato/components/ClienteContatosEnderecoTable/ClienteContatosEnderecoTable.gql';
import { ClienteContatosTelefoneTable } from '@/shared/components/ClienteContato/components/ClienteContatosTelefoneTable/ClienteContatosTelefoneTable';
import { ClienteContatosTelefone } from '@/shared/components/ClienteContato/components/ClienteContatosTelefoneTable/ClienteContatosTelefoneTable.gql';
import { ClienteInfoCard } from '@/shared/components/ClienteInfoCard/ClienteInfoCard';
import { ClienteInfoData } from '@/shared/components/ClienteInfoCard/ClienteInfoCard.gql';
import { FollowUpCard } from '@/shared/components/FollowUpCard/FollowUpCard';
import {
  ClienteFollowUps,
  SituacoesFollowUp,
} from '@/shared/components/FollowUpCard/FollowUpCard.gql';
import { TituloCard } from '@/shared/components/TituloCard/TituloCard';
import { TituloQuestionario } from '@/shared/components/TituloCard/TituloCard.gql';
import { gql } from '@apollo/client';

export const CLIENTE_DETALHES_QUERY = gql`
  query Cliente($clienteId: String!) {
    cliente(id: $clienteId) {
      ...CLIENTE_INFO_FRAGMENT
    }
  }

  ${ClienteInfoCard.fragments.cliente}
`;

export const CLIENTE_CONTATO_EMAILS_QUERY = gql`
  query Emails($id: String!, $pagination: PaginationInput!) {
    emails(id: $id, pagination: $pagination) {
      items {
        node {
          ...CLIENTE_CONTATO_EMAIL_FRAGMENT
        }
      }
      pageInfo {
        totalItems
        hasNextPage
      }
    }
  }
  ${ClienteContatosEmailTable.fragments.emails}
`;

export const CLIENTE_CONTATO_TELEFONES_QUERY = gql`
  query Telefones($id: String!, $pagination: PaginationInput!) {
    telefones(id: $id, pagination: $pagination) {
      items {
        node {
          ...CLIENTE_CONTATO_TELEFONE_FRAGMENT
        }
      }
      pageInfo {
        totalItems
        hasNextPage
      }
    }
  }
  ${ClienteContatosTelefoneTable.fragments.telefones}
`;

export const CLIENTE_CONTATO_ENDERECOS_QUERY = gql`
  query Enderecos($id: String!, $pagination: PaginationInput!) {
    enderecos(id: $id, pagination: $pagination) {
      items {
        node {
          ...CLIENTE_CONTATO_ENDERECO_FRAGMENT
        }
      }
      pageInfo {
        totalItems
        hasNextPage
      }
    }
  }
  ${ClienteContatosEnderecoTable.fragments.enderecos}
`;

export const CLIENTE_TITULOS_QUERY = gql`
  query Titulos($clienteId: String!) {
    titulos(id: $clienteId) {
      items {
        node {
          id
          assinatura
          tituloQuestionario {
            ...CLIENTE_TITULO_FRAGMENT
          }
        }
      }
    }
  }

  ${TituloCard.fragments.tituloQuestionario}
`;

export const CLIENTE_FOLLOWUPS_QUERY = gql`
  query FollowUps($clienteId: String!, $pagination: PaginationInput!) {
    followUps(id: $clienteId, pagination: $pagination) {
      items {
        node {
          ...CLIENTE_FOLLOWUPS_FRAGMENT
        }
      }
      pageInfo {
        totalItems
        hasNextPage
      }
    }
  }

  ${FollowUpCard.fragments.followps}
`;

export const SITUACOES_FOLLOWUP_QUERY = gql`
  query SituacoesFollowUp($keyword: String, $pagination: PaginationInput!) {
    situacoesFollowUp(keyword: $keyword, pagination: $pagination) {
      items {
        node {
          ...SITUACOES_FOLLOWUPS_FRAGMENT
        }
      }
      pageInfo {
        totalItems
        hasNextPage
      }
    }
  }

  ${FollowUpCard.fragments.situacoes}
`;

export type PaginationInput = {
  pageNumber: number;
  pageSize: number;
};

type PaginationData<T> = {
  items: Array<{
    node: T;
  }>;
  pageInfo: {
    totalItems: number;
    hasNextPage: boolean;
  };
};

export type ClienteDetalhesQueryVariables = {
  clienteId: string;
};

export type ClienteDetalhesData = {
  cliente: ClienteInfoData;
};

export type ClienteContatoQueryVariables = {
  id: string;
  pagination: PaginationInput;
};

export type ClienteContatoTelefoneData = {
  telefones: PaginationData<ClienteContatosTelefone>;
};

export type ClienteContatoEnderecoData = {
  enderecos: PaginationData<ClienteContatosEndereco>;
};

export type ClienteContatoEmailsData = {
  emails: PaginationData<ClienteContatosEmail>;
};

export type TitulosQueryVariables = {
  clienteId: string;
};

export type TituloData = {
  titulos: {
    items: Array<{
      node: {
        id: string;
        assinatura: boolean;
        tituloQuestionario: TituloQuestionario;
      };
    }>;
  };
};

export type ClienteFollowUpsQueryVariables = {
  clienteId: string;
  pagination: PaginationInput;
};

export type SituacoesFollowUpsQueryVariables = {
  keyword?: string;
  pagination: PaginationInput;
};

export type ClienteFollowUpsData = {
  followUps: PaginationData<ClienteFollowUps>;
};

export type SituacoesFollowUpData = {
  situacoesFollowUp: PaginationData<SituacoesFollowUp>;
};
