import { MaterialColor } from '@frontend/types';
import { TableCell } from '@frontend/components';
import { css, styled } from '@frontend/styles';

export const TableCellStyled = styled(TableCell)<{ color?: MaterialColor }>(
  ({ theme, color }) => css`
    max-width: 150px;
    padding: ${theme.fn.spacing(14)};
    ${color && `background: ${theme.palette[color]['190p']};`}
  `,
);

export const TableCellTelefone = styled(TableCellStyled)`
  min-width: ${({ theme }) => theme.fn.size(180)};
`;
