import { gql } from '@apollo/client';

export const DASHBOARD_ACORDOS_PERIODO_FRAGMENT = {
  producaoAcordosSintetizado: gql`
    fragment DASHBOARD_ACORDOS_PERIODO_FRAGMENT on ProducaoAcordosSintetizado {
      acordosEPromessasDePagamento
      valorTotalAcordosGerados
      valorTotalAcordosPagos
      quantidadeAcordosPagos
      quantidadeAcordosQuebrados
      quantidadeParcelasAVencer
    }
  `,
};

export type ProducaoAcordosSintetizadoData = {
  acordosEPromessasDePagamento: number;
  valorTotalAcordosGerados: number;
  valorTotalAcordosPagos: number;
  quantidadeAcordosPagos: number;
  quantidadeAcordosQuebrados: number;
  quantidadeParcelasAVencer: number;
};
