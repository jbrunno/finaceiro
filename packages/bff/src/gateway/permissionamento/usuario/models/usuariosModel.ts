import { APIPaginationModel } from '@bff/models/apiPaginationModel';

export type UsuariosPaginationModel = APIPaginationModel<UsuariosModel>;

export type UsuariosModel = {
  id: string;
  nome: string;
  username: string;
  cargo: string;
  turno: string;
  cargaHoraria: string;
  equipes: Equipes[];
  carteiras: Carteiras[];
};

export type Equipes = {
  id: string;
  nome: string;
  dataCriacao: Date;
  idUsuarioCriacao: string;
  idUsuarioAlteracao: string;
};

export type Carteiras = {
  id: string;
  nome: string;
  codigo: string;
  dataAlteracao: Date;
  idUsuarioCriacao: string;
  idUsuarioAlteracao: string;
};
