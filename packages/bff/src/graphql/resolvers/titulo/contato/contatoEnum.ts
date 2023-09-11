import { builder } from '@bff/graphql/builder';
import { CONTATO_MARCADOR } from '@/domain/titulo/contato/contatoMarcadorDomain';
import { CONTATO_CLASSIFICACAO } from '@/domain/titulo/contato/contatoClassificacaoDomain';
import { TIPO_TELEFONE } from '@/domain/titulo/contato/contatoTipoTelefoneDomain';

export const ContatoMarcador = builder.enumType(CONTATO_MARCADOR, {
  name: 'ContatoMarcador',
});

export const ContatoClassificacao = builder.enumType(CONTATO_CLASSIFICACAO, {
  name: 'ContatoClassificacao',
});

export const ContatoTipoTelefone = builder.enumType(TIPO_TELEFONE, {
  name: 'ContatoTipoTelefone',
});
