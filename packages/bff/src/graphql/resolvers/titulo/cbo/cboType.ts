import { Cbo } from '@/domain/titulo/cbo/cboDomain';
import { builder } from '@bff/graphql/builder';

builder.objectType(Cbo, {
  name: 'Cbo',
  fields: (t) => ({
    id: t.exposeID('id'),
    codigo: t.exposeInt('codigo'),
    ocupacao: t.exposeString('ocupacao'),
  }),
});
