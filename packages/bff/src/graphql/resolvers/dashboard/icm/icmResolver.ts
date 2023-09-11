import { Icm } from '@/domain/dashboard/icm/icmDomain';
import { builder } from '@bff/graphql/builder';

builder.queryField('icm', (t) =>
  t.field({
    type: Icm,
    authScopes: {
      loggedIn: true,
    },
    resolve: (root, args, context) => {
      return context.adapters.dashboard.icm.icm();
    },
  }),
);
