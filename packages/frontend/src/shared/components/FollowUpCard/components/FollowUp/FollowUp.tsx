import {
  Timeline,
  TimelineConnector,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  Typography,
} from '@frontend/components';
import { timelineItemClasses } from '@mui/lab';
import { formatDateWithHours } from '@frontend/utils';
import {
  GridStyled,
  TimelineContentStyled,
  TypographyStyled,
} from './FollowUp.styles';
import { ClienteFollowUps } from '../../FollowUpCard.gql';

type FollowUpProps = {
  items: ClienteFollowUps[] | undefined;
};

export function FollowUp({ items }: FollowUpProps) {
  return (
    <GridStyled>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          padding: 0,
        }}
      >
        {items?.map((item) => (
          <TimelineItem key={Math.random().toString()}>
            <TimelineSeparator>
              <TimelineDot color="secondary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContentStyled>
              <Typography variant="caption" color="textPrimary">
                {formatDateWithHours(new Date(item.dataRegistro))}
              </Typography>
              <TypographyStyled variant="subtitle1" color="textPrimary">
                {item.situacao.nome}
              </TypographyStyled>

              <Typography variant="caption" color="textPrimary">
                Nome do Operador
              </Typography>
              <TypographyStyled color="textPrimary">
                {item.usuario.nome}
              </TypographyStyled>

              <Typography variant="caption" color="textPrimary">
                Descrição
              </Typography>
              <TypographyStyled color="textPrimary">
                {item.descricao}
              </TypographyStyled>
            </TimelineContentStyled>
          </TimelineItem>
        ))}
      </Timeline>
    </GridStyled>
  );
}
