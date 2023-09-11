import { faker } from '@faker-js/faker/locale/pt_BR';

export const tituloQuestionario = {
  siteRegistro: 'www.siteFtx.com.br',
  contaAnteriorFalencia: true,
  tipoConta: 'BitCoins',
  tipoAtivoInvestido: 'Carro e casa',
  valorDepositos: faker.finance.amount(0, 1000000).toString(),
  observacao: 'Perdi tudo o que tinha, preciso de ajuda.',
};

export const tituloId = faker.datatype.uuid();
