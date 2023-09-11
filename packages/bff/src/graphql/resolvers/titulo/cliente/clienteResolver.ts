import { Pagination } from '@bff/domain/pagination';
import { builder } from '@bff/graphql/builder';
import { PaginationInput, PaginationType } from '@bff/graphql/type';
import { Cliente } from '@/domain/titulo/cliente/clienteDomain';
import { Cbo } from '@/domain/titulo/cbo/cboDomain';
import { ContatoTelefone } from '@/domain/titulo/contato/contatoTelefoneDomain';
import { Titulo } from '@/domain/titulo/titulo/tituloDomain';
import { ContatoClassificacao, ContatoMarcador } from '../contato/contatoEnum';
import { ClienteSexo, ClienteTipo } from './clienteType';

builder.queryField('clientes', (t) =>
  t.field({
    type: PaginationType(Cliente),
    args: {
      keyword: t.arg.string({ required: true }),
      pagination: t.arg({ type: PaginationInput, required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (root, args, context) => {
      const clientes =
        await context.adapters.titulo.cliente.getClientesPagination(
          args.keyword,
          args.pagination,
        );
      return new Pagination(clientes);
    },
  }),
);

builder.queryField('cliente', (t) =>
  t.field({
    type: Cliente,
    args: {
      id: t.arg.string({ required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (root, args, context) =>
      context.adapters.titulo.cliente.getClienteById(
        Cliente.getModelId(args.id),
      ),
  }),
);

builder.queryField('titulos', (t) =>
  t.field({
    type: PaginationType(Titulo),
    args: {
      id: t.arg.string({ required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (root, args, context) => {
      const titulos =
        await context.adapters.titulo.cliente.getTitulosByClienteId(
          Cliente.getModelId(args.id),
        );

      return new Pagination(titulos);
    },
  }),
);

builder.relayMutationField(
  'tituloPost',
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
      const { id: clientId, ...input } = args.input;
      return ctx.adapters.titulo.cliente.postTituloByClienteId(
        Cliente.getModelId(String(clientId)),
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
  'clientePost',
  {
    inputFields: (t) => ({
      nome: t.string({ required: true }),
      tipoCliente: t.field({ type: ClienteTipo, required: true }),
      telefone: t.string({ required: true }),
      documento: t.string(),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      return ctx.adapters.titulo.cliente.postCliente(args.input);
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
  'clientePatch',
  {
    inputFields: (t) => ({
      id: t.string(),
      nome: t.string(),
      nomeSocial: t.string(),
      documento: t.string(),
      tipoCliente: t.field({ type: ClienteTipo }),
      sexo: t.field({ type: ClienteSexo }),
      falecido: t.boolean(),
      cboId: t.string(),
      negativado: t.boolean(),
      dataNascimento: t.string(),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      const { id: clientId, ...input } = args.input;
      const { id } = await ctx.adapters.titulo.cliente.patchClienteById(
        Cliente.getModelId(String(clientId)),
        {
          ...input,
          cboId: Cbo.getModelId(String(args.input.cboId)),
        },
      );

      const cliente = await ctx.adapters.titulo.cliente.getClienteById(
        Cliente.getModelId(id),
      );
      return { cliente };
    },
    authScopes: {
      loggedIn: true,
    },
  },
  {
    outputFields: (t) => ({
      cliente: t.expose('cliente', { type: Cliente }),
    }),
  },
);

builder.relayMutationField(
  'clienteContatoEnderecoPost',
  {
    inputFields: (t) => ({
      id: t.string({ required: true }),
      nome: t.string({ required: true }),
      marcador: t.field({ type: ContatoMarcador }),
      classificacao: t.field({ type: ContatoClassificacao, required: true }),
      numero: t.string({ required: true }),
      complemento: t.string(),
      logradouro: t.string({ required: true }),
      bairro: t.string({ required: true }),
      cidade: t.string({ required: true }),
      uf: t.string({ required: true }),
      cep: t.string({ required: true }),
      paisId: t.string(),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      const { id: clientId, ...input } = args.input;
      const response =
        await ctx.adapters.titulo.cliente.postContatoEnderecoByClienteId(
          Cliente.getModelId(String(clientId)),
          input,
        );

      return {
        id: response.id,
        nome: input.nome,
        marcador: input.marcador,
        classificacao: input.classificacao,
        numero: input.numero,
        complemento: input.complemento,
        logradouro: input.logradouro,
        bairro: input.bairro,
        cidade: input.cidade,
        uf: input.uf,
        cep: input.cep,
        paisId: input.paisId,
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
      numero: t.exposeString('numero'),
      complemento: t.exposeString('complemento', { nullable: true }),
      logradouro: t.exposeString('logradouro'),
      bairro: t.exposeString('bairro'),
      cidade: t.exposeString('cidade'),
      uf: t.exposeString('uf'),
      cep: t.exposeString('cep'),
      paisId: t.exposeString('paisId', { nullable: true }),
    }),
  },
);

builder.relayMutationField(
  'clienteContatoEmailPost',
  {
    inputFields: (t) => ({
      id: t.string({ required: true }),
      nome: t.string({ required: true }),
      marcador: t.field({ type: ContatoMarcador }),
      classificacao: t.field({ type: ContatoClassificacao, required: true }),
      email: t.string({ required: true }),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      const { id: clientId, ...input } = args.input;
      const response =
        await ctx.adapters.titulo.cliente.postContatoEmailByClienteId(
          Cliente.getModelId(String(clientId)),
          input,
        );

      return {
        id: response.id,
        nome: input.nome,
        marcador: input.marcador,
        classificacao: input.classificacao,
        email: input.email,
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
      email: t.exposeString('email'),
    }),
  },
);

builder.relayMutationField(
  'clienteContatoTelefonePost',
  {
    inputFields: (t) => ({
      id: t.string({ required: true }),
      nome: t.string({ required: true }),
      marcador: t.field({ type: ContatoMarcador, required: true }),
      classificacao: t.field({ type: ContatoClassificacao, required: true }),
      numero: t.string({ required: true }),
      whatsapp: t.boolean({ required: true }),
    }),
  },
  {
    resolve: async (root, args, ctx) => {
      const { id: clientId, ...input } = args.input;
      const { id } =
        await ctx.adapters.titulo.cliente.postContatoTelefoneByClienteId(
          Cliente.getModelId(String(clientId)),
          input,
        );
      const telefone = await ctx.adapters.titulo.contato.getContatoTelefoneById(
        ContatoTelefone.getModelId(id),
      );
      return { telefone };
    },
    authScopes: {
      loggedIn: true,
    },
  },
  {
    outputFields: (t) => ({
      telefone: t.expose('telefone', { type: ContatoTelefone }),
    }),
  },
);
