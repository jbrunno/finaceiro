import { Grid } from '@frontend/components';
import { styled } from '@frontend/styles';

export const GridStyled = styled(Grid)`
  width: ${({ theme }) => theme.fn.size(380)};
`;

export const GridTitle = styled(Grid)`
  padding: ${({ theme }) => theme.fn.spacing(24, 64)};
`;

export const GridForm = styled(Grid)`
  padding: ${({ theme }) => theme.fn.spacing(16, 40, 32)};
`;

export const GridSubmit = styled(Grid)`
  padding: ${({ theme }) => theme.fn.spacing(16, 40, 48)};
`;
