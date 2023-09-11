import { Situacao } from '@/domain/acionamento/followUp/situacaoDomain';
import { builder } from '@bff/graphql/builder';

builder.objectType(Situacao, {
  name: 'Situacao',
  fields: (t) => ({
    id: t.exposeID('id'),
    codigo: t.exposeInt('codigo'),
    nome: t.exposeString('nome'),
    descricaoObrigatoria: t.exposeBoolean('descricaoObrigatoria'),
    textoPadrao: t.exposeString('textoPadrao'),
    tempoTrava: t.exposeInt('tempoTrava'),
  }),
});
