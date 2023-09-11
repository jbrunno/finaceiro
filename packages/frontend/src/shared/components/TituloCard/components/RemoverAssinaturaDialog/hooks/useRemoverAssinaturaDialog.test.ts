import { act, renderHook } from '@test-utils/hook-testing';
import { mockApiClient } from '@test-utils/api-testing';
import {
  FormFields,
  useRemoverAssinaturaDialog,
} from './useRemoverAssinaturaDialog';
import { tituloId } from './useRemoverAssinaturaDialog.mock';
import { EDITAR_ASSINATURA_DIALOG_MUTATION } from '../RemoverAssinaturaDialog.gql';

type HookType = Record<
  'current',
  ReturnType<typeof useRemoverAssinaturaDialog>
>;

mockApiClient.setRequestHandler(EDITAR_ASSINATURA_DIALOG_MUTATION, () =>
  Promise.resolve({ data: { id: tituloId } }),
);

let resultHook: HookType;
const onClose = jest.fn();

describe('useRemoverAssinaturaDialog', () => {
  beforeEach(() => {
    const { result } = renderHook(() =>
      useRemoverAssinaturaDialog({ onClose, tituloId, refetch: jest.fn() }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should be able to get data from useRemoverAssinaturaDialog', () => {
    const values = {
      [FormFields.motivo]: '',
      [FormFields.usuarioSupervisor]: '',
      [FormFields.senhaSupervisor]: '',
    };
    expect(resultHook.current.formik.values).toMatchObject(values);
    expect(resultHook.current.isDisableSubmit).toBeTruthy();
    expect(resultHook.current.isMotivoError).toBeFalsy();
    expect(resultHook.current.isUsuarioSupervisorError).toBeFalsy();
    expect(resultHook.current.isSenhaSupervisorError).toBeFalsy();
  });

  it('should be able to get functions from useRemoverAssinaturaDialog', () => {
    act(() => resultHook.current.handleClose());

    expect(onClose).toHaveBeenCalled();
  });

  it('should be able to submit form', async () => {
    act(() => resultHook.current.formik.handleSubmit());

    expect(onClose).toHaveBeenCalled();
  });
});
