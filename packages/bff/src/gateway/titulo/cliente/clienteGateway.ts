import { logError, logInfo } from '@bff/logger';
import { catchStatusCodeError } from '@bff/helpers';
import { APIPaginationInput } from '@bff/models/apiPaginationModel';
import { ContatoEndereco } from '@/domain/titulo/contato/contatoEnderecoDomain';
import { ContatoEmail } from '@/domain/titulo/contato/contatoEmailDomain';
import {
  tituloApiGateway,
  TITULO_CLIENTE_ENDPOINT,
  TITULO_CLIENTES_ENDPOINT,
  TITULO_CLIENTE_TELEFONES_ENDPOINT,
  TITULO_CLIENTE_EMAILS_ENDPOINT,
  TITULO_CLIENTE_ENDERECOS_ENDPOINT,
  TITULO_CLIENTE_TITULOS_ENDPOINT,
} from '../tituloApiGateway';
import {
  ClienteModel,
  ClientePaginationModel,
  ClienteTipoModel,
} from './models/clienteModel';
import {
  ContatoEmailModel,
  ContatoEmailPaginationModel,
  ContatoEnderecoModel,
  ContatoEnderecoPaginationModel,
  ContatoTelefoneModel,
  ContatoTelefonePaginationModel,
} from './models/contatoModel';
import { TituloPaginationModel } from './models/tituloModel';

export enum TITULO_CLIENTE_ERRORS {
  BAD_REQUEST = 'TITULO_CLIENTE_ERROR_BAD_REQUEST',
  UNAUTHORIZED = 'TITULO_CLIENTE_ERROR_UNAUTHORIZED',
  NOT_FOUND = 'TITULO_CLIENTE_ERROR_NOT_FOUND',
  SOMETHING_WENT_WRONG = 'TITULO_CLIENTE_ERROR_SOMETHING_WENT_WRONG',
  SERVICE_UNAVAILABLE = 'TITULO_CLIENTE_ERROR_SERVICE_UNAVAILABLE',
  INVALID_CREDENTIALS = 'TITULO_CLIENTE_ERROR_INVALID_CREDENTIALS',
  INVALID_DOCUMENT = 'TITULO_CLIENTE_ERROR_INVALID_DOCUMENT',
}

export type ClienteInputPost = {
  nome: string;
  telefone: string;
  tipoCliente: ClienteTipoModel;
  documento?: string | null;
};

