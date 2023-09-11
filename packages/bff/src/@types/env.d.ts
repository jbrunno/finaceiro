import { Environment } from '@bff/config';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string;
      ENV: Environment;
      TZ: string;

      IDENTITY_SERVICE_URL: string;
      IDENTITY_SERVICE_TOKEN: string;

      ELASTIC_APM_SERVICE_NAME: string;
      ELASTIC_APM_SECRET_TOKEN: string;
      ELASTIC_APM_SERVER_URL: string;
      ELASTIC_APM_ENVIRONMENT: Environment;

      ACIONAMENTO_SERVICE_URL: string;
      COMPENSACAO_SERVICE_URL: string;
      DASHBOARD_SERVICE_URL: string;
      NEGOCIACAO_SERVICE_URL: string;
      SUPORTE_SERVICE_URL: string;
      TITULO_SERVICE_URL: string;
      PERMISSIONAMENTO_SERVICE_URL: string;
      FINANCEIRO_SERVICE_URL: string;
    }
  }
}
