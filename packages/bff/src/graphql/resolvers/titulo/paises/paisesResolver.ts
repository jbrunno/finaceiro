import { builder } from '@bff/graphql/builder';
import { Pais } from '@/domain/titulo/paises/paisDomain';

builder.queryField('paises', (t) =>
  t.field({
    type: [Pais],
    authScopes: {
      loggedIn: true,
    },
    resolve: (root, args, context) => {
      return context.adapters.titulo.paises.getPaisesList();
    },
  }),
);

builder.queryField('pais', (t) =>
  t.field({
    type: Pais,
    args: {
      id: t.arg.string({ required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (root, args, context) =>
      context.adapters.titulo.paises.getPaisById(Pais.getModelId(args.id)),
  }),
);
