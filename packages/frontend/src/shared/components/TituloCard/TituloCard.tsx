import {
  Button,
  CardHeader,
  CardSkeleton,
  CardText,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  RenderComponent,
  RenderComponents,
  Typography,
} from '@frontend/components';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { TituloDialog } from '../TituloDialog/TituloDialog';
import { TituloQuestionarioDialog } from '../TituloQuestionarioDialog/TituloQuestionarioDialog';
import { CLIENTE_TITULO_FRAGMENT, TituloQuestionario } from './TituloCard.gql';
import {
  CardActionsStyled,
  CardContentStyled,
  CardStyled,
} from './TituloCard.styles';
import { AdicionarAssinaturaDialog } from './components/AdicionarAssinaturaDialog/AdicionarAssinaturaDialog';
import { RemoverAssinaturaDialog } from './components/RemoverAssinaturaDialog/RemoverAssinaturaDialog';
import { useTituloCard } from './hooks/useTituloCard';

type TituloData = {
  screen: string;
  titulo: {
    id?: string | null;
    tituloQuestionario?: TituloQuestionario;
  } | null;
  loading: boolean;
  assinatura?: boolean;
};

type TituloCardProps = Omit<TituloData, 'tituloId' | 'tituloQuestionario'> & {
  className?: string;
  loading: boolean;
  refetch: (target: 'titulos') => void;
};

export function TituloCard({
  screen,
  titulo,
  className,
  assinatura,
  refetch,
  loading,
}: TituloCardProps) {
  if (loading) return <CardSkeleton />;

  const { id: tituloId, tituloQuestionario } = titulo || {};

  const {
    anchorEl,
    setAnchorEl,
    addAssinaturaIsOpen,
    setAddAssinaturaAsOpen,
    setTituloModalAsOpen,
    tituloModalIsOpen,
    setQuestionarioAsOpen,
    questionarioIsOpen,
    removeAssinaturaIsOpen,
    setRemoveAssinaturaAsOpen,
  } = useTituloCard();

  return (
    <>
      <CardStyled className={className}>
        <CardHeader
          title={
            <Grid
              container
              alignItems="start"
              justifyContent="space-between"
              px={1}
            >
              <Typography variant="h5">Informações do título</Typography>
              {assinatura && <Chip label="Assinado" />}
            </Grid>
          }
          action={
            <>
              <RenderComponent screen={screen}>
                <IconButton
                  id="signature-button"
                  aria-controls={anchorEl ? 'signature-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorEl ? 'true' : undefined}
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                  size="small"
                  w-perm="TITULO_ASSINATURA"
                  disabled={!titulo}
                >
                  <MoreVertIcon />
                </IconButton>
              </RenderComponent>
              <Menu
                id="signature-menu"
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  'aria-labelledby': 'signature-button',
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    return !assinatura
                      ? setAddAssinaturaAsOpen(true)
                      : setRemoveAssinaturaAsOpen(true);
                  }}
                >
                  {!assinatura ? 'Adicionar assinatura' : 'Remover assinatura'}
                </MenuItem>
              </Menu>
            </>
          }
        />
        <CardContentStyled>
          <CardText
            label="Tipo de conta"
            text={tituloQuestionario?.tipoConta || '-'}
          />
          <CardText
            label="Tipo de ativos utilizados"
            text={tituloQuestionario?.tipoAtivoInvestido || '-'}
          />
          <CardText
            label="Valor aproximado dos depósitos"
            text={tituloQuestionario?.valorDepositos || '-'}
          />
        </CardContentStyled>
        <CardActionsStyled>
          <Button
            disabled={!tituloQuestionario}
            variant="outlined"
            color="primary"
            onClick={() => setQuestionarioAsOpen(true)}
          >
            Ver detalhes
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setTituloModalAsOpen(true)}
          >
            {tituloQuestionario ? 'Editar dados' : 'Cadastrar'}
          </Button>
        </CardActionsStyled>
      </CardStyled>
      {tituloQuestionario && (
        <TituloQuestionarioDialog
          open={questionarioIsOpen}
          onClose={() => setQuestionarioAsOpen(false)}
          tituloQuestionario={tituloQuestionario}
        />
      )}
      <TituloDialog
        open={tituloModalIsOpen}
        onSaved={() => setTituloModalAsOpen(false)}
        onClose={() => setTituloModalAsOpen(false)}
        tituloId={tituloId}
        tituloQuestionario={tituloQuestionario || null}
      />
      <RenderComponents screen={screen}>
        <AdicionarAssinaturaDialog
          open={addAssinaturaIsOpen}
          onClose={() => setAddAssinaturaAsOpen(false)}
          tituloId={tituloId}
          w-perm="TITULO_ADICIONAR_ASSINATURA"
        />
        <RemoverAssinaturaDialog
          tituloId={String(tituloId)}
          refetch={refetch}
          open={removeAssinaturaIsOpen}
          onClose={() => setRemoveAssinaturaAsOpen(false)}
          w-perm="TITULO_REMOVER_ASSINATURA"
        />
      </RenderComponents>
    </>
  );
}

TituloCard.fragments = CLIENTE_TITULO_FRAGMENT;
