import { Grid } from '@frontend/components';
import { css, styled, Widgets } from '@frontend/styles';
import { Link } from 'react-router-dom';

export const WidgetsStyled = styled(Widgets)(
  ({ theme }) => css`
    display: grid;
    grid-auto-rows: min-content;
    grid-template-columns: 1fr;
    gap: ${theme.fn.spacing(16)};
  `,
);

export const GridStyled = styled(Grid)`
  margin: ${({ theme }) => theme.fn.spacing(8, 0, 16)};
`;

export const ContentWithoutItems = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: ${({ theme }) => theme.fn.spacing(24)};
`;

export const LinkCard = styled(Link)`
  text-decoration: none;
`;
