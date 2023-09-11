import { render } from '@test-utils/component-testing';
import { DiscadorHeader } from './DiscadorHeader';

test('should render DiscadorHeader', () => {
  const { container } = render(
    <DiscadorHeader
      title="teste"
      navigationBack={() => {}}
      infoClick={() => {}}
    />,
  );
  expect(container).toMatchSnapshot();
});
