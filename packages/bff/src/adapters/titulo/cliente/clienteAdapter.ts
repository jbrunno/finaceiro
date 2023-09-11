import { APIPaginationInput } from '@bff/models/apiPaginationModel';
import { catchAdapterError } from '@bff/helpers';
import {
  TITULO_CLIENTE_ERRORS,
  getClientes,
  getCliente,
  getTitulos,
  ClienteInputPatch,
  patchCliente,
  getClientesContatosTelefones,
  getClientesContatosEmails,
  getClientesContatosEnderecos,
  postContatoEndereco,
  postContatoEmail,
  postContatoTelefone,
  ContatoTelefoneInputPost,
  ClienteInputPost,
  postClientes,
  TituloInputPost,
  postTitulo,
} from '@/gateway/titulo/cliente/clienteGateway';
import {
  Cliente,
  ClientePagination,
  ClienteSexoDomain,
  ClienteSexoDomainToModel,
} from '@/domain/titulo/cliente/clienteDomain';
import {
  ContatoTelefone,
  ContatoTelefonePagination,
} from '@/domain/titulo/contato/contatoTelefoneDomain';
import {
  ContatoEmail,
  ContatoEmailPagination,
} from '@/domain/titulo/contato/contatoEmailDomain';
import {
  ContatoEndereco,
  ContatoEnderecoPagination,
} from '@/domain/titulo/contato/contatoEnderecoDomain';
import {
  CONTATO_CLASSIFICACAO,
  ContatoClassificacaoModelToDomain,
} from '@/domain/titulo/contato/contatoClassificacaoDomain';
import {
  CONTATO_MARCADOR,
  ContatoMarcadorModelToDomain,
} from '@/domain/titulo/contato/contatoMarcadorDomain';
import {
  CLIENTE_TIPO,
  ClienteTipoModelToValue,
} from '@/domain/titulo/cliente/clienteTipoDomain';
import { Titulo, TituloPagination } from '@/domain/titulo/titulo/tituloDomain';
import { Pais } from '@/domain/titulo/paises/paisDomain';

export const CLIENTE_ERROR_MESSAGES = {
  [TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG]: 'Algo inesperado aconteceu',
  [TITULO_CLIENTE_ERRORS.UNAUTHORIZED]: 'Credenciais não autorizada',
  [TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS]: 'Credenciais inválidas',
  [TITULO_CLIENTE_ERRORS.NOT_FOUND]: 'O item especificado não foi encontrado',
  [TITULO_CLIENTE_ERRORS.BAD_REQUEST]: 'Algo inesperado aconteceu',
  [TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE]:
    'O serviço de titulo está indisponível',
  [TITULO_CLIENTE_ERRORS.INVALID_DOCUMENT]: 'Esse dado já está cadastrado.',
};

export type ClienteInputPostAdapter = Omit<ClienteInputPost, 'tipoCliente'> & {
  tipoCliente: CLIENTE_TIPO;
};

export const postCliente = async (
  cliente: ClienteInputPostAdapter,
): Promise<{ id: string }> =>
  postClientes({
    ...cliente,
    tipoCliente: ClienteTipoModelToValue[cliente.tipoCliente],
  })
    .then(({ id }) => ({ id: Cliente.toGlobalId(id) }))
    .catch(catchAdapterError(CLIENTE_ERROR_MESSAGES));

export const getClientesPagination = async (
  keyword: string,
  args: APIPaginationInput,
): Promise<ClientePagination> =>
  getClientes(keyword, args)
    .then((clientes) => ({
      ...clientes,
      items: clientes.items.map((cliente) => new Cliente(cliente)),
    }))
    .catch(catchAdapterError(CLIENTE_ERROR_MESSAGES));

export const getClienteById = async (id: string): Promise<Cliente> =>
  getCliente(id)
    .then((cliente) => new Cliente(cliente))
    .catch(catchAdapterError(CLIENTE_ERROR_MESSAGES));

export const getTitulosByClienteId = async (
  id: string,
): Promise<TituloPagination> =>
  getTitulos(id)
    .then((titulos) => ({
      ...titulos,
      items: titulos.items.map((titulo) => new Titulo(titulo)),
    }))
    .catch(catchAdapterError(CLIENTE_ERROR_MESSAGES));

export type TituloInputPostAdapter = TituloInputPost;

export const postTituloByClienteId = async (
  id: string,
  titulo: TituloInputPostAdapter,
): Promise<{ id: string }> =>
  postTitulo(id, titulo)
    .then(({ id }) => ({ id: Titulo.toGlobalId(id) }))
    .catch(catchAdapterError(CLIENTE_ERROR_MESSAGES));

