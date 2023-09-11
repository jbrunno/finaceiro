import { gql } from '@apollo/client';

export const CLIENTE_FOLLOWUPS_FRAGMENT = {
  followps: gql`
    fragment CLIENTE_FOLLOWUPS_FRAGMENT on FollowUp {
      id
      dataRegistro
      usuario {
        id
        nome
        username
        turno
        cargaHoraria
      }
      situacao {
        id
        descricaoObrigatoria
        codigo
        nome
        tempoTrava
        textoPadrao
      }
      descricao
    }
  `,
};

export const SITUACOES_FOLLOWUPS_FRAGMENT = {
  situacoes: gql`
    fragment SITUACOES_FOLLOWUPS_FRAGMENT on Situacao {
      id
      codigo
      nome
      descricaoObrigatoria
      textoPadrao
      tempoTrava
    }
  `,
};

export type ClienteFollowUps = {
  dataRegistro: string;
  descricao: string;
  id: string;
  situacao: SituacoesFollowUp;
  usuario: {
    id: string;
    nome: string;
    username: string;
    turno: number;
    cargaHoraria: string;
  };
};

export type SituacoesFollowUp = {
  id: string;
  codigo: number;
  nome: string;
  descricaoObrigatoria: boolean;
  textoPadrao: string;
  tempoTrava: number;
};
