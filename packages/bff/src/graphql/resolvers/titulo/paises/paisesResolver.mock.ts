import { faker } from '@faker-js/faker/locale/pt_BR';
import { gql } from 'graphql-tag';

export const token = `Bearer ${faker.random.alphaNumeric(64)}`;

export const PAISES = gql`
  query Paises {
    paises {
      id
      descricao
    }
  }
`;

export const PAIS = gql`
  query Pais($id: String!) {
    pais(id: $id) {
      id
      descricao
    }
  }
`;
