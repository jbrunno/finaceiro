import { faker } from '@faker-js/faker/locale/pt_BR';
import { gql } from 'graphql-tag';

export {
  contatoTelefonePatchAdapter,
  id as idContato,
} from '@/adapters/titulo/contato/contatoAdapter.mock';

export * from '@/gateway/titulo/cliente/clienteGateway.mock';
export { paisRequests, pais } from '@/gateway/titulo/paises/paisesGateway.mock';

export const token = `Bearer ${faker.random.alphaNumeric(64)}`;

export const BUSCA_TELEFONES = gql`
  query BuscaTelefones($id: String!, $pagination: PaginationInput!) {
    telefones(id: $id, pagination: $pagination) {
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
          classificacao
          marcador
          nome
          numero
          tipo
          whatsapp
        }
      }
    }
  }
`;

export const BUSCA_EMAILS = gql`
  query BuscaEmails($id: String!, $pagination: PaginationInput!) {
    emails(id: $id, pagination: $pagination) {
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
          classificacao
          marcador
          nome
          email
        }
      }
    }
  }
`;

export const BUSCA_ENDERECOS = gql`
  query BuscaEnderecos($id: String!, $pagination: PaginationInput!) {
    enderecos(id: $id, pagination: $pagination) {
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
          bairro
          cep
          cidade
          classificacao
          complemento
          id
          logradouro
          marcador
          nome
          numero
          uf
          pais {
            id
            descricao
          }
        }
      }
    }
  }
`;

export const PATCH_CONTATO_TELEFONE = gql`
  mutation ContatoPatch($input: TelefonePatchInput!) {
    telefonePatch(input: $input) {
      classificacao
      marcador
      nome
      whatsapp
    }
  }
`;

export const PATCH_CONTATO_ENDERECO = gql`
  mutation EnderecoPatch($input: EnderecoPatchInput!) {
    enderecoPatch(input: $input) {
      marcador
      nome
      classificacao
    }
  }
`;

export const PATCH_CONTATO_EMAIL = gql`
  mutation ContatoEmailPatch($input: EmailPatchInput!) {
    emailPatch(input: $input) {
      classificacao
      marcador
      nome
    }
  }
`;
