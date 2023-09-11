import './apm';
import './adapters';
import http from 'http';
import Koa from 'koa';
import loggerMiddleware from 'koa-logger';
import cors from '@koa/cors';
import { applyGraphqlRouting } from '@bff/graphql/api';
import { applyStorageApiRouting } from '@bff/storage/api';
import { log } from '@bff/logger';
import { Environment } from '@bff/config';
import { setAuthMiddleware } from '@bff/middlewares';
import * as gateways from '@/gateway';
import * as Adapters from '@/adapters';
import { adapters } from '@bff/adapters';
import koaBody from 'koa-body';
import { schema } from './graphql/schema';

adapters.methods = Adapters;

process.on('unhandledRejection', (reason) => {
  log(JSON.stringify(reason), 'error', { metadata: ['unhandledRejection'] });
});

const app = new Koa();
const httpServer = http.createServer(app.callback());

app.use(cors());
app.use(koaBody());
app.use((context, next) => setAuthMiddleware(context, next, gateways));
app.use(loggerMiddleware());

applyGraphqlRouting(
  app,
  httpServer,
  schema,
  process.env.ENV !== Environment.Production,
);
applyStorageApiRouting(app);

httpServer.listen(process.env.PORT, () => {
  log(`Server running on ${process.env.PORT}`);
});
