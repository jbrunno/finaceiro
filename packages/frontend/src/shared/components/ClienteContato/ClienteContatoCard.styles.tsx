import { Card, CardActions, TabPanel, Typography } from '@frontend/components';
import { styled } from '@frontend/styles';

export const CardStyled = styled(Card)`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
`;

export const TabPanelStyled = styled(TabPanel)`
  max-height: ${({ theme }) => theme.fn.size(400)};
  padding: 0;
  overflow-y: auto;
`;

export const CardActionsStyled = styled(CardActions)(
  ({ theme }) => `
    display: flex;
    justify-content: center;
    padding: ${theme.fn.spacing(8)};
    border-top: 1px solid ${theme.palette.divider};
  `,
);

export const NoResults = styled(Typography)`
  padding: ${({ theme }) => theme.fn.spacing(8)};
`;
