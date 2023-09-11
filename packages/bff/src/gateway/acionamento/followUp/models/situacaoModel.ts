import { APIPaginationModel } from '@bff/models/apiPaginationModel';

export type SituacaoPaginationModel = APIPaginationModel<SituacaoModel>;

export type SituacaoModel = {
  id: string;
  codigo: number;
  nome: string;
  descricaoObrigatoria: boolean;
  textoPadrao: string;
  tempoTrava: number;
};
