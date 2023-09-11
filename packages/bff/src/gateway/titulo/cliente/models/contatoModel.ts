import { APIPaginationModel } from '@bff/models/apiPaginationModel';

export type ContatoModel = {
  id: string;
  nome: string;
  marcador?: ContatoMarcadorModel | null;
  classificacao: ContatoClassificacaoModel;
};

export type ContatoTelefonePaginationModel =
  APIPaginationModel<ContatoTelefoneModel>;
export type ContatoTelefoneModel = ContatoModel & {
  numero: string;
  tipo: TipoTelefoneModel;
  whatsapp: boolean;
};

export type ContatoEmailPaginationModel = APIPaginationModel<ContatoEmailModel>;
export type ContatoEmailModel = ContatoModel & {
  email: string;
};

export type ContatoEnderecoPaginationModel =
  APIPaginationModel<ContatoEnderecoModel>;
export type ContatoEnderecoModel = ContatoModel & {
  numero: string;
  complemento?: string | null;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf?: string | null;
  cep: string;
  paisId?: string | null;
};

export enum ContatoClassificacaoModel {
  INDEFINIDO = 0,
  RUIM = 1,
  BOM = 2,
  EXCELENTE = 3,
}

export enum ContatoMarcadorModel {
  PESSOAL = 1,
  TRABALHO = 2,
  AVOS = 3,
  FILHO = 4,
  MAE = 5,
  PAI = 6,
  NETO = 7,
  SOBRINHO = 8,
  TIO = 9,
}

export enum TipoTelefoneModel {
  FIXO = 1,
  CELULAR = 2,
}
