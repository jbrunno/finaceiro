import ReactApexChart from 'react-apexcharts';
import { Box, Card, CardHeaderChip, Tooltip } from '@frontend/components';
import { HelpOutline as HelpOutlineIcon } from '@frontend/icons';
import { formatTime } from '@frontend/utils';
import { useCurrentTheme } from '@frontend/hooks';
import { ApexOptions } from 'apexcharts';
import {
  DASHBOARD_PRODUCAO_GRAFICO_FRAGMENT,
  ProducaoAcordosComparativoData,
} from './DashboardProducaoGrafico.gql';

type DashboardProducaoGraficoProps = {
  className?: string;
  producaoAcordosComparativo?: ProducaoAcordosComparativoData | null;
};

export function DashboardProducaoGrafico({
  className,
  producaoAcordosComparativo,
}: DashboardProducaoGraficoProps) {
  const theme = useCurrentTheme();

  if (!producaoAcordosComparativo) {
    return null;
  }

  const labels = producaoAcordosComparativo.map((item) =>
    formatTime(new Date(item.data)),
  );

  const chartData = [
    {
      name: 'Produção média da carteira',
      type: 'area',
      data: producaoAcordosComparativo.map((item) =>
        Number(Number(item.quantidadeMedia).toFixed(2)),
      ),
    },
    {
      name: 'Produção individual',
      type: 'line',
      data: producaoAcordosComparativo.map((item) => item.quantidadeIndividual),
    },
  ];

  const chartOptions: ApexOptions = {
    labels,
    colors: [
      `${theme.palette.secondary.light}`,
      `${theme.palette.primary.dark}`,
    ],
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      itemMargin: { horizontal: 12 },
      showForSingleSeries: true,
      showForNullSeries: true,
      showForZeroSeries: true,
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      type: ['gradient', 'solid'],
      gradient: {
        shade: 'white',
        type: 'vertical',
        shadeIntensity: 0.2,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} Acordos`;
          }
          return y;
        },
      },
    },
  };

  return (
    <Box className={className}>
      <Card>
        <CardHeaderChip
          title="Produção comparada"
          hasDivider={false}
          chip={
            <Tooltip
              title="Comparativo da sua produção do dia anterior e de hoje em relação ao resto da equipe."
              arrow
            >
              <HelpOutlineIcon />
            </Tooltip>
          }
        />
        <ReactApexChart
          type="line"
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Card>
    </Box>
  );
}

DashboardProducaoGrafico.fragments = DASHBOARD_PRODUCAO_GRAFICO_FRAGMENT;
