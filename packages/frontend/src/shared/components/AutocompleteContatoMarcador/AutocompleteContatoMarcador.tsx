import { FocusEvent } from 'react';
import { ContatoMarcadorEnum, CONTATO_MARCADOR } from '@/shared/constants';
import {
  Autocomplete,
  AutocompleteProps,
  TextField,
} from '@frontend/components';

type AutocompleteContatoMarcadorProps = {
  label: string;
  error?: string;
  value: string | null;
  size?: AutocompleteProps<any>['size'];
  onChange: (value: string) => void;
  onBlur?: (value: FocusEvent<HTMLInputElement>) => void;
  className?: string;
};

const options = Object.keys(CONTATO_MARCADOR).map((key) => ({
  label: CONTATO_MARCADOR[key as keyof typeof ContatoMarcadorEnum],
  value: key,
}));

export function AutocompleteContatoMarcador({
  label,
  error,
  value,
  size,
  onChange,
  onBlur,
  className,
}: AutocompleteContatoMarcadorProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Autocomplete
      className={className}
      onBlur={onBlur}
      options={options}
      value={selectedOption}
      disableClearable
      size={size}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.label
      }
      onChange={(event, newValue) => {
        if (
          newValue &&
          !Array.isArray(newValue) &&
          typeof newValue !== 'string'
        ) {
          onChange(newValue.value);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!error}
          helperText={error}
          variant="outlined"
          inputProps={params.inputProps}
        />
      )}
    />
  );
}
