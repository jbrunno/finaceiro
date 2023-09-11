import { useNavigate } from 'react-router';
import { Waypoint } from 'react-waypoint';
import { PageHeader, RenderComponent, Typography } from '@frontend/components';
import { useGeneratePath } from '@frontend/hooks';
import { emptyState, emptyStateSearch } from '@frontend/icons';
import { Content } from '@frontend/styles';
import { CLIENTE_DETALHES } from '@/router/routes';
import {
  ContentWithoutItems,
  GridStyled,
  LinkCard,
  WidgetsStyled,
} from './Busca.styles';
import { CardCliente } from './components/CardCliente/CardCliente';
import { ClienteSearchSkeleton } from './components/ClienteSearchSkeleton/ClienteSearchSkeleton';
import { useBusca } from './hooks/useBusca';

export function Busca() {
  const { data, loading, loadMore, searchParam } = useBusca();

  const clientes = data?.clientes.items.map(({ node }) => node) || [];
  const pageInfo = data?.clientes.pageInfo;

  const navigate = useNavigate();
  const generatePath = useGeneratePath(CLIENTE_DETALHES);

  return (
    <Content>
      <PageHeader
        title={searchParam ? 'Resultado da busca' : 'Busca'}
        navigationBack={() => navigate(-1)}
      >
        {!!pageInfo?.totalItems && (
          <GridStyled container>
            <Typography variant="subtitle2" color="textSecondary">
              {pageInfo?.totalItems} itens encontrados
            </Typography>
          </GridStyled>
        )}
      </PageHeader>
      <WidgetsStyled>
        {loading && clientes.length === 0 && (
          <ClienteSearchSkeleton cards={4} />
        )}
        {data && (
          <>
            {clientes.map((cliente) => (
              <RenderComponent screen="busca">
                <LinkCard
                  key={cliente.id}
                  perm="BUSCA_CLIENTE_CARD"
                  to={generatePath({ clienteId: cliente.id })}
                >
                  <CardCliente {...cliente} />
                </LinkCard>
              </RenderComponent>
            ))}
            {!loading && pageInfo?.hasNextPage && (
              <Waypoint bottomOffset="-30%" onEnter={loadMore} />
            )}
          </>
        )}
        {!searchParam && (
          <ContentWithoutItems>
            <img src={emptyStateSearch} alt="Inicie uma busca" />
            <Typography variant="h3">Inicie uma busca</Typography>
            <Typography variant="h4" color="textSecondary">
              Pesquise por (CPF, título ou nome)
            </Typography>
          </ContentWithoutItems>
        )}
        {searchParam && clientes && !clientes.length && (
          <ContentWithoutItems>
            <img
              src={emptyState}
              alt={`Nenhum item encontrado para ${searchParam}`}
            />
            <Typography variant="h3">Nenhum item encontrado para</Typography>
            <Typography variant="h4" color="textSecondary">
              &quot;{searchParam}&quot;
            </Typography>
          </ContentWithoutItems>
        )}
      </WidgetsStyled>
    </Content>
  );
}
