import { Navigate, Route, Routes } from 'react-router-dom';
import { BUSCA } from '@/router/routes';
import { ClienteDetalhes } from '@/screens/ClienteDetalhes/ClienteDetalhes';
import { routing } from '@frontend/helpers';
import {
  checkAuthenticationUserMiddleware,
  checkScreenPermissionsMiddleware,
} from '@frontend/core/dist/middlewares';
import { CLIENTE_DETALHES_ID } from './routes';

const ClienteDetalhesRouting = routing(ClienteDetalhes, {
  suspense: false,
  middlewares: [
    checkAuthenticationUserMiddleware('/login'),
    checkScreenPermissionsMiddleware('clienteDetalhes', '/operacao'),
  ],
});

export function ClienteRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/operacao/${BUSCA}`} />} />
      <Route path={CLIENTE_DETALHES_ID} element={<ClienteDetalhesRouting />} />
    </Routes>
  );
}
