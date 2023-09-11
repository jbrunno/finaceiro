import { faker } from '@faker-js/faker/locale/pt_BR';
import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';

export const contatoEmail = {
  id: faker.datatype.uuid(),
  nome: 'teste',
  email: 'teste@teste.com',
  classificacao: ContatoClassificacaoEnum.EXCELENTE,
  marcador: ContatoMarcadorEnum.AVOS,
};
