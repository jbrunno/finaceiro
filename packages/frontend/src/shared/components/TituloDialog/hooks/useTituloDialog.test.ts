import { mockApiClient } from '@test-utils/api-testing';
import { act, renderHook } from '@test-utils/hook-testing';
import {
  TITULO_EDIT_MUTATION,
  TITULO_INSERT_MUTATION,
} from '../TituloDialog.gql';
import { useTituloDialog } from './useTituloDialog';
import { tituloQuestionario, tituloId } from './useTituloDialog.mock';

type HookType = Record<'current', ReturnType<typeof useTituloDialog>>;

jest.mock('@frontend/hooks', () => ({
  ...jest.requireActual('@frontend/hooks'),
  useObjectState: (initial: any) => [initial, jest.fn],
}));

mockApiClient.setRequestHandler(TITULO_INSERT_MUTATION, () =>
  Promise.resolve({ data: { tituloQuestionario } }),
);

mockApiClient.setRequestHandler(TITULO_EDIT_MUTATION, () =>
  Promise.resolve({ data: { tituloQuestionario } }),
);

describe('useTituloDialog', () => {
  let resultHook: HookType;
  const onSaved = jest.fn();

  beforeEach(() => {
    const { result } = renderHook(() =>
      useTituloDialog({
        onSaved,
        tituloId,
        tituloQuestionario,
      }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should be able to get data from useTituloDialog', () => {
    expect(resultHook.current).toMatchObject({
      formik: expect.any(Object),
    });
  });

  it('should be able to submit form', async () => {
    resultHook.current.formik.setFieldValue(
      'siteFtx',
      tituloQuestionario.siteRegistro,
    );
    resultHook.current.formik.setFieldValue(
      'contaDigital',
      tituloQuestionario.contaAnteriorFalencia,
    );
    resultHook.current.formik.setFieldValue(
      'tipoConta',
      tituloQuestionario.tipoConta,
    );
    resultHook.current.formik.setFieldValue(
      'tipoAtivo',
      tituloQuestionario.tipoAtivoInvestido,
    );
    resultHook.current.formik.setFieldValue(
      'valorAproximado',
      tituloQuestionario.valorDepositos,
    );
    resultHook.current.formik.setFieldValue(
      'descricao',
      tituloQuestionario.observacao,
    );
    await act(async () => {
      resultHook.current.formik.handleSubmit();
    });

    expect(onSaved).toHaveBeenCalled();
  });

  it('should be formik is invalid', async () => {
    await act(async () => {
      resultHook.current.formik.setFieldValue('siteRegistro', '');
    });

    expect(resultHook.current.formik.isValid).toBe(false);
  });
});
