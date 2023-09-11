import { styled, css } from '@frontend/styles';
import {
  Button,
  DialogContent,
  InternationalPhoneField,
  RadioGroup,
  TextField,
} from '@frontend/components';

export const Header = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: ${theme.fn.spacing(8)};
    max-width: ${theme.fn.size(217)};
    margin: 0 auto;
    margin-bottom: ${theme.fn.spacing(16)};
  `,
);

export const TextFieldStyled = styled(TextField)`
  width: 100%;
  min-height: ${({ theme }) => theme.fn.size(60)};
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const StyledForm = styled('form')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.fn.spacing(16)};
    padding: ${theme.fn.spacing(8, 16)};
    min-width: ${theme.fn.size(300)};
  `,
);

export const RadioGroupStyled = styled(RadioGroup)(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    gap: ${theme.fn.spacing(8)};
    margin-bottom: ${theme.fn.spacing(12)};
  `,
);

export const ButtonStyled = styled(Button)`
  width: 100%;
  margin: ${({ theme }) => theme.fn.spacing(0, 32, 24)};
`;

export const InternationalPhoneFieldStyled = styled(InternationalPhoneField)`
  min-height: ${({ theme }) => theme.fn.size(65)};
`;

export const DialogContentStyled = styled(DialogContent)`
  padding-bottom: 0;
`;
