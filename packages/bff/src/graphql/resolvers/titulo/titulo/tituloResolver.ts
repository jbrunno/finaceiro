import { Titulo } from '@/domain/titulo/titulo/tituloDomain';
import { builder } from '@bff/graphql/builder';

builder.queryField('titulo', (t) =>
  t.field({
    type: Titulo,
    args: {
      id: t.arg.string({ required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (root, args, context) =>
      context.adapters.titulo.titulo.getTituloById(Titulo.getModelId(args.id)),
  }),
);

builder.relayMutationField(
  'tituloPatch',
  {
    inputFields: (t) => ({
      id: t.string({ required: true }),
      siteRegistro: t.string(),
      tipoConta: t.string(),
      contaAnteriorFalencia: t.boolean({ required: true }),
      tipoAtivoInvestido: t.string(),
      valorDepositos: t.string(),
      observacao: t.string(),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      const { id: tituloId, ...input } = args.input;
      return ctx.adapters.titulo.titulo.patchTituloById(
        Titulo.getModelId(String(tituloId)),
        input,
      );
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

builder.relayMutationField(
  'assinarTituloPost',
  {
    inputFields: (t) => ({
      id: t.string({ required: true }),
      usuarioSupervisor: t.string({ required: true }),
      senhaSupervisor: t.string({ required: true }),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      const { id: tituloId, ...input } = args.input;
      return ctx.adapters.titulo.titulo.postAssinaturaTitulo(
        Titulo.getModelId(String(tituloId)),
        input,
      );
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

builder.relayMutationField(
  'editarAssinaturaTitulo',
  {
    inputFields: (t) => ({
      id: t.string({ required: true }),
      usuarioSupervisor: t.string({ required: true }),
      senhaSupervisor: t.string({ required: true }),
      motivo: t.string({ required: true }),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      const { id: tituloId, ...input } = args.input;
      return ctx.adapters.titulo.titulo.editarAssinaturaTitulo(
        Titulo.getModelId(String(tituloId)),
        input,
      );
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
