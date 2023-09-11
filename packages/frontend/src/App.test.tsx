import { render } from '@test-utils/component-testing';
import App from './App';

test('should render App', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
