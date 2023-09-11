import { faker } from '@faker-js/faker/locale/pt_BR';
import MockAdapter from 'axios-mock-adapter';
import camelcaseKeys from 'camelcase-keys';
import {
  PERMISSIONAMENTO_USUARIO_USUARIOS_ENDPOINT,
  PERMISSIONAMENTO_USUARIO_USUARIO_BY_ID_ENDPOINT,
} from '../permissionamentoApiGateway';
import { UsuarioByIdModel } from './models/usuarioByIdModel';
import { UsuariosPaginationModel } from './models/usuariosModel';

export const usuarioByIdRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = PERMISSIONAMENTO_USUARIO_USUARIO_BY_ID_ENDPOINT.replace(
    ':id',
    id,
  );

  return !error
    ? mockAdapter.onGet(ENDPOINT).reply<UsuarioByIdModel>(200, usuario)
    : mockAdapter
        .onGet(ENDPOINT)
        .replyOnce(400)
        .onGet(ENDPOINT)
        .replyOnce(500)
        .onGet(ENDPOINT)
        .replyOnce(503);
};

export const usuariosRequests = (mockAdapter: MockAdapter, error?: boolean) => {
  return !error
    ? mockAdapter
        .onGet(PERMISSIONAMENTO_USUARIO_USUARIOS_ENDPOINT, {
          params: camelcaseKeys(paginationInput, { pascalCase: true }),
        })
        .replyOnce<UsuariosPaginationModel>(200, usuarios)
    : mockAdapter
        .onGet(PERMISSIONAMENTO_USUARIO_USUARIOS_ENDPOINT)
        .replyOnce(500)
        .onGet(PERMISSIONAMENTO_USUARIO_USUARIOS_ENDPOINT)
        .replyOnce(503);
};

export const id = faker.datatype.uuid();

export const paginationInput = {
  pageNumber: faker.mersenne.rand(1, 5),
  pageSize: faker.mersenne.rand(5, 10),
  sortField: null,
  sortOrder: null,
};

export const usuario = {
  id,
  nome: faker.name.fullName(),
  username: faker.internet.userName(),
  cargo: faker.name.jobTitle(),
  turno: faker.mersenne.rand(1, 2),
  cargaHoraria: faker.helpers.fake(`{{datatype.number(40)}} horas`),
};

export const usuarios = {
  items: [
    {
      id: faker.datatype.uuid(),
      nome: faker.name.fullName(),
      username: faker.internet.userName(),
      cargo: faker.name.jobTitle(),
      turno: faker.helpers.fake(`{{datatype.number(8)}} horas`),
      cargaHoraria: faker.helpers.fake(`{{datatype.number(40)}} horas`),
      equipes: [],
      carteiras: [],
    },
  ],
  pagination: {
    pageNumber: paginationInput.pageNumber,
    pageSize: paginationInput.pageSize,
    totalItems: faker.mersenne.rand(50, 100),
  },
};
