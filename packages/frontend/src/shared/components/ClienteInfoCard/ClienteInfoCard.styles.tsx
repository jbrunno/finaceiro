import { styled, css } from '@mui/material/styles';
import {
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@frontend/components';

export const ChipStyled = styled(Chip)`
  margin-right: ${({ theme }) => theme.fn.spacing(5)};
`;

export const ChipNegativado = styled(Chip)(
  ({ theme }) => css`
    background-color: ${theme.palette.error.main};
    color: ${theme.palette.info.contrastText};
  `,
);

export const TelefoneTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

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
    display: grid;
    grid-gap: ${theme.fn.spacing(4)};
    padding-top: 0;
  `,
);
