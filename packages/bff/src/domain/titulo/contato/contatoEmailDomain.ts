import { APIPaginationModel } from '@bff/models/apiPaginationModel';
import { BaseDomain } from '@bff/domain/baseDomain';
import { ContatoEmailModel } from '@/gateway/titulo/cliente/models/contatoModel';
import {
  ContatoClassificacao,
  CONTATO_CLASSIFICACAO,
} from './contatoClassificacaoDomain';
import { ContatoMarcador, CONTATO_MARCADOR } from './contatoMarcadorDomain';

export type ContatoEmailPagination = APIPaginationModel<ContatoEmail>;

export class ContatoEmail extends BaseDomain {
  readonly id: string;
  readonly nome: string;
  readonly marcador?: CONTATO_MARCADOR | null;
  readonly classificacao: CONTATO_CLASSIFICACAO;
  readonly email: string;

  constructor(contatoEmail: ContatoEmailModel) {
    super();

    this.id = ContatoEmail.toGlobalId(contatoEmail.id);
    this.nome = contatoEmail.nome;
    this.marcador = contatoEmail.marcador
      ? ContatoMarcador[contatoEmail.marcador]
      : null;
    this.classificacao = ContatoClassificacao[contatoEmail.classificacao];
    this.email = contatoEmail.email;
  }
}
