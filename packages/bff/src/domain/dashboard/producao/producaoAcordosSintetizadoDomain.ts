import { ProducoesAcordosSintetizadoModel } from '@/gateway/dashboard/producoes/model/producoesAcordosSintetizadoModel';
import { BaseDomain } from '@bff/domain/baseDomain';

export class ProducaoAcordosSintetizado extends BaseDomain {
  static readonly __typename = ProducaoAcordosSintetizado.name;

  readonly acordosEPromessasDePagamento: number;
  readonly valorTotalAcordosGerados: number;
  readonly valorTotalAcordosPagos: number;
  readonly quantidadeAcordosPagos: number;
  readonly quantidadeAcordosQuebrados: number;
  readonly quantidadeParcelasAVencer: number;

  constructor(producaoAcordosSintetizado: ProducoesAcordosSintetizadoModel) {
    super();

    this.acordosEPromessasDePagamento =
      producaoAcordosSintetizado.acordosEPromessasDePagamento;
    this.valorTotalAcordosGerados =
      producaoAcordosSintetizado.valorTotalAcordosGerados;
    this.valorTotalAcordosPagos =
      producaoAcordosSintetizado.valorTotalAcordosPagos;
    this.quantidadeAcordosPagos =
      producaoAcordosSintetizado.quantidadeAcordosPagos;
    this.quantidadeAcordosQuebrados =
      producaoAcordosSintetizado.quantidadeAcordosQuebrados;
    this.quantidadeParcelasAVencer =
      producaoAcordosSintetizado.quantidadeParcelasAVencer;
  }
}
