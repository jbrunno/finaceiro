import { Cbo } from '@/domain/titulo/cbo/cboDomain';
import { Pagination } from '@bff/domain/pagination';
import { builder } from '@bff/graphql/builder';
import { PaginationInput, PaginationType } from '@bff/graphql/type';

builder.queryField('cbos', (t) =>
  t.field({
    type: PaginationType(Cbo),
    args: {
      filter: t.arg.string(),
      pagination: t.arg({ type: PaginationInput, required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (root, args, context) => {
      const cbos = await context.adapters.titulo.cbo.getCbosPagination(
        args.pagination,
        args.filter,
      );
      return new Pagination(cbos);
    },
  }),
);
