import { Fragment } from 'react';
import {
  CardText,
  CopyToClipboardButton,
  Grid,
  Table,
  ToastContainer,
  Tooltip,
  Typography,
} from '@frontend/components';
import { ContatoRating } from '@/shared/components/ContatoRating/ContatoRating';
import { CONTATO_MARCADOR } from '@/shared/constants';
import { TableCellStyle } from './ClienteContatosEmailTable.styles';
import {
  ClienteContatosEmail,
  CLIENTE_CONTATO_EMAIL_FRAGMENT,
} from './ClienteContatosEmailTable.gql';

type ClienteContatosEmailTableProps = {
  emails: Array<ClienteContatosEmail>;
  className?: string;
};

export function ClienteContatosEmailTable({
  emails,
  className,
}: ClienteContatosEmailTableProps) {
  return (
    <Table className={className} bodyData={emails.filter((_, inx) => inx < 5)}>
      {(email) => (
        <Fragment key={email.id}>
          <TableCellStyle>
            <CardText
              label={email.marcador ? CONTATO_MARCADOR[email.marcador] : ''}
              text={email.nome}
            />
          </TableCellStyle>
          <TableCellStyle>
            <Tooltip title={email.email} arrow placement="left">
              <Typography variant="subtitle2" color="primary">
                {email.email}
              </Typography>
            </Tooltip>
            <Grid container direction="row" alignItems="center" gap={0.5}>
              <CopyToClipboardButton
                tooltip="Copiar e-mail"
                text={email.email}
                showNotification
                textToast="E-mail copiado para a área de transferência."
              />
              <ToastContainer />
              <ContatoRating value={email.classificacao} readOnly />
            </Grid>
          </TableCellStyle>
        </Fragment>
      )}
    </Table>
  );
}

ClienteContatosEmailTable.fragments = CLIENTE_CONTATO_EMAIL_FRAGMENT;
