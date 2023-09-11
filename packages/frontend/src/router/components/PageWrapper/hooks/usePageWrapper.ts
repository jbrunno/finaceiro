import { useEffect, useState } from 'react';
import { BUSCA } from '@/router/routes';
import { useRoute } from '@frontend/hooks';
import { useMatch } from 'react-router';
import { useSearchParams } from 'react-router-dom';

export const usePageWrapper = () => {
  const { open } = useRoute(BUSCA);

  const [params] = useSearchParams();
  const searchParam = params.get('search');
  const [search, setSearch] = useState<string | null>(searchParam);

  const match = useMatch({ path: BUSCA });

  useEffect(() => {
    if (match) {
      setSearch(searchParam);
      handleSearch(searchParam);
    }
  }, [searchParam]);

  const handleSearch = (value: string | null) => {
    if (!value || value.length > 2) {
      open({ query: { search: value || '' } });
    }
  };

  const handleClear = () => {
    setSearch(null);
    handleSearch(null);
  };

  return {
    search,
    handleClear,
    handleSearch,
  };
};
