import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
  REGISTRAR_FOLLOWPUP_MUTATION,
  RegistrarClienteFollowUpData,
  RegistrarClienteFollowUpInput,
} from '../RegistrarFollowUp.gql';
import { SituacoesFollowUp } from '../../../FollowUpCard.gql';

export enum FormFields {
  situacao = 'situacaoFollowUpId',
  descricao = 'descricao',
}

export const useRegistarFollowUp = (tituloId?: string) => {
  const { clienteId } = useParams();
  const [situacao, setSituacao] = useState<
    SituacoesFollowUp | undefined | null
  >();

  const [registrarFollowUp] = useMutation<
    RegistrarClienteFollowUpData,
    { input: RegistrarClienteFollowUpInput }
  >(REGISTRAR_FOLLOWPUP_MUTATION, {
    refetchQueries: ['FollowUps'],
  });

  const validationShape = {
    [FormFields.situacao]: yup.string().required(),
    [FormFields.descricao]: yup.string(),
  };

  const formSchema = yup.object().shape(validationShape);

  const formik = useFormik({
    initialValues: {
      [FormFields.situacao]: '',
      [FormFields.descricao]: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      registrarFollowUp({
        variables: {
          input: {
            tituloId: String(tituloId),
            clienteId: String(clienteId),
            ...values,
          },
        },
      })
        .then(() => {
          formik.resetForm();
          setSituacao(null);
          toast.success('Follow registrado com sucesso!');
        })
        .catch(() => {
          toast.error('Erro ao registrar o follow! Tente novamente.');
        });
    },
  });

  return {
    formik,
    situacao,
    setSituacao,
  };
};
