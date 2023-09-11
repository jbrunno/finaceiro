import { ClienteSexoEnum, ClienteTipoEnum } from '@/shared/constants';
import { gql } from '@apollo/client';

export const CLIENTE_EDIT_MUTATION = gql`
  mutation Mutation($input: ClientePatchInput!) {
    clientePatch(input: $input) {
      cliente {
        cbo {
          id
          codigo
          ocupacao
        }
        tipo
        falecido
        negativado
        nomeSocial
      }
    }
  }
`;

export type ClienteEditInfoData = {
  cliente: Cliente;
};

export type ClienteEditInfoInput = {
  id: string;
  cboId?: string;
  clientMutationId?: string;
  falecido?: boolean;
  nomeSocial?: string;
  nome?: string;
  dataNascimento?: string;
  documento?: string;
  tipoCliente?: string;
};

export type Cliente = {
  id: string;
  nome: string;
  documento: string;
  nomeSocial: string;
  dataNascimento: string;
  sexo: ClienteSexoEnum;
  cbo: Cbo | null;
  falecido: boolean;
  tipo: ClienteTipoEnum;
};

export type Cbo = {
  id: string;
  codigo: string;
  ocupacao: string;
};
