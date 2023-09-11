import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import * as config from '@/config';
import { cache } from '@/cache';
import { useGlobalServices } from '@frontend/hooks';
import { CLIENTE, BUSCA, DASHBOARD } from './routes';
import { DashboardRouter } from './routers/dashboard/DashboardRouter';
import { BuscaRouter } from './routers/busca/BuscaRouter';
import { ClienteRouter } from './routers/cliente/ClienteRouter';
import { PageWrapper } from './components/PageWrapper/PageWrapper';

export function AppRouter() {
  const { configService, cacheService } = useGlobalServices();

  useEffect(() => {
    configService.send({ type: 'CHANGE_CONFIG', config });
    cacheService.send({ type: 'SET_CACHE', cache });
  }, [configService]);

  return (
    <Routes>
      <Route path="*" element={<PageWrapper />}>
        <Route path={`${DASHBOARD}/*`} element={<DashboardRouter />} />
        <Route path={`${BUSCA}/*`} element={<BuscaRouter />} />
        <Route path={`${CLIENTE}/*`} element={<ClienteRouter />} />
        <Route path="*" element={<Navigate to={DASHBOARD} replace />} />
      </Route>
    </Routes>
  );
}
