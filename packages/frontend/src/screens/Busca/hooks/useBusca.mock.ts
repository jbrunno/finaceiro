import { faker } from '@faker-js/faker/locale/pt_BR';

export const clientes = {
  items: [
    {
      node: {
        __typename: 'Cliente',
        cpfCnpj: faker.random.numeric(11),
        falecido: faker.datatype.boolean(),
        id: faker.datatype.uuid(),
        nome: faker.name.fullName(),
        negativado: faker.datatype.boolean(),
        nomeSocial: faker.name.firstName(),
      },
    },
  ],
  pageInfo: {
    hasNextPage: faker.datatype.boolean(),
    totalItems: faker.datatype.number(10),
  },
};
