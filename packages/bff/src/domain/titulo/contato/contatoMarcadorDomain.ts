import { ContatoMarcadorModel } from '@/gateway/titulo/cliente/models/contatoModel';

export enum CONTATO_MARCADOR {
  PESSOAL = 'PESSOAL',
  TRABALHO = 'TRABALHO',
  AVOS = 'AVOS',
  FILHO = 'FILHO',
  MAE = 'MAE',
  PAI = 'PAI',
  NETO = 'NETO',
  SOBRINHO = 'SOBRINHO',
  TIO = 'TIO',
}

export const ContatoMarcador = {
  [ContatoMarcadorModel.PESSOAL]: CONTATO_MARCADOR.PESSOAL,
  [ContatoMarcadorModel.TRABALHO]: CONTATO_MARCADOR.TRABALHO,
  [ContatoMarcadorModel.AVOS]: CONTATO_MARCADOR.AVOS,
  [ContatoMarcadorModel.FILHO]: CONTATO_MARCADOR.FILHO,
  [ContatoMarcadorModel.MAE]: CONTATO_MARCADOR.MAE,
  [ContatoMarcadorModel.PAI]: CONTATO_MARCADOR.PAI,
  [ContatoMarcadorModel.NETO]: CONTATO_MARCADOR.NETO,
  [ContatoMarcadorModel.SOBRINHO]: CONTATO_MARCADOR.SOBRINHO,
  [ContatoMarcadorModel.TIO]: CONTATO_MARCADOR.TIO,
};

export const ContatoMarcadorModelToDomain = {
  [CONTATO_MARCADOR.PESSOAL]: ContatoMarcadorModel.PESSOAL,
  [CONTATO_MARCADOR.TRABALHO]: ContatoMarcadorModel.TRABALHO,
  [CONTATO_MARCADOR.AVOS]: ContatoMarcadorModel.AVOS,
  [CONTATO_MARCADOR.FILHO]: ContatoMarcadorModel.FILHO,
  [CONTATO_MARCADOR.MAE]: ContatoMarcadorModel.MAE,
  [CONTATO_MARCADOR.PAI]: ContatoMarcadorModel.PAI,
  [CONTATO_MARCADOR.NETO]: ContatoMarcadorModel.NETO,
  [CONTATO_MARCADOR.SOBRINHO]: ContatoMarcadorModel.SOBRINHO,
  [CONTATO_MARCADOR.TIO]: ContatoMarcadorModel.TIO,
};
