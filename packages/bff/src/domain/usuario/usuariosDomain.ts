import { APIPaginationModel } from '@bff/models/apiPaginationModel';
import {
  Carteiras,
  Equipes,
  UsuariosModel,
} from '@/gateway/permissionamento/usuario/models/usuariosModel';
import { BaseDomain } from '@bff/domain/baseDomain';

export type UsuariosPagination = APIPaginationModel<Usuarios>;

export class Usuarios extends BaseDomain {
  static readonly __typename = Usuarios.name;

  readonly id: string;
  readonly nome: string;
  readonly username: string;
  readonly cargo: string;
  readonly turno: string;
  readonly cargaHoraria: string;
  readonly equipes: Equipes[];
  readonly carteiras: Carteiras[];

  constructor(usuariosModel: UsuariosModel) {
    super();
    this.id = Usuarios.toGlobalId(usuariosModel.id);
    this.nome = usuariosModel.nome;
    this.username = usuariosModel.username;
    this.cargo = usuariosModel.cargo;
    this.turno = usuariosModel.turno;
    this.cargaHoraria = usuariosModel.cargaHoraria;
    this.equipes = usuariosModel.equipes;
    this.carteiras = usuariosModel.carteiras;
  }
}
