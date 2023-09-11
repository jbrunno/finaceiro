import { faker } from '@faker-js/faker/locale/pt_BR';
import MockAdapter from 'axios-mock-adapter/types';
import {
  ContatoClassificacaoModel,
  ContatoEnderecoModel,
  ContatoMarcadorModel,
  ContatoTelefoneModel,
  TipoTelefoneModel,
} from '../cliente/models/contatoModel';
import {
  TITULO_CONTATOS_EMAIL_ENDPOINT,
  TITULO_CONTATOS_ENDERECO_ENDPOINT,
  TITULO_CONTATOS_TELEFONE_ENDPOINT,
} from '../tituloApiGateway';

export const contatoTelefonePatchRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CONTATOS_TELEFONE_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onPatch(ENDPOINT, contatoTelefonePatch)
        .reply<{ contatoId: string }>(200, { contatoId: id })
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

export const contatoTelefoneGetRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CONTATOS_TELEFONE_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onGet(ENDPOINT)
        .replyOnce<{ id: string }>(200, contatoTelefoneResponseGetMock)
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

export const contatoEnderecoPatchRequests = (
  mockAdpter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CONTATOS_ENDERECO_ENDPOINT.replace(':id', id);
  return !error
    ? mockAdpter
        .onPatch(ENDPOINT, contatoEnderecoPatch)
        .reply<{ contatoId: string }>(200, { contatoId: id })
    : mockAdpter
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

export const contatoEnderecoGetRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CONTATOS_ENDERECO_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onGet(ENDPOINT)
        .replyOnce<{ id: string }>(200, contatoEnderecoResponseGetMock)
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

export const contatoEmailPatchRequest = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CONTATOS_EMAIL_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onPatch(ENDPOINT, contatoEmailPatch)
        .reply<{ contatoId: string }>(200, { contatoId: id })
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

const telefoneMock = (id?: string): ContatoTelefoneModel => {
  return {
    id: id || faker.datatype.uuid(),
    nome: faker.name.fullName(),
    marcador: ContatoMarcadorModel.AVOS,
    classificacao: ContatoClassificacaoModel.BOM,
    numero: faker.helpers.fake(`{{datatype.number(11)}}`),
    tipo: TipoTelefoneModel.CELULAR,
    whatsapp: faker.datatype.boolean(),
  };
};

const enderecoMock = (id?: string): ContatoEnderecoModel => {
  return {
    id: id || faker.datatype.uuid(),
    nome: faker.name.fullName(),
    marcador: 2,
    classificacao: 1,
    numero: faker.address.buildingNumber(),
    complemento: faker.address.street(),
    logradouro: faker.address.street(),
    bairro: faker.address.street(),
    cidade: faker.address.cityName(),
    uf: faker.address.countryCode('alpha-2'),
    cep: faker.address.zipCode('#######'),
  };
};

export const contatoTelefoneResponseGetMock = {
  ...telefoneMock(),
};

export const contatoEnderecoResponseGetMock = {
  ...enderecoMock(),
};

export const contatoTelefonePatch = {
  nome: faker.name.fullName(),
  marcador: ContatoMarcadorModel.NETO,
  classificacao: ContatoClassificacaoModel.BOM,
  whatsapp: faker.datatype.boolean(),
};

export const contatoEnderecoPatch = {
  nome: faker.name.fullName(),
  marcador: ContatoMarcadorModel.PAI,
  classificacao: ContatoClassificacaoModel.BOM,
};

export const contatoEmailPatch = {
  nome: faker.name.fullName(),
  marcador: ContatoMarcadorModel.NETO,
  classificacao: ContatoClassificacaoModel.BOM,
};
