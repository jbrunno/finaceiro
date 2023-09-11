import { mockApiClient } from '@test-utils/api-testing';
import { act, renderHook } from '@test-utils/hook-testing';
import { useClienteContatosTelefoneEdit } from './useClienteContatosTelefoneEdit';
import {
  CONTATO_TELEFONE_EDIT_MUTATION,
  CONTATO_TELEFONE_INSERT_MUTATION,
} from '../ClienteContatosTelefoneEdit.gql';
import { contatoTelefone } from './useClienteContatosTelefoneEdit.mock';

type HookType = Record<
  'current',
  ReturnType<typeof useClienteContatosTelefoneEdit>
>;

mockApiClient.setRequestHandler(CONTATO_TELEFONE_EDIT_MUTATION, () =>
  Promise.resolve({ data: { contatoTelefone } }),
);

mockApiClient.setRequestHandler(CONTATO_TELEFONE_INSERT_MUTATION, () =>
  Promise.resolve({ data: { contatoTelefone } }),
);

describe('useClienteContatosTelefoneEdit', () => {
  let resultHook: HookType;
  const onSaved = jest.fn();

  beforeEach(() => {
    const { result } = renderHook(() =>
      useClienteContatosTelefoneEdit({
        onSaved,
        contatoTelefone,
        showActions: true,
        refetch: jest.fn(),
      }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should be able to get data from useClienteContatosTelefoneEdit', () => {
    const { id, ...rest } = contatoTelefone;
    expect(resultHook.current.formik.values).toMatchObject(rest);

    expect(resultHook.current.formik.isSubmitting).toBe(false);
    expect(resultHook.current.formik.submitCount).toBe(0);
    expect(resultHook.current.formik.isValid).toBe(true);
  });

  it('should be able to submit form', async () => {
    await act(async () => {
      resultHook.current.formik.handleSubmit();
    });

    expect(onSaved).toHaveBeenCalled();
  });

  it('should be formik is invalid', async () => {
    await act(async () => {
      resultHook.current.formik.setFieldValue('nome', '');
    });

    expect(resultHook.current.formik.isValid).toBe(false);
  });
});
