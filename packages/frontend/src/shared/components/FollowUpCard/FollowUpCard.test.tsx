import { render } from '@test-utils/component-testing';
import { FollowUpCard } from './FollowUpCard';

global.Math.random = jest.fn().mockImplementation(() => 1);

test('should render FollowUpCard', () => {
  const { container } = render(
    <FollowUpCard
      followps={{ situacoes: [], items: [], setSituacoesKeyword: jest.fn }}
    />,
  );
  expect(container).toMatchSnapshot();
});
