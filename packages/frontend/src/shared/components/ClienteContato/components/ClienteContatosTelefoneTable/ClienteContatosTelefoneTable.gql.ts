import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';
import { gql } from '@apollo/client';

export const CLIENTE_CONTATO_TELEFONE_FRAGMENT = {
  telefones: gql`
    fragment CLIENTE_CONTATO_TELEFONE_FRAGMENT on ContatoTelefone {
      id
      nome
      marcador
      numero
      whatsapp
      classificacao
    }
  `,
};

export type ClienteContatosTelefone = {
  id: string;
  nome: string;
  marcador: ContatoMarcadorEnum | null;
  numero: string;
  whatsapp: boolean;
  classificacao: ContatoClassificacaoEnum;
};
