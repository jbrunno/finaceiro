export const { APP_NAME } = process.env;
export const ENV = process.env.NODE_ENV;
export const __DEV__ = ENV === 'development';
export const __PROD__ = ENV === 'production';

export const BFF_GRAPHQL_URL = `${process.env.BFF_URL}/graphql`;
export const BFF_GRAPHQL_WS_URL = `${process.env.BFF_WS_URL}/graphql`;
export const BFF_STORAGE_API_URL = `${process.env.BFF_URL}/storage`;

export const USE_WEBSOCKET = Number(process.env.WEBSOCKET_ACTIVATE);

export const { APM_URL } = process.env;

export const { HOTJAR_ID } = process.env;
export const { HOTJAR_SNIPPET_VERSION } = process.env;
