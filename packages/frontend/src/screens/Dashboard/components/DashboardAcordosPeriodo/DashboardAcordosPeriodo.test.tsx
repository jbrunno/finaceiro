import { render } from '@test-utils/component-testing';
import { DashboardAcordosPeriodo } from './DashboardAcordosPeriodo';

test('should render DashboardAcordosPeriodo', () => {
  const { container } = render(
    <DashboardAcordosPeriodo
      onChangePeriod={() => {}}
      producaoAcordosSintetizado={{
        acordosEPromessasDePagamento: 3,
        quantidadeAcordosPagos: 3,
        quantidadeAcordosQuebrados: 3,
        quantidadeParcelasAVencer: 3,
        valorTotalAcordosGerados: 5,
        valorTotalAcordosPagos: 6,
      }}
    />,
  );
  expect(container).toMatchSnapshot();
});
