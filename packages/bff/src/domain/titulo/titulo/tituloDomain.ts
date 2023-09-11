import { BaseDomain } from '@bff/domain/baseDomain';
import { APIPaginationModel } from '@bff/models/apiPaginationModel';
import {
  TituloModel,
  TituloQuestionario,
} from '@/gateway/titulo/cliente/models/tituloModel';

export type TituloPagination = APIPaginationModel<Titulo>;

export class Titulo extends BaseDomain {
  static readonly __typename = Titulo.name;

  readonly id: string;
  readonly tituloQuestionario: TituloQuestionario;
  readonly assinatura: boolean;

  constructor(titulo: TituloModel) {
    super();
    this.id = Titulo.toGlobalId(titulo.id);
    this.tituloQuestionario = titulo.tituloQuestionario;
    this.assinatura = titulo.assinatura;
  }
}
