import { ContatoClassificacaoEnum } from '@/shared/constants';
import { render } from '@test-utils/component-testing';
import { ContatoRating } from './ContatoRating';

test('should render ContatoRating', () => {
  const { container } = render(
    <ContatoRating value={ContatoClassificacaoEnum.EXCELENTE} />,
  );
  expect(container).toMatchSnapshot();
});
