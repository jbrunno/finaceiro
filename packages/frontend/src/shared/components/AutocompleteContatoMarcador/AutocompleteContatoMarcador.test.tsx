import { render } from '@test-utils/component-testing';
import { AutocompleteContatoMarcador } from './AutocompleteContatoMarcador';

test('should render AutocompleteContatoMarcador', () => {
  const { container } = render(
    <AutocompleteContatoMarcador
      label="teste"
      onChange={() => {}}
      value={null}
    />,
  );
  expect(container).toMatchSnapshot();
});
