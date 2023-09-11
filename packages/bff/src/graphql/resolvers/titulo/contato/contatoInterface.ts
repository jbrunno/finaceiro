import { builder } from '@bff/graphql/builder';
import { ContatoClassificacao, ContatoMarcador } from './contatoEnum';

export const Contato = builder.simpleInterface('Contato', {
  fields: (t) => ({
    id: t.string(),
    nome: t.string(),
    marcador: t.field({ type: ContatoMarcador, nullable: true }),
    classificacao: t.field({ type: ContatoClassificacao }),
  }),
});
