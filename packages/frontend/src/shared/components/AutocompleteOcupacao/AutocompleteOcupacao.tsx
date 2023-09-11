import { TextField, Autocomplete } from '@frontend/components';
import {
  AutocompleteOcupacaoProps,
  useAutocompleteOcupacao,
} from './hooks/useAutocompleteOcupacao';

export function AutocompleteOcupacao(props: AutocompleteOcupacaoProps) {
  const {
    handleSelectValue,
    loadOcupacoes,
    filterOptions,
    loading,
    label,
    ocupacoes,
    value,
  } = useAutocompleteOcupacao(props);

  return (
    <Autocomplete
      value={value}
      autoSelect
      autoComplete
      loading={loading}
      options={ocupacoes}
      loadingText="Carregando..."
      filterOptions={filterOptions}
      noOptionsText="Nada encontrado"
      onClose={() => loadOcupacoes(value?.ocupacao)}
      getOptionLabel={(cbo) => (typeof cbo === 'string' ? cbo : cbo.ocupacao)}
      isOptionEqualToValue={(option, valueArgs) =>
        option.codigo === valueArgs.codigo
      }
      onChange={(_, cbo) => {
        if (cbo && !Array.isArray(cbo) && typeof cbo !== 'string') {
          handleSelectValue(cbo);
        }
      }}
      onInputChange={(_, inputValue) => loadOcupacoes(inputValue)}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
}
