import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';
import { render } from '@test-utils/component-testing';
import { faker } from '@faker-js/faker';
import { ClienteContatosEnderecoEdit } from './ClienteContatosEnderecoEdit';

test('should render ClienteContatosEnderecoEdit', () => {
  const { container } = render(
    <ClienteContatosEnderecoEdit
      onCancelAction={() => {}}
      showActions
      refetch={jest.fn}
      contatoEndereco={{
        id: 'teste',
        nome: 'teste',
        classificacao: ContatoClassificacaoEnum.EXCELENTE,
        marcador: ContatoMarcadorEnum.AVOS,
        logradouro: 'TV Alberto ristori',
        bairro: 'Jardim das flores',
        cidade: 'São Paulo',
        uf: 'SP',
        cep: '12345678',
        numero: '123',
        complemento: 'casa',
        pais: {
          id: faker.datatype.uuid(),
          descricao: 'Brasil',
        },
      }}
    />,
  );
  expect(container).toMatchSnapshot();
});
