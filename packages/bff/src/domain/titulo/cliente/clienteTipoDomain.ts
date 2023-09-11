import { ClienteTipoModel } from '@/gateway/titulo/cliente/models/clienteModel';

export enum CLIENTE_TIPO {
  FISICA = 'FISICA',
  JURIDICA = 'JURIDICA',
  ESTRANGEIRA = 'ESTRANGEIRA',
  INDEFINIDO = 'INDEFINIDO',
}

export const ClienteTipo = {
  [ClienteTipoModel.FISICA]: CLIENTE_TIPO.FISICA,
  [ClienteTipoModel.JURIDICA]: CLIENTE_TIPO.JURIDICA,
  [ClienteTipoModel.ESTRANGEIRA]: CLIENTE_TIPO.ESTRANGEIRA,
  [ClienteTipoModel.INDEFINIDO]: CLIENTE_TIPO.INDEFINIDO,
};

export const ClienteTipoModelToValue = {
  [CLIENTE_TIPO.FISICA]: ClienteTipoModel.FISICA,
  [CLIENTE_TIPO.JURIDICA]: ClienteTipoModel.JURIDICA,
  [CLIENTE_TIPO.ESTRANGEIRA]: ClienteTipoModel.ESTRANGEIRA,
  [CLIENTE_TIPO.INDEFINIDO]: ClienteTipoModel.INDEFINIDO,
};
