import { faker } from '@faker-js/faker/locale/pt_BR';
import { gql } from 'graphql-tag';
import { ContatoEmail } from '@/domain/titulo/contato/contatoEmailDomain';
import { ContatoEmailModel } from '@/gateway/titulo/cliente/models/contatoModel';

export * from '@/gateway/titulo/cliente/clienteGateway.mock';
export { cboRequests, cbo } from '@/gateway/titulo/cbo/cboGateway.mock';

export { clientePatchAdapter } from '@/adapters/titulo/cliente/clienteAdapter.mock';

export const token = `Bearer ${faker.random.alphaNumeric(64)}`;

export const BUSCA_CLIENTES = gql`
  query BuscaClientes($keyword: String!, $pagination: PaginationInput!) {
    clientes(keyword: $keyword, pagination: $pagination) {
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
          cbo {
            id
            codigo
            ocupacao
          }
          documento
          tipo
          dataNascimento
          falecido
          id
          negativado
          nome
          nomeSocial
          sexo
        }
      }
    }
  }
`;

export const BUSCA_CLIENTES_TITULOS = gql`
  query BuscaTitulos($clienteId: String!) {
    titulos(id: $clienteId) {
      items {
        node {
          id
          tituloQuestionario {
            contaAnteriorFalencia
            observacao
            siteRegistro
            tipoAtivoInvestido
            tipoConta
            valorDepositos
          }
          assinatura
        }
      }
    }
  }
`;

export const POST_TITULO = gql`
  mutation TituloPost($input: TituloPostInput!) {
    tituloPost(input: $input) {
      id
    }
  }
`;

export const BUSCA_CLIENTE = gql`
  query BuscaCliente($id: String!) {
    cliente(id: $id) {
      cbo {
        id
        codigo
        ocupacao
      }
      documento
      tipo
      dataNascimento
      falecido
      id
      negativado
      nome
      nomeSocial
      sexo
    }
  }
`;

export const PATCH_CLIENTE = gql`
  mutation ClientePatch($input: ClientePatchInput!) {
    clientePatch(input: $input) {
      cliente {
        cbo {
          id
          codigo
          ocupacao
        }
        documento
        tipo
        dataNascimento
        falecido
        id
        negativado
        nome
        nomeSocial
        sexo
      }
    }
  }
`;

export const POST_CLIENTE = gql`
  mutation ClientePost($input: ClientePostInput!) {
    clientePost(input: $input) {
      id
    }
  }
`;

export const POST_CLIENTE_CONTATO_ENDERECO = gql`
  mutation ClienteContatoEnderecoPost(
    $input: ClienteContatoEnderecoPostInput!
  ) {
    clienteContatoEnderecoPost(input: $input) {
      id
      nome
      numero
      bairro
      cep
      cidade
      marcador
      classificacao
      complemento
      logradouro
      uf
      paisId
    }
  }
`;

export const emailMock = (contatoEmail: ContatoEmailModel) => {
  return new ContatoEmail(contatoEmail);
};

export const POST_CLIENTE_CONTATO_EMAIL = gql`
  mutation ClienteContatoEmailPost($input: ClienteContatoEmailPostInput!) {
    clienteContatoEmailPost(input: $input) {
      id
      nome
      marcador
      classificacao
      email
    }
  }
`;
