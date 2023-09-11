import { ContatoClassificacaoEnum } from '@/shared/constants';
import { render } from '@test-utils/component-testing';
import { ClienteContatosEmailTable } from './ClienteContatosEmailTable';

test('should render ClienteContatosEmailTable', () => {
  const { container } = render(
    <ClienteContatosEmailTable
      emails={[
        {
          id: '1',
          nome: 'Teste',
          marcador: null,
          classificacao: ContatoClassificacaoEnum.BOM,
          email: 'test@test.com',
        },
      ]}
    />,
  );
  expect(container).toMatchSnapshot();
});
