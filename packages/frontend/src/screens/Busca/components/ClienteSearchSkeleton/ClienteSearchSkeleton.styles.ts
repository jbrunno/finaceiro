import { Box, Skeleton } from '@frontend/components';
import { css, styled } from '@frontend/styles';

export const CardList = styled('div')(
  ({ theme }) => css`
    padding: 0;
    display: grid;
    row-gap: ${theme.fn.spacing(16)};
    padding: ${theme.fn.spacing(0, 8)};
    grid-auto-rows: min-content;
    &:after {
      content: '';
      height: 1px;
    }
  `,
);

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledSkeleton = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.fn.spacing(8)};
`;
