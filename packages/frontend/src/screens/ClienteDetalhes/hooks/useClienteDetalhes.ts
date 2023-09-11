import { DASHBOARD } from '@/router/routes';
import { useQuery } from '@apollo/client';
import { deepMerge } from '@frontend/utils';
import { useEffect, useState } from 'react';
import { useObjectState, useRoute } from '@frontend/hooks';
import { useParams } from 'react-router-dom';
import {
  ClienteContatoEmailsData,
  ClienteContatoEnderecoData,
  ClienteContatoQueryVariables,
  ClienteContatoTelefoneData,
  ClienteDetalhesData,
  ClienteDetalhesQueryVariables,
  CLIENTE_CONTATO_EMAILS_QUERY,
  CLIENTE_CONTATO_ENDERECOS_QUERY,
  CLIENTE_CONTATO_TELEFONES_QUERY,
  CLIENTE_DETALHES_QUERY,
  TitulosQueryVariables,
  CLIENTE_TITULOS_QUERY,
  TituloData,
  ClienteFollowUpsQueryVariables,
  ClienteFollowUpsData,
  SituacoesFollowUpData,
  SituacoesFollowUpsQueryVariables,
  SITUACOES_FOLLOWUP_QUERY,
  CLIENTE_FOLLOWUPS_QUERY,
} from '../ClienteDetalhes.gql';

const initialPageState = {
  emails: 1,
  telefones: 1,
  enderecos: 1,
};

type Contato = Partial<ClienteContatoEmailsData> &
  Partial<ClienteContatoTelefoneData> &
  Partial<ClienteContatoEnderecoData>;

export function useClienteDetalhes() {
  const { open: openDashboard, route } = useRoute(DASHBOARD);
  const [page, setPage] = useObjectState(initialPageState);
  const [contato, setContato] = useObjectState<Contato>({
    emails: undefined,
    telefones: undefined,
    enderecos: undefined,
  });
  const [situacoesKeyword, setSituacoesKeyword] = useState<
    string | undefined
  >();
  const { clienteId } = useParams();

  if (!clienteId) {
    openDashboard();
  }

  const { data, loading } = useQuery<
    ClienteDetalhesData,
    ClienteDetalhesQueryVariables
  >(CLIENTE_DETALHES_QUERY, {
    variables: {
      clienteId: clienteId || '',
    },
  });

  const emails = useQuery<
    ClienteContatoEmailsData,
    ClienteContatoQueryVariables
  >(CLIENTE_CONTATO_EMAILS_QUERY, {
    variables: {
      id: String(clienteId),
      pagination: {
        pageNumber: page.emails,
        pageSize: 10,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const enderecos = useQuery<
    ClienteContatoEnderecoData,
    ClienteContatoQueryVariables
  >(CLIENTE_CONTATO_ENDERECOS_QUERY, {
    variables: {
      id: String(clienteId),
      pagination: {
        pageNumber: page.enderecos,
        pageSize: 10,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const telefones = useQuery<
    ClienteContatoTelefoneData,
    ClienteContatoQueryVariables
  >(CLIENTE_CONTATO_TELEFONES_QUERY, {
    variables: {
      id: String(clienteId),
      pagination: {
        pageNumber: page.telefones,
        pageSize: 10,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const titulos = useQuery<TituloData, TitulosQueryVariables>(
    CLIENTE_TITULOS_QUERY,
    {
      variables: {
        clienteId: clienteId || '',
      },
      fetchPolicy: 'cache-and-network',
    },
  );

  const clienteFollowUps = useQuery<
    ClienteFollowUpsData,
    ClienteFollowUpsQueryVariables
  >(CLIENTE_FOLLOWUPS_QUERY, {
    variables: {
      clienteId: String(clienteId),
      pagination: {
        pageNumber: 1,
        pageSize: 10,
      },
    },
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      if (data.followUps.pageInfo.hasNextPage) {
        clienteFollowUps.refetch({
          pagination: {
            pageNumber: 1,
            pageSize: data.followUps.pageInfo.totalItems || 10,
          },
        });
      }
    },
  });

  const situacoesFollowUp = useQuery<
    SituacoesFollowUpData,
    SituacoesFollowUpsQueryVariables
  >(SITUACOES_FOLLOWUP_QUERY, {
    variables: {
      keyword: situacoesKeyword,
      pagination: {
        pageNumber: 1,
        pageSize: 10,
      },
    },
    onCompleted(data) {
      if (data.situacoesFollowUp.pageInfo.hasNextPage) {
        situacoesFollowUp.refetch({
          pagination: {
            pageNumber: 1,
            pageSize: data.situacoesFollowUp.pageInfo.totalItems || 10,
          },
        });
      }
    },
    fetchPolicy: 'cache-and-network',
  });

  const refetch = (
    target: 'emails' | 'telefones' | 'enderecos' | 'titulos',
  ) => {
    const query = { emails, telefones, enderecos, titulos };
    setPage({ [target]: 1 });

    query[target].refetch({
      id: String(clienteId),
      pagination: {
        pageNumber: 1,
        pageSize: 10,
      },
    });
  };

  const loadMore = (target: 'emails' | 'telefones' | 'enderecos') => {
    const query = {
      emails,
      telefones,
      enderecos,
    };

    query[target].fetchMore({
      variables: {
        pagination: {
          pageNumber: page[target] + 1,
          pageSize: 10,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return deepMerge(prev, fetchMoreResult);
      },
    });

    setPage((page) => ({ [target]: Number(page[target]) + 1 }));
  };

  useEffect(() => {
    if (enderecos.data) {
      setContato({
        enderecos: enderecos.data.enderecos,
      });
    }
    if (emails.data) {
      setContato({
        emails: emails.data.emails,
      });
    }
    if (telefones.data) {
      setContato({
        telefones: telefones.data.telefones,
      });
    }
  }, [telefones.data, emails.data, enderecos.data]);

  useEffect(() => {
    situacoesFollowUp.refetch({
      keyword: situacoesKeyword,
      pagination: {
        pageNumber: 1,
        pageSize:
          situacoesFollowUp.data?.situacoesFollowUp.pageInfo.totalItems || 10,
      },
    });
  }, [situacoesKeyword]);

  const isLoading = [
    loading,
    emails.loading,
    enderecos.loading,
    telefones.loading,
    titulos.loading,
  ].includes(true);

  return {
    followps: {
      items: clienteFollowUps.data?.followUps.items.map(
        (followUp) => followUp.node,
      ),
      situacoes: situacoesFollowUp.data?.situacoesFollowUp.items.map(
        (situacao) => situacao.node,
      ),
      setSituacoesKeyword,
    },
    titulo: titulos.data?.titulos.items.at(0)?.node || null,
    cliente: data?.cliente
      ? {
          ...data?.cliente,
          contato: contato as Required<Contato>,
        }
      : undefined,
    loading: isLoading,
    loadMore,
    refetch,
    route,
    openDashboard,
  };
}
