import { render } from '@test-utils/component-testing';
import { ClienteContatosTelefoneEdit } from './ClienteContatosTelefoneEdit';
import { contatoTelefone } from './hooks/useClienteContatosTelefoneEdit.mock';

test('should render ClienteContatosTelefoneEdit', () => {
  const { container } = render(
    <ClienteContatosTelefoneEdit
      onSaved={() => {}}
      onCancelAction={() => {}}
      showActions
      contatoTelefone={contatoTelefone}
      refetch={jest.fn}
    />,
  );
  expect(container).toMatchSnapshot();
});
