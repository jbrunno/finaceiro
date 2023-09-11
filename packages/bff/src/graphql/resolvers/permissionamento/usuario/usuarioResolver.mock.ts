import { faker } from '@faker-js/faker/locale/pt_BR';
import { gql } from 'graphql-tag';

export * from '@/gateway/permissionamento/usuario/usuarioGateway.mock';

export const token = `Bearer ${faker.random.alphaNumeric(64)}`;

export const USUARIO_BY_ID = gql`
  query UsuarioById($id: ID!) {
    usuarioById(id: $id) {
      id
      nome
      username
      turno
      cargaHoraria
    }
  }
`;

export const USUARIOS = gql`
  query Usuarios($pagination: PaginationInput!) {
    usuarios(pagination: $pagination) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        pageNumber
        pageSize
        totalItems
      }
      items {
        cursor
        node {
          id
          nome
          username
          cargo
          turno
          cargaHoraria
          equipes {
            id
          }
          carteiras {
            id
          }
        }
      }
    }
  }
`;
