import { act, renderHook } from '@test-utils/hook-testing';
import { useAutocompleteOcupacao } from './useAutocompleteOcupacao';

type HookType = Record<'current', ReturnType<typeof useAutocompleteOcupacao>>;

jest.mock('@frontend/hooks', () => ({
  useLazyQuery: jest.fn().mockReturnValue([
    jest.fn(),
    {
      data: {
        cbos: {
          items: [
            {
              node: {
                id: '1',
                codigo: '123',
                ocupacao: 'Teste',
              },
            },
          ],
        },
      },
      loading: false,
    },
  ]),
}));

describe('useAutocompleteOcupacao', () => {
  let resultHook: HookType;

  const onChange = jest.fn();

  beforeEach(() => {
    const { result } = renderHook(() =>
      useAutocompleteOcupacao({
        label: 'Ocupação',
        onChange,
        initialValue: null,
      }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should be able to get data from useAutocompleteOcupacao', () => {
    expect(resultHook.current).toMatchObject({
      loading: false,
      label: 'Ocupação',
      ocupacoes: [{ id: '1', codigo: '123', ocupacao: 'Teste' }],
      value: null,
    });
  });

  it('should be able to change value', () => {
    act(() => {
      resultHook.current.handleSelectValue({
        id: '1',
        codigo: '123',
        ocupacao: 'Teste',
      });
    });
    expect(resultHook.current.value).toMatchObject({
      id: '1',
      codigo: '123',
      ocupacao: 'Teste',
    });
  });
});
