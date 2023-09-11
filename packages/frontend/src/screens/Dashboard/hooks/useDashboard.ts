import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { DashboardAcordosPeriodoInitialState } from '../components/DashboardAcordosPeriodo/DashboardAcordosPeriodo';
import {
  IcmQueryResult,
  AcordosComparativosQueryResult,
  AcordosSinterizadosQueryResult,
  DashboardAcordosPeriodosVariables,
  ICM_QUERY,
  DASHBOARD_ACORDOS_PERIODO_QUERY,
  DASHBOARD_PRODUCAO_GRAFICO_QUERY,
} from '../Dashboard.gql';

export const useDashboard = () => {
  const [dataPeriodo, setDataPeriodo] = useState(
    DashboardAcordosPeriodoInitialState.data,
  );
  const icm = useQuery<IcmQueryResult>(ICM_QUERY);
  const acordosComparativos = useQuery<AcordosComparativosQueryResult>(
    DASHBOARD_PRODUCAO_GRAFICO_QUERY,
  );

  const acordosSinterizados = useQuery<
    AcordosSinterizadosQueryResult,
    DashboardAcordosPeriodosVariables
  >(DASHBOARD_ACORDOS_PERIODO_QUERY, { variables: { date: dataPeriodo } });

  return {
    data: {
      ...icm.data,
      ...acordosComparativos.data,
      ...acordosSinterizados.data,
    },
    loading:
      icm.loading || acordosComparativos.loading || acordosSinterizados.loading,
    error: icm.error || acordosComparativos.error || acordosSinterizados.error,
    setDataPeriodo,
  };
};
