import { APIPaginationModel } from '@bff/models/apiPaginationModel';

export type CboPaginationModel = APIPaginationModel<CboModel>;

export type CboModel = {
  id: string;
  codigo: number;
  ocupacao: string;
};
