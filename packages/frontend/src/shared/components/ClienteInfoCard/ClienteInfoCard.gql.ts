import { ClienteSexoEnum, ClienteTipoEnum } from '@/shared/constants';
import { gql } from '@apollo/client';

export const CLIENTE_INFO_FRAGMENT = {
  cliente: gql`
    fragment CLIENTE_INFO_FRAGMENT on Cliente {
      id
      nome
      nomeSocial
      documento
      sexo
      dataNascimento
      cbo {
        codigo
        id
        ocupacao
      }
      falecido
      negativado
      tipo
    }
  `,
};

export type ClienteInfoData = {
  id: string;
  nome: string;
  nomeSocial: string;
  documento: string;
  sexo: ClienteSexoEnum;
  dataNascimento: string;
  cbo: {
    id: string;
    codigo: string;
    ocupacao: string;
  } | null;
  falecido: boolean;
  negativado: boolean;
  tipo: ClienteTipoEnum;
};
