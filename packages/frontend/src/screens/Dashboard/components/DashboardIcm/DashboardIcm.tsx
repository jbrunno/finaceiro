import React from 'react';
import {
  Box,
  CardDashboardSkeleton,
  Tooltip,
  Typography,
} from '@frontend/components';
import { HelpOutline as HelpOutlineIcon } from '@frontend/icons';
import { formatCurrencyWithUnitPrefix } from '@frontend/utils';
import {
  CardContentStyled,
  CardHeaderChipStyled,
  CardStyled,
  DashboardText,
  StyledDashboardBox,
  StyledDashboardIconBox,
  TrendingUpIcon,
} from './DashboardIcm.styles';
import { DASHBOARD_ICM_FRAGMENT, IcmData } from './DashboardIcm.gql';

type DashboardIcmProps = {
  className?: string;
  icm?: IcmData | null;
};

export function DashboardIcm({ className, icm }: DashboardIcmProps) {
  return (
    <Box className={className}>
      <CardHeaderChipStyled
        title="ICM"
        hasDivider={false}
        chipWithTitle
        chip={
          <Tooltip title="ICM: Indice Cumprimento de Meta" arrow>
            <HelpOutlineIcon />
          </Tooltip>
        }
      />
      <CardStyled>
        {icm ? (
          <CardContentStyled>
            <StyledDashboardIconBox>
              <>
                <DashboardText>
                  <TrendingUpIcon color="info" />
                </DashboardText>
                <DashboardText>
                  <Typography variant="h3">
                    {`${icm?.porcentagemTotal}%`}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    ICM
                  </Typography>
                </DashboardText>
              </>
            </StyledDashboardIconBox>

            <StyledDashboardBox>
              <DashboardText>
                <Typography variant="h3">
                  {`${icm?.porcentagemEntrada}%`}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Entrada / À Vista
                </Typography>
                <Typography variant="body2">
                  {formatCurrencyWithUnitPrefix(icm.valorEntrada)}
                </Typography>
              </DashboardText>
            </StyledDashboardBox>

            <StyledDashboardBox>
              <DashboardText>
                <Typography variant="h3">
                  {formatCurrencyWithUnitPrefix(icm.valorParcelasPagas)}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Parcelas pagas
                </Typography>
                <Typography variant="body2">
                  {`Eficiência de ${icm.porcentagemParcelasPagas}%`}
                </Typography>
              </DashboardText>
            </StyledDashboardBox>
          </CardContentStyled>
        ) : (
          <CardDashboardSkeleton />
        )}
      </CardStyled>
    </Box>
  );
}

DashboardIcm.fragments = DASHBOARD_ICM_FRAGMENT;
