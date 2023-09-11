import { AutocompleteContatoMarcador } from '@/shared/components/AutocompleteContatoMarcador/AutocompleteContatoMarcador';
import { ContatoRating } from '@/shared/components/ContatoRating/ContatoRating';
import { FormControlLabel } from '@frontend/components';
import { css, styled } from '@frontend/styles';

export const RowFormStyled = styled('div')(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: ${theme.fn.spacing(262, 212, 192, 198)};
  `,
);

export const RowActionsStyled = styled('div')(
  ({ theme }) => css`
    padding-top: ${theme.fn.spacing(24)};
    display: flex;
    gap: ${theme.fn.spacing(12)};
  `,
);

export const FormControlLabelStyled = styled(FormControlLabel)`
  margin: 0;
`;

export const ContatoRatingStyled = styled(ContatoRating)(
  ({ theme }) => css`
    margin-left: ${theme.fn.spacing(8)};
    height: ${theme.fn.spacing(24)};
  `,
);

export const ClassficacaoWhatsappWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

export const AutocompleteContatoMarcadorStyled = styled(
  AutocompleteContatoMarcador,
)`
  margin: 0 ${({ theme }) => theme.fn.spacing(16)};
`;
