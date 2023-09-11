import { APIPaginationModel } from '@bff/models/apiPaginationModel';

export type ClientePaginationModel = APIPaginationModel<ClienteModel>;

export type ClienteModel = {
  id: string;
  nome: string;
  nomeSocial?: string | null;
  documento?: string | null;
  sexo?: ClienteSexoModel | null;
  tipo: ClienteTipoModel;
  falecido: boolean;
  dataNascimento?: string | null;
  cboId?: string | null;
  negativado: boolean;
};

export enum ClienteSexoModel {
  MASCULINO = 1,
  FEMININO = 2,
}

export enum ClienteTipoModel {
  FISICA = 1,
  JURIDICA = 2,
  ESTRANGEIRA = 3,
  INDEFINIDO = 4,
}
