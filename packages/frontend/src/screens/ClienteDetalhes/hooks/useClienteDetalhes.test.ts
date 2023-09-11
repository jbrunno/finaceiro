import { mockApiClient } from '@test-utils/api-testing';
import { renderHook } from '@test-utils/hook-testing';
import {
  CLIENTE_CONTATO_EMAILS_QUERY,
  CLIENTE_CONTATO_ENDERECOS_QUERY,
  CLIENTE_CONTATO_TELEFONES_QUERY,
  CLIENTE_DETALHES_QUERY,
  CLIENTE_FOLLOWUPS_QUERY,
  CLIENTE_TITULOS_QUERY,
  SITUACOES_FOLLOWUP_QUERY,
} from '../ClienteDetalhes.gql';
import { useClienteDetalhes } from './useClienteDetalhes';
import {
  cliente,
  clienteFollowUps,
  emails,
  enderecos,
  situacoesFollowUp,
  telefones,
  titulos,
} from './useClienteDetalhes.mock';

jest.mock('@frontend/hooks', () => ({
  ...jest.requireActual('@frontend/hooks'),
  useObjectState: (initial: any) => [initial, jest.fn],
  useRoute: () => ({ open: () => {}, route: '/test' }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [new URLSearchParams({ clienteId: '' })],
}));

mockApiClient.setRequestHandler(CLIENTE_DETALHES_QUERY, () =>
  Promise.resolve({ data: { cliente } }),
);
mockApiClient.setRequestHandler(CLIENTE_TITULOS_QUERY, () =>
  Promise.resolve({ data: { titulos } }),
);

mockApiClient.setRequestHandler(CLIENTE_CONTATO_EMAILS_QUERY, () =>
  Promise.resolve({ data: { emails } }),
);

mockApiClient.setRequestHandler(CLIENTE_CONTATO_ENDERECOS_QUERY, () =>
  Promise.resolve({ data: { enderecos } }),
);

mockApiClient.setRequestHandler(CLIENTE_CONTATO_TELEFONES_QUERY, () =>
  Promise.resolve({ data: { telefones } }),
);

mockApiClient.setRequestHandler(CLIENTE_FOLLOWUPS_QUERY, () =>
  Promise.resolve({ data: { followUps: clienteFollowUps } }),
);

mockApiClient.setRequestHandler(SITUACOES_FOLLOWUP_QUERY, () =>
  Promise.resolve({ data: { situacoesFollowUp } }),
);

type HookType = Record<'current', ReturnType<typeof useClienteDetalhes>>;

describe('useBusca', () => {
  let resultHook: HookType;

  beforeEach(() => {
    const { result } = renderHook(() => useClienteDetalhes());
    resultHook = result;
  });

  it('test useClienteDetalhes hook return', () => {
    expect(resultHook.current.cliente).toEqual({
      ...cliente,
      contato: {
        emails: undefined,
        enderecos: undefined,
        telefones: undefined,
      },
    });
    expect(resultHook.current.followps).toMatchObject({
      items: clienteFollowUps.items.map((followUp) => followUp.node),
      situacoes: situacoesFollowUp.items.map((situacao) => situacao.node),
    });
    expect(resultHook.current.titulo).toEqual(titulos.items[0].node);
  });
});
