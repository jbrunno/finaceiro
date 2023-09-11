import { useRoute } from '@frontend/hooks';
import { useState } from 'react';
import { useMatch } from 'react-router';

export const useSidebar = () => {
  const handleMatch = (path: string) => useMatch({ path, end: false });
  const handleRoute = (path: string) => useRoute(path);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return {
    actions: {
      handleMatch,
      handleRoute,
      setOpenDialog,
      openDialog,
    },
  };
};
