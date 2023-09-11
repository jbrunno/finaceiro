import { TipoTelefoneModel } from '@/gateway/titulo/cliente/models/contatoModel';

export enum TIPO_TELEFONE {
  FIXO = 'FIXO',
  CELULAR = 'CELULAR',
}

export const TipoTelefone = {
  [TipoTelefoneModel.FIXO]: TIPO_TELEFONE.FIXO,
  [TipoTelefoneModel.CELULAR]: TIPO_TELEFONE.CELULAR,
};

export const TipoTelefoneModelValue = {
  [TIPO_TELEFONE.FIXO]: TipoTelefoneModel.FIXO,
  [TIPO_TELEFONE.CELULAR]: TipoTelefoneModel.CELULAR,
};
