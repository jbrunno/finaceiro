import { builder } from '@bff/graphql/builder';
import { Pais } from '@/domain/titulo/paises/paisDomain';

builder.objectType(Pais, {
  name: 'Pais',
  fields: (t) => ({
    id: t.exposeID('id'),
    descricao: t.exposeString('descricao'),
  }),
});
