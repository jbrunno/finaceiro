import { render } from '@test-utils/component-testing';
import { TituloQuestionarioDialog } from './TituloQuestionarioDialog';

test('should render TituloQuestionarioDialog', () => {
  const { container } = render(
    <TituloQuestionarioDialog
      open
      onClose={() => {}}
      tituloQuestionario={{
        contaAnteriorFalencia: false,
        observacao:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis ligula et felis interdum fermentum in ut quam.',
        siteRegistro: 'https://ftx.com',
        tipoAtivoInvestido: 'Bitcoin',
        tipoConta: 'Conta de bitcoins',
        valorDepositos: 'R$ 1.000,00',
      }}
    />,
  );
  expect(container).toMatchSnapshot();
});
