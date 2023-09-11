import { gql } from '@apollo/client';
import { ClienteContato } from '@/shared/types';

export const CONTATO_EMAIL_INSERT_MUTATION = gql`
  mutation ClienteContatoEmailPost($input: ClienteContatoEmailPostInput!) {
    clienteContatoEmailPost(input: $input) {
      id
      nome
      email
      marcador
      classificacao
    }
  }
`;

export const CONTATO_EMAIL_EDIT_MUTATION = gql`
  mutation EmailPatch($input: EmailPatchInput!) {
    emailPatch(input: $input) {
      nome
      marcador
      classificacao
    }
  }
`;

export type ContatoEmailEditInfoData = ClienteContato & {
  id: string;
};

export type ContatoEmailEditInfoInput = ClienteContato & {
  id: string;
};

export type ClienteContatoEmailInsertInfoData = ClienteContato & {
  id: string;
  nome: string;
  email: string;
};

export type ClienteContatoEmailInsertInfoInput = ClienteContato & {
  id: string;
  nome: string;
  email: string;
};
