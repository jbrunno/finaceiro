import { faker } from '@faker-js/faker/locale/pt_BR';

export const mockTituloId: string = faker.datatype.uuid();

export const mockLoginUser = {
  usuario: faker.internet.userName(),
  senha: faker.internet.password(),
};
