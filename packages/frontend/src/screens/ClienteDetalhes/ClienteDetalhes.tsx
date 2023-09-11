import { ClienteContatoCard } from '@/shared/components/ClienteContato/ClienteContatoCard';
import { ClienteInfoCard } from '@/shared/components/ClienteInfoCard/ClienteInfoCard';
import { ClienteHeader } from '@/shared/components/Headers/ClienteHeader/ClienteHeader';
import {
  Breadcrumbs,
  Link,
  RenderComponents,
  Typography,
} from '@frontend/components';
import { Content, Widgets, WidgetsColumn } from '@frontend/styles';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { TituloCard } from '@/shared/components/TituloCard/TituloCard';
import { FollowUpCard } from '@/shared/components/FollowUpCard/FollowUpCard';
import { useClienteDetalhes } from './hooks/useClienteDetalhes';

export function ClienteDetalhes() {
  const {
    cliente,
    titulo,
    followps,
    loading,
    loadMore,
    refetch,
    route,
    openDashboard,
  } = useClienteDetalhes();

  const atendimento = {
    id: '1',
    cliente: {
      id: cliente?.id || '1',
    },
    contatoTelefone: undefined,
  };

  return (
    <Content>
      <ClienteHeader
        cliente={cliente}
        navigationBack={openDashboard}
        breadcrumbs={
          <Breadcrumbs separator={<NavigateNextIcon />}>
            <Link variant="body1" color="textSecondary" href={route}>
              Dashboard
            </Link>
            <Typography variant="body1" color="textPrimary">
              Perfil do cliente
            </Typography>
          </Breadcrumbs>
        }
      />
      <Widgets>
        <WidgetsColumn
          sx={{
            gridColumn: '1 / 5',
          }}
        >
          <RenderComponents screen="clienteDetalhes">
            <ClienteInfoCard
              screen="clienteDetalhes"
              cliente={cliente}
              contato={atendimento.contatoTelefone}
              perm="CLIENTE_INFO_CARD"
            />
            <ClienteContatoCard
              loading={loading}
              loadMore={loadMore}
              refetch={refetch}
              cliente={cliente}
              atendimento={atendimento}
              perm="CLIENTE_CONTATO_CARD"
            />
          </RenderComponents>
        </WidgetsColumn>
        <WidgetsColumn
          sx={{
            gridColumn: '5 / 9',
          }}
        >
          <RenderComponents screen="clienteDetalhes">
            <TituloCard
              screen="clienteDetalhes"
              perm="CLIENTE_TITULO_CARD"
              loading={loading}
              assinatura={titulo?.assinatura}
              refetch={refetch}
              titulo={titulo}
            />
            <FollowUpCard
              tituloId={titulo?.id}
              followps={followps}
              perm="CLIENTE_HISTORICO_CARD"
            />
          </RenderComponents>
        </WidgetsColumn>
      </Widgets>
    </Content>
  );
}
