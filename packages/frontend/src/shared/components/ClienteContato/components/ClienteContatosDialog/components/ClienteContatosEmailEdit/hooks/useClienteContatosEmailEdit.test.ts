import { act, renderHook } from '@test-utils/hook-testing';
import { mockApiClient } from '@test-utils/api-testing';
import { useClienteContatosEmailEdit } from './useClienteContatosEmailEdit';
import {
  CONTATO_EMAIL_EDIT_MUTATION,
  CONTATO_EMAIL_INSERT_MUTATION,
} from '../ClienteContatosEmailEdit.gql';
import { contatoEmail } from './useClienteContatosEmailEdit.mock';

type HookType = Record<
  'current',
  ReturnType<typeof useClienteContatosEmailEdit>
>;

mockApiClient.setRequestHandler(CONTATO_EMAIL_EDIT_MUTATION, () =>
  Promise.resolve({ data: { contatoEmail } }),
);

mockApiClient.setRequestHandler(CONTATO_EMAIL_INSERT_MUTATION, () =>
  Promise.resolve({ data: { contatoEmail } }),
);

describe('useClienteContatosEmailEdit', () => {
  let resultHook: HookType;
  const onSaved = jest.fn();

  beforeEach(() => {
    const { result } = renderHook(() =>
      useClienteContatosEmailEdit({
        onSaved,
        contatoEmail,
        showActions: true,
        refetch: jest.fn(),
      }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should be able to get data from useClienteContatosEmailEdit', () => {
    const { id, ...rest } = contatoEmail;
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
