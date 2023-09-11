import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import https from 'https';

export const tituloApiGateway = axios.create({
  baseURL: `${process.env.TITULO_SERVICE_URL}/v2`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

tituloApiGateway.interceptors.response.use((response) => ({
  ...response,
  data: camelcaseKeys(response.data as Record<string, any>, {
    deep: true,
  }),
}));

tituloApiGateway.setAuthorization = (authorizationBearer: string) => {
  tituloApiGateway.defaults.headers.common.Authorization = authorizationBearer;
};

export const TITULO_CLIENTES_ENDPOINT = '/clientes';
export const TITULO_CLIENTE_TITULOS_ENDPOINT = '/clientes/:id/titulos';

export const TITULO_CLIENTE_ENDPOINT = '/clientes/:id';
export const TITULO_CLIENTE_TELEFONES_ENDPOINT =
  '/clientes/:id/contatos/telefones';
export const TITULO_CLIENTE_EMAILS_ENDPOINT = '/clientes/:id/contatos/emails';
export const TITULO_CLIENTE_ENDERECOS_ENDPOINT =
  '/clientes/:id/contatos/enderecos';

export const TITULO_CBOS_ENDPOINT = '/cbos';
export const TITULO_CBO_ENDPOINT = '/cbos/:id';

export const TITULO_CONTATOS_TELEFONE_ENDPOINT = '/contatos/:id/telefones';
export const TITULO_CONTATOS_ENDERECO_ENDPOINT = '/contatos/:id/enderecos';
export const TITULO_CONTATOS_EMAIL_ENDPOINT = '/contatos/:id/emails';

export const TITULO_PAISES_ENDPOINT = '/paises';
export const TITULO_PAIS_ENDPOINT = '/paises/:id';

export const TITULO_TITULOS_ENDPOINT = '/titulos/:id';
export const TITULO_TITULOS_ASSINATURA_ENDPOINT = '/titulos/:id/assinatura';
