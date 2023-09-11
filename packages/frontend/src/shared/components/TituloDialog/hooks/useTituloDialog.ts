import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { TituloQuestionario } from '../../TituloCard/TituloCard.gql';
import {
  TituloInsertData,
  TituloInsertInput,
  TituloEditData,
  TituloEditInput,
  TITULO_INSERT_MUTATION,
  TITULO_EDIT_MUTATION,
} from '../TituloDialog.gql';

export type UseTituloDialogProps = {
  onSaved: () => void;
  tituloQuestionario: TituloQuestionario | null;
  tituloId?: string | null;
};

export enum FormFields {
  siteRegistro = 'siteRegistro',
  contaAnteriorFalencia = 'contaAnteriorFalencia',
  tipoConta = 'tipoConta',
  tipoAtivoInvestido = 'tipoAtivoInvestido',
  valorDepositos = 'valorDepositos',
  observacao = 'observacao',
}

const inputErro = 'Campo obrigatório';

const Schema = {
  siteRegistro: yup.string().required(inputErro),
  contaAnteriorFalencia: yup.bool().required(inputErro),
  tipoConta: yup.string().required(inputErro),
  tipoAtivoInvestido: yup.string().required(inputErro),
  valorDepositos: yup.string().required(inputErro),
  observacao: yup.string().required(inputErro),
};

export function useTituloDialog({
  onSaved,
  tituloId,
  tituloQuestionario,
}: UseTituloDialogProps) {
  const [mutationInsert] = useMutation<
    TituloInsertData,
    { input: TituloInsertInput }
  >(TITULO_INSERT_MUTATION, {
    refetchQueries: ['Titulos'],
  });

  const [mutationEdit] = useMutation<
    TituloEditData,
    { input: TituloEditInput }
  >(TITULO_EDIT_MUTATION, {
    refetchQueries: ['Titulos'],
  });

  const { clienteId } = useParams();

  const formik = useFormik({
    initialValues: {
      [FormFields.siteRegistro]: tituloQuestionario?.siteRegistro ?? '',
      [FormFields.contaAnteriorFalencia]:
        tituloQuestionario?.contaAnteriorFalencia || true,
      [FormFields.tipoConta]: tituloQuestionario?.tipoConta ?? '',
      [FormFields.tipoAtivoInvestido]:
        tituloQuestionario?.tipoAtivoInvestido ?? '',
      [FormFields.valorDepositos]: tituloQuestionario?.valorDepositos ?? '',
      [FormFields.observacao]: tituloQuestionario?.observacao ?? '',
    },
    validationSchema: yup.object().shape(Schema),
    onSubmit: async (values) => {
      if (tituloId) {
        await mutationEdit({
          variables: {
            input: {
              ...values,
              id: tituloId ?? '',
            },
          },
        })
          .then(() => {
            onSaved?.();
            formik.resetForm();
            return toast.success('Informações do título salvas com sucesso.');
          })
          .catch(() =>
            toast.error('Erro ao atualizar o título. Tente novamente!'),
          );
      } else {
        await mutationInsert({
          variables: {
            input: {
              ...values,
              id: clienteId ?? '',
            },
          },
        })
          .then(() => {
            onSaved?.();
            formik.resetForm();
            return toast.success('Informações do título salvas com sucesso.');
          })
          .catch(() =>
            toast.error('Erro ao adicionar o título. Tente novamente!'),
          );
      }
    },
  });

  return { formik };
}
