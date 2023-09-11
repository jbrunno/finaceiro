import { TabPanel } from '@frontend/components';
import { css, styled } from '@frontend/styles';

export const TabPanelStyled = styled(TabPanel)`
  max-height: 400px;
  margin-top: ${(props) => props.theme.spacing(2)};
`;

export const Wrapper = styled('div')<{ toLeft?: boolean }>(
  ({ theme, toLeft }) => css`
    display: grid;
    grid-gap: ${theme.fn.spacing(16)};
  `,
);
