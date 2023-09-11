import { useState } from 'react';
import { ClienteContatosDialogProps } from '../ClienteContatosDialog';

export function useClienteContatosDialog({
  emailsList,
  enderecosList,
  telefonesList,
}: ClienteContatosDialogProps['lists']) {
  const [tabValue, setTabValue] = useState('1');
  const [openEdit, setOpenEdit] = useState<string>();
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
    setOpenEdit(undefined);
  };

  const handleOpenEdit = (id: string) => {
    setOpenEdit(id);
    setOpenAdd(false);
  };

  const handleCancel = () => {
    setOpenAdd(false);
    setOpenEdit(undefined);
  };

  return {
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
  };
}
