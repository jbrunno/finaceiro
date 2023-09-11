import { APIListModel } from '@bff/models/apiListModel';

export type ProducoesAcordosComparativoListModel =
  APIListModel<ProducoesAcordosComparativoModel>;

export type ProducoesAcordosComparativoModel = {
  dataHoraConsulta: string;
  totalProducaoIndividualNaData: number;
  totalProducaoMediaDaCarteiraNaData: number;
};
