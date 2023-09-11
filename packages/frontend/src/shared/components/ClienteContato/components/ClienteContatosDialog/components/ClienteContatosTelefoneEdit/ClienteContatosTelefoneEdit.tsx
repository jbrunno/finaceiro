import {
  Button,
  ButtonLoading,
  Checkbox,
  InternationalPhoneField,
  TextField,
} from '@frontend/components';
import {
  FormFields,
  useClienteContatosTelefoneEdit,
  UseClienteContatosTelefoneEditProps,
} from './hooks/useClienteContatosTelefoneEdit';
import {
  AutocompleteContatoMarcadorStyled,
  ClassficacaoWhatsappWrapper,
  ContatoRatingStyled,
  FormControlLabelStyled,
  RowActionsStyled,
  RowFormStyled,
} from './ClienteContatosTelefoneEdit.styles';

type ClienteContatosTelefoneEditProps = {
  onCancelAction: () => void;
  onClick?: () => void;
  onSaved?: () => void;
} & UseClienteContatosTelefoneEditProps;

export function ClienteContatosTelefoneEdit({
  contatoTelefone,
  showActions = false,
  onCancelAction,
  onClick,
  onSaved,
  refetch,
}: ClienteContatosTelefoneEditProps) {
  const { formik, loading } = useClienteContatosTelefoneEdit({
    contatoTelefone,
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
        <InternationalPhoneField
          disableDropdown={!!contatoTelefone}
          inputProps={{ readOnly: !!contatoTelefone }}
          size="small"
          color={contatoTelefone ? 'secondary' : 'primary'}
          value={formik.values.numero}
          onBlur={formik.handleBlur(FormFields.numero)}
          onChange={formik.handleChange(FormFields.numero)}
          focused={contatoTelefone ? true : undefined}
          country="br"
          specialLabel="Telefone"
          error={(formik.touched.numero && formik.errors.numero) || ''}
        />
        <ClassficacaoWhatsappWrapper>
          <ContatoRatingStyled
            value={formik.values.classificacao}
            onChange={(value) =>
              formik.setFieldValue(FormFields.classificacao, value)
            }
          />
          <FormControlLabelStyled
            control={
              <Checkbox
                color="primary"
                checked={formik.values.whatsapp}
                onChange={formik.handleChange(FormFields.whatsapp)}
              />
            }
            label="WhatsApp"
          />
        </ClassficacaoWhatsappWrapper>
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
            {contatoTelefone ? 'Salvar alterações' : 'Salvar novo contato'}
          </ButtonLoading>
        </RowActionsStyled>
      )}
    </form>
  );
}
