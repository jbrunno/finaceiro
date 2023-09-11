import {
  Typography,
  Dialog,
  DialogProps,
  CardText,
  Box,
} from '@frontend/components';
import {
  Header,
  DialogContentStyled,
  CopiarDetalhes,
  CopyToClipboardButtonStyled,
} from './TituloQuestionarioDialog.styles';
import { TituloQuestionario } from '../TituloCard/TituloCard.gql';

type TituloQuestionarioDialogProps = {
  className?: string;
  tituloQuestionario: TituloQuestionario;
} & Omit<DialogProps, 'children'>;

export function TituloQuestionarioDialog({
  tituloQuestionario,
  ...dialogProps
}: TituloQuestionarioDialogProps) {
  return (
    <Dialog {...dialogProps} maxWidth="xl">
      <DialogContentStyled>
        <Header>
          <Typography variant="h3" color="textPrimary">
            Detalhes do título
          </Typography>
        </Header>
        <Box>
          <CopiarDetalhes>
            <CardText
              label="Site FTX de registro"
              text={tituloQuestionario.siteRegistro}
            />
            <CopyToClipboardButtonStyled
              tooltip="Copiar detalhes"
              text={tituloQuestionario.siteRegistro || ''}
              showNotification
              textToast="Informações copiadas para a área de transferência."
            />
          </CopiarDetalhes>
          <CopiarDetalhes>
            <CardText
              label="Conta anterior a data 11/11/2022"
              text={tituloQuestionario.contaAnteriorFalencia ? 'Sim' : 'Não'}
            />
            <CopyToClipboardButtonStyled
              tooltip="Copiar detalhes"
              text={tituloQuestionario.contaAnteriorFalencia ? 'Sim' : 'Não'}
              showNotification
              textToast="Informações copiadas para a área de transferência."
            />
          </CopiarDetalhes>
          <CopiarDetalhes>
            <CardText
              label="Tipo de conta"
              text={tituloQuestionario.tipoConta}
            />
            <CopyToClipboardButtonStyled
              tooltip="Copiar detalhes"
              text={tituloQuestionario.tipoConta || ''}
              showNotification
              textToast="Informações copiadas para a área de transferência."
            />
          </CopiarDetalhes>
          <CopiarDetalhes>
            <CardText
              label="Tipo de ativos utilizados"
              text={tituloQuestionario.tipoAtivoInvestido}
            />
            <CopyToClipboardButtonStyled
              tooltip="Copiar detalhes"
              text={tituloQuestionario.tipoAtivoInvestido || ''}
              showNotification
              textToast="Informações copiadas para a área de transferência."
            />
          </CopiarDetalhes>
          <CopiarDetalhes>
            <CardText
              label="Valor aproximado dos depósitos"
              text={tituloQuestionario.valorDepositos}
            />
            <CopyToClipboardButtonStyled
              tooltip="Copiar detalhes"
              text={tituloQuestionario.valorDepositos || ''}
              showNotification
              textToast="Informações copiadas para a área de transferência."
            />
          </CopiarDetalhes>
          <CopiarDetalhes>
            <CardText
              label="Informações adicionais"
              text={
                <Typography variant="body2">
                  {tituloQuestionario.observacao}
                </Typography>
              }
            />
            <CopyToClipboardButtonStyled
              tooltip="Copiar detalhes"
              text={tituloQuestionario.observacao || ''}
              showNotification
              textToast="Informações copiadas para a área de transferência."
            />
          </CopiarDetalhes>
        </Box>
      </DialogContentStyled>
    </Dialog>
  );
}
