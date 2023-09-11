import { ClienteSexoEnum, ClienteTipoEnum } from '@/shared/constants';
import { render } from '@test-utils/component-testing';
import { ClienteEditInfo } from './ClienteEditInfo';

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

jest.mock(
  '@/shared/components/AutocompleteOcupacao/hooks/useAutocompleteOcupacao',
  () => ({
    useAutocompleteOcupacao: () => ({
      handleSelectValue: jest.fn(),
      loadOcupacoes: jest.fn(),
      filterOptions: jest.fn(),
      loading: false,
      label: 'Ocupação',
      ocupacoes: [],
      value: null,
    }),
  }),
);

test('should render ClienteEditInfo', () => {
  const { container } = render(
    <ClienteEditInfo screen="test" cliente={mocks} onSuccess={() => {}} />,
  );
  expect(container).toMatchSnapshot();
});
