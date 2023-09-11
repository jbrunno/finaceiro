import { ProducaoAcordosSintetizado } from '@/domain/dashboard/producao/producaoAcordosSintetizadoDomain';
import { ProducaoAcordosComparativo } from '@/domain/dashboard/producao/producaoAcordosComparativoDomain';
import { ProducaoAcordos } from '@/domain/dashboard/producao/producaoAcordosDomain';
import { builder } from '@bff/graphql/builder';

builder.objectType(ProducaoAcordos, {
  name: 'ProducaoAcordos',
  fields: (t) => ({
    quantidadeTotalAcordos: t.exposeFloat('quantidadeTotalAcordos'),
    valorTotalAcordos: t.exposeFloat('valorTotalAcordos'),
    quantidadeParcelasVencer: t.exposeFloat('quantidadeParcelasVencer'),
    porcentagemConversao: t.exposeFloat('porcentagemConversao'),
  }),
});

builder.objectType(ProducaoAcordosSintetizado, {
  name: 'ProducaoAcordosSintetizado',
  fields: (t) => ({
    acordosEPromessasDePagamento: t.exposeFloat('acordosEPromessasDePagamento'),
    valorTotalAcordosGerados: t.exposeFloat('valorTotalAcordosGerados'),
    valorTotalAcordosPagos: t.exposeFloat('valorTotalAcordosPagos'),
    quantidadeAcordosPagos: t.exposeFloat('quantidadeAcordosPagos'),
    quantidadeAcordosQuebrados: t.exposeFloat('quantidadeAcordosQuebrados'),
    quantidadeParcelasAVencer: t.exposeFloat('quantidadeParcelasAVencer'),
  }),
});

builder.objectType(ProducaoAcordosComparativo, {
  name: 'ProducaoAcordosComparativo',
  fields: (t) => ({
    data: t.expose('data', { type: 'Date' }),
    quantidadeIndividual: t.exposeFloat('quantidadeIndividual'),
    quantidadeMedia: t.exposeFloat('quantidadeMedia'),
  }),
});
