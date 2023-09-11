import { mockApiClient } from '@test-utils/api-testing';
import { act, renderHook } from '@test-utils/hook-testing';
import { useClienteContatosEnderecoEdit } from './useClienteContatosEnderecoEdit';
import {
  CONTATO_ENDERECO_EDIT_MUTATION,
  CONTATO_ENDERECO_INSERT_MUTATION,
  CONTATO_ENDERECO_PAISES_QUERY,
} from '../ClienteContatosEnderecoEdit.gql';
import { contatoEndereco, paises } from './useClienteContatosEnderecoEdit.mock';

type HookType = Record<
  'current',
  ReturnType<typeof useClienteContatosEnderecoEdit>
>;

mockApiClient.setRequestHandler(CONTATO_ENDERECO_EDIT_MUTATION, () =>
  Promise.resolve({ data: { contatoEndereco } }),
);

mockApiClient.setRequestHandler(CONTATO_ENDERECO_PAISES_QUERY, () =>
  Promise.resolve({ data: { paises } }),
);

mockApiClient.setRequestHandler(CONTATO_ENDERECO_INSERT_MUTATION, () =>
  Promise.resolve({ data: { contatoEndereco } }),
);

describe('useClienteContatosEnderecoEdit', () => {
  let resultHook: HookType;
  const onSaved = jest.fn();

  beforeEach(() => {
    const { result } = renderHook(() =>
      useClienteContatosEnderecoEdit({
        onSaved,
        contatoEndereco,
        showActions: true,
        refetch: jest.fn(),
      }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should be able to get data from useClienteContatosEnderecoEdit', () => {
    const { id, ...rest } = contatoEndereco;
    expect(resultHook.current.formik.values).toMatchObject({
      ...rest,
      pais: rest.pais.id,
    });

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
