import { APIPaginationModel } from '@bff/models/apiPaginationModel';
import { BaseDomain } from '@bff/domain/baseDomain';
import { ContatoTelefoneModel } from '@/gateway/titulo/cliente/models/contatoModel';
import {
  ContatoClassificacao,
  CONTATO_CLASSIFICACAO,
} from './contatoClassificacaoDomain';
import { ContatoMarcador, CONTATO_MARCADOR } from './contatoMarcadorDomain';
import { TipoTelefone, TIPO_TELEFONE } from './contatoTipoTelefoneDomain';

export type ContatoTelefonePagination = APIPaginationModel<ContatoTelefone>;

export class ContatoTelefone extends BaseDomain {
  readonly id: string;
  readonly nome: string;
  readonly marcador?: CONTATO_MARCADOR | null;
  readonly classificacao: CONTATO_CLASSIFICACAO;
  readonly numero: string;
  readonly tipo: TIPO_TELEFONE;
  readonly whatsapp: boolean;

  constructor(contatoTelefone: ContatoTelefoneModel) {
    super();

    this.id = ContatoTelefone.toGlobalId(contatoTelefone.id);
    this.nome = contatoTelefone.nome;
    this.marcador = contatoTelefone.marcador
      ? ContatoMarcador[contatoTelefone.marcador]
      : null;
    this.classificacao = ContatoClassificacao[contatoTelefone.classificacao];
    this.numero = contatoTelefone.numero;
    this.tipo = TipoTelefone[contatoTelefone.tipo];
    this.whatsapp = contatoTelefone.whatsapp;
  }
}
