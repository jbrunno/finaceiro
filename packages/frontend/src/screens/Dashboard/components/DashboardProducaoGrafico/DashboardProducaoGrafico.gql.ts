import { gql } from '@apollo/client';

export const DASHBOARD_PRODUCAO_GRAFICO_FRAGMENT = {
  producaoAcordosComparativo: gql`
    fragment DASHBOARD_PRODUCAO_GRAFICO_FRAGMENT on ProducaoAcordosComparativo {
      data
      quantidadeIndividual
      quantidadeMedia
    }
  `,
};

export type ProducaoAcordosComparativoData = Array<{
  data: string;
  quantidadeIndividual: number;
  quantidadeMedia: string;
}>;
