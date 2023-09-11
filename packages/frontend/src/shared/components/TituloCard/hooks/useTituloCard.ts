import { useState } from 'react';

export const useTituloCard = () => {
  const [questionarioIsOpen, setQuestionarioAsOpen] = useState(false);
  const [tituloModalIsOpen, setTituloModalAsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addAssinaturaIsOpen, setAddAssinaturaAsOpen] =
    useState<boolean>(false);
  const [removeAssinaturaIsOpen, setRemoveAssinaturaAsOpen] =
    useState<boolean>(false);

  return {
    anchorEl,
    setAnchorEl,
    addAssinaturaIsOpen,
    setAddAssinaturaAsOpen,
    tituloModalIsOpen,
    setTituloModalAsOpen,
    questionarioIsOpen,
    setQuestionarioAsOpen,
    removeAssinaturaIsOpen,
    setRemoveAssinaturaAsOpen,
  };
};
