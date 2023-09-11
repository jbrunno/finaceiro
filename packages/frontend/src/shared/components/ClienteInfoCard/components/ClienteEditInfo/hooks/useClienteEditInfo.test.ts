import { ClienteSexoEnum, ClienteTipoEnum } from '@/shared/constants';
import { renderHook } from '@test-utils/hook-testing';
import { useClienteEditInfo } from './useClienteEditInfo';

type HookType = Record<'current', ReturnType<typeof useClienteEditInfo>>;

const dataMock = new Date('2021-01-01T00:00:00.000Z').toISOString();

const mockCliente = {
  id: 'teste',
  nome: 'teste',
  nomeSocial: 'teste',
  documento: '11122233344',
  sexo: ClienteSexoEnum.FEMININO,
  dataNascimento: dataMock,
  cbo: {
    id: 'teste',
    codigo: 'teste',
    ocupacao: 'teste',
  },
  falecido: false,
  negativado: false,
  tipo: ClienteTipoEnum.ESTRANGEIRA,
};

describe('useClienteEditInfo', () => {
  let resultHook: HookType;
  const onSuccess = jest.fn();

  beforeEach(() => {
    const { result } = renderHook(() =>
      useClienteEditInfo({
        onSuccess,
        cliente: mockCliente,
      }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });
});
