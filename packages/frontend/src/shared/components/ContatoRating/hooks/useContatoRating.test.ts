import { ChangeEvent } from 'react';
import {
  CONTATO_CLASSIFICACAO,
  ContatoClassificacaoEnum,
} from '@/shared/constants';
import { renderHook, act } from '@testing-library/react-hooks';
import { useContatoRating } from './useContatoRating';

type HookType = Record<'current', ReturnType<typeof useContatoRating>>;

describe('useContatoRating', () => {
  let resultHook: HookType;
  const onChange = jest.fn();

  beforeEach(() => {
    const { result } = renderHook(() =>
      useContatoRating({ value: ContatoClassificacaoEnum.RUIM, onChange }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should be able to get data from useContatoRating', () => {
    expect(resultHook.current.internalValue).toBe(1);
  });

  it('should be able to change data from useContatoRating', () => {
    act(() => {
      resultHook.current.handleChange({} as ChangeEvent<HTMLInputElement>, 2);
    });

    expect(onChange).toBeCalledWith(ContatoClassificacaoEnum.BOM);
  });

  it('should be able to get label from useContatoRating', () => {
    expect(resultHook.current.tooltipTitle).toBe(
      CONTATO_CLASSIFICACAO[ContatoClassificacaoEnum.RUIM],
    );
  });
});
