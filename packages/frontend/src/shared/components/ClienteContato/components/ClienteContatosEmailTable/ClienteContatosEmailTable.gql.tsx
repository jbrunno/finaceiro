import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';
import { gql } from '@apollo/client';

export const CLIENTE_CONTATO_EMAIL_FRAGMENT = {
  emails: gql`
    fragment CLIENTE_CONTATO_EMAIL_FRAGMENT on ContatoEmail {
      id
      nome
      marcador
      classificacao
      email
    }
  `,
};

export type ClienteContatosEmail = {
  id: string;
  nome: string;
  marcador: ContatoMarcadorEnum | null;
  classificacao: ContatoClassificacaoEnum;
  email: string;
};
