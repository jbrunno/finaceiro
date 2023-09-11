import {
  Card,
  CardContent,
  CardHeaderChip,
  Typography,
} from '@frontend/components';
import { css, PaletteColor, styled } from '@mui/material/styles';
import { TrendingUpSharp } from '@frontend/icons';

export type MaterialColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export type MaterialColorVariant = keyof PaletteColor;

export const CardStyled = styled(Card)(
  ({ theme }) => css`
    height: ${theme.fn.size(244)};
    background-color: ${theme.palette.background.default};
  `,
);

export const CardContentStyled = styled(CardContent)(
  ({ theme }) => css`
    padding: ${theme.fn.spacing(8)};
    display: grid;
    grid-template-columns: auto auto;
    grid-auto-rows: 1fr;
    gap: ${theme.fn.spacing(4)};
    height: 100%;
    &:last-child {
      padding-bottom: ${theme.fn.spacing(8)};
    }
  `,
);

export const DashboardText = styled('div')`
  padding: ${({ theme }) => theme.fn.spacing(8)};
`;

export const TrendingUpIcon = styled(TrendingUpSharp)(
  ({ theme }) => css`
    fill: ${theme.palette.info.dark};
    font-size: ${theme.fn.size(100)};
  `,
);

export const DashboardBox = styled('div')<{
  backgroundColor?: MaterialColor;
  backgroundColorVariant?: MaterialColorVariant;
}>(
  ({ theme, backgroundColor, backgroundColorVariant }) => css`
    background-color: ${backgroundColor &&
    theme.palette[backgroundColor][backgroundColorVariant || 'main']};
    color: ${backgroundColor && theme.palette[backgroundColor].contrastText};
    display: grid;
    align-items: center;
    border-radius: 4px;
  `,
);

export const DashboardIconBox = styled(DashboardBox)`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const StyledDashboardBox = styled(DashboardBox)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  justify-content: center;
`;

export const StyledDashboardIconBox = styled(DashboardIconBox)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  grid-column: span 2;
  justify-items: center;
`;

export const CardHeaderChipStyled = styled(CardHeaderChip)`
  padding: ${({ theme }) => theme.fn.spacing(8, 0)};
`;

export const TypographySubtitleStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;
