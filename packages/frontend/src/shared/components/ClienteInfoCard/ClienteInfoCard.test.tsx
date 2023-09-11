import { render } from '@test-utils/component-testing';
import { ClienteSexoEnum, ClienteTipoEnum } from '@/shared/constants';
import { ClienteInfoCard } from './ClienteInfoCard';

const dataMock = new Date('2021-01-01T00:00:00.000Z').toISOString();

const mocks = {
  id: 'teste',
  nome: 'teste',
  nomeSocial: 'teste',
  documento: '11122233344',
  sexo: ClienteSexoEnum.FEMININO,
  dataNascimento: dataMock,
  cbo: {
    id: 'teste',
    codigo: 'teste',
    ocupacao: 'teste',
  },
  falecido: false,
  negativado: false,
  tipo: ClienteTipoEnum.ESTRANGEIRA,
};

test('should render ClienteInfoCard', () => {
  const { container } = render(
    <ClienteInfoCard screen="test" cliente={mocks} />,
  );
  expect(container).toMatchSnapshot();
});