export async function postClientes(
  cliente: ClienteInputPost,
): Promise<{ id: string }> {
  return tituloApiGateway
    .post<{ id: string }>(TITULO_CLIENTES_ENDPOINT, cliente)
    .then((response) => response.data)
    .then(logInfo('TITULO_CLIENTE', 'postCliente'))
    .catch(
      catchStatusCodeError({
        400: TITULO_CLIENTE_ERRORS.BAD_REQUEST,
        401: TITULO_CLIENTE_ERRORS.UNAUTHORIZED,
        403: TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS,
        406: TITULO_CLIENTE_ERRORS.INVALID_DOCUMENT,
        500: TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CLIENTE', 'postCliente'));
}

export async function getClientes(
  keyword: string,
  paginationInput: APIPaginationInput,
): Promise<ClientePaginationModel> {
  const { pageNumber, pageSize, sortField, sortOrder } = paginationInput;

  return tituloApiGateway
    .get<ClientePaginationModel>(TITULO_CLIENTES_ENDPOINT, {
      params: {
        PageSize: pageSize || 10,
        PageNumber: pageNumber || 1,
        SortField: sortField || null,
        SortOrder: sortOrder || null,
        Keyword: keyword,
      },
    })
    .then((response) => response.data)
    .then(logInfo('TITULO_CLIENTE', 'getClientesByKeyWord'))
    .catch(
      catchStatusCodeError({
        400: TITULO_CLIENTE_ERRORS.BAD_REQUEST,
        401: TITULO_CLIENTE_ERRORS.UNAUTHORIZED,
        403: TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CLIENTE', 'getClientesByKeyWord'));
}

export async function getCliente(id: string): Promise<ClienteModel> {
  return tituloApiGateway
    .get<ClienteModel>(TITULO_CLIENTE_ENDPOINT.replace(':id', id))
    .then((response) => response.data)
    .then(logInfo('TITULO_CLIENTE', 'getCliente'))
    .catch(
      catchStatusCodeError({
        400: TITULO_CLIENTE_ERRORS.BAD_REQUEST,
        401: TITULO_CLIENTE_ERRORS.UNAUTHORIZED,
        403: TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS,
        404: TITULO_CLIENTE_ERRORS.NOT_FOUND,
        500: TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CLIENTE', 'getCliente'));
}

export async function getTitulos(id: string): Promise<TituloPaginationModel> {
  return tituloApiGateway
    .get<TituloPaginationModel>(
      TITULO_CLIENTE_TITULOS_ENDPOINT.replace(':id', id),
    )
    .then((response) => response.data)
    .then(logInfo('TITULO_CLIENTE', 'getTitulos'))
    .catch(
      catchStatusCodeError({
        401: TITULO_CLIENTE_ERRORS.UNAUTHORIZED,
        403: TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CLIENTE', 'getTitulos'));
}

export type TituloInputPost = {
  siteRegistro?: string | null;
  tipoConta?: string | null;
  contaAnteriorFalencia: boolean;
  tipoAtivoInvestido?: string | null;
  valorDepositos?: string | null;
  observacao?: string | null;
};

export async function postTitulo(
  id: string,
  titulo: TituloInputPost,
): Promise<{ id: string }> {
  return tituloApiGateway
    .post<{ id: string }>(
      TITULO_CLIENTE_TITULOS_ENDPOINT.replace(':id', id),
      titulo,
    )
    .then((response) => response.data)
    .then(logInfo('TITULO_CLIENTE', 'postTitulo'))
    .catch(
      catchStatusCodeError({
        400: TITULO_CLIENTE_ERRORS.BAD_REQUEST,
        401: TITULO_CLIENTE_ERRORS.UNAUTHORIZED,
        403: TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CLIENTE', 'postTitulo'));
}

export type ClienteInputPatch = {
  nome?: ClienteModel['nome'] | null;
  nomeSocial?: ClienteModel['nomeSocial'] | null;
  sexo?: ClienteModel['sexo'] | null;
  falecido?: ClienteModel['falecido'] | null;
  cboId?: ClienteModel['cboId'] | null;
  negativado?: ClienteModel['negativado'] | null;
  tipoCliente?: ClienteModel['tipo'] | null;
  documento?: ClienteModel['documento'] | null;
  dataNascimento?: ClienteModel['dataNascimento'] | null;
};

export async function patchCliente(
  id: string,
  cliente: ClienteInputPatch,
): Promise<{ id: string }> {
  return tituloApiGateway
    .patch<{ id: string }>(TITULO_CLIENTE_ENDPOINT.replace(':id', id), {
      ...cliente,
      nomeSocial: cliente.nomeSocial || '',
    })
    .then((response) => response.data)
    .then(logInfo('TITULO_CLIENTE', 'patchCliente'))
    .catch(
      catchStatusCodeError({
        400: TITULO_CLIENTE_ERRORS.BAD_REQUEST,
        401: TITULO_CLIENTE_ERRORS.UNAUTHORIZED,
        403: TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CLIENTE', 'patchCliente'));
}

export async function getClientesContatosTelefones(
  id: string,
  paginationInput: APIPaginationInput,
  numero?: string | null,
): Promise<ContatoTelefonePaginationModel> {
  const { pageNumber, pageSize, sortField, sortOrder } = paginationInput;

  return tituloApiGateway
    .get<ContatoTelefonePaginationModel>(
      TITULO_CLIENTE_TELEFONES_ENDPOINT.replace(':id', id),
      {
        params: {
          PageSize: pageSize || 10,
          PageNumber: pageNumber || 1,
          SortField: sortField || null,
          SortOrder: sortOrder || null,
          ...(numero ? { Numero: numero } : {}),
        },
      },
    )
    .then((response) => response.data)
    .then(logInfo('TITULO_CLIENTE', 'getClientesContatosTelefones'))
    .catch(
      catchStatusCodeError({
        401: TITULO_CLIENTE_ERRORS.UNAUTHORIZED,
        403: TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CLIENTE', 'getClientesContatosTelefones'));
}

export async function getClientesContatosEmails(
  id: string,
  paginationInput: APIPaginationInput,
  email?: string | null,
): Promise<ContatoEmailPaginationModel> {
  const { pageNumber, pageSize, sortField, sortOrder } = paginationInput;

  return tituloApiGateway
    .get<ContatoEmailPaginationModel>(
      TITULO_CLIENTE_EMAILS_ENDPOINT.replace(':id', id),
      {
        params: {
          PageSize: pageSize || 10,
          PageNumber: pageNumber || 1,
          SortField: sortField || null,
          SortOrder: sortOrder || null,
          ...(email ? { Email: email } : {}),
        },
      },
    )
    .then((response) => response.data)
    .then(logInfo('TITULO_CLIENTE', 'getClientesContatosEmails'))
    .catch(
      catchStatusCodeError({
        401: TITULO_CLIENTE_ERRORS.UNAUTHORIZED,
        403: TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CLIENTE', 'getClientesContatosEmails'));
}

export async function getClientesContatosEnderecos(
  id: string,
  paginationInput: APIPaginationInput,
): Promise<ContatoEnderecoPaginationModel> {
  const { pageNumber, pageSize, sortField, sortOrder } = paginationInput;

  return tituloApiGateway
    .get<ContatoEnderecoPaginationModel>(
      TITULO_CLIENTE_ENDERECOS_ENDPOINT.replace(':id', id),
      {
        params: {
          PageSize: pageSize || 10,
          PageNumber: pageNumber || 1,
          SortField: sortField || null,
          SortOrder: sortOrder || null,
        },
      },
    )
    .then((response) => response.data)
    .then(logInfo('TITULO_CLIENTE', 'getClientesContatosEnderecos'))
    .catch(
      catchStatusCodeError({
        401: TITULO_CLIENTE_ERRORS.UNAUTHORIZED,
        403: TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CLIENTE', 'getClientesContatosEnderecos'));
}

export type ContatoEnderecoInputPost = Omit<ContatoEnderecoModel, 'id'>;

export async function postContatoEndereco(
  id: string,
  endereco: ContatoEnderecoInputPost,
): Promise<ContatoEndereco> {
  return tituloApiGateway
    .post<ContatoEndereco>(
      TITULO_CLIENTE_ENDERECOS_ENDPOINT.replace(':id', id),
      {
        ...endereco,
      },
    )
    .then((response) => response.data)
    .then(logInfo('TITULO_CLIENTE', 'postContatoEndereco'))
    .catch(
      catchStatusCodeError({
        400: TITULO_CLIENTE_ERRORS.BAD_REQUEST,
        401: TITULO_CLIENTE_ERRORS.UNAUTHORIZED,
        403: TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CLIENTE', 'postContatoEndereco'));
}

export type ContatoEmailInputPost = Omit<ContatoEmailModel, 'id'>;

export async function postContatoEmail(
  id: string,
  email: ContatoEmailInputPost,
): Promise<ContatoEmail> {
  return tituloApiGateway
    .post<ContatoEmail>(TITULO_CLIENTE_EMAILS_ENDPOINT.replace(':id', id), {
      ...email,
    })
    .then((response) => response.data)
    .then(logInfo('TITULO_CLIENTE', 'postContatoEmail'))
    .catch(
      catchStatusCodeError({
        400: TITULO_CLIENTE_ERRORS.BAD_REQUEST,
        401: TITULO_CLIENTE_ERRORS.UNAUTHORIZED,
        403: TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CLIENTE', 'postContatoEmail'));
}

export type ContatoTelefoneInputPost = Omit<
  ContatoTelefoneModel,
  'id' | 'tipo'
>;

export async function postContatoTelefone(
  id: string,
  telefone: ContatoTelefoneInputPost,
): Promise<ContatoTelefoneModel> {
  return tituloApiGateway
    .post<ContatoTelefoneModel>(
      TITULO_CLIENTE_TELEFONES_ENDPOINT.replace(':id', id),
      telefone,
    )
    .then((response) => response.data)
    .then(logInfo('TITULO_CLIENTE', 'postContatoTelefone'))
    .catch(
      catchStatusCodeError({
        400: TITULO_CLIENTE_ERRORS.BAD_REQUEST,
        401: TITULO_CLIENTE_ERRORS.UNAUTHORIZED,
        403: TITULO_CLIENTE_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_CLIENTE_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CLIENTE_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CLIENTE', 'postContatoTelefone'));
}
