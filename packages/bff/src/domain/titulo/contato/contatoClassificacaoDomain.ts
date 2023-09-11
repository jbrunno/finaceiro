import { ContatoClassificacaoModel } from '@/gateway/titulo/cliente/models/contatoModel';

export enum CONTATO_CLASSIFICACAO {
  INDEFINIDO = 'INDEFINIDO',
  RUIM = 'RUIM',
  BOM = 'BOM',
  EXCELENTE = 'EXCELENTE',
}

export const ContatoClassificacao = {
  [ContatoClassificacaoModel.INDEFINIDO]: CONTATO_CLASSIFICACAO.INDEFINIDO,
  [ContatoClassificacaoModel.RUIM]: CONTATO_CLASSIFICACAO.RUIM,
  [ContatoClassificacaoModel.BOM]: CONTATO_CLASSIFICACAO.BOM,
  [ContatoClassificacaoModel.EXCELENTE]: CONTATO_CLASSIFICACAO.EXCELENTE,
};

export const ContatoClassificacaoModelToDomain = {
  [CONTATO_CLASSIFICACAO.INDEFINIDO]: ContatoClassificacaoModel.INDEFINIDO,
  [CONTATO_CLASSIFICACAO.RUIM]: ContatoClassificacaoModel.RUIM,
  [CONTATO_CLASSIFICACAO.BOM]: ContatoClassificacaoModel.BOM,
  [CONTATO_CLASSIFICACAO.EXCELENTE]: ContatoClassificacaoModel.EXCELENTE,
};
