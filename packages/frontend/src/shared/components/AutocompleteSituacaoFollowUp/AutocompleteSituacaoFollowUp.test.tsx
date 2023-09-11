import { render } from '@test-utils/component-testing';
import { AutocompleteSituacaoFollowUp } from './AutocompleteSituacaoFollowUp';

jest.mock('./hooks/useAutocompleteSituacaoFollowUp', () => ({
  useAutocompleteSituacaoFollowUp: () => ({
    label: 'Situação de Follow-up',
    onChange: jest.fn(),
    initialValue: null,
  }),
}));

test('should render AutocompleteSituacaoFollowUp', () => {
  const { container } = render(
    <AutocompleteSituacaoFollowUp
      filterSituacoes={jest.fn}
      onChange={jest.fn}
    />,
  );
  expect(container).toMatchSnapshot();
});
