import { PageHeader, RenderComponents } from '@frontend/components';
import { Content } from '@frontend/styles';
import {
  DashboardAcordosPeriodoStyled,
  DashboardProducaoGraficoStyled,
  DashboardIcmStyled,
  Widgets,
} from './Dashboard.styles';
import { useDashboard } from './hooks/useDashboard';

export function Dashboard() {
  const { data, setDataPeriodo } = useDashboard();
  return (
    <Content>
      <PageHeader title="Dashboard" />
      <Widgets>
        <RenderComponents screen="dashboard">
          <DashboardIcmStyled perm="DASHBOARD_ICM" icm={data?.icm} />
          <DashboardAcordosPeriodoStyled
            perm="DASHBOARD_ACORDOS_PERIODO"
            onChangePeriod={setDataPeriodo}
            producaoAcordosSintetizado={data?.producaoAcordosSintetizado}
          />
          <DashboardProducaoGraficoStyled
            perm="DASHBOARD_PRODUCAO_GRAFICO"
            producaoAcordosComparativo={data?.producaoAcordosComparativo}
          />
        </RenderComponents>
      </Widgets>
    </Content>
  );
}
