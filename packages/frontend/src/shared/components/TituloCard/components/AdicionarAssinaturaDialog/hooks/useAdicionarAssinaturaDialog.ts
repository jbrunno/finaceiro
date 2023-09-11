import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { ERRORS_API } from '@/shared/constants';
import {
  AssinarTituloPostData,
  AssinarTituloPostInput,
  TITULO_ASSINATURA_MUTATION,
} from '../AdicionarAssinaturaDialog.gql';

export enum FormFields {
  usuario = 'usuario',
  senha = 'senha',
}

const initialValues = {
  [FormFields.usuario]: '',
  [FormFields.senha]: '',
};

const Schema = {
  [FormFields.usuario]: yup.string().required('Campo obrigatório'),
  [FormFields.senha]: yup.string().required('Campo obrigatório'),
};

export type UseAdicionarAssinaturaDialogProps = {
  onClose: () => void;
  tituloId?: string | null;
};

export const useAdicionarAssinaturaDialog = ({
  onClose,
  tituloId,
}: UseAdicionarAssinaturaDialogProps) => {
  const [mutation] = useMutation<
    AssinarTituloPostData,
    { input: AssinarTituloPostInput }
  >(TITULO_ASSINATURA_MUTATION);

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape(Schema),
    onSubmit: async (values) => {
      if (tituloId) {
        await mutation({
          variables: {
            input: {
              id: tituloId,
              usuarioSupervisor: values[FormFields.usuario],
              senhaSupervisor: values[FormFields.senha],
            },
          },
          refetchQueries: ['Titulos'],
        })
          .then(() => {
            handleClose();
            return toast.success('Assinatura adicionada com sucesso.');
          })
          .catch((error) => {
            const {
              extensions: { statusCode },
            } = error.graphQLErrors[0];

            switch (statusCode) {
              case ERRORS_API.ERROR_401:
                return formik.setErrors({
                  usuario: ' ',
                  senha: 'Usuário ou senha incorretos.',
                });
              case ERRORS_API.ERROR_403:
                return toast.error('Login do supervisor não autorizado.');
              default:
                return toast.error(
                  'Erro ao adicionar assinatura. Tente novamente.',
                );
            }
          });
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return {
    formik,
    handleClose,
  };
};
