import {
  Sidebar as SidebarBase,
  SidebarMenu,
  SidebarMenuItemType,
} from '@frontend/components';
import {
  Dashboard as DashboardIcon,
  Headphones as HeadphoneIcon,
} from '@frontend/icons';
import { DASHBOARD } from '@/router/routes';
import { useSidebar } from './hooks/useSidebar';
import { ReceptivoDialog } from '../ReceptivoDialog/ReceptivoDialog';

export function Sidebar() {
  const {
    actions: { handleMatch, handleRoute, openDialog, setOpenDialog },
  } = useSidebar();

  const items: SidebarMenuItemType[] = [
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
      handle: handleRoute(DASHBOARD).open,
      match: !!handleMatch(DASHBOARD),
    },
    {
      label: 'Cadastrar cliente',
      icon: <HeadphoneIcon />,
      handle: () => {
        setOpenDialog(true);
      },
      match: !!handleMatch(DASHBOARD),
    },
  ];

  return (
    <>
      <ReceptivoDialog onClose={() => setOpenDialog(false)} open={openDialog} />
      <SidebarBase>
        {({ isExpanded }) => (
          <SidebarMenu items={items} isExpanded={isExpanded} />
        )}
      </SidebarBase>
    </>
  );
}
