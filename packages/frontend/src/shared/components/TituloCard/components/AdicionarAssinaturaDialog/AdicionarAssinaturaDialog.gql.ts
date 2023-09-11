import { gql } from '@apollo/client';

export const TITULO_ASSINATURA_MUTATION = gql`
  mutation AssinarTituloPost($input: AssinarTituloPostInput!) {
    assinarTituloPost(input: $input) {
      id
    }
  }
`;

export type AssinarTituloPostInput = {
  id: string;
  usuarioSupervisor: string;
  senhaSupervisor: string;
};

export type AssinarTituloPostData = {
  id: string;
};
