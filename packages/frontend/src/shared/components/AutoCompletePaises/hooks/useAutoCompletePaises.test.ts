import { act, renderHook } from '@testing-library/react';
import { useAutoCompletePaises } from './useAutoCompletePaises';

type HookType = Record<'current', ReturnType<typeof useAutoCompletePaises>>;
describe('useAutoCompletePais', () => {
  let resultHook: HookType;

  const onChange = jest.fn();

  beforeEach(() => {
    const { result } = renderHook(() =>
      useAutoCompletePaises({
        onChange,
      }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should be able to get data from useAutoCompletePais', () => {
    expect(resultHook.current).toMatchObject({
      value: null,
    });
  });

  it('should be able to change value', () => {
    act(() => {
      resultHook.current.handleSelectValue({
        id: '1',
        descricao: 'Brasil',
      });
    });
    expect(resultHook.current.value).toMatchObject({
      id: '1',
      descricao: 'Brasil',
    });
  });
});
