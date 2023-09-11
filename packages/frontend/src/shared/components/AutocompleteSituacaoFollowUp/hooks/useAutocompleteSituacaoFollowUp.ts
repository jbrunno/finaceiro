import { AutocompleteValue, createFilterOptions } from '@frontend/components';
import { useEffect, useState } from 'react';
import {
  AutocompleteSituacaoFollowUpProps,
  FollowUpSituacao,
} from '../AutocompleteSituacaoFollowUp';

export const useAutocompleteSituacaoFollowUp = ({
  onChange,
  initialValue,
}: Omit<
  AutocompleteSituacaoFollowUpProps,
  'label' | 'situacoes' | 'filterSituacoes'
>) => {
  const [value, setValue] = useState<FollowUpSituacao | null>(null);

  useEffect(() => {
    setValue(initialValue || null);
  }, [initialValue]);

  const handleSelectValue = (
    situacao: AutocompleteValue<FollowUpSituacao, false, false, false>,
  ) => {
    if (situacao) {
      setValue(situacao);
      onChange(situacao);
    }
  };

  const handleClear = () => {
    setValue(null);
  };

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    ignoreCase: true,
    ignoreAccents: true,
    stringify: (option: FollowUpSituacao) => option.nome,
  });

  return {
    handleSelectValue,
    handleClear,
    filterOptions,
    value,
  };
};
