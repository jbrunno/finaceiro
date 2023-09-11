import { AutocompleteContatoMarcador } from '@/shared/components/AutocompleteContatoMarcador/AutocompleteContatoMarcador';
import { ContatoRating } from '@/shared/components/ContatoRating/ContatoRating';
import { Typography } from '@frontend/components';
import { css, styled } from '@frontend/styles';

export const RowFormStyled = styled('div')(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: ${theme.fn.spacing(262, 212, 305)} min-content;
  `,
);

export const RowActionsStyled = styled('div')(
  ({ theme }) => css`
    padding-top: ${theme.fn.spacing(24)};
    display: flex;
    gap: ${theme.fn.spacing(12)};
  `,
);

export const ContatoRatingStyled = styled(ContatoRating)(
  ({ theme }) => css`
    margin-left: ${theme.fn.spacing(8)};
    height: ${theme.fn.size(24)};
  `,
);

export const ClassficacaoWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

export const AutocompleteContatoMarcadorStyled = styled(
  AutocompleteContatoMarcador,
)`
  margin: 0 ${({ theme }) => theme.fn.spacing(16)};
`;

export const TextFieldGroup = styled('div')<{ disabled: boolean }>(
  ({ theme, disabled }) => css`
    border: solid ${disabled ? theme.fn.size(1) : theme.fn.size(2)};
    position: relative;
    border-radius: ${theme.fn.size(4)};
    padding: ${theme.fn.spacing(7, 12, 9)};
    border-color: ${disabled
      ? theme.palette.secondary.main
      : theme.palette.primary.main};
    pointer-events: ${disabled && 'none'};
    display: flex;
    flex-direction: column;
    gap: ${disabled ? theme.fn.spacing(0) : theme.fn.spacing(8)};
  `,
);

export const LabelNovoCadastro = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.fn.spacing(7)};
`;

export const TextFieldGroupLabel = styled(Typography)(
  ({ theme }) => css`
    position: absolute;
    top: ${theme.fn.spacing(-10)};
    left: ${theme.fn.spacing(8)};
    background-color: ${theme.palette.background.paper};
    padding: 0 ${theme.fn.spacing(4)};
  `,
);
