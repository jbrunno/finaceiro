import {
  ButtonLoading,
  Dialog,
  Grid,
  PasswordField,
  TextField,
  Typography,
} from '@frontend/components';
import {
  GridForm,
  GridStyled,
  GridSubmit,
  GridTitle,
} from './AdicionarAssinaturaDialog.styles';
import {
  FormFields,
  useAdicionarAssinaturaDialog,
} from './hooks/useAdicionarAssinaturaDialog';

type AdicionarAssinaturaDialogProps = {
  onClose: () => void;
  open: boolean;
  tituloId?: string | null;
};
export function AdicionarAssinaturaDialog({
  onClose,
  open,
  tituloId,
}: AdicionarAssinaturaDialogProps) {
  const { formik, handleClose } = useAdicionarAssinaturaDialog({
    onClose,
    tituloId,
  });
  return (
    <Dialog open={open} onClose={handleClose}>
      <GridStyled container>
        <GridTitle item xs={12} alignItems="center" justifyContent="center">
          <Typography variant="h3" textAlign="center">
            Confirmar assinatura do contrato?
          </Typography>
        </GridTitle>
        <form onSubmit={formik.handleSubmit}>
          <GridForm
            item
            xs={12}
            alignItems="center"
            justifyContent="center"
            gap={3}
            container
          >
            <Grid item xs={12}>
              <TextField
                label="Usuário"
                size="small"
                fullWidth
                value={formik.values.usuario}
                onChange={formik.handleChange(FormFields.usuario)}
                onBlur={formik.handleBlur(FormFields.usuario)}
                error={!!(formik.touched.usuario && formik.errors.usuario)}
                errorText={formik.errors.usuario}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordField
                label="Senha"
                size="small"
                fullWidth
                value={formik.values.senha}
                onChange={formik.handleChange(FormFields.senha)}
                onBlur={formik.handleBlur(FormFields.senha)}
                error={!!(formik.touched.senha && formik.errors.senha)}
                errorText={formik.errors.senha}
              />
            </Grid>
          </GridForm>
          <GridSubmit item xs={12} alignItems="center" justifyContent="center">
            <ButtonLoading
              type="submit"
              variant="contained"
              color="primary"
              disabled={!formik.values.usuario || !formik.values.senha}
              isLoading={false}
              fullWidth
            >
              Confirmar
            </ButtonLoading>
          </GridSubmit>
        </form>
      </GridStyled>
    </Dialog>
  );
}
