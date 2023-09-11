import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  CardHeaderChip,
} from '@frontend/components';
import { css, styled } from '@mui/material/styles';

export const CardColAcordoInfos = styled('div')`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

export const AcordosInfoBox = styled('div')`
  gap: ${({ theme }) => theme.fn.spacing(8)};
  display: flex;
  flex-direction: column;
`;

export const AcordosInfo = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: ${({ theme }) => theme.fn.spacing(4)};
`;

export const CardColAcordoProgressInfos = styled('div')`
  display: grid;
`;

export const AcordoProgressInfos = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.fn.spacing(4)};
`;

export const ProgressContentStyled = styled('div')(
  ({ theme }) => css`
    position: relative;
    border-radius: ${theme.fn.size(4)};
    padding: ${theme.fn.spacing(3, 9)};
  `,
);

export const LinearProgresStyled = styled(LinearProgress)(
  ({ theme }) => css`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: ${theme.fn.size(4)};
    &.MuiLinearProgress-colorInfo {
      background-color: ${theme.palette.grey[100]};
    }
    & .MuiLinearProgress-barColorInfo {
      background-color: ${theme.palette.info.dark};
    }
  `,
);

export const ProgressNumber = styled(Typography)(
  ({ theme }) => css`
    z-index: 1;
    position: relative;
    text-shadow: 1px 1px 1px ${theme.palette.common.white};
    color: ${theme.palette.info.dark};
    &.active {
      text-shadow: none;
      color: ${theme.palette.common.white};
    }
  `,
);

export const CardStyled = styled(Card)`
  height: ${({ theme }) => theme.fn.size(244)};
`;

export const CardContentStyled = styled(CardContent)(
  ({ theme }) => css`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${theme.fn.spacing(40)};
    padding: ${theme.fn.spacing(24, 40)};
  `,
);

export const CardHeaderChipStyled = styled(CardHeaderChip)`
  padding: ${({ theme }) => theme.fn.spacing(8, 0)};
`;
