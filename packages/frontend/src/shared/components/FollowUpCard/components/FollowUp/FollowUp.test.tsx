import { render } from '@test-utils/component-testing';
import { FollowUp } from './FollowUp';

test('should render FollowUp', () => {
  const { container } = render(<FollowUp items={[]} />);
  expect(container).toMatchSnapshot();
});
