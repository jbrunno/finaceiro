import { ContatoRating } from '@/shared/components/ContatoRating/ContatoRating';
import { CONTATO_MARCADOR } from '@/shared/constants';
import {
  CardText,
  CopyToClipboardButton,
  Grid,
  Table,
  ToastContainer,
  Typography,
} from '@frontend/components';
import {
  PhoneIphone as PhoneIphoneIcon,
  WhatsApp as WhatsAppIcon,
} from '@frontend/icons';
import { useTheme } from '@frontend/styles';
import { parsePhoneNumber } from 'awesome-phonenumber';
import {
  CLIENTE_CONTATO_TELEFONE_FRAGMENT,
  ClienteContatosTelefone,
} from './ClienteContatosTelefoneTable.gql';
import {
  TableCellStyled,
  TableCellTelefone,
} from './ClienteContatosTelefoneTable.styles';

type ClienteContatosTelefoneTableProps = {
  selectedId?: string | null;
  telefones: Array<ClienteContatosTelefone>;
  className?: string;
};

export function ClienteContatosTelefoneTable({
  selectedId,
  telefones,
  className,
}: ClienteContatosTelefoneTableProps) {
  return (
    <Table
      bodyData={telefones.filter((_, inx) => inx < 5)}
      className={className}
    >
      {(telefone) => (
        <ClienteContatosTelefoneBody
          selectedId={selectedId}
          telefone={telefone}
        />
      )}
    </Table>
  );
}

function ClienteContatosTelefoneBody({
  selectedId,
  telefone,
}: {
  selectedId?: string | null;
  telefone: ClienteContatosTelefone;
}) {
  const color = selectedId === telefone.id ? 'info' : undefined;
  const theme = useTheme();
  return (
    <>
      <TableCellStyled color={color}>
        <CardText
          label={telefone.marcador ? CONTATO_MARCADOR[telefone.marcador] : ''}
          text={telefone.nome}
        />
      </TableCellStyled>
      <TableCellTelefone color={color}>
        <Typography variant="subtitle2" color="primary">
          {parsePhoneNumber(telefone.numero).number?.international}
        </Typography>
        <Grid container direction="row" alignItems="center" gap={0.5}>
          <CopyToClipboardButton
            tooltip="Copiar telefone"
            text={telefone.numero}
            showNotification
            textToast="Telefone copiado para a área de transferência."
          />
          <ToastContainer />
          <ContatoRating value={telefone.classificacao} readOnly />
        </Grid>
      </TableCellTelefone>
      <TableCellStyled color={color}>
        {telefone.whatsapp ? (
          <WhatsAppIcon htmlColor={color && theme.palette[color].dark} />
        ) : (
          <PhoneIphoneIcon htmlColor={color && theme.palette[color].dark} />
        )}
      </TableCellStyled>
    </>
  );
}

ClienteContatosTelefoneTable.fragments = CLIENTE_CONTATO_TELEFONE_FRAGMENT;
