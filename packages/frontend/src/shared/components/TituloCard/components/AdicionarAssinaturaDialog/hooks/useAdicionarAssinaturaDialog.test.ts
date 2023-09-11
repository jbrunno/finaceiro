import { act, renderHook } from '@test-utils/hook-testing';
import { mockApiClient } from '@test-utils/api-testing';
import {
  FormFields,
  useAdicionarAssinaturaDialog,
} from './useAdicionarAssinaturaDialog';
import { TITULO_ASSINATURA_MUTATION } from '../AdicionarAssinaturaDialog.gql';
import {
  mockLoginUser,
  mockTituloId,
} from './useAdicionarAssinaturaDialog.mock';

type HookType = Record<
  'current',
  ReturnType<typeof useAdicionarAssinaturaDialog>
>;

let resultHook: HookType;
const onClose = jest.fn();

mockApiClient.setRequestHandler(TITULO_ASSINATURA_MUTATION, () =>
  Promise.resolve({ data: { id: mockTituloId } }),
);

describe('useAdicionarAssinaturaDialog', () => {
  beforeEach(() => {
    const { result } = renderHook(() =>
      useAdicionarAssinaturaDialog({ onClose, tituloId: mockTituloId }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should be able to get data from useAdicionarAssinaturaDialog', () => {
    const values = {
      [FormFields.usuario]: '',
      [FormFields.senha]: '',
    };
    expect(resultHook.current.formik.values).toMatchObject(values);
  });

  it('should be able to get functions from useAdicionarAssinaturaDialog', () => {
    act(() => resultHook.current.handleClose());

    expect(onClose).toHaveBeenCalled();
  });

  it('should be able to submit form', async () => {
    resultHook.current.formik.setFieldValue('usuario', mockLoginUser.usuario);
    resultHook.current.formik.setFieldValue('senha', mockLoginUser.senha);
    await act(async () => {
      resultHook.current.formik.handleSubmit();
    });

    expect(onClose).toHaveBeenCalled();
  });
});
