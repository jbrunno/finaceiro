import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';
import { render } from '@test-utils/component-testing';
import { faker } from '@faker-js/faker';
import { ClienteContatosEnderecoTable } from './ClienteContatosEnderecoTable';

test('should render ClienteContatosEnderecoTable', () => {
  const { container } = render(
    <ClienteContatosEnderecoTable
      enderecos={[
        {
          id: '1',
          nome: 'teste',
          classificacao: ContatoClassificacaoEnum.EXCELENTE,
          marcador: ContatoMarcadorEnum.FILHO,
          cep: '69000000',
          bairro: 'Pampulha',
          cidade: 'Belo Horizonte',
          complemento: 'bl1 ap123',
          numero: '111',
          logradouro: 'Rua teste',
          uf: 'MG',
          pais: {
            id: '1',
            descricao: 'Brasil',
          },
        },
      ]}
    />,
  );
  expect(container).toMatchSnapshot();
});
