import { BaseDomain } from '@bff/domain/baseDomain';
import { APIPaginationModel } from '@bff/models/apiPaginationModel';
import { FollowUpModel } from '@/gateway/acionamento/followUp/models/followUpModel';
import { Usuarios } from '@/domain/usuario/usuariosDomain';
import { Situacao } from './situacaoDomain';

export type FollowUpPagination = APIPaginationModel<FollowUp>;

export class FollowUp extends BaseDomain {
  static readonly __typename = FollowUp.name;

  readonly id: string;
  readonly dataRegistro: string;
  readonly usuarioId: string;
  readonly situacaoId: string;
  readonly descricao: string;

  constructor(followUp: FollowUpModel) {
    super();

    this.id = FollowUp.toGlobalId(followUp.id);
    this.dataRegistro = followUp.dataRegistro;
    this.usuarioId = Usuarios.toGlobalId(followUp.usuarioId);
    this.situacaoId = Situacao.toGlobalId(followUp.situacaoId);
    this.descricao = followUp.descricao;
  }
}
