import { APIPaginationModel } from '@bff/models/apiPaginationModel';

export type FollowUpPaginationModel = APIPaginationModel<FollowUpModel>;

export type FollowUpModel = {
  id: string;
  dataRegistro: string;
  usuarioId: string;
  situacaoId: string;
  descricao: string;
};
