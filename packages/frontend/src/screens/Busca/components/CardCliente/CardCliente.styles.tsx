import { Card, CardContent, Chip } from '@frontend/components';
import { css, styled } from '@frontend/styles';

export const CardContentStyled = styled(CardContent)<{
  position: 'top' | 'bottom';
}>(
  ({ theme, position }) => css`
    padding: ${theme.fn.spacing(16)};
    border-top: ${position === 'bottom' &&
    `1px solid ${theme.palette.divider}`};
    border-bottom: ${position === 'top' &&
    `1px solid ${theme.palette.divider}`};
  `,
);

export const ChipStyled = styled(Chip)`
  margin-left: ${({ theme }) => theme.fn.size(8)};
`;

export const CardStyled = styled(Card)`
  max-height: ${({ theme }) => theme.fn.size(218)};
`;
