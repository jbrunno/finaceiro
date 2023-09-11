import elasticApm from 'elastic-apm-node';

if (process.env.ELASTIC_APM_SERVER_URL) {
  elasticApm.start();
}
