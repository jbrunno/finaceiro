import { faker } from '@faker-js/faker/locale/pt_BR';
import MockAdapter from 'axios-mock-adapter/types';
import {
  FollowUpModel,
  FollowUpPaginationModel,
} from '../followUp/models/followUpModel';
import { ACIONAMENTO_CLIENTES_FOLLOW_UPS_ENDPOINT } from '../acionamentoApiGateway';

import { id as usuarioId } from '../../permissionamento/usuario/usuarioGateway.mock';
import { id as clienteId } from '../../titulo/cliente/clienteGateway.mock';
import { id as tituloId } from '../../titulo/titulo/tituloApiGateway.mock';
import { id as situacaoId } from '../followUp/followUpGateway.mock';
import { FollowUpInputPost } from './clienteGateway';

export const clienteFollowUpsPaginationRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = ACIONAMENTO_CLIENTES_FOLLOW_UPS_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onGet(ENDPOINT)
        .replyOnce<FollowUpPaginationModel>(200, followUps)
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

export const followUpPostRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = ACIONAMENTO_CLIENTES_FOLLOW_UPS_ENDPOINT.replace(
    ':id',
    clienteId,
  );

  return !error
    ? mockAdapter
        .onPost(ENDPOINT, followInputPost)
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

export const id = faker.datatype.uuid();

export const paginationInput = {
  pageNumber: faker.mersenne.rand(1, 5),
  pageSize: faker.mersenne.rand(5, 10),
  sortField: null,
  sortOrder: null,
};

const followUpMock = (id?: string): FollowUpModel => {
  return {
    id: id || faker.datatype.uuid(),
    dataRegistro: faker.date.past().toISOString(),
    usuarioId,
    situacaoId,
    descricao: faker.lorem.sentence(),
  };
};

export const followUps = {
  items: [followUpMock(), followUpMock()],
  pagination: {
    pageNumber: paginationInput.pageNumber,
    pageSize: paginationInput.pageSize,
    totalItems: faker.mersenne.rand(50, 100),
  },
};

export const followInputPost: FollowUpInputPost = {
  descricao: faker.address.country(),
  situacaoFollowUpId: situacaoId,
  tituloId,
};
