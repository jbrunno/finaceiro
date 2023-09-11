import { styled, css } from '@mui/material/styles';
import { Card, CardActions, CardContent } from '@frontend/components';

export const CardActionsStyled = styled(CardActions)`
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
`;

export const CardStyled = styled(Card)`
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export const CardContentStyled = styled(CardContent)(
  ({ theme }) => css`
    border-top: 1px solid ${theme.palette.divider};
    display: grid;
    grid-gap: ${theme.fn.spacing(4)};
    padding-top: 0;
  `,
);
