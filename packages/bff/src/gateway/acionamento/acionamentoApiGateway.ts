import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import https from 'https';

export const acionamentoApiGateway = axios.create({
  baseURL: `${process.env.ACIONAMENTO_SERVICE_URL}/v2`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

acionamentoApiGateway.interceptors.response.use((response) => ({
  ...response,
  data: camelcaseKeys(response.data as Record<string, any>, {
    deep: true,
  }),
}));

acionamentoApiGateway.setAuthorization = (authorizationBearer: string) => {
  acionamentoApiGateway.defaults.headers.common.Authorization =
    authorizationBearer;
};

export const ACIONAMENTO_CLIENTES_FOLLOW_UPS_ENDPOINT =
  '/clientes/:id/follow-ups';
export const ACIONAMENTO_FOLLOWUPS_SITUACOES_ENDPOINT = '/follow-ups/situacoes';
export const ACIONAMENTO_FOLLOWUPS_SITUACAO_BY_ID_ENDPOINT =
  '/follow-ups/situacoes/:id';
