import { ClienteSexoDomain } from '@/domain/titulo/cliente/clienteDomain';
import {
  CONTATO_CLASSIFICACAO,
  ContatoClassificacao,
} from '@/domain/titulo/contato/contatoClassificacaoDomain';
import {
  CONTATO_MARCADOR,
  ContatoMarcador,
} from '@/domain/titulo/contato/contatoMarcadorDomain';
import {
  clienteInputPostMock,
  clientePatch,
  emailPost,
  enderecoPost,
  telefoneInputPostMock,
} from '@/gateway/titulo/cliente/clienteGateway.mock';
import { CLIENTE_TIPO } from '@/domain/titulo/cliente/clienteTipoDomain';
import {
  ClienteInputPostAdapter,
  ContatoTelefonePostInputAdapter,
} from './clienteAdapter';
import { id } from '../paises/paisesAdapter.mock';

export * from '@/gateway/titulo/cliente/clienteGateway.mock';

export const clientePatchAdapter = {
  ...clientePatch,
  sexo: ClienteSexoDomain.MASCULINO,
  tipoCliente: CLIENTE_TIPO.FISICA,
};

export const clienteInputPostAdapterMock: ClienteInputPostAdapter = {
  ...clienteInputPostMock,
  tipoCliente: CLIENTE_TIPO.FISICA,
};

export const clienteContatoEnderecoAdapter = {
  ...enderecoPost,
  marcador: ContatoMarcador[enderecoPost.marcador],
  classificacao: ContatoClassificacao[enderecoPost.classificacao],
  paisId: id,
};

export const clienteContatoEmailAdapter = {
  ...emailPost,
  marcador: ContatoMarcador[emailPost.marcador],
  classificacao: ContatoClassificacao[emailPost.classificacao],
};

export const clienteContatoTelefoneInputAdapter: ContatoTelefonePostInputAdapter =
  {
    ...telefoneInputPostMock,
    marcador: CONTATO_MARCADOR.TRABALHO,
    classificacao: CONTATO_CLASSIFICACAO.RUIM,
  };
