import { render } from '@test-utils/component-testing';
import { TituloDialog } from './TituloDialog';
import { tituloQuestionario } from './TituloDialog.mock';

test('should render TituloDialog', () => {
  const { container } = render(
    <TituloDialog
      open
      onClose={jest.fn()}
      onSaved={jest.fn()}
      tituloQuestionario={tituloQuestionario}
    />,
  );
  expect(container).toMatchSnapshot();
});
