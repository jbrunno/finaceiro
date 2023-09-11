import { UsuarioByIdModel } from '@/gateway/permissionamento/usuario/models/usuarioByIdModel';
import { BaseDomain } from '@bff/domain/baseDomain';

export class UsuarioById extends BaseDomain {
  static readonly __typename = UsuarioById.name;

  readonly id: string;
  readonly nome: string;
  readonly username: string;
  readonly turno: number;
  readonly cargaHoraria: string;

  constructor(usuarioById: UsuarioByIdModel) {
    super();
    this.id = UsuarioById.toGlobalId(usuarioById.id);
    this.nome = usuarioById.nome;
    this.username = usuarioById.username;
    this.turno = usuarioById.turno;
    this.cargaHoraria = usuarioById.cargaHoraria;
  }
}
