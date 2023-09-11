import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { CLIENTE_DETALHES } from '@/router/routes';
import { toast } from 'react-toastify';
import { ClienteTipoEnum, ERRORS_API } from '@/shared/constants';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import {
  CLIENTE_INSERT_MUTATION,
  ClienteInsertInfoData,
  ClienteInsertInfoInput,
} from '../ReceptivoDialog.gql';

export enum FormFields {
  telefone = 'telefone',
  nome = 'nome',
  tipo = 'tipo',
  documento = 'documento',
}

const SchemaReceptivo = {
  telefone: yup.string().required('Preenchimento obrigatorio.'),
  nome: yup.string().required('Preenchimento obrigatorio.'),
};

export type UseReceptivoDialogProps = {
  onSaved?: () => void;
  onClose?: () => void;
};

export function useReceptivoDialog({
  onSaved,
  onClose,
}: UseReceptivoDialogProps) {
  const [insertCliente] = useMutation<
    ClienteInsertInfoData,
    { input: ClienteInsertInfoInput }
  >(CLIENTE_INSERT_MUTATION);
  const navigate = useNavigate();
  const [typeInput, setTypeInput] = useState<string>('text');
  const [maxLength, setMaxLength] = useState<number>(100);

  const formik = useFormik({
    initialValues: {
      [FormFields.telefone]: '',
      [FormFields.nome]: '',
      [FormFields.tipo]: ClienteTipoEnum.INDEFINIDO,
      [FormFields.documento]: '',
    },
    validationSchema: yup.object().shape(SchemaReceptivo),
    onSubmit: async (values) => {
      await insertCliente({
        variables: {
          input: {
            nome: values.nome,
            telefone: values.telefone,
            tipoCliente: values.tipo || ClienteTipoEnum.INDEFINIDO,
            documento: values.documento,
          },
        },
      })
        .then((response) => {
          if (response.data) {
            onSaved?.();
            formik.resetForm();
            onClose?.();
            navigate(
              `/operacao/${CLIENTE_DETALHES.replace(
                ':clienteId',
                response.data.clientePost.id,
              )}`,
            );
            return toast.success('Cadastro realizado com sucesso.');
          }
          return toast.error('Erro ao cadastrar cliente. Tente novamente.');
        })
        .catch((e) => {
          const { message } = e;
          if (message === ERRORS_API.ERROR_406)
            formik.setFieldError(FormFields.documento, ERRORS_API.ERROR_406);
          else toast.error('Erro ao cadastrar cliente. Tente novamente.');
        });
    },
  });

  useEffect(() => {
    switch (formik.values.tipo) {
      case ClienteTipoEnum.FISICA:
        setTypeInput('number');
        setMaxLength(11);
        break;
      case ClienteTipoEnum.JURIDICA:
        setTypeInput('number');
        setMaxLength(14);
        break;
      default:
        setTypeInput('text');
        setMaxLength(100);
        break;
    }
  }, [formik.values.tipo]);

  const handleChangeDocumento = (value: string) => {
    if (
      (formik.values.tipo === ClienteTipoEnum.FISICA ||
        formik.values.tipo === ClienteTipoEnum.JURIDICA) &&
      value.length > maxLength
    )
      formik.setFieldError(FormFields.documento, 'Número inválido.');
    else formik.setFieldValue(FormFields.documento, value);
  };

  return {
    formik,
    loading: false,
    typeInput,
    maxLength,
    handleChangeDocumento,
  };
}
