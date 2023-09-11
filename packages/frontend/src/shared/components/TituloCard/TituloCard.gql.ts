import { gql } from '@apollo/client';

export const CLIENTE_TITULO_FRAGMENT = {
  tituloQuestionario: gql`
    fragment CLIENTE_TITULO_FRAGMENT on TituloQuestionario {
      contaAnteriorFalencia
      observacao
      siteRegistro
      tipoAtivoInvestido
      tipoConta
      valorDepositos
    }
  `,
};

export type TituloQuestionario = {
  siteRegistro?: string | null;
  tipoConta?: string | null;
  contaAnteriorFalencia: boolean;
  tipoAtivoInvestido?: string | null;
  valorDepositos?: string | null;
  observacao?: string | null;
};
