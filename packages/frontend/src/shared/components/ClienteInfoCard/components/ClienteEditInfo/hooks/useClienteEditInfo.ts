import {
  ClienteSexoEnum,
  ClienteTipoEnum,
  ERRORS_API,
} from '@/shared/constants';
import { useMutation } from '@apollo/client';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { DateOnly, formatDocument, getTimeDifference } from '@frontend/utils';
import { useEffect, useState } from 'react';
import { ClienteEditInfoProps } from '../ClienteEditInfo';
import {
  CLIENTE_EDIT_MUTATION,
  ClienteEditInfoData,
  ClienteEditInfoInput,
} from '../ClienteEditInfo.gql';

export enum ClienteEditFormFields {
  nomeSocial = 'nomeSocial',
  nome = 'nome',
  documento = 'documento',
  tipoCliente = 'tipoCliente',
  dataNascimento = 'dataNascimento',
  sexo = 'sexo',
  cboId = 'cboId',
  falecido = 'falecido',
}

export const useClienteEditInfo = ({
  cliente,
  onSuccess,
}: Omit<ClienteEditInfoProps, 'screen'>) => {
  const [mutation, { data, error, loading }] = useMutation<
    ClienteEditInfoData,
    { input: ClienteEditInfoInput }
  >(CLIENTE_EDIT_MUTATION, {
    refetchQueries: ['Cliente'],
  });

  const [typeInput, setTypeInput] = useState<string>('text');
  const [maxLength, setMaxLength] = useState<number>(100);

  const validationSchema = yup.object().shape({
    nome: yup.string().required(),
    sexo: yup.string().required(),
    falecido: yup.boolean().required(),
    tipoCliente: yup.string().required(),
    dataNascimento: yup
      .date()
      .test(
        'dataNascimento',
        'Insira uma data válida',
        (value) => getTimeDifference(value || new Date(), new Date()).days > 0,
      ),
  });

  const formik = useFormik({
    initialValues: {
      [ClienteEditFormFields.nomeSocial]: cliente?.nomeSocial || '',
      [ClienteEditFormFields.nome]: cliente?.nome || '',
      [ClienteEditFormFields.dataNascimento]:
        new DateOnly(cliente?.dataNascimento) || new DateOnly(),
      [ClienteEditFormFields.documento]: cliente?.documento
        ? formatDocument(cliente.documento, cliente.tipo)
        : '',
      [ClienteEditFormFields.sexo]: cliente?.sexo || ClienteSexoEnum.MASCULINO,
      [ClienteEditFormFields.cboId]: cliente?.cbo?.id,
      [ClienteEditFormFields.falecido]: cliente?.falecido || false,
      [ClienteEditFormFields.tipoCliente]: cliente?.tipo,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (cliente) {
        mutation({
          variables: {
            input: {
              id: cliente.id,
              ...values,
              dataNascimento: values.dataNascimento.toString(),
            },
          },
        })
          .then(onSuccess)
          .catch((e) => {
            const { message } = e;
            if (message === ERRORS_API.ERROR_406)
              formik.setFieldError(
                ClienteEditFormFields.documento,
                ERRORS_API.ERROR_406,
              );
            else toast.error('Erro ao alterar cliente! Tente novamente.');
          });
      }
    },
  });

  const handleChangeDocumento = (value: string) => {
    if (
      (formik.values.tipoCliente === ClienteTipoEnum.FISICA ||
        formik.values.tipoCliente === ClienteTipoEnum.JURIDICA) &&
      value.length > maxLength
    )
      formik.setFieldError(ClienteEditFormFields.documento, 'Número inválido.');
    else formik.setFieldValue(ClienteEditFormFields.documento, value);
  };

  useEffect(() => {
    switch (formik.values.tipoCliente) {
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
  }, [formik.values.tipoCliente]);

  return {
    formik,
    clienteData: data,
    clienteError: error,
    clienteLoading: loading,
    typeInput,
    maxLength,
    handleChangeDocumento,
  };
};
