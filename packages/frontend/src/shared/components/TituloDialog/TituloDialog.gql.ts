import { gql } from '@apollo/client';
import { TituloQuestionario } from '../TituloCard/TituloCard.gql';

export const TITULO_INSERT_MUTATION = gql`
  mutation TituloPost($input: TituloPostInput!) {
    tituloPost(input: $input) {
      id
    }
  }
`;

export const TITULO_EDIT_MUTATION = gql`
  mutation TituloPatch($input: TituloPatchInput!) {
    tituloPatch(input: $input) {
      id
    }
  }
`;

export type TituloInsertData = TituloId;

export type TituloInsertInput = TituloQuestionarioDialog;

export type TituloEditData = TituloId;

export type TituloEditInput = TituloQuestionarioDialog;

export type TituloQuestionarioDialog = TituloQuestionario & {
  id: string | null;
};

type TituloId = {
  id: string;
};
