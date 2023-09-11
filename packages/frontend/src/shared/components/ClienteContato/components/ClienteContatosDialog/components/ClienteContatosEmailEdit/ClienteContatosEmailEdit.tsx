import { Button, ButtonLoading, TextField } from '@frontend/components';
import {
  FormFields,
  useClienteContatosEmailEdit,
  UseClienteContatosEmailEditProps,
} from './hooks/useClienteContatosEmailEdit';
import {
  AutocompleteContatoMarcadorStyled,
  ClassficacaoWrapper,
  ContatoRatingStyled,
  RowActionsStyled,
  RowFormStyled,
} from './ClienteContatosEmailEdit.styles';

type ClienteContatosEmailEditProps = {
  onCancelAction: () => void;
  onClick?: () => void;
  onSaved?: () => void;
} & UseClienteContatosEmailEditProps;

export function ClienteContatosEmailEdit({
  contatoEmail,
  showActions = false,
  onCancelAction,
  onClick,
  onSaved,
  refetch,
}: ClienteContatosEmailEditProps) {
  const { formik, loading } = useClienteContatosEmailEdit({
    contatoEmail,
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
        <TextField
          inputProps={{ readOnly: !!contatoEmail }}
          variant="outlined"
          size="small"
          label="E-mail"
          color={contatoEmail ? 'secondary' : 'primary'}
          value={formik.values.email}
          onBlur={formik.handleBlur(FormFields.email)}
          onChange={formik.handleChange(FormFields.email)}
          error={!!(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          focused={contatoEmail ? true : undefined}
        />
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
            {contatoEmail ? 'Salvar alterações' : 'Salvar novo e-mail'}
          </ButtonLoading>
        </RowActionsStyled>
      )}
    </form>
  );
}
