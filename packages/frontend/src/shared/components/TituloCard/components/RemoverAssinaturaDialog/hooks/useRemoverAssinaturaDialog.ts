import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { ERRORS_API } from '@/shared/constants';
import {
  EDITAR_ASSINATURA_DIALOG_MUTATION,
  RemoverAssinaturaDialogData,
  RemoverAssinaturaDialogInput,
} from '../RemoverAssinaturaDialog.gql';

export enum FormFields {
  motivo = 'motivo',
  usuarioSupervisor = 'usuarioSupervisor',
  senhaSupervisor = 'senhaSupervisor',
}

const initialValues = {
  [FormFields.motivo]: '',
  [FormFields.usuarioSupervisor]: '',
  [FormFields.senhaSupervisor]: '',
};

const Schema = {
  [FormFields.motivo]: yup.string().required('Campo obrigatório'),
  [FormFields.usuarioSupervisor]: yup.string().required('Campo obrigatório'),
  [FormFields.senhaSupervisor]: yup.string().required('Campo obrigatório'),
};

export type UseRemoverAssinaturaDialogProps = {
  onClose: () => void;
  refetch: (target: 'titulos') => void;
  tituloId: string;
};

export const useRemoverAssinaturaDialog = ({
  onClose,
  tituloId,
  refetch,
}: UseRemoverAssinaturaDialogProps) => {
  const [mutation] = useMutation<
    RemoverAssinaturaDialogData,
    { input: RemoverAssinaturaDialogInput }
  >(EDITAR_ASSINATURA_DIALOG_MUTATION);

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape(Schema),
    onSubmit: async (values) => {
      await mutation({
        variables: {
          input: { ...values, id: tituloId },
        },
      })
        .then(() => {
          handleClose();
          refetch('titulos');
          toast.success('Assinatura removida com sucesso.');
        })
        .catch((error) => {
          const {
            extensions: { statusCode },
          } = error.graphQLErrors[0];

          switch (statusCode) {
            case ERRORS_API.ERROR_401:
              return formik.setErrors({
                usuarioSupervisor: ' ',
                senhaSupervisor: 'Usuário ou senha incorretos.',
              });
            case ERRORS_API.ERROR_403:
              return toast.error('Login do supervisor não autorizado.');
            default:
              return toast.error(
                'Erro ao remover assinatura. Tente novamente.',
              );
          }
        });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const isDisableSubmit = [
    !formik.values.motivo,
    !formik.values.usuarioSupervisor,
    !formik.values.senhaSupervisor,
  ].includes(true);

  const isMotivoError = !!(formik.touched.motivo && formik.errors.motivo);
  const isUsuarioSupervisorError = !!(
    formik.touched.usuarioSupervisor && formik.errors.usuarioSupervisor
  );
  const isSenhaSupervisorError = !!(
    formik.touched.senhaSupervisor && formik.errors.senhaSupervisor
  );

  return {
    formik,
    handleClose,
    isDisableSubmit,
    isMotivoError,
    isUsuarioSupervisorError,
    isSenhaSupervisorError,
  };
};
