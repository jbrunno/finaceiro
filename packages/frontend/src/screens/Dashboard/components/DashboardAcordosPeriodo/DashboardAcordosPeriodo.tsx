import {
  Tooltip,
  Typography,
  TextField,
  MenuItem,
  CardDashboardSkeleton,
  Box,
} from '@frontend/components';
import { PeriodsEnum } from '@frontend/types';
import { HelpOutline as HelpOutlineIcon } from '@frontend/icons';
import { crmPeriods, formatCurrency } from '@frontend/utils';
import { DASHBOARD_ACORDOS_PERIODO_FRAGMENT } from './DashboardAcordosPeriodo.gql';
import {
  CardColAcordoInfos,
  AcordosInfoBox,
  AcordosInfo,
  CardColAcordoProgressInfos,
  AcordoProgressInfos,
  ProgressContentStyled,
  LinearProgresStyled,
  ProgressNumber,
  CardStyled,
  CardContentStyled,
  CardHeaderChipStyled,
} from './DashboardAcordosPeriodo.styles';
import {
  useDashboardAcordosPeriodo,
  UseDashboardAcordosPeriodoProps,
} from './hooks/useDashboardAcordosPeriodo';

type DashboardAcordosPeriodoProps = {
  className?: string;
} & UseDashboardAcordosPeriodoProps;

export const DashboardAcordosPeriodoInitialState = {
  data: crmPeriods(PeriodsEnum.THISMONTH).toISOString(),
};

export function DashboardAcordosPeriodo({
  producaoAcordosSintetizado,
  className,
  onChangePeriod,
}: DashboardAcordosPeriodoProps) {
  const {
    period,
    periods,
    acordosInfoProgressTotal,
    acordosInfoProgress,
    handleChange,
  } = useDashboardAcordosPeriodo({
    producaoAcordosSintetizado,
    onChangePeriod,
  });

  return (
    <Box className={className}>
      <CardHeaderChipStyled
        title="Produção"
        subTitle={
          <Typography variant="subtitle2" color="textSecondary">
            (Acordos)
          </Typography>
        }
        hasDivider={false}
        chipWithTitle
        chip={
          <Tooltip title="Produção: Referente aos seus acordos" arrow>
            <HelpOutlineIcon />
          </Tooltip>
        }
      />
      <CardStyled>
        {producaoAcordosSintetizado ? (
          <CardContentStyled>
            <CardColAcordoInfos>
              <TextField
                select
                style={{
                  gridColumn: 'span 12',
                }}
                label="Período"
                value={period}
                onChange={handleChange}
                variant="outlined"
                size="small"
              >
                {periods.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <AcordosInfoBox
                style={{
                  gridColumn: 'span 12',
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Total de acordos no período
                </Typography>

                {producaoAcordosSintetizado.acordosEPromessasDePagamento > 0 ? (
                  <AcordosInfo>
                    <Typography variant="h3">
                      {producaoAcordosSintetizado.acordosEPromessasDePagamento}
                    </Typography>
                    <Typography variant="subtitle2">acordos</Typography>
                  </AcordosInfo>
                ) : (
                  <Typography variant="subtitle1">Nenhum acordo</Typography>
                )}
              </AcordosInfoBox>

              <AcordosInfoBox
                style={{
                  gridColumn: 'span 6',
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Valor gerado no período
                </Typography>

                <AcordosInfo>
                  <Typography variant="subtitle1">R$</Typography>
                  <Typography variant="h3">
                    {formatCurrency(
                      producaoAcordosSintetizado.valorTotalAcordosGerados,
                    )}
                  </Typography>
                </AcordosInfo>
              </AcordosInfoBox>

              <AcordosInfoBox
                style={{
                  gridColumn: 'span 6',
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Valor pago no período
                </Typography>

                <AcordosInfo>
                  <Typography variant="subtitle1">R$</Typography>
                  <Typography variant="h3">
                    {formatCurrency(
                      producaoAcordosSintetizado.valorTotalAcordosPagos,
                    )}
                  </Typography>
                </AcordosInfo>
              </AcordosInfoBox>
            </CardColAcordoInfos>

            <CardColAcordoProgressInfos>
              {acordosInfoProgress.map((info) => {
                const percent = (100 * info.qty) / acordosInfoProgressTotal;
                return (
                  <AcordoProgressInfos key={JSON.stringify(info)}>
                    <Typography variant="body1" color="textSecondary">
                      {info.title}
                    </Typography>
                    <ProgressContentStyled>
                      <LinearProgresStyled
                        color="info"
                        variant="determinate"
                        value={percent || 0}
                      />
                      <ProgressNumber
                        className={percent >= 10 ? 'active' : ''}
                        variant="subtitle2"
                      >
                        {info.qty}
                      </ProgressNumber>
                    </ProgressContentStyled>
                  </AcordoProgressInfos>
                );
              })}
            </CardColAcordoProgressInfos>
          </CardContentStyled>
        ) : (
          <CardDashboardSkeleton />
        )}
      </CardStyled>
    </Box>
  );
}

DashboardAcordosPeriodo.fragments = DASHBOARD_ACORDOS_PERIODO_FRAGMENT;
