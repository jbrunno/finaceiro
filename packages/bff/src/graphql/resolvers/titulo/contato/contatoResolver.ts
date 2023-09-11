import { builder } from '@bff/graphql/builder';
import { Pagination } from '@bff/domain/pagination';
import { PaginationInput, PaginationType } from '@bff/graphql/type';
import { Cliente } from '@/domain/titulo/cliente/clienteDomain';
import { ContatoTelefone } from '@/domain/titulo/contato/contatoTelefoneDomain';
import { ContatoEmail } from '@/domain/titulo/contato/contatoEmailDomain';
import { ContatoEndereco } from '@/domain/titulo/contato/contatoEnderecoDomain';
import { ContatoClassificacao, ContatoMarcador } from './contatoEnum';

builder.queryField('telefones', (t) =>
  t.field({
    type: PaginationType(ContatoTelefone),
    args: {
      id: t.arg.string({ required: true }),
      numero: t.arg.string(),
      pagination: t.arg({ type: PaginationInput, required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (root, args, context) => {
      const telefones =
        await context.adapters.titulo.cliente.getContatoTelefonePagination(
          Cliente.getModelId(args.id),
          args.pagination,
          args.numero,
        );
      return new Pagination(telefones);
    },
  }),
);

builder.queryField('emails', (t) =>
  t.field({
    type: PaginationType(ContatoEmail),
    args: {
      id: t.arg.string({ required: true }),
      email: t.arg.string(),
      pagination: t.arg({ type: PaginationInput, required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (root, args, context) => {
      const emails =
        await context.adapters.titulo.cliente.getContatoEmailPagination(
          Cliente.getModelId(args.id),
          args.pagination,
          args.email,
        );
      return new Pagination(emails);
    },
  }),
);

builder.queryField('enderecos', (t) =>
  t.field({
    type: PaginationType(ContatoEndereco),
    args: {
      id: t.arg.string({ required: true }),
      pagination: t.arg({ type: PaginationInput, required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (root, args, context) => {
      const enderecos =
        await context.adapters.titulo.cliente.getContatoEnderecoPagination(
          Cliente.getModelId(args.id),
          args.pagination,
        );
      return new Pagination(enderecos);
    },
  }),
);

builder.relayMutationField(
  'telefonePatch',
  {
    inputFields: (t) => ({
      id: t.string({ required: true }),
      nome: t.string({ required: true }),
      marcador: t.field({ type: ContatoMarcador, required: true }),
      classificacao: t.field({ type: ContatoClassificacao, required: true }),
      whatsapp: t.boolean({ required: true }),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      const { id: telefoneId, ...input } = args.input;
      await ctx.adapters.titulo.contato.patchContatoTelefoneById(
        ContatoTelefone.getModelId(telefoneId),
        input,
      );

      return {
        nome: input.nome,
        marcador: input.marcador,
        classificacao: input.classificacao,
        whatsapp: input.whatsapp,
      };
    },
    authScopes: {
      loggedIn: true,
    },
  },
  {
    outputFields: (t) => ({
      nome: t.exposeString('nome'),
      marcador: t.expose('marcador', { type: ContatoMarcador }),
      classificacao: t.expose('classificacao', { type: ContatoClassificacao }),
      whatsapp: t.exposeBoolean('whatsapp'),
    }),
  },
);

builder.relayMutationField(
  'enderecoPatch',
  {
    inputFields: (t) => ({
      id: t.string({ required: true }),
      nome: t.string({ required: true }),
      marcador: t.field({ type: ContatoMarcador }),
      classificacao: t.field({ type: ContatoClassificacao, required: true }),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      const { id: contatoId, ...input } = args.input;
      await ctx.adapters.titulo.contato.patchContatoEnderecoById(
        ContatoEndereco.getModelId(contatoId),
        input,
      );

      return {
        id: contatoId,
        nome: input.nome,
        marcador: input.marcador,
        classificacao: input.classificacao,
      };
    },
    authScopes: {
      loggedIn: true,
    },
  },
  {
    outputFields: (t) => ({
      id: t.exposeString('id'),
      nome: t.exposeString('nome'),
      marcador: t.expose('marcador', { type: ContatoMarcador, nullable: true }),
      classificacao: t.expose('classificacao', { type: ContatoClassificacao }),
    }),
  },
);

builder.relayMutationField(
  'emailPatch',
  {
    inputFields: (t) => ({
      id: t.string({ required: true }),
      nome: t.string({ required: true }),
      marcador: t.field({ type: ContatoMarcador, required: true }),
      classificacao: t.field({ type: ContatoClassificacao, required: true }),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      const { id: emailId, ...input } = args.input;
      await ctx.adapters.titulo.contato.patchContatoEmailById(
        ContatoEmail.getModelId(emailId),
        input,
      );

      return {
        nome: input.nome,
        marcador: input.marcador,
        classificacao: input.classificacao,
      };
    },
    authScopes: {
      loggedIn: true,
    },
  },
  {
    outputFields: (t) => ({
      nome: t.exposeString('nome'),
      marcador: t.expose('marcador', { type: ContatoMarcador }),
      classificacao: t.expose('classificacao', { type: ContatoClassificacao }),
    }),
  },
);
