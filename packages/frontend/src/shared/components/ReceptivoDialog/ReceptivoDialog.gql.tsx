import { gql } from '@apollo/client';

export const CLIENTE_INSERT_MUTATION = gql`
  mutation ClientePost($input: ClientePostInput!) {
    clientePost(input: $input) {
      id
    }
  }
`;

export type ClienteInsertInfoInput = {
  nome: string;
  telefone: string;
  tipoCliente: string;
  documento: string | null;
};
export type ClienteInsertInfoData = {
  clientePost: {
    id: string;
  };
};
