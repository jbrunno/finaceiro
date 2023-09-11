import { css, styled } from '@frontend/styles';

export const StyledForm = styled('form')(
  ({ theme }) => css`
    display: grid;
    row-gap: ${theme.fn.spacing(16)};
    width: 100%;
    min-width: 25rem;
  `,
);
