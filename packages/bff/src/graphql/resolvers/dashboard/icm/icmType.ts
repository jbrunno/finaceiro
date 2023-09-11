import { Icm } from '@/domain/dashboard/icm/icmDomain';
import { builder } from '@bff/graphql/builder';

builder.objectType(Icm, {
  name: 'Icm',
  fields: (t) => ({
    porcentagemTotal: t.exposeFloat('porcentagemTotal'),
    porcentagemEntrada: t.exposeFloat('porcentagemEntrada'),
    valorEntrada: t.exposeFloat('valorEntrada'),
    valorParcelasPagas: t.exposeFloat('valorParcelasPagas'),
    porcentagemParcelasPagas: t.exposeFloat('porcentagemParcelasPagas'),
  }),
});
