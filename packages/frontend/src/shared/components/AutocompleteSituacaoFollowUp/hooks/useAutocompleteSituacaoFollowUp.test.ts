import { act, renderHook } from '@test-utils/hook-testing';
import { useAutocompleteSituacaoFollowUp } from './useAutocompleteSituacaoFollowUp';

type HookType = Record<
  'current',
  ReturnType<typeof useAutocompleteSituacaoFollowUp>
>;

describe('useAutocompleteSituacaoFollowUp', () => {
  let resultHook: HookType;

  const onChange = jest.fn();

  beforeEach(() => {
    const { result } = renderHook(() =>
      useAutocompleteSituacaoFollowUp({
        onChange,
      }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should be able to change value', () => {
    act(() => {
      resultHook.current.handleSelectValue({
        id: '010ee4fc-e8de-4fe9-94e9-b843c1593d24',
        codigo: 1,
        nome: 'Test',
        descricaoObrigatoria: false,
        textoPadrao: 'Test',
        tempoTrava: 0,
      });
    });

    expect(resultHook.current.value).toMatchObject({
      id: '010ee4fc-e8de-4fe9-94e9-b843c1593d24',
      codigo: 1,
      nome: 'Test',
      descricaoObrigatoria: false,
      textoPadrao: 'Test',
      tempoTrava: 0,
    });
  });

  it('should be able to clear value', () => {
    act(() => {
      resultHook.current.handleClear();
    });

    expect(resultHook.current.value).toBe(null);
  });
});
