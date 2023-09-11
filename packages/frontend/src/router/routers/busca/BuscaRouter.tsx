import { Route, Routes } from 'react-router-dom';
import { Busca } from '@/screens/Busca/Busca';
import { routing } from '@frontend/helpers';
import {
  checkAuthenticationUserMiddleware,
  checkScreenPermissionsMiddleware,
} from '@frontend/middlewares';

const BuscaRouting = routing(Busca, {
  suspense: false,
  middlewares: [
    checkAuthenticationUserMiddleware('/login'),
    checkScreenPermissionsMiddleware('busca', '/operacao'),
  ],
});

export function BuscaRouter() {
  return (
    <Routes>
      <Route path="/" element={<BuscaRouting />} />
    </Routes>
  );
}
