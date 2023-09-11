import { styled, css } from '@frontend/styles';
import { SIDEBAR_WIDTH } from '@frontend/components';

export const PageContainer = styled('main')(
  ({ theme }) => css`
    height: 100vh;
    display: grid;
    grid-template-rows: min-content 1fr;
    overflow: auto;
    margin-left: ${SIDEBAR_WIDTH}px;
    padding: ${theme.fn.spacing(0, 32)};
  `,
);
