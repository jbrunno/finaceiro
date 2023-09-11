import { faker } from '@faker-js/faker/locale/pt_BR';
import MockAdapter from 'axios-mock-adapter/types';
import { TITULO_CBOS_ENDPOINT, TITULO_CBO_ENDPOINT } from '../tituloApiGateway';
import { CboModel, CboPaginationModel } from './model/cboModel';

export const cboPaginationRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CBOS_ENDPOINT;

  return !error
    ? mockAdapter.onGet(ENDPOINT).reply<CboPaginationModel>(200, cbos)
    : mockAdapter
        .onGet(ENDPOINT)
        .replyOnce(401)
        .onGet(ENDPOINT)
        .replyOnce(403)
        .onGet(ENDPOINT)
        .replyOnce(500)
        .onGet(ENDPOINT)
        .replyOnce(503);
};

export const cboRequests = (mockAdapter: MockAdapter, error?: boolean) => {
  const ENDPOINT = TITULO_CBO_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter.onGet(ENDPOINT).reply<CboModel>(200, cbo)
    : mockAdapter
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

export const id = faker.datatype.uuid();

const cboMock = (id?: string): CboModel => {
  return {
    id: id || faker.datatype.uuid(),
    codigo: +faker.random.numeric(5),
    ocupacao: faker.random.words(),
  };
};

export const paginationInput = {
  pageNumber: faker.seed(1),
  pageSize: faker.seed(5),
  sortField: null,
  sortOrder: null,
};

export const cbo = cboMock(id);

export const cbos = {
  items: [cboMock(), cboMock()],
  pagination: {
    pageNumber: paginationInput.pageNumber,
    pageSize: paginationInput.pageSize,
    totalItems: faker.seed(2),
  },
};
