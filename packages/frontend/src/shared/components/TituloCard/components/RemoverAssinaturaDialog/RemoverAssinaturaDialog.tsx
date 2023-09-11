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
} from './RemoverAssinaturaDialog.styles';
import {
  FormFields,
  UseRemoverAssinaturaDialogProps,
  useRemoverAssinaturaDialog,
} from './hooks/useRemoverAssinaturaDialog';

type RemoverAssinaturaDialogProps = UseRemoverAssinaturaDialogProps & {
  open: boolean;
};

export function RemoverAssinaturaDialog({
  onClose,
  open,
  tituloId,
  refetch,
}: RemoverAssinaturaDialogProps) {
  const {
    formik,
    handleClose,
    isDisableSubmit,
    isMotivoError,
    isSenhaSupervisorError,
    isUsuarioSupervisorError,
  } = useRemoverAssinaturaDialog({
    onClose,
    tituloId,
    refetch,
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <GridStyled container>
        <GridTitle item xs={12} alignItems="center" justifyContent="center">
          <Typography variant="h3" textAlign="center">
            Remover status de assinatura do contrato?
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
                label="Motivo da remoção"
                size="small"
                fullWidth
                value={formik.values.motivo}
                onChange={formik.handleChange(FormFields.motivo)}
                onBlur={formik.handleBlur(FormFields.motivo)}
                error={isMotivoError}
                errorText={formik.errors.motivo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Usuário do supervisor"
                size="small"
                fullWidth
                value={formik.values.usuarioSupervisor}
                onChange={formik.handleChange(FormFields.usuarioSupervisor)}
                onBlur={formik.handleBlur(FormFields.usuarioSupervisor)}
                error={isUsuarioSupervisorError}
                errorText={formik.errors.usuarioSupervisor}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordField
                label="Senha do supervisor"
                size="small"
                fullWidth
                value={formik.values.senhaSupervisor}
                onChange={formik.handleChange(FormFields.senhaSupervisor)}
                onBlur={formik.handleBlur(FormFields.senhaSupervisor)}
                error={isSenhaSupervisorError}
                errorText={formik.errors.senhaSupervisor}
              />
            </Grid>
          </GridForm>
          <GridSubmit item xs={12} alignItems="center" justifyContent="center">
            <ButtonLoading
              type="submit"
              variant="contained"
              color="primary"
              disabled={isDisableSubmit}
              isLoading={false}
              fullWidth
            >
              Remover
            </ButtonLoading>
          </GridSubmit>
        </form>
      </GridStyled>
    </Dialog>
  );
}
