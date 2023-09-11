import { APIPaginationModel } from '@bff/models/apiPaginationModel';
import { BaseDomain } from '@bff/domain/baseDomain';
import { CboModel } from '@/gateway/titulo/cbo/model/cboModel';

export type CboPagination = APIPaginationModel<Cbo>;

export class Cbo extends BaseDomain {
  static readonly __typename = Cbo.name;

  readonly id: string;
  readonly codigo: number;
  readonly ocupacao: string;

  constructor(cbo: CboModel) {
    super();

    this.id = Cbo.toGlobalId(cbo.id);
    this.codigo = cbo.codigo;
    this.ocupacao = cbo.ocupacao;
  }
}
