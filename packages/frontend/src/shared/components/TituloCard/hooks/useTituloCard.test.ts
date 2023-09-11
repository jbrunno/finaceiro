import { act, renderHook } from '@test-utils/hook-testing';
import { useTituloCard } from './useTituloCard';

type HookType = Record<'current', ReturnType<typeof useTituloCard>>;

let resultHook: HookType;

describe('useTituloCard', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useTituloCard());
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should be able to get data from useTituloCard', () => {
    expect(resultHook.current.anchorEl).toBeNull();
    expect(resultHook.current.addAssinaturaIsOpen).toBeFalsy();
    expect(resultHook.current.removeAssinaturaIsOpen).toBeFalsy();
    expect(resultHook.current.tituloModalIsOpen).toBeFalsy();
    expect(resultHook.current.questionarioIsOpen).toBeFalsy();
  });

  it('should be able to get functions from useTituloCard', () => {
    act(() => resultHook.current.setAddAssinaturaAsOpen(true));
    expect(resultHook.current.addAssinaturaIsOpen).toBeTruthy();
    act(() => resultHook.current.setAddAssinaturaAsOpen(false));
    expect(resultHook.current.addAssinaturaIsOpen).toBeFalsy();

    act(() => resultHook.current.setRemoveAssinaturaAsOpen(true));
    expect(resultHook.current.removeAssinaturaIsOpen).toBeTruthy();
    act(() => resultHook.current.setRemoveAssinaturaAsOpen(false));
    expect(resultHook.current.removeAssinaturaIsOpen).toBeFalsy();

    act(() => resultHook.current.setQuestionarioAsOpen(true));
    expect(resultHook.current.questionarioIsOpen).toBeTruthy();
    act(() => resultHook.current.setQuestionarioAsOpen(false));
    expect(resultHook.current.questionarioIsOpen).toBeFalsy();

    act(() => resultHook.current.setTituloModalAsOpen(true));
    expect(resultHook.current.tituloModalIsOpen).toBeTruthy();
    act(() => resultHook.current.setTituloModalAsOpen(false));
    expect(resultHook.current.tituloModalIsOpen).toBeFalsy();

    act(() => resultHook.current.setAnchorEl({} as HTMLButtonElement));
    expect(resultHook.current.anchorEl).toBeDefined();
    act(() => resultHook.current.setAnchorEl(null));
    expect(resultHook.current.anchorEl).toBeNull();
  });
});
