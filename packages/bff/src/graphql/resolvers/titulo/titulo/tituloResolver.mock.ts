import gql from 'graphql-tag';

export * from '@/adapters/titulo/titulo/tituloAdapter.mock';

export const BUSCA_TITULO = gql`
  query Titulo($tituloId: String!) {
    titulo(id: $tituloId) {
      id
      tituloQuestionario {
        observacao
        contaAnteriorFalencia
        siteRegistro
        tipoAtivoInvestido
        tipoConta
        valorDepositos
      }
      assinatura
    }
  }
`;

export const PATCH_TITULO = gql`
  mutation TituloPatch($input: TituloPatchInput!) {
    tituloPatch(input: $input) {
      id
    }
  }
`;

export const POST_ASSINAR_TITULO = gql`
  mutation AssinarTituloPost($input: AssinarTituloPostInput!) {
    assinarTituloPost(input: $input) {
      id
    }
  }
`;

export const EDITAR_ASSINATURA_TITULO = gql`
  mutation EditarAssinaturaTitulo($input: EditarAssinaturaTituloInput!) {
    editarAssinaturaTitulo(input: $input) {
      id
    }
  }
`;
