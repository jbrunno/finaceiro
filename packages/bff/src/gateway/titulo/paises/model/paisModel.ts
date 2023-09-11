import { APIListModel } from '@bff/models/apiListModel';

export type PaisesListModel = APIListModel<PaisModel>;

export type PaisModel = {
  id: string;
  descricao: string;
};
