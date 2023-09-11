import { gql } from '@apollo/client';
import { ClienteTipoEnum } from '@frontend/core/dist/types';

export const CARD_CLIENTE_FRAGMENT = {
  cliente: gql`
    fragment CARD_CLIENTE_FRAGMENT on Cliente {
      id
      nome
      documento
      falecido
      negativado
      nomeSocial
      tipo
    }
  `,
};

export type ClienteData = {
  id: string;
  nome: string;
  documento: string;
  falecido: boolean;
  negativado: boolean;
  nomeSocial: string;
  tipo: ClienteTipoEnum;
};
