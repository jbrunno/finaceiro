import {
  Button,
  Dialog,
  DialogProps,
  Tab,
  TabContext,
  TabList,
} from '@frontend/components';
import { Add as AddIcon } from '@frontend/icons';
import { ChangeEvent } from 'react';
import { Waypoint } from 'react-waypoint';
import { NoResults } from '../../ClienteContatoCard.styles';
import { ClienteContatos } from '../../hooks/useClienteContatoCard';
import { ClienteContatosEmail } from '../ClienteContatosEmailTable/ClienteContatosEmailTable.gql';
import { ClienteContatosEndereco } from '../ClienteContatosEnderecoTable/ClienteContatosEnderecoTable.gql';
import { ClienteContatosTelefone } from '../ClienteContatosTelefoneTable/ClienteContatosTelefoneTable.gql';
import {
  TabContainer,
  TabPanelContent,
  TabPanelStyled,
} from './ClienteContatosDialog.styles';
import { ClienteContatosEmailEdit } from './components/ClienteContatosEmailEdit/ClienteContatosEmailEdit';
import { ClienteContatosEnderecoEdit } from './components/ClienteContatosEnderecoEdit/ClienteContatosEnderecoEdit';
import { ClienteContatosTelefoneEdit } from './components/ClienteContatosTelefoneEdit/ClienteContatosTelefoneEdit';
import { useClienteContatosDialog } from './hooks/useClienteContatosDialog';

export type ClienteContatosDialogProps = {
  className?: string;
  loading: boolean;
  cliente: ClienteContatos;
  lists: {
    emailsList: ClienteContatosEmail[];
    telefonesList: ClienteContatosTelefone[];
    enderecosList: ClienteContatosEndereco[];
  };
  loadMore: (target: 'emails' | 'telefones' | 'enderecos') => void;
  refetch: (target: 'emails' | 'telefones' | 'enderecos') => void;
} & Omit<DialogProps, 'children'>;

export function ClienteContatosDialog({
  cliente,
  lists,
  loadMore,
  loading,
  onClose,
  refetch,
  ...dialogProps
}: ClienteContatosDialogProps) {
  const {
    tabValue,
    setTabValue,
    handleOpenAdd,
    handleOpenEdit,
    handleCancel,
    openAdd,
    openEdit,
    emailsList,
    enderecosList,
    telefonesList,
  } = useClienteContatosDialog(lists);

  return (
    <Dialog {...dialogProps} onClose={onClose} maxWidth="xl">
      <TabContext value={tabValue}>
        <TabContainer>
          <TabList
            value={tabValue}
            aria-label="Contatos do cliente"
            onChange={(event: ChangeEvent<{}>, tabIndex: string) => {
              setTabValue(tabIndex);
              handleCancel();
            }}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Telefones" value="1" />
            <Tab label="E-mails" value="2" />
            <Tab label="Endereços" value="3" />
          </TabList>
          <Button
            size="medium"
            color="primary"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleOpenAdd}
          >
            Adicionar
          </Button>
        </TabContainer>

        <TabPanelStyled value="1">
          <TabPanelContent>
            {openAdd && (
              <ClienteContatosTelefoneEdit
                showActions
                onCancelAction={handleCancel}
                onSaved={onClose}
                refetch={refetch}
              />
            )}
            {telefonesList.length ? (
              telefonesList.map((telefone) => (
                <ClienteContatosTelefoneEdit
                  key={telefone.id}
                  showActions={openEdit === telefone.id}
                  contatoTelefone={telefone}
                  onCancelAction={handleCancel}
                  onClick={() => handleOpenEdit(telefone.id)}
                  onSaved={onClose}
                  refetch={refetch}
                />
              ))
            ) : (
              <NoResults variant="body2" color="textSecondary">
                Não há telefones cadastrados.
              </NoResults>
            )}
            {!loading && cliente.contato.telefones?.pageInfo?.hasNextPage && (
              <Waypoint
                bottomOffset="-30%"
                fireOnRapidScroll={false}
                onEnter={() => loadMore('telefones')}
              />
            )}
          </TabPanelContent>
        </TabPanelStyled>
        <TabPanelStyled value="2">
          <TabPanelContent>
            {openAdd && (
              <ClienteContatosEmailEdit
                showActions
                onCancelAction={handleCancel}
                onSaved={onClose}
                refetch={refetch}
              />
            )}
            {emailsList.length ? (
              emailsList.map((email) => (
                <ClienteContatosEmailEdit
                  key={email.id}
                  showActions={openEdit === email.id}
                  contatoEmail={email}
                  onCancelAction={handleCancel}
                  onClick={() => handleOpenEdit(email.id)}
                  onSaved={onClose}
                  refetch={refetch}
                />
              ))
            ) : (
              <NoResults variant="body2" color="textSecondary">
                Não há e-mails cadastrados.
              </NoResults>
            )}
            {!loading && cliente.contato.emails?.pageInfo?.hasNextPage && (
              <Waypoint
                bottomOffset="-30%"
                onEnter={() => loadMore('emails')}
              />
            )}
          </TabPanelContent>
        </TabPanelStyled>
        <TabPanelStyled value="3">
          <TabPanelContent>
            {openAdd && (
              <ClienteContatosEnderecoEdit
                showActions
                onCancelAction={handleCancel}
                onSaved={onClose}
                refetch={refetch}
              />
            )}
            {enderecosList.length ? (
              enderecosList.map((endereco) => (
                <ClienteContatosEnderecoEdit
                  key={endereco.id}
                  showActions={openEdit === endereco.id}
                  contatoEndereco={endereco}
                  onCancelAction={handleCancel}
                  onClick={() => handleOpenEdit(endereco.id)}
                  onSaved={onClose}
                  refetch={refetch}
                />
              ))
            ) : (
              <NoResults variant="body2" color="textSecondary">
                Não há endereços cadastrados.
              </NoResults>
            )}
            {!loading && cliente.contato.enderecos?.pageInfo?.hasNextPage && (
              <Waypoint
                bottomOffset="-30%"
                onEnter={() => loadMore('enderecos')}
              />
            )}
          </TabPanelContent>
        </TabPanelStyled>
      </TabContext>
    </Dialog>
  );
}
