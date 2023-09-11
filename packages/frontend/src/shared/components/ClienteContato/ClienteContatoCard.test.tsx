import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';
import { render } from '@test-utils/component-testing';
import { ClienteContatoCard } from './ClienteContatoCard';
import { cliente } from './hooks/useClienteContatoCard.mock';

jest.mock('@frontend/hooks', () => ({
  ...jest.requireActual('@frontend/hooks'),
  useObjectState: (initial: any) => [initial, jest.fn],
}));

test('should render ClienteContatoCard', () => {
  const atendimento = {
    id: '1',
    cliente: {
      id: '1',
    },
    contatoTelefone: {
      id: '1',
      classificacao: ContatoClassificacaoEnum.EXCELENTE,
      nome: 'teste',
      numero: '92993979292',
      whatsapp: true,
      marcador: ContatoMarcadorEnum.FILHO,
    },
  };
  const { container } = render(
    <ClienteContatoCard
      cliente={cliente}
      loadMore={jest.fn}
      refetch={jest.fn}
      loading={false}
      atendimento={atendimento}
    />,
  );

  container.querySelectorAll('button').forEach((button) => {
    button.removeAttribute('id');
    button.removeAttribute('aria-controls');
  });

  container.querySelectorAll('div').forEach((div) => {
    div.removeAttribute('id');
    div.removeAttribute('aria-labelledby');
  });

  expect(container).toMatchSnapshot();
});
