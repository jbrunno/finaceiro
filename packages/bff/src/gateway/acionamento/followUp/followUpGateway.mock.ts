import {
  APIPaginationInfoModel,
  APIPaginationInput,
} from '@bff/core/dist/models/apiPaginationModel';
import { faker } from '@faker-js/faker';
import MockAdapter from 'axios-mock-adapter/types';
import {
  ACIONAMENTO_FOLLOWUPS_SITUACAO_BY_ID_ENDPOINT,
  ACIONAMENTO_FOLLOWUPS_SITUACOES_ENDPOINT,
} from '../acionamentoApiGateway';
import { SituacaoPaginationModel, SituacaoModel } from './models/situacaoModel';

export const situacoesRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = ACIONAMENTO_FOLLOWUPS_SITUACOES_ENDPOINT;

  return !error
    ? mockAdapter
        .onGet(ENDPOINT)
        .replyOnce<SituacaoPaginationModel>(200, situacoes)
    : mockAdapter
        .onGet(ENDPOINT)
        .replyOnce(400)
        .onGet(ENDPOINT)
        .replyOnce(401)
        .onGet(ENDPOINT)
        .replyOnce(403)
        .onGet(ENDPOINT)
        .replyOnce(500)
        .onGet(ENDPOINT)
        .replyOnce(503);
};

export const situacaoRequests = (mockAdapter: MockAdapter, error?: boolean) => {
  const ENDPOINT = ACIONAMENTO_FOLLOWUPS_SITUACAO_BY_ID_ENDPOINT.replace(
    ':id',
    id,
  );

  return !error
    ? mockAdapter.onGet(ENDPOINT).reply<SituacaoModel>(200, situacao)
    : mockAdapter
        .onGet(ENDPOINT)
        .replyOnce(400)
        .onGet(ENDPOINT)
        .replyOnce(401)
        .onGet(ENDPOINT)
        .replyOnce(403)
        .onGet(ENDPOINT)
        .replyOnce(500)
        .onGet(ENDPOINT)
        .replyOnce(503);
};

export const id = faker.datatype.uuid();

const makeSituacao = (id?: string) => {
  return {
    id: id || faker.datatype.uuid(),
    codigo: faker.datatype.number(),
    nome: faker.lorem.words(10),
    descricaoObrigatoria: faker.datatype.boolean(),
    textoPadrao: faker.lorem.words(10),
    tempoTrava: faker.datatype.number(),
  };
};

export const paginationInfo: APIPaginationInfoModel = {
  pageNumber: faker.datatype.number({ min: 1, max: 10 }),
  pageSize: faker.datatype.number({ min: 1, max: 5 }),
  totalItems: 2,
};

export const situacao = makeSituacao(id);

export const situacoes: SituacaoPaginationModel = {
  items: [makeSituacao(), makeSituacao()],
  pagination: paginationInfo,
};

export const situacoesPaginationInput: APIPaginationInput = {
  pageSize: 10,
  pageNumber: 1,
  sortField: null,
  sortOrder: null,
};
