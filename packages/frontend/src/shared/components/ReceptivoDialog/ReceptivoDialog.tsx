import {
  Typography,
  Dialog,
  DialogActions,
  DialogProps,
  FormControlLabel,
  Radio,
} from '@frontend/components';
import { ClienteTipoEnum } from '@/shared/constants';
import {
  ButtonStyled,
  Header,
  TextFieldStyled,
  RadioGroupStyled,
  StyledForm,
  InternationalPhoneFieldStyled,
  DialogContentStyled,
} from './ReceptivoDialog.styles';
import {
  FormFields,
  UseReceptivoDialogProps,
  useReceptivoDialog,
} from './hooks/useReceptivoDialog';

type ReceptivoDialogProps = {
  className?: string;
} & Omit<DialogProps, 'children'> &
  UseReceptivoDialogProps;

export function ReceptivoDialog({
  onClose,
  onSaved,
  ...dialogProps
}: ReceptivoDialogProps) {
  const { formik, typeInput, handleChangeDocumento, maxLength } =
    useReceptivoDialog({
      onSaved,
      onClose,
    });

  return (
    <Dialog {...dialogProps} onClose={onClose} maxWidth="xl">
      <DialogContentStyled>
        <Header>
          <Typography variant="h3" color="textPrimary">
            Atendimento Receptivo Iniciado
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Não encontramos um cliente associado a este telefone.
          </Typography>
        </Header>

        <StyledForm onSubmit={formik.handleSubmit}>
          <InternationalPhoneFieldStyled
            size="small"
            color="secondary"
            country="br"
            specialLabel="Telefone"
            value={formik.values.telefone}
            onBlur={formik.handleBlur(FormFields.telefone)}
            onChange={(value) =>
              formik.setFieldValue(FormFields.telefone, value)
            }
            error={(formik.touched.telefone && formik.errors.telefone) || ''}
          />
          <TextFieldStyled
            variant="outlined"
            label="Nome completo do cliente"
            size="small"
            value={formik.values.nome}
            onBlur={formik.handleBlur(FormFields.nome)}
            onChange={formik.handleChange(FormFields.nome)}
            error={!!(formik.touched.nome && formik.errors.nome)}
            errorText={formik.errors[FormFields.nome]}
          />
          <RadioGroupStyled
            name={FormFields.tipo}
            value={String(formik.values.tipo)}
            onChange={(e) => {
              formik.setFieldValue(FormFields.documento, '');
              formik.setFieldValue(FormFields.tipo, e.target.value);
            }}
          >
            <FormControlLabel
              value={ClienteTipoEnum.FISICA}
              control={<Radio color="primary" />}
              label="CPF"
            />
            <FormControlLabel
              value={ClienteTipoEnum.JURIDICA}
              control={<Radio color="primary" />}
              label="CNPJ"
            />
            <FormControlLabel
              value={ClienteTipoEnum.ESTRANGEIRA}
              control={<Radio color="primary" />}
              label="ID/Passaporte"
            />
          </RadioGroupStyled>
          <TextFieldStyled
            variant="outlined"
            label="CPF/CNPJ/ID ou Passaporte"
            size="small"
            value={formik.values.documento}
            onBlur={formik.handleBlur(FormFields.documento)}
            onChange={(value) => handleChangeDocumento(value.target.value)}
            type={typeInput}
            error={!!formik.errors.documento}
            errorText={formik.errors[FormFields.documento]}
            inputProps={{ maxLength }}
          />
        </StyledForm>
      </DialogContentStyled>
      <DialogActions>
        <ButtonStyled
          onClick={formik.submitForm}
          size="large"
          variant="contained"
          color="primary"
          disabled={!formik.dirty || (formik.dirty && !formik.isValid)}
        >
          Cadastrar cliente
        </ButtonStyled>
      </DialogActions>
    </Dialog>
  );
}
