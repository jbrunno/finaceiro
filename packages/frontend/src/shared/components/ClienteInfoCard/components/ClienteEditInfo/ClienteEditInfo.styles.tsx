import { css, styled } from '@mui/material/styles';
import {
  ButtonLoading,
  CardContent,
  DialogActions,
  RadioGroup,
  TextField,
} from '@frontend/components';

export const StyledForm = styled('form')(
  ({ theme }) => css`
    display: grid;
    row-gap: ${theme.fn.spacing(25)};
    width: 100%;
    min-width: ${theme.fn.size(300)};
  `,
);

export const DialogActionsStyled = styled(DialogActions)`
  padding: ${({ theme }) => theme.fn.spacing(16, 40, 48, 40)};
  width: 100%;
`;

export const RadioGroupStyled = styled(RadioGroup)(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: ${theme.fn.spacing(8)};
    margin-bottom: ${theme.fn.spacing(12)};
  `,
);
export const CardHeader = styled('div')`
  padding: ${({ theme }) => theme.fn.spacing(24, 0, 32, 0)};
  text-align: center;
`;

export const CardContentStyled = styled(CardContent)`
  padding: ${({ theme }) => theme.fn.spacing(0, 40, 0, 40)};
`;

export const ButtonLoadingStyled = styled(ButtonLoading)`
  width: 100%;
`;

export const TextFieldStyled = styled(TextField)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
