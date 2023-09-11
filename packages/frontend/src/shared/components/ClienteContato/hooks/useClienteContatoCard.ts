import { useObjectState } from '@frontend/hooks';
import { useEffect, useState } from 'react';
import { ClienteContatosEmail } from '../components/ClienteContatosEmailTable/ClienteContatosEmailTable.gql';
import { ClienteContatosEndereco } from '../components/ClienteContatosEnderecoTable/ClienteContatosEnderecoTable.gql';
import { ClienteContatosTelefone } from '../components/ClienteContatosTelefoneTable/ClienteContatosTelefoneTable.gql';

export type ClienteContatosAtendimento = {
  id: string;
  cliente?: { id: string } | null;
  contatoTelefone?: ClienteContatosTelefone | null;
};

type ContatoData<T> = {
  items: Array<{
    node: T;
  }>;
  pageInfo: {
    totalItems: number;
    hasNextPage: boolean;
  };
};

export type ClienteContatos = {
  id: string;
  contato: {
    telefones: ContatoData<ClienteContatosTelefone>;
    emails: ContatoData<ClienteContatosEmail>;
    enderecos: ContatoData<ClienteContatosEndereco>;
  };
};

export type UseClienteContatoCardProps = {
  atendimento?: ClienteContatosAtendimento | null;
  cliente: ClienteContatos;
};

export function useClienteContatoCard({
  cliente,
  atendimento,
}: UseClienteContatoCardProps) {
  const [tabValue, setTabValue] = useState('1');
  const [openEdit, setOpenEdit] = useState(false);

  const isClienteAtendimento = atendimento?.cliente?.id === cliente.id;
  const telefoneAtendimento =
    (isClienteAtendimento && atendimento?.contatoTelefone) || null;

  const telefoneNodes =
    cliente?.contato.telefones?.items.map((item) => item.node) || [];
  const telefonesList = telefoneAtendimento
    ? [
        telefoneAtendimento,
        ...telefoneNodes.filter(
          (telefone) => telefone.id !== telefoneAtendimento.id,
        ),
      ]
    : telefoneNodes;

  const emailsList =
    cliente?.contato.emails?.items.map((item) => item.node) || [];
  const enderecosList =
    cliente?.contato.enderecos?.items.map((item) => item.node) || [];

  return {
    tabValue,
    setTabValue,
    telefonesList,
    emailsList,
    enderecosList,
    telefoneAtendimento,
    openEdit,
    setOpenEdit,
  };
}
