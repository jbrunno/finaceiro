import { faker } from '@faker-js/faker/locale/pt_BR';
import MockAdapter from 'axios-mock-adapter/types';
import { TituloPagination } from '@/domain/titulo/titulo/tituloDomain';
import {
  TITULO_CLIENTES_ENDPOINT,
  TITULO_CLIENTE_EMAILS_ENDPOINT,
  TITULO_CLIENTE_ENDPOINT,
  TITULO_CLIENTE_TELEFONES_ENDPOINT,
  TITULO_CLIENTE_ENDERECOS_ENDPOINT,
  TITULO_CLIENTE_TITULOS_ENDPOINT,
} from '../tituloApiGateway';
import {
  ClientePaginationModel,
  ClienteModel,
  ClienteTipoModel,
} from './models/clienteModel';
import {
  ContatoTelefonePaginationModel,
  ContatoTelefoneModel,
  ContatoEmailPaginationModel,
  ContatoEmailModel,
  ContatoEnderecoPaginationModel,
  ContatoEnderecoModel,
  ContatoMarcadorModel,
  ContatoClassificacaoModel,
} from './models/contatoModel';
import { cbo } from '../cbo/cboGateway.mock';
import { ClienteInputPost } from './clienteGateway';
import {
  TituloPaginationModel,
  TituloModel,
  TituloQuestionario,
} from './models/tituloModel';
import { id as paisId, pais } from '../paises/paisesGateway.mock';

export const clientePostRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CLIENTES_ENDPOINT;

  return !error
    ? mockAdapter
        .onPost(ENDPOINT, clienteInputPostMock)
        .replyOnce<{ id: string }>(200, { id })
    : mockAdapter
        .onPost(ENDPOINT)
        .replyOnce(400)
        .onPost(ENDPOINT)
        .replyOnce(401)
        .onPost(ENDPOINT)
        .replyOnce(403)
        .onPost(ENDPOINT)
        .replyOnce(406)
        .onPost(ENDPOINT)
        .replyOnce(500)
        .onPost(ENDPOINT)
        .replyOnce(503);
};

export const clientePaginationRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CLIENTES_ENDPOINT;

  return !error
    ? mockAdapter
        .onGet(ENDPOINT)
        .replyOnce<ClientePaginationModel>(200, clientes)
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

