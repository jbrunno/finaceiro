import { render } from '@test-utils/component-testing';
import { ReceptivoDialog } from './ReceptivoDialog';

test('should render ReceptivoDialog', () => {
  const { container } = render(<ReceptivoDialog open onClose={() => {}} />);
  expect(container).toMatchSnapshot();
});
