import { act, renderHook } from '@test-utils/hook-testing';
import { useClienteContatosDialog } from './useClienteContatosDialog';
import {
  emailsList,
  enderecosList,
  telefonesList,
} from './useClienteContatosDialog.mock';

type HookType = Record<'current', ReturnType<typeof useClienteContatosDialog>>;

describe('useClienteContatosDialog', () => {
  let resultHook: HookType;

  beforeEach(() => {
    const { result } = renderHook(() =>
      useClienteContatosDialog({ emailsList, enderecosList, telefonesList }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should be able to get data from useClienteContatosDialog', () => {
    expect(resultHook.current).toMatchObject({
      tabValue: '1',
      setTabValue: expect.any(Function),
      handleOpenAdd: expect.any(Function),
      handleOpenEdit: expect.any(Function),
      handleCancel: expect.any(Function),
      openAdd: false,
      openEdit: undefined,
      telefonesList: expect.any(Array),
    });
  });

  it('should be able to set tab value', () => {
    act(() => {
      resultHook.current.setTabValue('2');
    });

    expect(resultHook.current.tabValue).toBe('2');
  });

  it('should be able to open add dialog', () => {
    act(() => {
      resultHook.current.handleOpenAdd();
    });

    expect(resultHook.current.openAdd).toBe(true);
  });

  it('should be able to open edit dialog', () => {
    act(() => {
      resultHook.current.handleOpenEdit('1');
    });

    expect(resultHook.current.openEdit).toBe('1');

    act(() => {
      resultHook.current.handleOpenEdit('2');
    });

    expect(resultHook.current.openEdit).toBe('2');
  });

  it('should be able to cancel dialog', () => {
    act(() => {
      resultHook.current.handleOpenAdd();
    });

    act(() => {
      resultHook.current.handleCancel();
    });

    expect(resultHook.current.openAdd).toBe(false);
    expect(resultHook.current.openEdit).toBe(undefined);
  });
});
