import { render } from '@test-utils/component-testing';
import { Dashboard } from './Dashboard';

test('should render Dashboard', () => {
  const { container } = render(<Dashboard />);
  expect(container).toMatchSnapshot();
});
