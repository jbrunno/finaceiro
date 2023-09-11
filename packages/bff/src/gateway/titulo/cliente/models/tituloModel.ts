import { APIPaginationModel } from '@bff/models/apiPaginationModel';

export type TituloPaginationModel = APIPaginationModel<TituloModel>;

export type TituloQuestionario = {
  siteRegistro?: string | null;
  tipoConta?: string | null;
  contaAnteriorFalencia: boolean;
  tipoAtivoInvestido?: string | null;
  valorDepositos?: string | null;
  observacao?: string | null;
};

export type TituloModel = {
  id: string;
  tituloQuestionario: TituloQuestionario;
  assinatura: boolean;
};
