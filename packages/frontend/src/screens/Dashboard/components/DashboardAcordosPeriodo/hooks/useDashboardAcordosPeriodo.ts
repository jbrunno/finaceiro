import { useState, ChangeEvent } from 'react';
import { crmPeriods } from '@frontend/utils';
import { PeriodsEnum } from '@frontend/types';
import { ProducaoAcordosSintetizadoData } from '../DashboardAcordosPeriodo.gql';

const periods = [
  {
    label: 'Hoje',
    value: crmPeriods(PeriodsEnum.TODAY).toISOString(),
  },
  {
    label: 'Dia anterior',
    value: crmPeriods(PeriodsEnum.YESTERDAY).toISOString(),
  },
  {
    label: 'Últimos 7 dias',
    value: crmPeriods(PeriodsEnum.LAST7DAYS).toISOString(),
  },
  {
    label: 'Últimos 15 dias',
    value: crmPeriods(PeriodsEnum.LAST15DAYS).toISOString(),
  },
  {
    label: 'Mês atual (até hoje)',
    value: crmPeriods(PeriodsEnum.THISMONTH).toISOString(),
  },
  {
    label: 'Mês anterior',
    value: crmPeriods(PeriodsEnum.LASTMONTH).toISOString(),
  },
  {
    label: 'Últimos 6 meses',
    value: crmPeriods(PeriodsEnum.LAST6MONTHS).toISOString(),
  },
];

export type UseDashboardAcordosPeriodoProps = {
  producaoAcordosSintetizado?: ProducaoAcordosSintetizadoData;
  onChangePeriod: (period: string) => void;
};

export const useDashboardAcordosPeriodo = ({
  producaoAcordosSintetizado,
  onChangePeriod,
}: UseDashboardAcordosPeriodoProps) => {
  const acordosInfoProgress = [
    {
      title: 'Acordos pagos',
      qty: producaoAcordosSintetizado?.quantidadeAcordosPagos || 0,
    },
    {
      title: 'Acordos quebrados',
      qty: producaoAcordosSintetizado?.quantidadeAcordosQuebrados || 0,
    },
    {
      title: 'Acordos com parcelas a vencer',
      qty: producaoAcordosSintetizado?.quantidadeParcelasAVencer || 0,
    },
  ];

  const acordosInfoProgressTotal = acordosInfoProgress.reduce(
    (acc, curr) => acc + curr.qty,
    0,
  );

  const [period, setPeriod] = useState<string>(periods[4].value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPeriod(event.target.value);
    onChangePeriod(event.target.value);
  };

  return {
    handleChange,
    period,
    periods,
    acordosInfoProgressTotal,
    acordosInfoProgress,
  };
};
