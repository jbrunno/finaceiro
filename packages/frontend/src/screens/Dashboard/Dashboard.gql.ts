import { gql } from '@apollo/client';
import { DashboardAcordosPeriodo } from './components/DashboardAcordosPeriodo/DashboardAcordosPeriodo';
import { DashboardIcm } from './components/DashboardIcm/DashboardIcm';
import { DashboardProducaoGrafico } from './components/DashboardProducaoGrafico/DashboardProducaoGrafico';

import type { IcmData } from './components/DashboardIcm/DashboardIcm.gql';
import type { ProducaoAcordosComparativoData } from './components/DashboardProducaoGrafico/DashboardProducaoGrafico.gql';
import type { ProducaoAcordosSintetizadoData } from './components/DashboardAcordosPeriodo/DashboardAcordosPeriodo.gql';

export const ICM_QUERY = gql`
  query Icm {
    icm {
      ...DASHBOARD_ICM_FRAGMENT
    }
  }

  ${DashboardIcm.fragments.icm}
`;

export const DASHBOARD_PRODUCAO_GRAFICO_QUERY = gql`
  query ProducaoAcordosComparativo {
    producaoAcordosComparativo {
      ...DASHBOARD_PRODUCAO_GRAFICO_FRAGMENT
    }
  }

  ${DashboardProducaoGrafico.fragments.producaoAcordosComparativo}
`;

export const DASHBOARD_ACORDOS_PERIODO_QUERY = gql`
  query ProducaoAcordosSintetizado($date: Date!) {
    producaoAcordosSintetizado(date: $date) {
      ...DASHBOARD_ACORDOS_PERIODO_FRAGMENT
    }
  }
  ${DashboardAcordosPeriodo.fragments.producaoAcordosSintetizado}
`;

export type DashboardAcordosPeriodosVariables = {
  date: string;
};

export type IcmQueryResult = {
  icm: IcmData;
};

export type AcordosComparativosQueryResult = {
  producaoAcordosComparativo: ProducaoAcordosComparativoData;
};

export type AcordosSinterizadosQueryResult = {
  producaoAcordosSintetizado: ProducaoAcordosSintetizadoData;
};
