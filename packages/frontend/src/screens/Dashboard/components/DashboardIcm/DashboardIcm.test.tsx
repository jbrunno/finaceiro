import { render } from '@test-utils/component-testing';
import { DashboardIcm } from './DashboardIcm';

test('should render DashboardIcm', () => {
  const { container } = render(
    <DashboardIcm
      icm={{
        porcentagemEntrada: 1,
        porcentagemParcelasPagas: 80,
        porcentagemTotal: 50,
        valorEntrada: 50,
        valorParcelasPagas: 3,
      }}
    />,
  );
  expect(container).toMatchSnapshot();
});
