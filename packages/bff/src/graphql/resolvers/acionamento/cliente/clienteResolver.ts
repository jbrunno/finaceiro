import { builder } from '@bff/graphql/builder';
import { Pagination } from '@bff/domain/pagination';
import { PaginationInput, PaginationType } from '@bff/graphql/type';
import { FollowUp } from '@/domain/acionamento/followUp/followUpDomain';
import { Situacao } from '@/domain/acionamento/followUp/situacaoDomain';
import { Cliente } from '@/domain/titulo/cliente/clienteDomain';
import { Titulo } from '@/domain/titulo/titulo/tituloDomain';

builder.queryField('followUps', (t) =>
  t.field({
    type: PaginationType(FollowUp),
    args: {
      id: t.arg.string({ required: true }),
      pagination: t.arg({ type: PaginationInput, required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (root, args, context) => {
      const followUp =
        await context.adapters.acionamento.cliente.getClienteFollowUpsPagination(
          FollowUp.getModelId(args.id),
          args.pagination,
        );
      return new Pagination(followUp);
    },
  }),
);

builder.relayMutationField(
  'registrarClienteFollowUp',
  {
    inputFields: (t) => ({
      clienteId: t.string({ required: true }),
      tituloId: t.string({ required: true }),
      situacaoFollowUpId: t.string({ required: true }),
      descricao: t.string(),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      const clienteId = Cliente.getModelId(args.input.clienteId);
      const input = {
        tituloId: Titulo.getModelId(args.input.tituloId),
        situacaoFollowUpId: Situacao.getModelId(args.input.situacaoFollowUpId),
        descricao: args.input.descricao,
      };

      return ctx.adapters.acionamento.cliente.postFollowUp(clienteId, input);
    },
    authScopes: {
      loggedIn: true,
    },
  },
  {
    outputFields: (t) => ({
      id: t.exposeString('id'),
    }),
  },
);
