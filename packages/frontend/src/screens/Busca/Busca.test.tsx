import { render } from '@test-utils/component-testing';
import { Busca } from './Busca';

test('should render Busca', () => {
  const { container } = render(<Busca />);
  expect(container).toMatchSnapshot();
});
