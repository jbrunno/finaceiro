import { AutocompleteValue, createFilterOptions } from '@frontend/components';
import { useLazyQuery } from '@frontend/hooks';
import { debounce } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  AutocompleteOcupacaoData,
  AutocompleteOcupacaoQueryVariables,
  AUTOCOMPLETE_OCUPACAO_QUERY,
} from '../AutocompleteOcupacao.gql';

export type Ocupacao = {
  id: string;
  codigo: string;
  ocupacao: string;
};

export type AutocompleteOcupacaoProps = {
  label?: string;
  initialValue?: Ocupacao | null;
  onChange: (value: Ocupacao | null) => void;
};

export const useAutocompleteOcupacao = ({
  label,
  onChange,
  initialValue,
}: AutocompleteOcupacaoProps) => {
  const [value, setValue] = useState<Ocupacao | null>(initialValue || null);

  const [getOcupacoes, { data: ocupacoesData, loading }] = useLazyQuery<
    AutocompleteOcupacaoData,
    AutocompleteOcupacaoQueryVariables
  >(AUTOCOMPLETE_OCUPACAO_QUERY);

  const loadOcupacoes = debounce((filter?: string) => {
    getOcupacoes({
      filter,
      pagination: {
        pageNumber: 1,
        pageSize: 10,
      },
    });
  }, 500);

  useEffect(() => {
    setValue(initialValue || null);
    loadOcupacoes(initialValue?.ocupacao);
  }, [initialValue]);

  const ocupacoes =
    ocupacoesData?.cbos.items.map(({ node }) => ({
      id: node.id,
      codigo: node.codigo,
      ocupacao: node.ocupacao,
    })) || [];

  const handleSelectValue = (
    cbo: AutocompleteValue<Ocupacao, false, false, false>,
  ) => {
    setValue(cbo);
    if (cbo) {
      onChange(cbo);
    }
  };

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    ignoreCase: true,
    ignoreAccents: true,
    stringify: (option: Ocupacao) => option.ocupacao,
  });

  return {
    handleSelectValue,
    loadOcupacoes,
    filterOptions,
    loading,
    label,
    ocupacoes,
    value,
  };
};
