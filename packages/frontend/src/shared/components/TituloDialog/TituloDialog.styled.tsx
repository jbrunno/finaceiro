import { styled, css } from '@frontend/styles';
import { RadioGroup, TextField } from '@frontend/components';

export const HeaderSyled = styled('div')(
  ({ theme }) => css`
    display: flex;
    align-items: right;
    gap: ${theme.fn.spacing(8)};
    margin: 0 auto;
    margin-bottom: ${theme.fn.spacing(16)};
  `,
);

export const FormStyled = styled('form')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.fn.spacing(16)};
    min-width: ${theme.fn.size(600)};
  `,
);

export const GridSyled = styled('div')`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.fn.spacing(10)};
`;

export const TextFieldStyled = styled(TextField)`
  width: 100%;
  min-height: ${({ theme }) => theme.fn.size(60)};
`;

export const RadioButtonSyled = styled('div')`
  width: 100%;
`;

export const RadioGroupStyled = styled(RadioGroup)(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    gap: ${theme.fn.spacing(8)};
    margin-bottom: ${theme.fn.spacing(12)};
  `,
);

export const ButtonGridSyled = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.fn.spacing(24)};
`;
