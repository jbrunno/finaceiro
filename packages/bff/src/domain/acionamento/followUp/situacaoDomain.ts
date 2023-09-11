import { SituacaoModel } from '@/gateway/acionamento/followUp/models/situacaoModel';
import { APIPaginationModel } from '@bff/models/apiPaginationModel';
import { BaseDomain } from '@bff/domain/baseDomain';

export type SituacaoPagination = APIPaginationModel<Situacao>;

export class Situacao extends BaseDomain {
  static readonly __typeName = Situacao.name;

  readonly id: string;
  readonly codigo: number;
  readonly nome: string;
  readonly descricaoObrigatoria: boolean;
  readonly textoPadrao: string;
  readonly tempoTrava: number;

  constructor(situacaoModel: SituacaoModel) {
    super();

    this.id = Situacao.toGlobalId(situacaoModel.id);
    this.codigo = situacaoModel.codigo;
    this.nome = `${situacaoModel.codigo.toString().padStart(2, '0')} - ${
      situacaoModel.nome
    }`;
    this.descricaoObrigatoria = situacaoModel.descricaoObrigatoria;
    this.textoPadrao = situacaoModel.textoPadrao;
    this.tempoTrava = situacaoModel.tempoTrava;
  }
}
