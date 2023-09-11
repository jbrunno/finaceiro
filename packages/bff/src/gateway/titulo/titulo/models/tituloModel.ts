export type TituloModel = {
  id: string;
  tituloQuestionario: TituloQuestionarioModel;
  assinatura: boolean;
};

export type TituloQuestionarioModel = {
  siteRegistro?: string | null;
  tipoConta?: string | null;
  contaAnteriorFalencia: boolean;
  tipoAtivoInvestido?: string | null;
  valorDepositos?: string | null;
  observacao?: string | null;
};
