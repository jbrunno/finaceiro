import { styled } from '@frontend/styles';

import { DashboardAcordosPeriodo } from './components/DashboardAcordosPeriodo/DashboardAcordosPeriodo';
import { DashboardIcm } from './components/DashboardIcm/DashboardIcm';
import { DashboardProducaoGrafico } from './components/DashboardProducaoGrafico/DashboardProducaoGrafico';

export const DashboardIcmStyled = styled(DashboardIcm)`
  grid-column: span 4;
`;

export const DashboardAcordosPeriodoStyled = styled(DashboardAcordosPeriodo)`
  grid-column: span 8;
`;

export const DashboardProducaoGraficoStyled = styled(DashboardProducaoGrafico)`
  grid-column: span 12;
`;

export const Widgets = styled('div')`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto 1fr;
  gap: ${({ theme }) => theme.fn.spacing(16)};
  height: 100%;
  min-height: 0;
`;
