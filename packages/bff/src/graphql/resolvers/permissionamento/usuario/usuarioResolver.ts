import { UsuarioById } from '@/domain/usuario/usuarioByIdDomain';
import { Usuarios } from '@/domain/usuario/usuariosDomain';
import { Pagination } from '@bff/domain/pagination';
import { builder } from '@bff/graphql/builder';
import { PaginationInput, PaginationType } from '@bff/graphql/type';

builder.queryField('usuarioById', (t) =>
  t.field({
    type: UsuarioById,
    args: {
      id: t.arg.id({ required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: (root, args, context) => {
      return context.adapters.permissionamento.usuario.usuarioById(
        UsuarioById.getModelId(args.id as string),
      );
    },
  }),
);

builder.queryField('usuarios', (t) =>
  t.field({
    type: PaginationType(Usuarios),
    args: {
      pagination: t.arg({ type: PaginationInput, required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (root, args, context) => {
      const users = await context.adapters.permissionamento.usuario.usuarios(
        args.pagination,
      );
      return new Pagination(users);
    },
  }),
);
