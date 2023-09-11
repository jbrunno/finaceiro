import { TabPanel } from '@frontend/components';
import { css, styled } from '@frontend/styles';

export const TabContainer = styled('div')`
  margin: ${({ theme }) => theme.fn.spacing(16, 16, 0)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TabPanelStyled = styled(TabPanel)(
  ({ theme }) => css`
    padding: ${theme.fn.spacing(24, 16)};
    width: ${theme.fn.size(900)};
    max-height: 100%;
    overflow: auto;
  `,
);

export const TabPanelContent = styled('div')`
  display: grid;
  row-gap: ${({ theme }) => theme.fn.spacing(24)};
  grid-auto-flow: row dense;
  padding: 0;
`;
