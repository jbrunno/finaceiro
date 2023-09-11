import { ProducoesAcordosComparativoModel } from '@/gateway/dashboard/producoes/model/producoesAcordosComparativoModel';
import { BaseDomain } from '@bff/domain/baseDomain';

export class ProducaoAcordosComparativo extends BaseDomain {
  static readonly __typename = ProducaoAcordosComparativo.name;

  readonly data: Date;
  readonly quantidadeIndividual: number;
  readonly quantidadeMedia: number;

  constructor(producaoAcordosComparativo: ProducoesAcordosComparativoModel) {
    super();

    this.data = new Date(producaoAcordosComparativo.dataHoraConsulta);
    this.quantidadeIndividual =
      producaoAcordosComparativo.totalProducaoIndividualNaData;
    this.quantidadeMedia =
      producaoAcordosComparativo.totalProducaoMediaDaCarteiraNaData;
  }
}
