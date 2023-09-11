import { gql } from '@apollo/client';
import { ClienteContato } from '@/shared/types';

export const CONTATO_TELEFONE_EDIT_MUTATION = gql`
  mutation TelefonePatch($input: TelefonePatchInput!) {
    telefonePatch(input: $input) {
      classificacao
      marcador
      nome
      whatsapp
    }
  }
`;

export const CONTATO_TELEFONE_INSERT_MUTATION = gql`
  mutation ClienteContatoTelefonePost(
    $input: ClienteContatoTelefonePostInput!
  ) {
    clienteContatoTelefonePost(input: $input) {
      telefone {
        id
        nome
        marcador
        classificacao
        numero
        whatsapp
      }
    }
  }
`;

export type ContatoTelefoneEditInfoData = ClienteContato & {
  whatsapp: boolean;
};

export type ContatoTelefoneEditInfoInput = ClienteContato & {
  id: string;
  whatsapp: boolean;
};

export type ContatoTelefoneInsertInfoData = ClienteContato & {
  whatsapp: boolean;
};

export type ContatoTelefoneInsertInfoInput = ClienteContato & {
  id: string;
  numero: string;
  whatsapp: boolean;
};