export type ClienteInputPatchAdapter = Omit<
  ClienteInputPatch,
  'sexo' | 'tipoCliente'
> & {
  sexo?: ClienteSexoDomain | null;
  tipoCliente?: CLIENTE_TIPO | null;
};

export const patchClienteById = async (
  id: string,
  cliente: ClienteInputPatchAdapter,
): Promise<{ id: string }> =>
  patchCliente(id, {
    ...cliente,
    sexo: cliente.sexo ? ClienteSexoDomainToModel[cliente.sexo] : null,
    tipoCliente: cliente.tipoCliente
      ? ClienteTipoModelToValue[cliente.tipoCliente]
      : null,
  })
    .then(({ id }) => ({ id: Cliente.toGlobalId(id) }))
    .catch(catchAdapterError(CLIENTE_ERROR_MESSAGES));

export const getContatoTelefonePagination = async (
  id: string,
  args: APIPaginationInput,
  numero?: string | null,
): Promise<ContatoTelefonePagination> =>
  getClientesContatosTelefones(id, args, numero)
    .then((contatoTelefone) => ({
      ...contatoTelefone,
      items: contatoTelefone.items.map(
        (telefone) => new ContatoTelefone(telefone),
      ),
    }))
    .catch(catchAdapterError(CLIENTE_ERROR_MESSAGES));

export const getContatoEmailPagination = async (
  id: string,
  args: APIPaginationInput,
  email?: string | null,
): Promise<ContatoEmailPagination> =>
  getClientesContatosEmails(id, args, email)
    .then((contatoEmail) => ({
      ...contatoEmail,
      items: contatoEmail.items.map((email) => new ContatoEmail(email)),
    }))
    .catch(catchAdapterError(CLIENTE_ERROR_MESSAGES));

export const getContatoEnderecoPagination = async (
  id: string,
  args: APIPaginationInput,
): Promise<ContatoEnderecoPagination> =>
  getClientesContatosEnderecos(id, args)
    .then((contatoEndereco) => ({
      ...contatoEndereco,
      items: contatoEndereco.items.map(
        (endereco) => new ContatoEndereco(endereco),
      ),
    }))
    .catch(catchAdapterError(CLIENTE_ERROR_MESSAGES));

type ContatoEnderecoInputAdapter = Omit<ContatoEndereco, 'id'>;

export const postContatoEnderecoByClienteId = async (
  id: string,
  endereco: ContatoEnderecoInputAdapter,
): Promise<{ id: string }> =>
  postContatoEndereco(id, {
    ...endereco,
    classificacao: ContatoClassificacaoModelToDomain[endereco.classificacao],
    marcador: endereco.marcador
      ? ContatoMarcadorModelToDomain[endereco.marcador]
      : null,
    paisId: endereco.paisId ? Pais.getModelId(String(endereco.paisId)) : null,
  })
    .then(({ id }) => ({
      id: ContatoEndereco.toGlobalId(id),
    }))
    .catch(catchAdapterError(CLIENTE_ERROR_MESSAGES));

type ContatEmailInputAdapter = Omit<ContatoEmail, 'id'>;

export const postContatoEmailByClienteId = async (
  id: string,
  email: ContatEmailInputAdapter,
): Promise<{ id: string }> =>
  postContatoEmail(id, {
    ...email,
    classificacao: ContatoClassificacaoModelToDomain[email.classificacao],
    marcador: email.marcador
      ? ContatoMarcadorModelToDomain[email.marcador]
      : null,
  })
    .then(({ id }) => ({
      id: ContatoEmail.toGlobalId(id),
    }))
    .catch(catchAdapterError(CLIENTE_ERROR_MESSAGES));

export type ContatoTelefonePostInputAdapter = Omit<
  ContatoTelefoneInputPost,
  'marcador' | 'classificacao'
> & {
  marcador: CONTATO_MARCADOR;
  classificacao: CONTATO_CLASSIFICACAO;
};

export const postContatoTelefoneByClienteId = async (
  id: string,
  telefone: ContatoTelefonePostInputAdapter,
): Promise<ContatoTelefone> =>
  postContatoTelefone(id, {
    ...telefone,
    classificacao: ContatoClassificacaoModelToDomain[telefone.classificacao],
    marcador: ContatoMarcadorModelToDomain[telefone.marcador],
  })
    .then((telefone) => new ContatoTelefone(telefone))
    .catch(catchAdapterError(CLIENTE_ERROR_MESSAGES));
