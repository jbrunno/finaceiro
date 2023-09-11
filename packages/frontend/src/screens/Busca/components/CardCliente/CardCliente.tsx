import {
  CardText,
  Chip,
  Grid,
  Typography,
  CardHeaderChip,
  RenderComponents,
} from '@frontend/components';
import { formatDocument } from '@frontend/utils';
import {
  CardContentStyled,
  CardStyled,
  ChipStyled,
} from './CardCliente.styles';
import { CARD_CLIENTE_FRAGMENT, ClienteData } from './CardCliente.gql';

type CardClienteProp = {
  onClick?: () => void;
} & ClienteData;

export function CardCliente({
  nome,
  nomeSocial,
  documento,
  falecido,
  tipo,
  negativado,
  onClick,
}: CardClienteProp) {
  return (
    <CardStyled onClick={onClick}>
      <CardHeaderChip
        title={
          <Typography variant="h5" color="textPrimary">
            {nomeSocial || nome}
          </Typography>
        }
        hasDivider
        chip={
          <Grid>
            {negativado && <Chip label="Negativado" color="error" />}
            {falecido && <ChipStyled label="Falecido" />}
          </Grid>
        }
      />
      <CardContentStyled position="bottom">
        <RenderComponents screen="busca">
          <Grid marginBottom={2} w-perm="CLIENTE_NOME_REGISTRO">
            <CardText label="Nome de registro" text={nome} />
          </Grid>
          <Grid w-perm="CLIENTE_DOCUMENTO">
            <CardText
              label="CPF/CNPJ"
              text={documento ? formatDocument(documento) : '-'}
            />
          </Grid>
          <Grid w-perm="CLIENTE_DOCUMENTO_INTERNACIONAL">
            <CardText
              label="CPF/CNPJ/ID ou Passaporte"
              text={documento ? formatDocument(documento, tipo) : '-'}
            />
          </Grid>
        </RenderComponents>
      </CardContentStyled>
    </CardStyled>
  );
}

CardCliente.fragments = CARD_CLIENTE_FRAGMENT;
