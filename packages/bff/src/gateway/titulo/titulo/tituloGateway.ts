import { logError, logInfo } from '@bff/logger';
import { catchStatusCodeError } from '@bff/helpers';
import {
  TITULO_TITULOS_ASSINATURA_ENDPOINT,
  TITULO_TITULOS_ENDPOINT,
  tituloApiGateway,
} from '../tituloApiGateway';
import { TituloModel } from './models/tituloModel';

export enum TITULO_TITULO_ERRORS {
  BAD_REQUEST = 'TITULO_ERROR_BAD_REQUEST',
  UNAUTHORIZED = 'TITULO_TITULO_ERROR_UNAUTHORIZED',
  INVALID_CREDENTIALS = 'TITULO_TITULO_ERROR_INVALID_CREDENTIALS',
  NOT_FOUND = 'TITULO_TITULO_ERROR_NOT_FOUND',
  SOMETHING_WENT_WRONG = 'TITULO_TITULO_ERROR_SOMETHING_WENT_WRONG',
  SERVICE_UNAVAILABLE = 'TITULO_TITULO_ERROR_SERVICE_UNAVAILABLE',
}

export async function getTitulo(tituloId: string): Promise<TituloModel> {
  return tituloApiGateway
    .get<TituloModel>(TITULO_TITULOS_ENDPOINT.replace(':id', tituloId))
    .then((response) => response.data)
    .then(logInfo('TITULO_TITULOS', 'getTituloById'))
    .catch(
      catchStatusCodeError({
        400: TITULO_TITULO_ERRORS.BAD_REQUEST,
        401: TITULO_TITULO_ERRORS.UNAUTHORIZED,
        403: TITULO_TITULO_ERRORS.INVALID_CREDENTIALS,
        404: TITULO_TITULO_ERRORS.NOT_FOUND,
        500: TITULO_TITULO_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_TITULO_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_TITULOS', 'getTituloById'));
}

export type TituloInputPatch = {
  siteRegistro?: string | null;
  tipoConta?: string | null;
  contaAnteriorFalencia: boolean;
  tipoAtivoInvestido?: string | null;
  valorDepositos?: string | null;
  observacao?: string | null;
};

export async function patchTitulo(
  id: string,
  titulo: TituloInputPatch,
): Promise<{ id: string }> {
  return tituloApiGateway
    .patch<{ id: string }>(TITULO_TITULOS_ENDPOINT.replace(':id', id), titulo)
    .then((response) => response.data)
    .then(logInfo('TITULO_TITULOS', 'patchTitulo'))
    .catch(
      catchStatusCodeError({
        400: TITULO_TITULO_ERRORS.BAD_REQUEST,
        401: TITULO_TITULO_ERRORS.UNAUTHORIZED,
        403: TITULO_TITULO_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_TITULO_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_TITULO_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_TITULOS', 'patchTitulo'));
}

export type AssinaturaInputPost = {
  usuarioSupervisor: string;
  senhaSupervisor: string;
};

export async function postAssinatura(
  id: string,
  login: AssinaturaInputPost,
): Promise<{ id: string }> {
  return tituloApiGateway
    .post<{ id: string }>(
      TITULO_TITULOS_ASSINATURA_ENDPOINT.replace(':id', id),
      login,
    )
    .then((response) => response.data)
    .then(logInfo('TITULO_TITULOS', 'postAssinatura'))
    .catch(
      catchStatusCodeError({
        400: TITULO_TITULO_ERRORS.BAD_REQUEST,
        401: TITULO_TITULO_ERRORS.UNAUTHORIZED,
        403: TITULO_TITULO_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_TITULO_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_TITULO_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_TITULOS', 'postAssinatura'));
}

export type AssinaturaInput = {
  usuarioSupervisor: string;
  senhaSupervisor: string;
  motivo: string;
};

export async function patchAssinatura(
  id: string,
  login: AssinaturaInput,
): Promise<{ id: string }> {
  return tituloApiGateway
    .patch<{ id: string }>(
      TITULO_TITULOS_ASSINATURA_ENDPOINT.replace(':id', id),
      login,
    )
    .then((response) => response.data)
    .then(logInfo('TITULO_TITULOS', 'patchAssinatura'))
    .catch(
      catchStatusCodeError({
        400: TITULO_TITULO_ERRORS.BAD_REQUEST,
        401: TITULO_TITULO_ERRORS.UNAUTHORIZED,
        403: TITULO_TITULO_ERRORS.INVALID_CREDENTIALS,
        500: TITULO_TITULO_ERRORS.SOMETHING_WENT_WRONG,
        503: TITULO_TITULO_ERRORS.SERVICE_UNAVAILABLE,
      }),
    )
    .catch(logError('TITULO_TITULOS', 'patchAssinatura'));
}
