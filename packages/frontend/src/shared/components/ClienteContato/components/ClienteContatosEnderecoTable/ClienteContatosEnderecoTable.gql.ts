import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';
import { gql } from '@apollo/client';

export const CLIENTE_CONTATO_ENDERECO_FRAGMENT = {
  enderecos: gql`
    fragment CLIENTE_CONTATO_ENDERECO_FRAGMENT on ContatoEndereco {
      id
      nome
      marcador
      classificacao
      logradouro
      numero
      bairro
      cidade
      uf
      cep
      complemento
      pais {
        id
        descricao
      }
    }
  `,
};

export type ClienteContatosEndereco = {
  id: string;
  nome: string;
  marcador: ContatoMarcadorEnum | null;
  classificacao: ContatoClassificacaoEnum;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  complemento: string;
  pais: Pais;
};

export type Pais = {
  id: string;
  descricao: string;
};
