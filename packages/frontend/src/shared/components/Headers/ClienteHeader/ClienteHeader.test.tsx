import { ClienteSexoEnum } from '@/shared/constants';
import { render } from '@test-utils/component-testing';
import { ClienteHeader } from './ClienteHeader';

const dataMock = new Date('2021-01-01T00:00:00.000Z').toISOString();

const mocks = {
  id: 'teste',
  nome: 'teste',
  nomeSocial: 'teste',
  cpf: '11122233344',
  sexo: ClienteSexoEnum.FEMININO,
  dataNascimento: dataMock,
  cbo: {
    id: 'teste',
    codigo: 'teste',
    ocupacao: 'teste',
  },
  falecido: false,
  negativado: false,
};

test('should render ClienteHeader', () => {
  const { container } = render(
    <ClienteHeader cliente={mocks} navigationBack={() => {}} />,
  );
  expect(container).toMatchSnapshot();
});