export const clienteRequests = (mockAdapter: MockAdapter, error?: boolean) => {
  const ENDPOINT = TITULO_CLIENTE_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter.onGet(ENDPOINT).replyOnce<ClienteModel>(200, cliente)
    : mockAdapter
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

export const titulosRequests = (mockAdapter: MockAdapter, error?: boolean) => {
  const ENDPOINT = TITULO_CLIENTE_TITULOS_ENDPOINT.replace(':id', id);

  if (error)
    return mockAdapter
      .onGet(ENDPOINT)
      .replyOnce(401)
      .onGet(ENDPOINT)
      .replyOnce(403)
      .onGet(ENDPOINT)
      .replyOnce(500)
      .onGet(ENDPOINT)
      .replyOnce(503);

  return mockAdapter
    .onGet(ENDPOINT)
    .replyOnce<TituloPaginationModel>(200, titulos);
};

export const tituloPostRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CLIENTE_TITULOS_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onPost(ENDPOINT, tituloInputPost)
        .replyOnce<{ id: string }>(201, { id })
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

export const clientePatchRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CLIENTE_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onPatch(ENDPOINT, clientePatch)
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

export const clienteContatoTelefonePaginationRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CLIENTE_TELEFONES_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onGet(ENDPOINT)
        .replyOnce<ContatoTelefonePaginationModel>(200, telefones)
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

export const clienteContatoEmailPaginationRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CLIENTE_EMAILS_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onGet(ENDPOINT)
        .replyOnce<ContatoEmailPaginationModel>(200, emails)
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

export const clienteContatoEnderecoPaginationRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CLIENTE_ENDERECOS_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onGet(ENDPOINT)
        .replyOnce<ContatoEnderecoPaginationModel>(200, enderecos)
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

export const clienteContatoEnderecoPostRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CLIENTE_ENDERECOS_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onPost(ENDPOINT)
        .replyOnce<ContatoEnderecoModel>(201, enderecoPost)
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

export const clienteContatoEmailPostRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CLIENTE_EMAILS_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter.onPost(ENDPOINT).replyOnce<ContatoEmailModel>(201, emailPost)
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

export const clienteContatoTelefonePostRequests = (
  mockAdapter: MockAdapter,
  error?: boolean,
) => {
  const ENDPOINT = TITULO_CLIENTE_TELEFONES_ENDPOINT.replace(':id', id);

  return !error
    ? mockAdapter
        .onPost(ENDPOINT)
        .replyOnce<ContatoTelefoneModel>(201, telefonePostMock)
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

const clienteMock = (id?: string): ClienteModel => ({
  id: id || faker.datatype.uuid(),
  nome: faker.name.fullName(),
  nomeSocial: faker.internet.userName(),
  documento: faker.helpers.fake(`{{datatype.number(11)}}`),
  tipo: 2,
  sexo: 2,
  falecido: faker.datatype.boolean(),
  dataNascimento: faker.date.past().toISOString(),
  cboId: cbo.id,
  negativado: faker.datatype.boolean(),
});

export const paginationInput = {
  pageNumber: faker.mersenne.rand(1, 5),
  pageSize: faker.mersenne.rand(5, 10),
  sortField: null,
  sortOrder: null,
};

export const clienteInputPostMock: ClienteInputPost = {
  nome: faker.internet.userName(),
  telefone: faker.helpers.fake(`{{datatype.number(11)}}`),
  tipoCliente: ClienteTipoModel.FISICA,
  documento: faker.helpers.fake(`{{datatype.number(11)}}`),
};

export const clientePatch = {
  nome: faker.internet.userName(),
  nomeSocial: faker.internet.userName(),
  sexo: 1,
  falecido: faker.datatype.boolean(),
  cboId: cbo.id,
  negativado: faker.datatype.boolean(),
  tipoCliente: ClienteTipoModel.FISICA,
  documento: faker.helpers.fake(`{{datatype.number(11)}}`),
  dataNascimento: faker.date.past().toISOString(),
};

export const cliente = clienteMock(id);

export const clientes = {
  items: [clienteMock(), clienteMock()],
  pagination: {
    pageNumber: paginationInput.pageNumber,
    pageSize: paginationInput.pageSize,
    totalItems: faker.mersenne.rand(50, 100),
  },
};

const tituloQuestionario: TituloQuestionario = {
  contaAnteriorFalencia: faker.datatype.boolean(),
  observacao: faker.datatype.string(),
  siteRegistro: faker.datatype.string(),
  tipoAtivoInvestido: faker.datatype.string(),
  tipoConta: faker.datatype.string(),
  valorDepositos: faker.datatype.string(),
};

const titulo = (clienteId?: string): TituloModel => ({
  id: clienteId ?? faker.datatype.uuid(),
  tituloQuestionario,
  assinatura: faker.datatype.boolean(),
});

export const titulos: TituloPagination = {
  items: [titulo()],
  pagination: {
    pageNumber: paginationInput.pageNumber,
    pageSize: paginationInput.pageSize,
    totalItems: faker.mersenne.rand(50, 100),
  },
};

const telefoneMock = (id?: string): ContatoTelefoneModel => {
  return {
    id: id || faker.datatype.uuid(),
    nome: faker.name.fullName(),
    marcador: 2,
    classificacao: 1,
    numero: faker.helpers.fake(`{{datatype.number(11)}}`),
    tipo: 1,
    whatsapp: faker.datatype.boolean(),
  };
};

export const telefones = {
  items: [telefoneMock(), telefoneMock()],
  pagination: {
    pageNumber: paginationInput.pageNumber,
    pageSize: paginationInput.pageSize,
    totalItems: faker.mersenne.rand(50, 100),
  },
};

const emailMock = (id?: string): ContatoEmailModel => {
  return {
    id: id || faker.datatype.uuid(),
    nome: faker.name.fullName(),
    marcador: 2,
    classificacao: 1,
    email: faker.internet.email(),
  };
};

export const emails = {
  items: [emailMock(), emailMock()],
  pagination: {
    pageNumber: paginationInput.pageNumber,
    pageSize: paginationInput.pageSize,
    totalItems: faker.mersenne.rand(50, 100),
  },
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
    paisId: pais.id,
  };
};

export const telefonePostMock = {
  ...telefoneMock(),
};

export const {
  id: ignoredIdPost,
  tipo: ignoredTipoPost,
  ...telefoneInputPostMock
} = {
  ...telefonePostMock,
};

export const emailPost = {
  ...emailMock(),
  marcador: ContatoMarcadorModel.TRABALHO,
  classificacao: ContatoClassificacaoModel.RUIM,
};

export const enderecoPost = {
  ...enderecoMock(),
  marcador: ContatoMarcadorModel.TRABALHO,
  classificacao: ContatoClassificacaoModel.RUIM,
  paisId,
};

export const enderecos = {
  items: [enderecoMock()],
  pagination: {
    pageNumber: paginationInput.pageNumber,
    pageSize: paginationInput.pageSize,
    totalItems: faker.mersenne.rand(50, 100),
  },
};

export const tituloInputPost = {
  ...tituloQuestionario,
};
