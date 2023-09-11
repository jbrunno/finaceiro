import { render } from '@test-utils/component-testing';
import { AutocompleteOcupacao } from './AutocompleteOcupacao';

jest.mock('./hooks/useAutocompleteOcupacao', () => ({
  useAutocompleteOcupacao: () => ({
    handleSelectValue: jest.fn(),
    loadOcupacoes: jest.fn(),
    filterOptions: jest.fn(),
    loading: false,
    label: 'Ocupação',
    ocupacoes: [],
    value: null,
  }),
}));

test('should render AutocompleteOcupacao', () => {
  const { container } = render(<AutocompleteOcupacao onChange={() => {}} />);
  expect(container).toMatchSnapshot();
});
