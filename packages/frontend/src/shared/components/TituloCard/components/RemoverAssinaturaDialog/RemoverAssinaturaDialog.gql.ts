import { gql } from '@apollo/client';

export const EDITAR_ASSINATURA_DIALOG_MUTATION = gql`
  mutation EditarAssinaturaTitulo($input: EditarAssinaturaTituloInput!) {
    editarAssinaturaTitulo(input: $input) {
      id
    }
  }
`;

export type RemoverAssinaturaDialogData = {
  id: string;
};

export type RemoverAssinaturaDialogInput = {
  id: string;
  usuarioSupervisor: string;
  senhaSupervisor: string;
  motivo: string;
};
