import { render } from '@test-utils/component-testing';
import { AdicionarAssinaturaDialog } from './AdicionarAssinaturaDialog';

test('should render AdicionarAssinaturaDialog', () => {
  const { container } = render(
    <AdicionarAssinaturaDialog open onClose={jest.fn} />,
  );
  expect(container).toMatchSnapshot();
});
