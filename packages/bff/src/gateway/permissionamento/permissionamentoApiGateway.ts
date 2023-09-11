import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import https from 'https';

export const permissionamentoApiGateway = axios.create({
  baseURL: `${process.env.PERMISSIONAMENTO_SERVICE_URL}/v1`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

permissionamentoApiGateway.interceptors.response.use((response) => ({
  ...response,
  data: camelcaseKeys(response.data as Record<string, any>, {
    deep: true,
  }),
}));

permissionamentoApiGateway.setAuthorization = (authorizationBearer: string) => {
  permissionamentoApiGateway.defaults.headers.common.Authorization =
    authorizationBearer;
};

export const PERMISSIONAMENTO_USUARIO_USUARIO_BY_ID_ENDPOINT = '/usuarios/:id';
export const PERMISSIONAMENTO_USUARIO_USUARIOS_ENDPOINT = '/usuarios';
