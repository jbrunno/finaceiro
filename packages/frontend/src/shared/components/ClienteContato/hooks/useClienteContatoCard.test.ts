import { act, renderHook } from '@test-utils/hook-testing';
import { useClienteContatoCard } from './useClienteContatoCard';
import { cliente } from './useClienteContatoCard.mock';

type HookType = Record<'current', ReturnType<typeof useClienteContatoCard>>;

jest.mock('@frontend/hooks', () => ({
  ...jest.requireActual('@frontend/hooks'),
  useObjectState: (initial: any) => [initial, jest.fn],
}));

describe('useClienteContatoCard', () => {
  let resultHook: HookType;

  beforeEach(() => {
    const { result } = renderHook(() =>
      useClienteContatoCard({
        cliente,
      }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should be able to get data from useClienteContatoCard', () => {
    expect(resultHook.current).toMatchObject({
      tabValue: '1',
      setTabValue: expect.any(Function),
      telefonesList: [cliente.contato.telefones.items.at(0)?.node],
      telefoneAtendimento: null,
      emailsList: [cliente.contato.emails.items.at(0)?.node],
      enderecosList: [cliente.contato.enderecos.items.at(0)?.node],
    });
  });

  it('should be able to change tab value', () => {
    act(() => {
      resultHook.current.setTabValue('2');
    });
    expect(resultHook.current.tabValue).toBe('2');
  });
});
