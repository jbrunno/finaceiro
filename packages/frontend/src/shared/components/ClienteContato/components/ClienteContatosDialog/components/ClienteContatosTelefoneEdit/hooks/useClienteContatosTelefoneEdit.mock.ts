import { faker } from '@faker-js/faker/locale/pt_BR';
import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';

export const contatoTelefone = {
  id: faker.datatype.uuid(),
  nome: 'Marcos',
  numero: '(40)9349-8974',
  whatsapp: true,
  classificacao: ContatoClassificacaoEnum.EXCELENTE,
  marcador: ContatoMarcadorEnum.AVOS,
};
