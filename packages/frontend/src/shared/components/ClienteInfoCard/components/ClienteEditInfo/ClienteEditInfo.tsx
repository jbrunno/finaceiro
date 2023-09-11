import {
  Box,
  Card,
  DatePicker,
  FormControlLabel,
  MenuItem,
  Radio,
  RenderComponents,
  TextField,
  Typography,
} from '@frontend/components';
import { OptionsSexo } from '@/shared/constants';
import { AutocompleteOcupacao } from '@/shared/components/AutocompleteOcupacao/AutocompleteOcupacao';
import { DateOnly } from '@frontend/utils';
import { ClienteTipoEnum } from '@frontend/types';
import {
  ButtonLoadingStyled,
  CardContentStyled,
  CardHeader,
  DialogActionsStyled,
  RadioGroupStyled,
  StyledForm,
  TextFieldStyled,
} from './ClienteEditInfo.styles';
import {
  ClienteEditFormFields,
  useClienteEditInfo,
} from './hooks/useClienteEditInfo';
import { Cliente } from './ClienteEditInfo.gql';

export type ClienteEditInfoProps = {
  cliente?: Cliente | null;
  onSuccess: () => void;
  screen: string;
};

export function ClienteEditInfo({
  onSuccess,
  screen,
  cliente,
}: ClienteEditInfoProps) {
  const { formik, maxLength, typeInput, handleChangeDocumento } =
    useClienteEditInfo({
      onSuccess,
      cliente,
    });

  return (
    <Card>
      <CardHeader>
        <Typography variant="h3">Informações básicas</Typography>
      </CardHeader>
      <CardContentStyled>
        <StyledForm onSubmit={formik.handleSubmit}>
          <RenderComponents screen={screen}>
            <TextField
              id="nomeRegistro"
              label="Nome de Registro"
              variant="outlined"
              size="small"
              value={formik.values.nome}
              onChange={formik.handleChange(ClienteEditFormFields.nome)}
              onBlur={formik.handleBlur(ClienteEditFormFields.nome)}
              error={!!(formik.touched.nome && formik.errors.nome)}
              w-perm="CLIENTE_INFO_EDIT_NOME_REGISTRO"
            />
            <TextField
              id="nomeSocial"
              label="Nome social"
              variant="outlined"
              size="small"
              value={formik.values.nomeSocial}
              onChange={formik.handleChange(ClienteEditFormFields.nomeSocial)}
              onBlur={formik.handleBlur(ClienteEditFormFields.nomeSocial)}
              w-perm="CLIENTE_INFO_EDIT_NOME_SOCIAL"
            />
            <DatePicker
              label="Data de Nascimento"
              disabled={cliente?.tipo === ClienteTipoEnum.JURIDICA}
              value={formik.values[
                ClienteEditFormFields.dataNascimento
              ].toJSDate()}
              onChange={(date) =>
                formik.setFieldValue(
                  ClienteEditFormFields.dataNascimento,
                  date && new DateOnly(date),
                )
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Data de Nascimento"
                  variant="outlined"
                />
              )}
              w-perm="CLIENTE_INFO_EDIT_DATA_NASCIMENTO_IDADE"
            />
            <TextField
              label="Sexo"
              select
              id="sexo"
              size="small"
              variant="outlined"
              value={formik.values.sexo}
              onChange={formik.handleChange(ClienteEditFormFields.sexo)}
              w-perm="CLIENTE_INFO_EDIT_SEXO"
            >
              {OptionsSexo.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <AutocompleteOcupacao
              label="Profissão"
              onChange={(ocupacao) => {
                if (ocupacao)
                  formik.setFieldValue(
                    ClienteEditFormFields.cboId,
                    ocupacao.id,
                  );
              }}
              initialValue={cliente?.cbo}
              w-perm="CLIENTE_INFO_EDIT_PROFISSAO"
            />
            <Box w-perm="CLIENTE_INFO_EDIT_FALECIDO">
              <Typography variant="subtitle2">O cliente é falecido?</Typography>
              <RadioGroupStyled
                name={ClienteEditFormFields.falecido}
                value={String(formik.values.falecido)}
                onChange={(event) => {
                  const value = event.target.value === 'true';
                  formik.setFieldValue(ClienteEditFormFields.falecido, value);
                }}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio color="primary" />}
                  label="Sim"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="primary" />}
                  label="Não"
                />
              </RadioGroupStyled>
            </Box>
            <Box w-perm="CLIENTE_INFO_EDIT_DOCUMENTO_INTERNACIONAL">
              <RadioGroupStyled
                name={ClienteEditFormFields.tipoCliente}
                value={String(formik.values.tipoCliente)}
                onChange={formik.handleChange(
                  ClienteEditFormFields.tipoCliente,
                )}
              >
                <FormControlLabel
                  disabled={!!cliente?.documento}
                  value={ClienteTipoEnum.FISICA}
                  control={<Radio color="primary" />}
                  label="CPF"
                />
                <FormControlLabel
                  disabled={!!cliente?.documento}
                  value={ClienteTipoEnum.JURIDICA}
                  control={<Radio color="primary" />}
                  label="CNPJ"
                />
                <FormControlLabel
                  disabled={!!cliente?.documento}
                  value={ClienteTipoEnum.ESTRANGEIRA}
                  control={<Radio color="primary" />}
                  label="ID/Passaporte"
                />
              </RadioGroupStyled>
            </Box>
            <TextFieldStyled
              disabled={!!cliente?.documento}
              id="documento"
              label="CPF/CNPJ/ID ou Passaporte"
              variant="outlined"
              size="small"
              value={formik.values.documento}
              onChange={(value) => handleChangeDocumento(value.target.value)}
              onBlur={formik.handleBlur(ClienteEditFormFields.documento)}
              w-perm="CLIENTE_INFO_EDIT_DOCUMENTO_INTERNACIONAL"
              type={cliente?.documento ? 'text' : typeInput}
              inputProps={{ maxLength }}
            />
          </RenderComponents>
        </StyledForm>
      </CardContentStyled>

      <DialogActionsStyled>
        <ButtonLoadingStyled
          disabled={!formik.dirty}
          onClick={formik.submitForm}
          color="primary"
          variant="contained"
          key="ButtonEditInfoClient"
          size="large"
          isLoading={false}
        >
          Salvar alterações
        </ButtonLoadingStyled>
      </DialogActionsStyled>
    </Card>
  );
}
