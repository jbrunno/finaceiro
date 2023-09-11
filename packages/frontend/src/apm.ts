import { init as initApm } from '@elastic/apm-rum';
import { APP_NAME, APM_URL, ENV } from './config';

if (APM_URL && ENV) {
  initApm({
    serviceName: APP_NAME,
    serverUrl: APM_URL,
    environment: ENV,
    propagateTracestate: true,
    breakdownMetrics: true,
  });
}
