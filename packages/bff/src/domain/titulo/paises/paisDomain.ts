import { BaseDomain } from '@bff/domain/baseDomain';
import { PaisModel } from '@/gateway/titulo/paises/model/paisModel';

export class Pais extends BaseDomain {
  static readonly __typename = Pais.name;

  readonly id: string;
  readonly descricao: string;

  constructor(pais: PaisModel) {
    super();

    this.id = Pais.toGlobalId(pais.id);
    this.descricao = pais.descricao;
  }
}
