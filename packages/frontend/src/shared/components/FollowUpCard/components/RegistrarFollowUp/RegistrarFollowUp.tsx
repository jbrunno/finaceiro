import React, { Dispatch, SetStateAction } from 'react';
import { Button, TextField, Typography } from '@frontend/components';
import { AutocompleteSituacaoFollowUp } from '@/shared/components/AutocompleteSituacaoFollowUp/AutocompleteSituacaoFollowUp';
import { FormFields, useRegistarFollowUp } from './hooks/useRegistrarFollowUp';
import { StyledForm } from './RegistrarFollowUp.styles';
import { SituacoesFollowUp } from '../../FollowUpCard.gql';

export type RegistrarFollowUpProps = {
  tituloId?: string;
  situacoes: SituacoesFollowUp[] | undefined;
  setSituacoesKeyword: Dispatch<SetStateAction<string | undefined>>;
};

export function RegistrarFollowUp({
  tituloId,
  setSituacoesKeyword,
  situacoes,
}: RegistrarFollowUpProps) {
  const { formik, situacao } = useRegistarFollowUp(tituloId);

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <Typography variant="subtitle1">Registrar Follow</Typography>
      <AutocompleteSituacaoFollowUp
        label="Situação do Follow-up"
        initialValue={situacao}
        filterSituacoes={setSituacoesKeyword}
        situacoes={situacoes && situacoes.sort((a, b) => a.codigo - b.codigo)}
        onChange={(value) => {
          formik.handleChange(FormFields.situacao)(value?.id || '');
        }}
      />
      <TextField
        id="descricaoFollow"
        label="Descreva o Follow-up"
        variant="outlined"
        size="small"
        value={formik.values[FormFields.descricao]}
        onChange={formik.handleChange(FormFields.descricao)}
        errorText={formik.errors[FormFields.descricao]}
        isTouched={formik.touched[FormFields.descricao]}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={!formik.values[FormFields.situacao]}
      >
        Registrar Follow
      </Button>
    </StyledForm>
  );
}
