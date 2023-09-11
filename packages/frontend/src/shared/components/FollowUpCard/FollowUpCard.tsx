import { Card, CardHeaderChip, Tabs } from '@frontend/components';
import { Dispatch, SetStateAction, useState } from 'react';
import { Typography } from '@mui/material';
import { FollowUp } from './components/FollowUp/FollowUp';
import { RegistrarFollowUp } from './components/RegistrarFollowUp/RegistrarFollowUp';
import { Wrapper } from './FollowUpCard.styles';
import {
  CLIENTE_FOLLOWUPS_FRAGMENT,
  ClienteFollowUps,
  SITUACOES_FOLLOWUPS_FRAGMENT,
  SituacoesFollowUp,
} from './FollowUpCard.gql';

type FollowUpCardProps = {
  tituloId?: string;
  followps: {
    items: ClienteFollowUps[] | undefined;
    situacoes: SituacoesFollowUp[] | undefined;
    setSituacoesKeyword: Dispatch<SetStateAction<string | undefined>>;
  };
};

export function FollowUpCard({ followps, tituloId }: FollowUpCardProps) {
  const [tabValue, setTabValue] = useState('1');

  return (
    <Card>
      <CardHeaderChip title="Histórico" />
      <Tabs
        value={tabValue}
        aria-label="Histórico"
        handleChange={(tabIndex) => {
          setTabValue(tabIndex);
        }}
        tabNames={{ '1': 'Follow up', '2': 'Preventivos' }}
      >
        <Wrapper>
          <RegistrarFollowUp
            tituloId={tituloId}
            situacoes={followps.situacoes}
            setSituacoesKeyword={followps.setSituacoesKeyword}
          />
          <FollowUp items={followps.items} />
        </Wrapper>
        <Typography variant="subtitle2">Em desenvolvimento</Typography>
      </Tabs>
    </Card>
  );
}

FollowUpCard.fragments = {
  ...CLIENTE_FOLLOWUPS_FRAGMENT,
  ...SITUACOES_FOLLOWUPS_FRAGMENT,
};
