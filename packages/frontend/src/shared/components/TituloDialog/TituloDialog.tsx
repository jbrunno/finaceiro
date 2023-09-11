import {
  Dialog,
  FormControlLabel,
  Radio,
  Button,
  Tooltip,
  Typography,
  DialogContent,
} from '@frontend/components';
import { HelpOutline as HelpOutlineIcon } from '@frontend/icons';
import {
  FormFields,
  UseTituloDialogProps,
  useTituloDialog,
} from './hooks/useTituloDialog';
import {
  FormStyled,
  GridSyled,
  RadioButtonSyled,
  RadioGroupStyled,
  TextFieldStyled,
  ButtonGridSyled,
} from './TituloDialog.styled';

type TituloDialogProps = UseTituloDialogProps & {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

export function TituloDialog({
  open,
  onClose,
  onSaved,
  tituloId,
  tituloQuestionario,
  ...dialogProps
}: TituloDialogProps) {
  const { formik } = useTituloDialog({ onSaved, tituloId, tituloQuestionario });
  return (
    <Dialog
      {...dialogProps}
      maxWidth="xl"
      open={open}
      onClose={onClose}
      title="Informações do título"
    >
      <DialogContent>
        <FormStyled onSubmit={formik.handleSubmit}>
          <GridSyled>
            <TextFieldStyled
              variant="outlined"
              size="medium"
              label="Em qual site da FTX ocorreu o registro?"
              value={formik.values.siteRegistro}
              onBlur={formik.handleBlur(FormFields.siteRegistro)}
              onChange={formik.handleChange(FormFields.siteRegistro)}
              error={
                !!(formik.touched.siteRegistro && formik.errors.siteRegistro)
              }
              errorText={formik.errors[FormFields.siteRegistro]}
            />
            <Tooltip
              title="On what FTX website did the client registered?"
              arrow
            >
              <HelpOutlineIcon />
            </Tooltip>
          </GridSyled>
          <GridSyled>
            <RadioButtonSyled>
              <Typography variant="body1" color="textPrimary" paddingBottom={1}>
                O cliente mantinha uma conta digital com a FTX antes de
                11/11/2022?
              </Typography>
              <RadioGroupStyled
                name={FormFields.contaAnteriorFalencia}
                value={String(formik.values.contaAnteriorFalencia)}
                onChange={(event) => {
                  const value = event.target.value === 'true';
                  formik.setFieldValue(FormFields.contaAnteriorFalencia, value);
                }}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Sim"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Não"
                />
              </RadioGroupStyled>
            </RadioButtonSyled>
            <Tooltip
              title="Did the client maintain a diigital wallet with FTX before 11/11/2022?"
              arrow
            >
              <HelpOutlineIcon />
            </Tooltip>
          </GridSyled>
          <GridSyled>
            <TextFieldStyled
              variant="outlined"
              size="medium"
              label="Que tipo de conta o cliente se registrou na FTX?"
              value={formik.values.tipoConta}
              onBlur={formik.handleBlur(FormFields.tipoConta)}
              onChange={formik.handleChange(FormFields.tipoConta)}
              error={!!(formik.touched.tipoConta && formik.errors.tipoConta)}
              errorText={formik.errors[FormFields.tipoConta]}
            />
            <Tooltip
              title="What type of account did the client register for on FTX?"
              arrow
            >
              <HelpOutlineIcon />
            </Tooltip>
          </GridSyled>
          <GridSyled>
            <TextFieldStyled
              variant="outlined"
              size="medium"
              label="Que tipos de ativos foram usados para abrir a conta?"
              value={formik.values.tipoAtivoInvestido}
              onBlur={formik.handleBlur(FormFields.tipoAtivoInvestido)}
              onChange={formik.handleChange(FormFields.tipoAtivoInvestido)}
              error={
                !!(
                  formik.touched.tipoAtivoInvestido &&
                  formik.errors.tipoAtivoInvestido
                )
              }
              errorText={formik.errors[FormFields.tipoAtivoInvestido]}
            />
            <Tooltip
              title="What type of assets were used to open the account?"
              arrow
            >
              <HelpOutlineIcon />
            </Tooltip>
          </GridSyled>
          <GridSyled>
            <TextFieldStyled
              variant="outlined"
              size="medium"
              label="Qual era o valor aproximado dos depósitos na conta em 11/11/2022?"
              value={formik.values.valorDepositos}
              onBlur={formik.handleBlur(FormFields.valorDepositos)}
              onChange={formik.handleChange(FormFields.valorDepositos)}
              error={
                !!(
                  formik.touched.valorDepositos && formik.errors.valorDepositos
                )
              }
              errorText={formik.errors[FormFields.valorDepositos]}
            />
            <Tooltip
              title="What was the approximate value of  total deposits in the account on 11/11/2022?"
              arrow
            >
              <HelpOutlineIcon />
            </Tooltip>
          </GridSyled>
          <GridSyled>
            <TextFieldStyled
              variant="outlined"
              size="medium"
              label="Por favor, forneça qualquer outra informação adicional para verificar o pedido."
              value={formik.values.observacao}
              onBlur={formik.handleBlur(FormFields.observacao)}
              onChange={formik.handleChange(FormFields.observacao)}
              error={!!(formik.touched.observacao && formik.errors.observacao)}
              errorText={formik.errors[FormFields.observacao]}
            />
            <Tooltip
              title="Please provide any other supporting information to verify the claim."
              arrow
            >
              <HelpOutlineIcon />
            </Tooltip>
          </GridSyled>
        </FormStyled>
        <ButtonGridSyled>
          <Button
            onClick={formik.submitForm}
            size="large"
            variant="contained"
            color="primary"
            disabled={!formik.dirty}
          >
            Salvar informações
          </Button>
        </ButtonGridSyled>
      </DialogContent>
    </Dialog>
  );
}
