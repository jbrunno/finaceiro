import { styled, css } from '@frontend/styles';
import { CopyToClipboardButton, DialogContent } from '@frontend/components';

export const Header = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: ${theme.fn.spacing(8)};
    margin: 0 auto ${theme.fn.spacing(16)};
  `,
);

export const CopiarDetalhes = styled('div')(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: ${theme.fn.spacing(8)};
  `,
);

export const DialogContentStyled = styled(DialogContent)`
  width: ${({ theme }) => theme.fn.size(444)};
`;

export const CopyToClipboardButtonStyled = styled(CopyToClipboardButton)`
  margin-top: ${({ theme }) => theme.fn.spacing(18)};
`;
