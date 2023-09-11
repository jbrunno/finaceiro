import { faker } from '@faker-js/faker/locale/pt_BR';
import { gql } from 'graphql-tag';

export {
  usuarioByIdRequests,
  usuario,
} from '@/gateway/permissionamento/usuario/usuarioGateway.mock';
export {
  situacaoRequests,
  situacao,
} from '@/gateway/acionamento/followUp/followUpGateway.mock';
export * from '@/adapters/acionamento/cliente/clienteAdapter.mock';

export const token = `Bearer ${faker.random.alphaNumeric(64)}`;

export const FOLLOWUP = gql`
  query FollowUp($id: String!, $pagination: PaginationInput!) {
    followUps(id: $id, pagination: $pagination) {
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
          dataRegistro
          # usuario {
          #   id
          #   nome
          #   username
          #   turno
          #   cargaHoraria
          # }
          situacao {
            id
            descricaoObrigatoria
            codigo
            nome
            tempoTrava
            textoPadrao
          }
          descricao
        }
      }
    }
  }
`;

export const POST_FOLLOWUPS = gql`
  mutation RegistrarClienteFollowUp($input: RegistrarClienteFollowUpInput!) {
    registrarClienteFollowUp(input: $input) {
      id
    }
  }
`;
