import { ChangeEvent } from 'react';
import {
  Button,
  CardHeaderChip,
  CardSkeleton,
  Tab,
  TabContext,
  TabList,
} from '@frontend/components';
import { Edit as EditIcon } from '@frontend/icons';
import { ClienteContatosTelefoneTable } from './components/ClienteContatosTelefoneTable/ClienteContatosTelefoneTable';
import { ClienteContatosEmailTable } from './components/ClienteContatosEmailTable/ClienteContatosEmailTable';
import { ClienteContatosEnderecoTable } from './components/ClienteContatosEnderecoTable/ClienteContatosEnderecoTable';
import {
  useClienteContatoCard,
  UseClienteContatoCardProps,
} from './hooks/useClienteContatoCard';
import {
  CardActionsStyled,
  CardStyled,
  NoResults,
  TabPanelStyled,
} from './ClienteContatoCard.styles';
import { ClienteContatosDialog } from './components/ClienteContatosDialog/ClienteContatosDialog';

type ClienteContatoCardProps = Omit<UseClienteContatoCardProps, 'cliente'> & {
  className?: string;
  cliente?: UseClienteContatoCardProps['cliente'];
  loading: boolean;
  loadMore: (target: 'emails' | 'telefones' | 'enderecos') => void;
  refetch: (target: 'emails' | 'telefones' | 'enderecos') => void;
};

export function ClienteContatoCard({
  atendimento,
  cliente,
  className,
  loadMore,
  refetch,
  loading,
}: ClienteContatoCardProps) {
  if (!cliente) {
    return <CardSkeleton />;
  }

  const {
    tabValue,
    setTabValue,
    telefonesList,
    telefoneAtendimento,
    emailsList,
    enderecosList,
    openEdit,
    setOpenEdit,
  } = useClienteContatoCard({
    atendimento,
    cliente,
  });

  return (
    <CardStyled className={className}>
      <CardHeaderChip title="Informações de contato" />
      <TabContext value={tabValue}>
        <TabList
          value={tabValue}
          aria-label="Contatos do cliente"
          onChange={(event: ChangeEvent<{}>, tabIndex: string) => {
            setTabValue(tabIndex);
          }}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Telefones" value="1" />
          <Tab label="E-mails" value="2" />
          <Tab label="Endereços" value="3" />
        </TabList>

        <TabPanelStyled value="1">
          {telefonesList.length ? (
            <ClienteContatosTelefoneTable
              selectedId={telefoneAtendimento?.id}
              telefones={telefonesList}
            />
          ) : (
            <NoResults variant="body2" color="textSecondary">
              Não há telefones cadastrados.
            </NoResults>
          )}
        </TabPanelStyled>
        <TabPanelStyled value="2">
          {emailsList.length ? (
            <ClienteContatosEmailTable emails={emailsList} />
          ) : (
            <NoResults variant="body2" color="textSecondary">
              Não há e-mails cadastrados.
            </NoResults>
          )}
        </TabPanelStyled>
        <TabPanelStyled value="3">
          {enderecosList.length ? (
            <ClienteContatosEnderecoTable enderecos={enderecosList} />
          ) : (
            <NoResults variant="body2" color="textSecondary">
              Não há endereços cadastrados.
            </NoResults>
          )}
        </TabPanelStyled>
      </TabContext>

      {cliente && (
        <CardActionsStyled>
          <Button
            color="primary"
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setOpenEdit(true)}
          >
            Editar contato
          </Button>
        </CardActionsStyled>
      )}
      <ClienteContatosDialog
        cliente={cliente}
        loading={loading}
        lists={{ emailsList, telefonesList, enderecosList }}
        loadMore={loadMore}
        refetch={refetch}
        title="Informações de contato"
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />
    </CardStyled>
  );
}
