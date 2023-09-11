import { TextField, Autocomplete } from '@frontend/components';
import { Clear } from '@frontend/icons';
import { Dispatch, SetStateAction } from 'react';
import { useAutocompleteSituacaoFollowUp } from './hooks/useAutocompleteSituacaoFollowUp';

export type FollowUpSituacao = {
  id: string;
  codigo: number;
  nome: string;
  descricaoObrigatoria: boolean;
  textoPadrao: string;
  tempoTrava: number;
};

export type AutocompleteSituacaoFollowUpProps = {
  label?: string;
  initialValue?: FollowUpSituacao | null;
  situacoes?: FollowUpSituacao[];
  onChange: (value: FollowUpSituacao | null) => void;
  filterSituacoes: Dispatch<SetStateAction<string | undefined>>;
};

export function AutocompleteSituacaoFollowUp({
  onChange,
  initialValue,
  label,
  situacoes,
  filterSituacoes,
}: AutocompleteSituacaoFollowUpProps) {
  const { handleSelectValue, handleClear, filterOptions, value } =
    useAutocompleteSituacaoFollowUp({
      onChange,
      initialValue,
    });

  return (
    <Autocomplete
      autoSelect
      autoComplete
      value={value}
      loading={!situacoes}
      options={situacoes || []}
      loadingText="Carregando..."
      filterOptions={filterOptions}
      clearIcon={<Clear onClick={handleClear} fontSize="small" />}
      noOptionsText="Nada encontrado"
      getOptionLabel={(situacoes) =>
        typeof situacoes === 'string' ? situacoes : situacoes.nome
      }
      isOptionEqualToValue={(option, valueArgs) => option.id === valueArgs.id}
      onChange={(e, value) => {
        if (value && !Array.isArray(value) && typeof value !== 'string') {
          handleSelectValue(value);
        }
      }}
      onInputChange={(_, inputValue) => filterSituacoes(inputValue)}
      renderInput={(params) => (
        <TextField {...params} size="small" label={label} variant="outlined" />
      )}
    />
  );
}
