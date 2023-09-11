import { faker } from '@faker-js/faker/locale/pt_BR';
import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';
import { PaisData } from '../ClienteContatosEnderecoEdit.gql';

export const contatoEndereco = {
  id: faker.datatype.uuid(),
  nome: 'teste',
  classificacao: ContatoClassificacaoEnum.EXCELENTE,
  marcador: ContatoMarcadorEnum.AVOS,
  logradouro: 'TV Alberto ristori',
  bairro: 'Jardim das flores',
  cidade: 'São Paulo',
  uf: 'SP',
  cep: '12345678',
  numero: '123',
  complemento: 'casa',
  pais: {
    id: faker.datatype.uuid(),
    descricao: faker.address.country(),
  },
};

export const paises: Array<PaisData> = [
  {
    id: faker.datatype.uuid(),
    descricao: 'Pais Mock',
  },
];
