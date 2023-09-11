import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';
import { faker } from '@faker-js/faker';

export const cliente = {
  id: '1',
  contato: {
    telefones: {
      items: [
        {
          node: {
            id: '1',
            classificacao: ContatoClassificacaoEnum.EXCELENTE,
            nome: 'teste',
            numero: '92993979292',
            whatsapp: true,
            marcador: ContatoMarcadorEnum.FILHO,
          },
        },
      ],
      pageInfo: {
        totalItems: 10,
        hasNextPage: false,
      },
    },
    emails: {
      items: [
        {
          node: {
            id: '1',
            nome: 'teste',
            classificacao: ContatoClassificacaoEnum.BOM,
            email: 'teste@teste.com',
            marcador: ContatoMarcadorEnum.FILHO,
          },
        },
      ],
      pageInfo: {
        totalItems: 10,
        hasNextPage: false,
      },
    },
    enderecos: {
      items: [
        {
          node: {
            id: '1',
            nome: 'teste',
            classificacao: ContatoClassificacaoEnum.EXCELENTE,
            marcador: ContatoMarcadorEnum.FILHO,
            cep: '69000000',
            bairro: 'Pampulha',
            cidade: 'Belo Horizonte',
            complemento: 'bl1 ap123',
            numero: '111',
            logradouro: 'Rua teste',
            uf: 'MG',
            pais: {
              id: faker.datatype.uuid(),
              descricao: faker.address.country(),
            },
          },
        },
      ],
      pageInfo: {
        totalItems: 10,
        hasNextPage: false,
      },
    },
  },
};
