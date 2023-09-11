import { builder } from '@bff/graphql/builder';
import { Pagination } from '@bff/domain/pagination';
import { PaginationInput, PaginationType } from '@bff/graphql/type';
import { Situacao } from '@/domain/acionamento/followUp/situacaoDomain';

builder.queryField('situacoesFollowUp', (t) =>
  t.field({
    type: PaginationType(Situacao),
    args: {
      pagination: t.arg({ type: PaginationInput, required: true }),
      keyword: t.arg.string(),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (root, args, context) => {
      const situacoes =
        await context.adapters.acionamento.followUp.getSituacoesPagination(
          args.pagination,
          args.keyword,
        );
      return new Pagination(situacoes);
    },
  }),
);
