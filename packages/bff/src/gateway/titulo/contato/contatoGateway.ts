import { catchStatusCodeError } from '@bff/helpers';
import { logError, logInfo } from '@bff/logger';
import {
  ContatoEmailModel,
  ContatoEnderecoModel,
  ContatoTelefoneModel,
} from '../cliente/models/contatoModel';
import {
  tituloApiGateway,
  TITULO_CONTATOS_TELEFONE_ENDPOINT,
  TITULO_CONTATOS_ENDERECO_ENDPOINT,
  TITULO_CONTATOS_EMAIL_ENDPOINT,
} from '../tituloApiGateway';

export enum TITULO_CONTATO_ERRORS {
  BAD_REQUEST = 'TITULO_CONTATO_ERROR_BAD_REQUEST',
  UNAUTHORIZED = 'TITULO_CONTATO_ERROR_UNAUTHORIZED',
  NOT_FOUND = 'TITULO_CONTATO_ERROR_NOT_FOUND',
  SOMETHING_WENT_WRONG = 'TITULO_CONTATO_ERROR_SOMETHING_WENT_WRONG',
  SERVICE_UNAVAILABLE = 'TITULO_CONTATO_ERROR_SERVICE_UNAVAILABLE',
  INVALID_CREDENTIALS = 'TITULO_CONTATO_ERROR_INVALID_CREDENTIALS',
}

export type ContatoTelefoneInputPatch = Omit<
  ContatoTelefoneModel,
  'id' | 'tipo' | 'telefone' | 'numero'
>;

export async function patchContatoTelefone(
  id: string,
  telefone: ContatoTelefoneInputPatch,
): Promise<{ contatoId: string }> {
  return tituloApiGateway
    .patch<{ contatoId: string }>(
      TITULO_CONTATOS_TELEFONE_ENDPOINT.replace(':id', id),
      {
        ...telefone,
      },
    )
    .then((response) => response.data)
    .then(logInfo('TITULO_CONTATO', 'patchContatoTelefone'))
    .catch(
      catchStatusCodeError({
        400: TITULO_CONTATO_ERRORS.BAD_REQUEST,
        401: TITULO_CONTATO_ERRORS.UNAUTHORIZED,
        403: TITULO_CONTATO_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_CONTATO_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CONTATO_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CONTATO', 'patchContatoTelefone'));
}

export async function getContatoTelefone(
  id: string,
): Promise<ContatoTelefoneModel> {
  return tituloApiGateway
    .get<ContatoTelefoneModel>(
      TITULO_CONTATOS_TELEFONE_ENDPOINT.replace(':id', id),
    )
    .then((response) => response.data)
    .then(logInfo('TITULO_CONTATO', 'getContatoTelefone'))
    .catch(
      catchStatusCodeError({
        401: TITULO_CONTATO_ERRORS.UNAUTHORIZED,
        403: TITULO_CONTATO_ERRORS.INVALID_CREDENTIALS,
        404: TITULO_CONTATO_ERRORS.NOT_FOUND,
        500: TITULO_CONTATO_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CONTATO_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CONTATO', 'getContatoTelefone'));
}

export type ContatoEnderecoInputPatch = Omit<
  ContatoEnderecoModel,
  | 'id'
  | 'numero'
  | 'complemento'
  | 'logradouro'
  | 'bairro'
  | 'cidade'
  | 'uf'
  | 'cep'
>;
export async function patchContatoEndereco(
  id: string,
  contatoEnderecoInputPatch: ContatoEnderecoInputPatch,
): Promise<{ contatoId: string }> {
  return tituloApiGateway
    .patch(TITULO_CONTATOS_ENDERECO_ENDPOINT.replace(':id', id), {
      ...contatoEnderecoInputPatch,
    })
    .then((response) => response.data)
    .then(logInfo('TITULO_CONTATO', 'patchContatoEndereco'))
    .catch(
      catchStatusCodeError({
        400: TITULO_CONTATO_ERRORS.BAD_REQUEST,
        401: TITULO_CONTATO_ERRORS.UNAUTHORIZED,
        403: TITULO_CONTATO_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_CONTATO_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CONTATO_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CONTATO', 'patchContatoEndereco'));
}

export async function getContatoEndereco(
  id: string,
): Promise<ContatoEnderecoModel> {
  return tituloApiGateway
    .get<ContatoEnderecoModel>(
      TITULO_CONTATOS_ENDERECO_ENDPOINT.replace(':id', id),
    )
    .then((response) => response.data)
    .then(logInfo('TITULO_CONTATO', 'getContatoEndereco'))
    .catch(
      catchStatusCodeError({
        401: TITULO_CONTATO_ERRORS.UNAUTHORIZED,
        403: TITULO_CONTATO_ERRORS.INVALID_CREDENTIALS,
        404: TITULO_CONTATO_ERRORS.NOT_FOUND,
        500: TITULO_CONTATO_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CONTATO_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CONTATO', 'getContatoEndereco'));
}

export type ContatoEmailInputPatch = Omit<ContatoEmailModel, 'id' | 'email'>;

export async function patchContatoEmail(
  id: string,
  email: ContatoEmailInputPatch,
): Promise<{ contatoId: string }> {
  return tituloApiGateway
    .patch<{ contatoId: string }>(
      TITULO_CONTATOS_EMAIL_ENDPOINT.replace(':id', id),
      {
        ...email,
      },
    )
    .then((response) => response.data)
    .then(logInfo('TITULO_CONTATO', 'patchContatoEmail'))
    .catch(
      catchStatusCodeError({
        400: TITULO_CONTATO_ERRORS.BAD_REQUEST,
        401: TITULO_CONTATO_ERRORS.UNAUTHORIZED,
        403: TITULO_CONTATO_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_CONTATO_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_CONTATO_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_CONTATO', 'patchContatoEmail'));
}
