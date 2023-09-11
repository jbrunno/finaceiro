import { Dashboard } from '@/screens/Dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom';
import { routing } from '@frontend/helpers';
import {
  checkAuthenticationUserMiddleware,
  checkScreenPermissionsMiddleware,
} from '@frontend/middlewares';

const DashboardRouting = routing(Dashboard, {
  suspense: false,
  middlewares: [
    checkAuthenticationUserMiddleware('/login'),
    checkScreenPermissionsMiddleware('dashboard', '/operacao'),
  ],
});

export function DashboardRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardRouting />} />
      <Route path="/:id" element={<DashboardRouting />} />
    </Routes>
  );
}
