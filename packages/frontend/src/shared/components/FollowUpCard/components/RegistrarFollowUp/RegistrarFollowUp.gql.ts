import { gql } from '@apollo/client';

export const REGISTRAR_FOLLOWPUP_MUTATION = gql`
  mutation RegistrarClienteFollowUp($input: RegistrarClienteFollowUpInput!) {
    registrarClienteFollowUp(input: $input) {
      id
    }
  }
`;

export type RegistrarClienteFollowUpInput = {
  clienteId: string;
  tituloId: string;
  situacaoFollowUpId: string;
  descricao: string;
};

export type RegistrarClienteFollowUpData = {
  id: string;
};
