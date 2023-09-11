import { cliente } from '../../../hooks/useClienteContatoCard.mock';

export const clienteMock = cliente;

export const emailsList = cliente?.contato.emails?.items.map(
  (item) => item.node,
);
export const enderecosList = cliente?.contato.enderecos?.items.map(
  (item) => item.node,
);
export const telefonesList = cliente?.contato.telefones?.items.map(
  (item) => item.node,
);
