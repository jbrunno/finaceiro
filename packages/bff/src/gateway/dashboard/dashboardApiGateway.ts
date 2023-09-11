import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import https from 'https';

export const dashboardApiGateway = axios.create({
  baseURL: `${process.env.DASHBOARD_SERVICE_URL}/v2`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

dashboardApiGateway.interceptors.response.use((response) => ({
  ...response,
  data: camelcaseKeys(response.data as Record<string, any>, {
    deep: true,
  }),
}));

dashboardApiGateway.setAuthorization = (authorizationBearer: string) => {
  dashboardApiGateway.defaults.headers.common.Authorization =
    authorizationBearer;
};

export const DASHBOARD_ICM_ENDPOINT = '/icm';
export const DASHBOARD_PRODUCOES_ACORDOS_ENDPOINT = '/producoes/acordos';
export const DASHBOARD_PRODUCOES_ACORDOS_COMPARATIVO_ENDPOINT =
  '/producoes/acordos/criados/comparativo';
export const DASHBOARD_PRODUCOES_ACORDOS_SINTETIZADO_ENDPOINT =
  '/producoes/acordos/sintetizado';
