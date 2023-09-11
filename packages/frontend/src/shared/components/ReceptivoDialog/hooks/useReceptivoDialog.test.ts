import { act, renderHook } from '@test-utils/hook-testing';
import { mockApiClient } from '@test-utils/api-testing';
import { useReceptivoDialog } from './useReceptivoDialog';
import { CLIENTE_INSERT_MUTATION } from '../ReceptivoDialog.gql';
import { mockClienteId } from './useReceptivoDialog.mock';

type HookType = Record<'current', ReturnType<typeof useReceptivoDialog>>;

jest.mock('@frontend/hooks', () => ({
  ...jest.requireActual('@frontend/hooks'),
  useObjectState: (initial: any) => [initial, jest.fn],
}));

mockApiClient.setRequestHandler(CLIENTE_INSERT_MUTATION, () =>
  Promise.resolve({ data: mockClienteId }),
);

describe('useReceptivoDialog', () => {
  let resultHook: HookType;
  const onSaved = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    const { result } = renderHook(() =>
      useReceptivoDialog({
        onSaved,
        onClose,
      }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should be able to get data from useReceptivoDialog', () => {
    expect(resultHook.current).toMatchObject({
      formik: expect.any(Object),
      loading: false,
    });
  });

  it('should be able to submit form', async () => {
    resultHook.current.formik.setFieldValue('nome', 'Test Formik');
    resultHook.current.formik.setFieldValue('telefone', '199999999');
    await act(async () => {
      resultHook.current.formik.handleSubmit();
    });

    expect(onSaved).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should be formik is invalid', async () => {
    await act(async () => {
      resultHook.current.formik.setFieldValue('nome', '');
    });

    expect(resultHook.current.formik.isValid).toBe(false);
  });
});
