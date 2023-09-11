import { APIPaginationModel } from '@bff/models/apiPaginationModel';
import { BaseDomain } from '@bff/domain/baseDomain';
import {
  ClienteModel,
  ClienteSexoModel,
} from '@/gateway/titulo/cliente/models/clienteModel';
import { CLIENTE_TIPO, ClienteTipo } from './clienteTipoDomain';

export enum ClienteSexoDomain {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
}

export const ClienteSexoModelToDomain = {
  [ClienteSexoModel.MASCULINO]: ClienteSexoDomain.MASCULINO,
  [ClienteSexoModel.FEMININO]: ClienteSexoDomain.FEMININO,
};

export const ClienteSexoDomainToModel = {
  [ClienteSexoDomain.MASCULINO]: ClienteSexoModel.MASCULINO,
  [ClienteSexoDomain.FEMININO]: ClienteSexoModel.FEMININO,
};

export type ClientePagination = APIPaginationModel<Cliente>;

export class Cliente extends BaseDomain {
  static readonly __typename = Cliente.name;

  readonly id: string;
  readonly nome: string;
  readonly nomeSocial?: string | null;
  readonly documento?: string | null;
  readonly tipo: CLIENTE_TIPO;
  readonly sexo?: ClienteSexoDomain | null;
  readonly falecido: boolean;
  readonly dataNascimento?: string | null;
  readonly cboId?: string | null;
  readonly negativado: boolean;

  constructor(cliente: ClienteModel) {
    super();

    this.id = Cliente.toGlobalId(cliente.id);
    this.nome = cliente.nome;
    this.nomeSocial = cliente.nomeSocial;
    this.documento = cliente.documento;
    this.tipo = ClienteTipo[cliente.tipo];
    this.sexo = cliente.sexo ? ClienteSexoModelToDomain[cliente.sexo] : null;
    this.falecido = cliente.falecido;
    this.dataNascimento = cliente.dataNascimento;
    this.cboId = cliente.cboId;
    this.negativado = cliente.negativado;
  }
}
