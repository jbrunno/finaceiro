import { ProducaoAcordosSintetizado } from '@/domain/dashboard/producao/producaoAcordosSintetizadoDomain';
import { ProducaoAcordos } from '@/domain/dashboard/producao/producaoAcordosDomain';
import { ProducaoAcordosComparativo } from '@/domain/dashboard/producao/producaoAcordosComparativoDomain';
import { builder } from '@bff/graphql/builder';

builder.queryField('producaoAcordos', (t) =>
  t.field({
    type: ProducaoAcordos,
    authScopes: {
      loggedIn: true,
    },
    resolve: (root, args, context) => {
      return context.adapters.dashboard.producaoAcordos.producaoAcordos();
    },
  }),
);

builder.queryField('producaoAcordosSintetizado', (t) =>
  t.field({
    type: ProducaoAcordosSintetizado,
    args: {
      date: t.arg({ type: 'Date', required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: (root, args, context) => {
      return context.adapters.dashboard.producaoAcordos.producaoAcordosSintetizado(
        args.date,
      );
    },
  }),
);

builder.queryField('producaoAcordosComparativo', (t) =>
  t.field({
    type: [ProducaoAcordosComparativo],
    authScopes: {
      loggedIn: true,
    },
    resolve: (root, args, context) => {
      return context.adapters.dashboard.producaoAcordos.producaoAcordosComparativo();
    },
  }),
);
