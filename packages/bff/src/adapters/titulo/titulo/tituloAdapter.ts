import { Titulo } from '@/domain/titulo/titulo/tituloDomain';
import {
  AssinaturaInputPost,
  TITULO_TITULO_ERRORS,
  TituloInputPatch,
  getTitulo,
  patchTitulo,
  postAssinatura,
  AssinaturaInput,
  patchAssinatura,
} from '@/gateway/titulo/titulo/tituloGateway';
import { catchAdapterError } from '@bff/helpers';

export const TITULO_ERROR_MESSAGES = {
  [TITULO_TITULO_ERRORS.BAD_REQUEST]: 'Algo inesperado aconteceu',
  [TITULO_TITULO_ERRORS.INVALID_CREDENTIALS]: 'Credenciais inválidas',
  [TITULO_TITULO_ERRORS.NOT_FOUND]: 'O item especificado não foi encontrado',
  [TITULO_TITULO_ERRORS.SOMETHING_WENT_WRONG]: 'Algo inesperado aconteceu',
  [TITULO_TITULO_ERRORS.UNAUTHORIZED]: 'Credenciais inválidas',
  [TITULO_TITULO_ERRORS.SERVICE_UNAVAILABLE]:
    'O serviço de titulo está indisponível',
};

export const getTituloById = async (id: string): Promise<Titulo> =>
  getTitulo(id)
    .then((titulo) => new Titulo(titulo))
    .catch(catchAdapterError(TITULO_ERROR_MESSAGES));

export type TituloInputPatchAdapter = TituloInputPatch;

export const patchTituloById = async (
  id: string,
  titulo: TituloInputPatchAdapter,
): Promise<{ id: string }> =>
  patchTitulo(id, titulo)
    .then(({ id }) => ({ id: Titulo.toGlobalId(id) }))
    .catch(catchAdapterError(TITULO_ERROR_MESSAGES));

export type AssinaturaInputPostAdapter = AssinaturaInputPost;

export const postAssinaturaTitulo = async (
  id: string,
  login: AssinaturaInputPostAdapter,
): Promise<{ id: string }> =>
  postAssinatura(id, login)
    .then(({ id }) => ({ id: Titulo.toGlobalId(id) }))
    .catch(catchAdapterError(TITULO_ERROR_MESSAGES));

export type AssinaturaInputAdapter = AssinaturaInput;

export const editarAssinaturaTitulo = async (
  id: string,
  login: AssinaturaInputAdapter,
): Promise<{ id: string }> =>
  patchAssinatura(id, login)
    .then(({ id }) => ({ id: Titulo.toGlobalId(id) }))
    .catch(catchAdapterError(TITULO_ERROR_MESSAGES));
