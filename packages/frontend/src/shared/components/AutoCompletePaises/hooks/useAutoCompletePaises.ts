import { AutocompleteValue } from '@mui/material';
import { useState } from 'react';
import { PaisData } from '../../ClienteContato/components/ClienteContatosDialog/components/ClienteContatosEnderecoEdit/ClienteContatosEnderecoEdit.gql';

export type AutoCompletePaisesProps = {
  onChange: (value: PaisData | null) => void;
};

export const useAutoCompletePaises = ({
  onChange,
}: AutoCompletePaisesProps) => {
  const [value, setValue] = useState<PaisData | null>(null);

  const handleSelectValue = (
    pais: AutocompleteValue<PaisData, false, false, false>,
  ) => {
    setValue(pais);
    if (pais) {
      onChange(pais);
    }
  };

  return {
    handleSelectValue,
    value,
  };
};
