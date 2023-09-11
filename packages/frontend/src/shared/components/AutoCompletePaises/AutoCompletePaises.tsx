import { Autocomplete, TextField } from '@frontend/components';
import { PaisData } from '../ClienteContato/components/ClienteContatosDialog/components/ClienteContatosEnderecoEdit/ClienteContatosEnderecoEdit.gql';
import { useAutoCompletePaises } from './hooks/useAutoCompletePaises';

type AutoCompletePaisesProps = {
  descricao: string;
  paises: Array<PaisData>;
  onChange: (value: PaisData | null) => void;
};
export function AutoCompletePaises({
  descricao,
  paises,
  onChange,
}: AutoCompletePaisesProps) {
  const { handleSelectValue } = useAutoCompletePaises({ onChange });
  return (
    <Autocomplete
      disableClearable
      value={descricao}
      options={paises.map((pais) => ({ id: pais.id, label: pais.descricao }))}
      noOptionsText="País não localizado"
      renderInput={(params) => <TextField {...params} size="small" />}
      onChange={(_, pais) => {
        if (pais && !Array.isArray(pais) && typeof pais !== 'string') {
          handleSelectValue({ id: pais.id, descricao: pais.label });
        }
      }}
    />
  );
}
