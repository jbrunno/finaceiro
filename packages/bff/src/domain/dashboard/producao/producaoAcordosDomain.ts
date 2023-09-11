import { ProducoesAcordosModel } from '@/gateway/dashboard/producoes/model/producoesAcordosModel';
import { BaseDomain } from '@bff/domain/baseDomain';

export class ProducaoAcordos extends BaseDomain {
  static readonly __typename = ProducaoAcordos.name;

  readonly quantidadeTotalAcordos: number;
  readonly valorTotalAcordos: number;
  readonly quantidadeParcelasVencer: number;
  readonly porcentagemConversao: number;

  constructor(producaoAcordos: ProducoesAcordosModel) {
    super();

    this.quantidadeTotalAcordos =
      producaoAcordos.totalDeAcordosNegociadosNaData;
    this.valorTotalAcordos = producaoAcordos.totalDeValoresNegociadosNaData;
    this.quantidadeParcelasVencer =
      producaoAcordos.totalDeParcelasComVencimentoNaData;
    this.porcentagemConversao = producaoAcordos.totalPercentualConversao;
  }
}
