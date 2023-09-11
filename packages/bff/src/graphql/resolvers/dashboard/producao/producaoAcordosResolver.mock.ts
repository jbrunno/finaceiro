import { faker } from '@faker-js/faker/locale/pt_BR';
import { gql } from 'graphql-tag';

export * from '@/gateway/dashboard/producoes/producoesGateway.mock';

export const token = `Bearer ${faker.random.alphaNumeric(64)}`;

export const PRODUCAO_ACORDOS = gql`
  query ProducaoAcordos {
    producaoAcordos {
      quantidadeTotalAcordos
      valorTotalAcordos
      quantidadeParcelasVencer
      porcentagemConversao
    }
  }
`;

export const PRODUCAO_ACORDOS_SINTETIZADO = gql`
  query ProducaoAcordosSintetizado($date: Date!) {
    producaoAcordosSintetizado(date: $date) {
      acordosEPromessasDePagamento
      valorTotalAcordosGerados
      valorTotalAcordosPagos
      quantidadeAcordosPagos
      quantidadeAcordosQuebrados
      quantidadeParcelasAVencer
    }
  }
`;

export const PRODUCAO_ACORDOS_COMPARATIVO = gql`
  query ProducaoAcordosComparativo {
    producaoAcordosComparativo {
      data
      quantidadeIndividual
      quantidadeMedia
    }
  }
`;
