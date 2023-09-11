import { Fragment } from 'react';
import {
  CardText,
  CopyToClipboardButton,
  Grid,
  Table,
  TableCell,
  ToastContainer,
  Typography,
} from '@frontend/components';
import { ContatoRating } from '@/shared/components/ContatoRating/ContatoRating';
import { CONTATO_MARCADOR } from '@/shared/constants';
import {
  ClienteContatosEndereco,
  CLIENTE_CONTATO_ENDERECO_FRAGMENT,
} from './ClienteContatosEnderecoTable.gql';

type ClienteContatosEnderecoTableProps = {
  enderecos: Array<ClienteContatosEndereco>;
};

export function ClienteContatosEnderecoTable({
  enderecos,
}: ClienteContatosEnderecoTableProps) {
  return (
    <Table bodyData={enderecos.filter((_, inx) => inx < 5)}>
      {(endereco) => (
        <Fragment key={endereco.id}>
          <TableCell>
            <CardText
              label={
                endereco.marcador ? CONTATO_MARCADOR[endereco.marcador] : ''
              }
              text={endereco.nome}
            />
          </TableCell>
          <TableCell>
            <Typography variant="subtitle2" color="primary">
              {endereco.logradouro}, {endereco.numero}
            </Typography>
            <Typography variant="subtitle2" color="primary">
              {endereco.bairro}
            </Typography>
            <Typography variant="subtitle2" color="primary">
              {endereco.cidade}, {endereco.uf}
            </Typography>
            <Typography variant="subtitle2" color="primary">
              {endereco.cep}
            </Typography>
            <Typography variant="subtitle2" color="primary">
              {endereco.pais.descricao}
            </Typography>
            <Grid container direction="row" alignItems="center" gap={0.5}>
              <CopyToClipboardButton
                tooltip="Copiar endereço"
                text={`${endereco.logradouro}, ${endereco.numero} ${endereco.bairro} ${endereco.cidade} - ${endereco.uf} - ${endereco.cep} ${endereco.pais.descricao}`}
                showNotification
                textToast="Endereço copiado para a área de transferência."
              />
              <ToastContainer />
              <ContatoRating value={endereco.classificacao} />
            </Grid>
          </TableCell>
        </Fragment>
      )}
    </Table>
  );
}

ClienteContatosEnderecoTable.fragments = CLIENTE_CONTATO_ENDERECO_FRAGMENT;
