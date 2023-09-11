import {
  ClienteSexoEnum,
  ClienteTipoEnum,
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';
import { faker } from '@faker-js/faker/locale/pt_BR';

const cbo = {
  id: faker.datatype.uuid(),
  codigo: faker.random.numeric(3),
  ocupacao: faker.name.jobTitle(),
};

export const cliente = {
  __typename: 'Cliente',
  id: faker.datatype.uuid(),
  nome: faker.name.fullName(),
  nomeSocial: faker.name.firstName(),
  documento: faker.random.numeric(11),
  sexo: ClienteSexoEnum.MASCULINO,
  dataNascimento: faker.date.birthdate().toISOString(),
  cbo,
  falecido: faker.datatype.boolean(),
  negativado: faker.datatype.boolean(),
  tipo: ClienteTipoEnum.ESTRANGEIRA,
};

const tituloQuestionario = {
  __typename: 'TituloQuestionario',
  siteRegistro: faker.internet.url(),
  tipoConta: faker.finance.accountName(),
  contaAnteriorFalencia: faker.datatype.boolean(),
  tipoAtivoInvestido: faker.commerce.product(),
  valorDepositos: faker.finance.amount(0, 10000),
  observacao: faker.lorem.text(),
};

export const titulos = {
  items: [
    {
      node: {
        __typename: 'Titulos',
        id: faker.datatype.uuid(),
        assinatura: faker.datatype.boolean(),
        tituloQuestionario,
      },
    },
  ],
};

const pageInfo = {
  hasNextPage: faker.datatype.boolean(),
  totalItems: faker.datatype.number(10),
};

export const emails = {
  items: [
    {
      node: {
        __typename: 'ContatoEmail',
        id: faker.datatype.uuid(),
        nome: faker.name.fullName(),
        email: faker.internet.email(),
        marcador: ContatoMarcadorEnum.PAI,
        classificacao: ContatoClassificacaoEnum.BOM,
      },
    },
  ],
  pageInfo,
};

export const enderecos = {
  items: [
    {
      node: {
        __typename: 'ContatoEndereco',
        id: faker.datatype.uuid(),
        nome: faker.name.fullName(),
        logradouro: faker.address.streetAddress(),
        numero: faker.address.buildingNumber(),
        bairro: faker.address.street(),
        cidade: faker.address.cityName(),
        uf: faker.address.stateAbbr(),
        cep: faker.address.zipCode(),
        complemento: faker.address.secondaryAddress(),
        marcador: ContatoMarcadorEnum.PAI,
        classificacao: ContatoClassificacaoEnum.BOM,
        pais: {
          id: faker.datatype.uuid(),
          descricao: faker.address.country(),
        },
      },
    },
  ],
  pageInfo,
};

export const telefones = {
  items: [
    {
      node: {
        __typename: 'ContatoTelefone',
        id: faker.datatype.uuid(),
        nome: faker.name.fullName(),
        numero: faker.phone.number(),
        whatsapp: faker.datatype.boolean(),
        marcador: ContatoMarcadorEnum.PAI,
        classificacao: ContatoClassificacaoEnum.BOM,
      },
    },
  ],
  pageInfo,
};

export const clienteFollowUps = {
  items: [
    {
      node: {
        __typename: 'FollowUp',
        id: faker.datatype.uuid(),
        dataRegistro: faker.date.past().toISOString(),
        usuario: {
          id: faker.datatype.uuid(),
          nome: faker.name.firstName(),
          username: faker.internet.userName(),
          turno: faker.datatype.number({ min: 4, max: 8 }),
          cargaHoraria: faker.random.numeric(4),
        },
        situacao: {
          id: faker.datatype.uuid(),
          descricaoObrigatoria: faker.datatype.boolean(),
          codigo: faker.datatype.number({ min: 4, max: 8 }),
          nome: faker.name.firstName(),
          tempoTrava: 0,
          textoPadrao: faker.lorem.sentence(),
        },
        descricao: faker.lorem.sentence(),
      },
    },
  ],
  pageInfo,
};

export const situacoesFollowUp = {
  items: [
    {
      node: {
        __typename: 'Situacao',
        id: faker.datatype.uuid(),
        descricaoObrigatoria: faker.datatype.boolean(),
        codigo: faker.datatype.number({ min: 4, max: 8 }),
        nome: faker.name.firstName(),
        tempoTrava: 0,
        textoPadrao: faker.lorem.sentence(),
      },
    },
  ],
  pageInfo,
};
