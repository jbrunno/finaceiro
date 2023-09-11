import { builder } from '@bff/graphql/builder';
import { Cbo } from '@/domain/titulo/cbo/cboDomain';
import {
  Cliente,
  ClienteSexoDomain,
} from '@/domain/titulo/cliente/clienteDomain';

import { CLIENTE_TIPO } from '@/domain/titulo/cliente/clienteTipoDomain';

builder.objectType(Cliente, {
  name: 'Cliente',
  fields: (t) => ({
    id: t.exposeID('id'),
    nome: t.exposeString('nome'),
    nomeSocial: t.expose('nomeSocial', { type: 'String', nullable: true }),
    documento: t.expose('documento', { type: 'String', nullable: true }),
    sexo: t.expose('sexo', { type: ClienteSexo, nullable: true }),
    tipo: t.expose('tipo', { type: ClienteTipo }),
    falecido: t.exposeBoolean('falecido'),
    dataNascimento: t.expose('dataNascimento', {
      type: 'String',
      nullable: true,
    }),
    cbo: t.field({
      type: Cbo,
      nullable: true,
      resolve: async (root, args, context) => {
        if (!root.cboId) return null;
        return context.adapters.titulo.cbo.getCboById(String(root.cboId));
      },
    }),
    negativado: t.exposeBoolean('negativado'),
  }),
});

export const ClienteSexo = builder.enumType(ClienteSexoDomain, {
  name: 'ClienteSexo',
});

export const ClienteTipo = builder.enumType(CLIENTE_TIPO, {
  name: 'ClienteTipo',
});
