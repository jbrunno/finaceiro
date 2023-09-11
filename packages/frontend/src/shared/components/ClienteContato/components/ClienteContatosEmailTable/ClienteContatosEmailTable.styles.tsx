import { styled } from '@frontend/styles';
import { TableCell } from '@frontend/components';

export const TableCellStyle = styled(TableCell)`
  padding: ${({ theme }) => theme.fn.spacing(14)};
`;
