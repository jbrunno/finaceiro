import { render } from '@test-utils/component-testing';
import { AutoCompletePaises } from './AutoCompletePaises';
import { paises } from '../ClienteContato/components/ClienteContatosDialog/components/ClienteContatosEnderecoEdit/hooks/useClienteContatosEnderecoEdit.mock';

test('should render AutoCompletePaises', () => {
  const { container } = render(
    <AutoCompletePaises
      onChange={jest.fn}
      descricao="descricao Mock"
      paises={paises}
    />,
  );
  expect(container).toMatchSnapshot();
});
