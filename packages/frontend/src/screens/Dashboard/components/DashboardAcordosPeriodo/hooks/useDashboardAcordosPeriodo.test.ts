import { renderHook, act } from '@test-utils/hook-testing';
import { ChangeEvent } from 'react';
import { PeriodsEnum } from '@frontend/types';
import { crmPeriods } from '@frontend/utils';
import { useDashboardAcordosPeriodo } from './useDashboardAcordosPeriodo';

type HookType = Record<
  'current',
  ReturnType<typeof useDashboardAcordosPeriodo>
>;

const mockProducaoAcordosPorPeriodo = {
  acordosEPromessasDePagamento: 10,
  valorTotalAcordosGerados: 1000,
  valorTotalAcordosPagos: 500,
  quantidadeAcordosPagos: 5,
  quantidadeAcordosQuebrados: 2,
  quantidadeParcelasAVencer: 3,
};

const onChangePeriodMock = jest.fn();

const periods = [
  {
    label: 'Hoje',
    value: crmPeriods(PeriodsEnum.TODAY).toISOString(),
  },
  {
    label: 'Dia anterior',
    value: crmPeriods(PeriodsEnum.YESTERDAY).toISOString(),
  },
  {
    label: 'Últimos 7 dias',
    value: crmPeriods(PeriodsEnum.LAST7DAYS).toISOString(),
  },
  {
    label: 'Últimos 15 dias',
    value: crmPeriods(PeriodsEnum.LAST15DAYS).toISOString(),
  },
  {
    label: 'Mês atual (até hoje)',
    value: crmPeriods(PeriodsEnum.THISMONTH).toISOString(),
  },
  {
    label: 'Mês anterior',
    value: crmPeriods(PeriodsEnum.LASTMONTH).toISOString(),
  },
  {
    label: 'Últimos 6 meses',
    value: crmPeriods(PeriodsEnum.LAST6MONTHS).toISOString(),
  },
];

describe('useDashboardAcordosPeriodo', () => {
  let resultHook: HookType;

  beforeEach(() => {
    const { result } = renderHook(() =>
      useDashboardAcordosPeriodo({
        producaoAcordosSintetizado: mockProducaoAcordosPorPeriodo,
        onChangePeriod: onChangePeriodMock,
      }),
    );
    resultHook = result;
  });

  it('should be defined', () => {
    expect(resultHook.current).toBeDefined();
  });

  it('should have correct initial state', () => {
    expect(resultHook.current.period).toEqual(periods[4].value);
  });

  it('should update period on handleChange', () => {
    act(() => {
      resultHook.current.handleChange({
        target: { value: periods[0].value },
      } as ChangeEvent<HTMLInputElement>);
    });
    expect(resultHook.current.period).toEqual(periods[0].value);
  });

  it('should call onChangePeriod on handleChange', () => {
    act(() => {
      resultHook.current.handleChange({
        target: { value: periods[0].value },
      } as ChangeEvent<HTMLInputElement>);
    });
    expect(onChangePeriodMock).toHaveBeenCalledWith(periods[0].value);
  });

  it('should have correct acordosInfoProgressTotal', () => {
    expect(resultHook.current.acordosInfoProgressTotal).toEqual(
      mockProducaoAcordosPorPeriodo.quantidadeAcordosPagos +
        mockProducaoAcordosPorPeriodo.quantidadeAcordosQuebrados +
        mockProducaoAcordosPorPeriodo.quantidadeParcelasAVencer,
    );
  });
});
