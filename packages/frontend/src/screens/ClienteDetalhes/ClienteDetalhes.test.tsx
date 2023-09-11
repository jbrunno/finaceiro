import { render } from '@test-utils/component-testing';
import { ClienteDetalhes } from './ClienteDetalhes';
import {
  clienteFollowUps,
  cliente as clienteMock,
  emails,
  enderecos,
  situacoesFollowUp,
  telefones,
  titulos,
} from './hooks/useClienteDetalhes.mock';
import * as hook from './hooks/useClienteDetalhes';

jest.mock('@frontend/hooks', () => ({
  ...jest.requireActual('@frontend/hooks'),
  useObjectState: (initial: any) => [initial, jest.fn],
}));

jest.spyOn(hook, 'useClienteDetalhes').mockImplementation(() => ({
  loading: false,
  route: '/test',
  openDashboard: jest.fn,
  titulo: titulos.items[0].node,
  cliente: {
    ...clienteMock,
    contato: {
      emails,
      enderecos,
      telefones,
    },
  },
  followps: {
    items: clienteFollowUps.items.map((followUp) => followUp.node),
    situacoes: situacoesFollowUp.items.map((situacao) => situacao.node),
    setSituacoesKeyword: jest.fn,
  },
  loadMore: jest.fn,
  refetch: jest.fn,
}));

test('should render ClienteDetalhes', () => {
  const { container, rerender } = render(<ClienteDetalhes />);

  rerender(<div />);
  expect(container).toMatchSnapshot();
});
