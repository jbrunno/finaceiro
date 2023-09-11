import { useLazyQuery } from '@frontend/hooks';
import { deepMerge } from '@frontend/utils';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BuscaData, BuscaQueryVariables, BUSCA_QUERY } from '../Busca.gql';

export const useBusca = () => {
  const [params] = useSearchParams();
  const searchParam = params.get('search');
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState<BuscaData | undefined>(undefined);
  const [getClientes, { data: clientesData, loading, fetchMore }] =
    useLazyQuery<BuscaData, BuscaQueryVariables>(BUSCA_QUERY);

  useEffect(() => {
    if (searchParam) {
      getClientes({
        keyword: searchParam || '',
        pagination: {
          pageNumber,
          pageSize: 10,
        },
      });
    }
  }, [searchParam]);

  useEffect(() => {
    if (clientesData && searchParam) {
      setData(clientesData);
    } else {
      setData(undefined);
    }
  }, [clientesData, searchParam]);

  const loadMore = () => {
    fetchMore({
      variables: {
        pagination: {
          pageNumber: pageNumber + 1,
          pageSize: 10,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return deepMerge(prev, fetchMoreResult);
      },
    });
    setPageNumber(pageNumber + 1);
  };

  return {
    data,
    loading,
    searchParam,
    loadMore,
  };
};
