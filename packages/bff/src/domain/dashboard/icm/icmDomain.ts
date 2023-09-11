import { IcmModel } from '@/gateway/dashboard/icm/models/icmModel';
import { BaseDomain } from '@bff/domain/baseDomain';

export class Icm extends BaseDomain {
  static readonly __typename = Icm.name;

  readonly porcentagemTotal: number;
  readonly porcentagemEntrada: number;
  readonly porcentagemParcelasPagas: number;
  readonly valorEntrada: number;
  readonly valorParcelasPagas: number;

  constructor(icm: IcmModel) {
    super();

    this.porcentagemTotal = icm.percentualDaMetaBatidaTotal;
    this.porcentagemEntrada = icm.percentualDaMetaBatidaDeEntradaEaVista;
    this.valorEntrada = icm.totalDeValoresPagosNoMesDeEntradasEaVista;
    this.valorParcelasPagas =
      icm.totalDeValoresPagosNoMesDeEntradasAVistaEColchao;
    this.porcentagemParcelasPagas =
      icm.percentualDaEficienciaNoMesDeEntradasAVistaEColchao;
  }
}
