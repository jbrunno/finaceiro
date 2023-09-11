import { Grid, TimelineContent, Typography } from '@frontend/components';
import { css, styled } from '@frontend/styles';

export const GridStyled = styled(Grid)`
  max-height: ${(props) => props.theme.fn.size(250)};
  overflow-y: scroll;
`;

export const TimelineContentStyled = styled(TimelineContent)`
  ${({ theme }) => css`
    padding: ${theme.fn.spacing(0, 24)};
    margin-bottom: ${theme.fn.spacing(24)};
  `}
`;

export const TypographyStyled = styled(Typography)`
  margin: ${(props) => props.theme.fn.spacing(8, 0, 16)};
`;
