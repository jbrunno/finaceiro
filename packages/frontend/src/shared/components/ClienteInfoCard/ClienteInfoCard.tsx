import { Edit as EditIcon } from '@frontend/icons';
import { useState } from 'react';
import {
  Button,
  CardHeaderChip,
  CardSkeleton,
  CardText,
  Dialog,
  Grid,
  RenderComponents,
  Typography,
} from '@frontend/components';
import { CLIENTE_SEXO, ContatoClassificacaoEnum } from '@/shared/constants';
import {
  DateOnly,
  formatDate,
  getAgeFromBirthdate,
  formatDocument,
} from '@frontend/utils';
import { toast } from 'react-toastify';
import { useWalletPermissions } from '@frontend/hooks';
import { parsePhoneNumber } from 'awesome-phonenumber';
import { ContatoRating } from '../ContatoRating/ContatoRating';
import {
  CardActionsStyled,
  CardContentStyled,
  CardStyled,
  ChipNegativado,
  ChipStyled,
  TelefoneTypography,
} from './ClienteInfoCard.styles';
import { ClienteEditInfo } from './components/ClienteEditInfo/ClienteEditInfo';
import { ClienteInfoData, CLIENTE_INFO_FRAGMENT } from './ClienteInfoCard.gql';

type ContatoClienteInfoData = {
  numero: string;
  classificacao: ContatoClassificacaoEnum;
};

type ClienteInfoCardProps = {
  screen: string;
  cliente?: ClienteInfoData | null;
  contato?: ContatoClienteInfoData;
  className?: string;
};

export function ClienteInfoCard({
  cliente,
  className,
  contato,
  screen,
}: ClienteInfoCardProps) {
  if (!cliente) {
    return <CardSkeleton />;
  }

  const [isModalOpen, setModalAsOpen] = useState<boolean>(false);
  const clienteDataNascimento = new DateOnly(cliente.dataNascimento);
  const clienteIdade = getAgeFromBirthdate(clienteDataNascimento);
  const { walletPermissions } = useWalletPermissions(screen);

  return (
    <>
      <CardStyled className={className}>
        <CardHeaderChip
          title={<Typography variant="h5">Informações do cliente</Typography>}
          chip={
            <>
              {cliente.falecido ? <ChipStyled label="Falecido" /> : null}
              {cliente.negativado ? (
                <ChipNegativado label="Negativado" />
              ) : null}
            </>
          }
        />
        <CardContentStyled>
          {cliente.nomeSocial &&
            walletPermissions.includes('CLIENTE_INFO_NOME_SOCIAL') && (
              <CardText label="Nome social" text={cliente.nomeSocial} />
            )}
          <RenderComponents screen={screen}>
            <CardText
              label="Nome de registro"
              w-perm="CLIENTE_INFO_NOME_REGISTRO"
              text={cliente.nome}
            />
            <CardText
              label="CPF/CNPJ"
              w-perm="CLIENTE_INFO_DOCUMENTO"
              text={cliente.documento ? formatDocument(cliente.documento) : '-'}
            />
            <CardText
              label="CPF/CNPJ/ID ou Passaporte"
              w-perm="CLIENTE_INFO_DOCUMENTO_INTERNACIONAL"
              text={
                cliente.documento
                  ? formatDocument(cliente.documento, cliente.tipo)
                  : '-'
              }
            />
          </RenderComponents>
          {clienteDataNascimento &&
            walletPermissions.includes(
              'CLIENTE_INFO_DATA_NASCIMENTO_IDADE',
            ) && (
              <CardText
                label="Nascimento - Idade"
                text={`${formatDate(
                  clienteDataNascimento,
                )} - ${clienteIdade} anos`}
              />
            )}
          {walletPermissions.includes('CLIENTE_INFO_SEXO') && (
            <CardText label="Sexo" text={CLIENTE_SEXO[cliente.sexo]} />
          )}

          {cliente?.cbo &&
            walletPermissions.includes('CLIENTE_INFO_PROFISSAO') && (
              <CardText label="Profissão" text={cliente.cbo.ocupacao} />
            )}
          {contato && walletPermissions.includes('CLIENTE_INFO_CONTATO') && (
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <CardText
                  label="Telefone de contato atual"
                  text={
                    <TelefoneTypography>
                      {parsePhoneNumber(contato.numero).number?.international}
                    </TelefoneTypography>
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <CardText
                  label="Classificação"
                  text={<ContatoRating value={contato.classificacao} />}
                />
              </Grid>
            </Grid>
          )}
        </CardContentStyled>
        <CardActionsStyled>
          {cliente && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => setModalAsOpen(true)}
            >
              Editar informações
            </Button>
          )}
        </CardActionsStyled>
      </CardStyled>
      <Dialog open={isModalOpen} onClose={() => setModalAsOpen(false)}>
        <ClienteEditInfo
          screen={screen}
          cliente={cliente}
          onSuccess={() => {
            toast.success('Informações básicas alteradas com sucesso!');
            setModalAsOpen(false);
          }}
        />
      </Dialog>
    </>
  );
}

ClienteInfoCard.fragments = CLIENTE_INFO_FRAGMENT;
