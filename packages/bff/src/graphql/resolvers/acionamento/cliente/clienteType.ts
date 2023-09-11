import { FollowUp } from '@/domain/acionamento/followUp/followUpDomain';
import { Situacao } from '@/domain/acionamento/followUp/situacaoDomain';
import { UsuarioById } from '@/domain/usuario/usuarioByIdDomain';
import { builder } from '@bff/graphql/builder';

builder.objectType(FollowUp, {
  name: 'FollowUp',
  fields: (t) => ({
    id: t.exposeID('id'),
    dataRegistro: t.exposeString('dataRegistro'),
    descricao: t.exposeString('descricao'),
    usuario: t.field({
      type: UsuarioById,
      nullable: true,
      resolve: async (root, args, context) => {
        if (!root.usuarioId) return null;
        return context.adapters.permissionamento.usuario.usuarioById(
          UsuarioById.getModelId(root.usuarioId),
        );
      },
    }),
    situacao: t.field({
      type: Situacao,
      nullable: true,
      resolve: async (root, args, context) => {
        if (!root.situacaoId) return null;
        return context.adapters.acionamento.followUp.situacaoById(
          Situacao.getModelId(root.situacaoId),
        );
      },
    }),
  }),
});
