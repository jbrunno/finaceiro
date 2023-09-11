import { render } from '@test-utils/component-testing';
import { RemoverAssinaturaDialog } from './RemoverAssinaturaDialog';
import { tituloId } from './hooks/useRemoverAssinaturaDialog.mock';

test('should render RemoverAssinaturaDialog', () => {
  const { container } = render(
    <RemoverAssinaturaDialog
      open
      onClose={jest.fn}
      refetch={jest.fn}
      tituloId={tituloId}
    />,
  );
  expect(container).toMatchSnapshot();
});
