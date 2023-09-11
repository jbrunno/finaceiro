import { faker } from '@faker-js/faker/locale/pt_BR';
import MockAdapter from 'axios-mock-adapter';

import {
  TITULO_PAISES_ENDPOINT,
  TITULO_PAIS_ENDPOINT,
} from '../tituloApiGateway';
import { PaisModel, PaisesListModel } from './model/paisModel';

export const paisesGetRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_PAISES_ENDPOINT;

  return !error
    ? mockAdapter.onGet(ENDPOINT).replyOnce<PaisesListModel>(200, paises)
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

export const paisRequests = (mockAdapter: MockAdapter, error?: boolean) => {
  const ENDPOINT = TITULO_PAIS_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter.onGet(ENDPOINT).replyOnce<PaisModel>(200, pais)
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

export const paisMock = (id?: string): PaisModel => {
  return {
    id: id || faker.datatype.uuid(),
    descricao: faker.address.country(),
  };
};

export const pais = paisMock(id);

export const paises = {
  items: [paisMock(), paisMock()],
};
