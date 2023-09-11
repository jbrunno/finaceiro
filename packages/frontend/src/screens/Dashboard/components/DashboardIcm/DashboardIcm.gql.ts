import { gql } from '@apollo/client';

export const DASHBOARD_ICM_FRAGMENT = {
  icm: gql`
    fragment DASHBOARD_ICM_FRAGMENT on Icm {
      porcentagemTotal
      porcentagemEntrada
      valorEntrada
      valorParcelasPagas
      porcentagemParcelasPagas
    }
  `,
};

export type IcmData = {
  porcentagemTotal: number;
  porcentagemEntrada: number;
  valorEntrada: number;
  valorParcelasPagas: number;
  porcentagemParcelasPagas: number;
};
