import { render } from '@test-utils/component-testing';
import { ClienteContatosDialog } from './ClienteContatosDialog';
import {
  emailsList,
  enderecosList,
  telefonesList,
  clienteMock,
} from './hooks/useClienteContatosDialog.mock';

test('should render ClienteContatosDialog', () => {
  const { container } = render(
    <ClienteContatosDialog
      cliente={clienteMock}
      loading={false}
      loadMore={jest.fn}
      refetch={jest.fn}
      lists={{ emailsList, enderecosList, telefonesList }}
      open
      onClose={() => {}}
    />,
  );
  expect(container).toMatchSnapshot();
});
