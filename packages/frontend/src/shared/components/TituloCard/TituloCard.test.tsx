import { render } from '@test-utils/component-testing';
import { TituloCard } from './TituloCard';
import { tituloQuestionario, tituloId, assinatura } from './TituloCard.mock';

test('should render TituloCard', () => {
  const { container } = render(
    <TituloCard
      screen="test"
      loading={false}
      titulo={{
        tituloQuestionario,
        id: tituloId,
      }}
      assinatura={assinatura}
      refetch={jest.fn}
    />,
  );
  expect(container).toMatchSnapshot();
});
