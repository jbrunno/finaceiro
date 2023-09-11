import { ReactNode, useState } from 'react';
import { DiscadorHeader } from '../DiscadorHeader/DiscadorHeader';

export function ClienteHeader({
  cliente,
  className,
  navigationBack,
  breadcrumbs,
}: ClienteHeaderProps) {
  return (
    <DiscadorHeader
      navigationBack={navigationBack}
      className={className}
      title={cliente?.nomeSocial || cliente?.nome}
      breadcrumbs={breadcrumbs}
    />
  );
}

type Cliente = {
  id: string;
  nome: string;
  nomeSocial?: string;
};

type ClienteHeaderProps = {
  cliente?: Cliente | null;
  className?: string;
  navigationBack?: () => void;
  breadcrumbs?: ReactNode;
};
