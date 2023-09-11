import { APIPaginationModel } from '@bff/models/apiPaginationModel';
import { BaseDomain } from '@bff/domain/baseDomain';
import { ContatoEnderecoModel } from '@/gateway/titulo/cliente/models/contatoModel';
import {
  ContatoClassificacao,
  CONTATO_CLASSIFICACAO,
} from './contatoClassificacaoDomain';
import { ContatoMarcador, CONTATO_MARCADOR } from './contatoMarcadorDomain';

export type ContatoEnderecoPagination = APIPaginationModel<ContatoEndereco>;

export class ContatoEndereco extends BaseDomain {
  readonly id: string;
  readonly nome: string;
  readonly marcador?: CONTATO_MARCADOR | null;
  readonly classificacao: CONTATO_CLASSIFICACAO;
  readonly numero: string;
  readonly complemento?: string | null;
  readonly logradouro: string;
  readonly bairro: string;
  readonly cidade: string;
  readonly uf?: string | null;
  readonly cep: string;
  readonly paisId?: string | null;

  constructor(contatoEndereco: ContatoEnderecoModel) {
    super();

    this.id = ContatoEndereco.toGlobalId(contatoEndereco.id);
    this.nome = contatoEndereco.nome;
    this.marcador = contatoEndereco.marcador
      ? ContatoMarcador[contatoEndereco.marcador]
      : null;
    this.classificacao = ContatoClassificacao[contatoEndereco.classificacao];
    this.numero = contatoEndereco.numero;
    this.complemento = contatoEndereco.complemento
      ? contatoEndereco.complemento
      : null;
    this.logradouro = contatoEndereco.logradouro;
    this.bairro = contatoEndereco.bairro;
    this.cidade = contatoEndereco.cidade;
    this.uf = contatoEndereco.uf ? contatoEndereco.uf : null;
    this.cep = contatoEndereco.cep;
    this.paisId = contatoEndereco.paisId;
  }
}
