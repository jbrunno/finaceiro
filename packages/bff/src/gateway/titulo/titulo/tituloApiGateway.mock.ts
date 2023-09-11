import MockAdapter from 'axios-mock-adapter/types';
import { faker } from '@faker-js/faker';
import {
  TITULO_TITULOS_ASSINATURA_ENDPOINT,
  TITULO_TITULOS_ENDPOINT,
} from '../tituloApiGateway';
import { TituloModel } from './models/tituloModel';

export const tituloGetRequests = (mockAdpter: MockAdapter, error?: boolean) => {
  const ENDPOINT = TITULO_TITULOS_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdpter.onGet(ENDPOINT).replyOnce<TituloModel>(200, tituloMock)
    : mockAdpter
        .onGet(ENDPOINT)
        .replyOnce(400)
        .onGet(ENDPOINT)
        .replyOnce(401)
        .onGet(ENDPOINT)
        .replyOnce(403)
        .onGet(ENDPOINT)
        .replyOnce(404)
        .onGet(ENDPOINT)
        .replyOnce(500)
        .onGet(ENDPOINT)
        .replyOnce(503);
};

export const tituloPatchRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_TITULOS_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onPatch(ENDPOINT, tituloInputPatch)
        .replyOnce<{ id: string }>(200, { id })
    : mockAdapter
        .onPatch(ENDPOINT)
        .replyOnce(400)
        .onPatch(ENDPOINT)
        .replyOnce(401)
        .onPatch(ENDPOINT)
        .replyOnce(403)
        .onPatch(ENDPOINT)
        .replyOnce(500)
        .onPatch(ENDPOINT)
        .replyOnce(503);
};

export const assinaturaPostRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_TITULOS_ASSINATURA_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onPost(ENDPOINT, assinaturaInputPostMock)
        .replyOnce<{ id: string }>(200, { id })
    : mockAdapter
        .onPost(ENDPOINT)
        .replyOnce(400)
        .onPost(ENDPOINT)
        .replyOnce(401)
        .onPost(ENDPOINT)
        .replyOnce(403)
        .onPost(ENDPOINT)
        .replyOnce(500)
        .onPost(ENDPOINT)
        .replyOnce(503);
};

export const patchAssinaturaRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_TITULOS_ASSINATURA_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onPatch(ENDPOINT, editarAssinaturaInput)
        .replyOnce<{ id: string }>(200, { id })
    : mockAdapter
        .onPatch(ENDPOINT)
        .replyOnce(400)
        .onPatch(ENDPOINT)
        .replyOnce(401)
        .onPatch(ENDPOINT)
        .replyOnce(403)
        .onPatch(ENDPOINT)
        .replyOnce(500)
        .onPatch(ENDPOINT)
        .replyOnce(503);
};

export const id = faker.datatype.uuid();

const tituloQuestionario = {
  siteRegistro: faker.internet.url(),
  tipoConta: faker.finance.accountName(),
  contaAnteriorFalencia: faker.datatype.boolean(),
  tipoAtivoInvestido: faker.commerce.product(),
  valorDepositos: faker.finance.amount(0, 10000),
  observacao: faker.lorem.text(),
};

export const tituloMock = {
  id,
  tituloQuestionario,
  assinatura: faker.datatype.boolean(),
};

export const tituloInputPatch = {
  ...tituloQuestionario,
};

export const assinaturaInputPostMock = {
  usuarioSupervisor: faker.internet.userName(),
  senhaSupervisor: faker.internet.password(),
};

export const editarAssinaturaInput = {
  ...assinaturaInputPostMock,
  motivo: faker.lorem.text(),
};
