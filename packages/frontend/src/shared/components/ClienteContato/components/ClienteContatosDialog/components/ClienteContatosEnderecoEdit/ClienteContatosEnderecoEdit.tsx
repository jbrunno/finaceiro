import {
  Button,
  ButtonLoading,
  TextField,
  Typography,
} from '@frontend/components';
import { formatCep } from '@frontend/utils';
import { AutoCompletePaises } from '@/shared/components/AutoCompletePaises/AutoCompletePaises';
import {
  AutocompleteContatoMarcadorStyled,
  ClassficacaoWrapper,
  ContatoRatingStyled,
  LabelNovoCadastro,
  RowActionsStyled,
  RowFormStyled,
  TextFieldGroup,
  TextFieldGroupLabel,
} from './ClienteContatosEnderecoEdit.styles';
import {
  FormFields,
  UseClienteContatosEnderecoEditProps,
  useClienteContatosEnderecoEdit,
} from './hooks/useClienteContatosEnderecoEdit';

type ClienteContatosEnderecoEditProps = {
  onCancelAction: () => void;
  onClick?: () => void;
  onSaved?: () => void;
} & UseClienteContatosEnderecoEditProps;

export function ClienteContatosEnderecoEdit({
  contatoEndereco,
  showActions = false,
  onCancelAction,
  onClick,
  onSaved,
  refetch,
}: ClienteContatosEnderecoEditProps) {
  const { formik, loading, paises, value, setValue, maxLength } =
    useClienteContatosEnderecoEdit({
      contatoEndereco,
      showActions,
      onSaved,
      refetch,
    });

  return (
    <form onSubmit={formik.handleSubmit}>
      <RowFormStyled onClick={onClick}>
        <TextField
          variant="outlined"
          label="Nome do contato"
          size="small"
          value={formik.values.nome}
          onBlur={formik.handleBlur(FormFields.nome)}
          onChange={formik.handleChange(FormFields.nome)}
          error={!!(formik.touched.nome && formik.errors.nome)}
          helperText={formik.touched.nome && formik.errors.nome}
        />
        <AutocompleteContatoMarcadorStyled
          label="Marcador"
          size="small"
          value={formik.values.marcador}
          onBlur={formik.handleBlur(FormFields.marcador)}
          onChange={(value) => formik.setFieldValue(FormFields.marcador, value)}
          error={(formik.touched.marcador && formik.errors.marcador) || ''}
        />
        <TextFieldGroup disabled={!!contatoEndereco}>
          <TextFieldGroupLabel
            variant="inputLabel"
            color={contatoEndereco ? 'secondary' : 'primary'}
          >
            Endereço
          </TextFieldGroupLabel>
          {showActions && !contatoEndereco ? (
            <>
              <LabelNovoCadastro variant="inputText">
                Cadastrar novo endereço
              </LabelNovoCadastro>
              <AutoCompletePaises
                onChange={(value) => {
                  if (value) {
                    setValue(value);
                  }
                }}
                descricao={value.descricao}
                paises={paises}
              />
              <TextField
                variant="outlined"
                label="CEP"
                size="small"
                value={formik.values.cep}
                onBlur={formik.handleBlur(FormFields.cep)}
                onChange={formik.handleChange(FormFields.cep)}
                error={!!(formik.touched.cep && formik.errors.cep)}
                helperText={formik.touched.cep && formik.errors.cep}
              />
              <TextField
                variant="outlined"
                label="Endereço"
                size="small"
                value={formik.values.logradouro}
                onBlur={formik.handleBlur(FormFields.logradouro)}
                onChange={formik.handleChange(FormFields.logradouro)}
                error={
                  !!(formik.touched.logradouro && formik.errors.logradouro)
                }
                helperText={
                  formik.touched.logradouro && formik.errors.logradouro
                }
              />
              <TextField
                variant="outlined"
                label="Número"
                size="small"
                value={formik.values.numero}
                onBlur={formik.handleBlur(FormFields.numero)}
                onChange={formik.handleChange(FormFields.numero)}
                error={!!(formik.touched.numero && formik.errors.numero)}
                helperText={formik.touched.numero && formik.errors.numero}
              />
              <TextField
                variant="outlined"
                label="Bairro"
                size="small"
                value={formik.values.bairro}
                onBlur={formik.handleBlur(FormFields.bairro)}
                onChange={formik.handleChange(FormFields.bairro)}
                error={!!(formik.touched.bairro && formik.errors.bairro)}
                helperText={formik.touched.bairro && formik.errors.bairro}
              />
              <TextField
                variant="outlined"
                label="Estado"
                size="small"
                value={formik.values.uf}
                onBlur={formik.handleBlur(FormFields.uf)}
                onChange={formik.handleChange(FormFields.uf)}
                error={!!(formik.touched.uf && formik.errors.uf)}
                helperText={formik.touched.uf && formik.errors.uf}
                inputProps={{ maxLength }}
              />
              <TextField
                variant="outlined"
                label="Cidade"
                size="small"
                value={formik.values.cidade}
                onBlur={formik.handleBlur(FormFields.cidade)}
                onChange={formik.handleChange(FormFields.cidade)}
                error={!!(formik.touched.cidade && formik.errors.cidade)}
                helperText={formik.touched.cidade && formik.errors.cidade}
              />
              <TextField
                variant="outlined"
                label="Complemento"
                size="small"
                value={formik.values.complemento}
                onBlur={formik.handleBlur(FormFields.complemento)}
                onChange={formik.handleChange(FormFields.complemento)}
                error={
                  !!(formik.touched.complemento && formik.errors.complemento)
                }
                helperText={
                  formik.touched.complemento && formik.errors.complemento
                }
              />
            </>
          ) : (
            <Typography variant="inputText">
              {formik.values.logradouro}, {formik.values.numero}
              <br />
              {formik.values.bairro}
              <br />
              {formik.values.cidade}, {formik.values.uf}
              <br />
              {formatCep(formik.values.cep)}
              <br />
              {contatoEndereco?.pais.descricao}
            </Typography>
          )}
        </TextFieldGroup>

        <ClassficacaoWrapper>
          <ContatoRatingStyled
            value={formik.values.classificacao}
            onChange={(value) =>
              formik.setFieldValue(FormFields.classificacao, value)
            }
          />
        </ClassficacaoWrapper>
      </RowFormStyled>
      {showActions && (
        <RowActionsStyled>
          <Button
            size="medium"
            color="primary"
            variant="outlined"
            onClick={(event) => {
              formik.resetForm();
              event.preventDefault();
              onCancelAction?.();
            }}
          >
            Cancelar
          </Button>

          <ButtonLoading
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            isLoading={loading}
          >
            {contatoEndereco ? 'Salvar alterações' : 'Salvar novo endereço'}
          </ButtonLoading>
        </RowActionsStyled>
      )}
    </form>
  );
}
