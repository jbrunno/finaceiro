import { ContatoClassificacaoModelToDomain } from '@/domain/titulo/contato/contatoClassificacaoDomain';
import { ContatoEmail } from '@/domain/titulo/contato/contatoEmailDomain';
import { ContatoEndereco } from '@/domain/titulo/contato/contatoEnderecoDomain';
import { ContatoMarcadorModelToDomain } from '@/domain/titulo/contato/contatoMarcadorDomain';
import { ContatoTelefone } from '@/domain/titulo/contato/contatoTelefoneDomain';
import {
  getContatoEndereco,
  getContatoTelefone,
  patchContatoEmail,
  patchContatoEndereco,
  patchContatoTelefone,
  TITULO_CONTATO_ERRORS,
} from '@/gateway/titulo/contato/contatoGateway';
import { catchAdapterError } from '@bff/helpers';

export const CONTATO_ERROR_MESSAGES = {
  [TITULO_CONTATO_ERRORS.SOMETHING_WENT_WRONG]: 'Algo inesperado aconteceu',
  [TITULO_CONTATO_ERRORS.UNAUTHORIZED]: 'Credenciais não autorizada',
  [TITULO_CONTATO_ERRORS.INVALID_CREDENTIALS]: 'Credenciais inválidas',
  [TITULO_CONTATO_ERRORS.NOT_FOUND]: 'O item especificado não foi encontrado',
  [TITULO_CONTATO_ERRORS.BAD_REQUEST]: 'Algo inesperado aconteceu',
  [TITULO_CONTATO_ERRORS.SERVICE_UNAVAILABLE]:
    'O serviço de titulo está indisponível',
};

export const getContatoTelefoneById = async (
  id: string,
): Promise<ContatoTelefone> =>
  getContatoTelefone(id)
    .then((telefone) => new ContatoTelefone(telefone))
    .catch(catchAdapterError(CONTATO_ERROR_MESSAGES));

type ContatoTelefoneInputAdapter = Omit<
  ContatoTelefone,
  'id' | 'tipo' | 'telefone' | 'numero'
>;

export const patchContatoTelefoneById = async (
  id: string,
  telefone: ContatoTelefoneInputAdapter,
): Promise<{ id: string }> =>
  patchContatoTelefone(id, {
    ...telefone,
    classificacao: ContatoClassificacaoModelToDomain[telefone.classificacao],
    marcador: telefone.marcador
      ? ContatoMarcadorModelToDomain[telefone.marcador]
      : null,
  })
    .then(({ contatoId }) => ({
      id: ContatoTelefone.toGlobalId(contatoId),
    }))
    .catch(catchAdapterError(CONTATO_ERROR_MESSAGES));

export type ContatoEnderecoInputAdpter = Omit<
  ContatoEndereco,
  | 'id'
  | 'numero'
  | 'complemento'
  | 'logradouro'
  | 'bairro'
  | 'cidade'
  | 'uf'
  | 'cep'
  | 'paisId'
>;

export const patchContatoEnderecoById = async (
  id: string,
  endereco: ContatoEnderecoInputAdpter,
): Promise<{ id: string }> =>
  patchContatoEndereco(id, {
    ...endereco,
    classificacao: ContatoClassificacaoModelToDomain[endereco.classificacao],
    marcador: endereco.marcador
      ? ContatoMarcadorModelToDomain[endereco.marcador]
      : null,
  })
    .then(({ contatoId }) => ({ id: ContatoEndereco.toGlobalId(contatoId) }))
    .catch(catchAdapterError(CONTATO_ERROR_MESSAGES));

export const getContatoEnderecoById = async (
  id: string,
): Promise<ContatoEndereco> =>
  getContatoEndereco(id)
    .then((endereco) => new ContatoEndereco(endereco))
    .catch(catchAdapterError(CONTATO_ERROR_MESSAGES));

type ContatoEmailInputAdapter = Omit<ContatoEmail, 'id' | 'email'>;

export const patchContatoEmailById = async (
  id: string,
  email: ContatoEmailInputAdapter,
): Promise<{ id: string }> =>
  patchContatoEmail(id, {
    ...email,
    classificacao: ContatoClassificacaoModelToDomain[email.classificacao],
    marcador: email.marcador
      ? ContatoMarcadorModelToDomain[email.marcador]
      : null,
  })
    .then(({ contatoId }) => ({
      id: ContatoEmail.toGlobalId(contatoId),
    }))
    .catch(catchAdapterError(CONTATO_ERROR_MESSAGES));
