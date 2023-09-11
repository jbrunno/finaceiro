import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';
import { render } from '@test-utils/component-testing';
import { ClienteContatosEmailEdit } from './ClienteContatosEmailEdit';

test('should render ClienteContatosEmailEdit', () => {
  const { container } = render(
    <ClienteContatosEmailEdit
      onCancelAction={() => {}}
      showActions
      refetch={jest.fn}
      contatoEmail={{
        id: '2',
        classificacao: ContatoClassificacaoEnum.BOM,
        nome: 'teste',
        email: 'teste@teste.com',
        marcador: ContatoMarcadorEnum.PAI,
      }}
    />,
  );
  expect(container).toMatchSnapshot();
});
