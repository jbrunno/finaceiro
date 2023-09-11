import { render } from '@test-utils/component-testing';
import { RegistrarFollowUp } from './RegistrarFollowUp';

test('should render RegistrarFollowUp', () => {
  const { container } = render(
    <RegistrarFollowUp situacoes={[]} setSituacoesKeyword={jest.fn} />,
  );
  expect(container).toMatchSnapshot();
});
