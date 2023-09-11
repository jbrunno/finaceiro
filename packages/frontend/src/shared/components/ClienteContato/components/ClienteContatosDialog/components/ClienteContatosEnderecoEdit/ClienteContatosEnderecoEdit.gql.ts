import { gql } from '@apollo/client';
import { ClienteContato } from '@/shared/types';

export const CONTATO_ENDERECO_PAISES_QUERY = gql`
  query Paises {
    paises {
      id
      descricao
    }
  }
`;

export const CONTATO_ENDERECO_EDIT_MUTATION = gql`
  mutation EnderecoPatch($input: EnderecoPatchInput!) {
    enderecoPatch(input: $input) {
      id
      nome
      marcador
      classificacao
    }
  }
`;

export const CONTATO_ENDERECO_INSERT_MUTATION = gql`
  mutation EnderecoPatch($input: ClienteContatoEnderecoPostInput!) {
    clienteContatoEnderecoPost(input: $input) {
      id
      nome
      numero
      bairro
      cep
      cidade
      marcador
      classificacao
      complemento
      logradouro
      uf
      paisId
    }
  }
`;

export type PaisData = Record<'id' | 'descricao', string>;

export type ContatoEnderecoPaisesData = {
  paises: Array<PaisData>;
};

export type ContatoEnderecoEditInfoData = ClienteContato & {
  id: string;
};

export type ContatoEnderecoEditInfoInput = ClienteContato & {
  id: string;
};

export type ContatoEnderecoInsertInfoData = ClienteContatoEndereco;

export type ContatoEnderecoInsertInfoInput = ClienteContatoEndereco;

export type ClienteContatoEndereco = ClienteContato & {
  id: string;
  numero: string;
  complemento: string;
  logradouro: string;
  bairro?: string | null;
  cidade: string;
  uf?: string | null;
  cep: string;
  paisId: string;
};
