import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router';
import {
  CONTATO_EMAIL_EDIT_MUTATION,
  ContatoEmailEditInfoData,
  ContatoEmailEditInfoInput,
  CONTATO_EMAIL_INSERT_MUTATION,
  ClienteContatoEmailInsertInfoData,
  ClienteContatoEmailInsertInfoInput,
} from '../ClienteContatosEmailEdit.gql';

export enum FormFields {
  nome = 'nome',
  marcador = 'marcador',
  email = 'email',
  classificacao = 'classificacao',
}

const SchemaContato = {
  nome: yup.string().required('Preencha o nome do contato.'),
  marcador: yup.string().required('Escolha um marcador.'),
  email: yup
    .string()
    .email('Preencha um e-mail do contato válido.')
    .required('Preencha um e-mail do contato válido.'),
};

type ContatoEmail = {
  id: string;
  nome: string;
  email: string;
  marcador: ContatoMarcadorEnum | null;
  classificacao: ContatoClassificacaoEnum;
};

export type UseClienteContatosEmailEditProps = {
  contatoEmail?: ContatoEmail | null;
  showActions: boolean;
  onSaved?: () => void;
  refetch: (target: 'emails' | 'telefones' | 'enderecos') => void;
};

export function useClienteContatosEmailEdit({
  contatoEmail,
  showActions,
  onSaved,
  refetch,
}: UseClienteContatosEmailEditProps) {
  const [mutation] = useMutation<
    ContatoEmailEditInfoData,
    { input: ContatoEmailEditInfoInput }
  >(CONTATO_EMAIL_EDIT_MUTATION, {
    onCompleted: () => refetch('emails'),
  });

  const [insertMutation] = useMutation<
    ClienteContatoEmailInsertInfoData,
    { input: ClienteContatoEmailInsertInfoInput }
  >(CONTATO_EMAIL_INSERT_MUTATION, {
    onCompleted: () => refetch('emails'),
  });

  const { clienteId } = useParams();

  const formik = useFormik({
    initialValues: {
      [FormFields.nome]: contatoEmail?.nome || '',
      [FormFields.marcador]: contatoEmail?.marcador || null,
      [FormFields.email]: contatoEmail?.email || '',
      [FormFields.classificacao]:
        contatoEmail?.classificacao || ContatoClassificacaoEnum.INDEFINIDO,
    },
    validationSchema: yup.object().shape(SchemaContato),
    onSubmit: async (values) => {
      if (contatoEmail) {
        await mutation({
          variables: {
            input: {
              id: contatoEmail.id,
              nome: values.nome,
              marcador: values.marcador,
              classificacao: values.classificacao,
            },
          },
        })
          .then(() => {
            onSaved?.();
            formik.resetForm({ values });
            return toast.success('E-mail alterado com sucesso!');
          })
          .catch(() => {
            return toast.error('Erro ao alterar e-mail. Tente novamente!');
          });
      } else {
        await insertMutation({
          variables: {
            input: {
              id: clienteId || '',
              nome: values.nome,
              classificacao: values.classificacao,
              marcador: values.marcador,
              email: values.email,
            },
          },
        })
          .then(() => {
            onSaved?.();
            formik.resetForm({ values });
            return toast.success('E-mail adicionado com sucesso!');
          })
          .catch(() =>
            toast.error('Erro ao cadastrar e-mail. Tente novamente.'),
          );
      }
    },
  });

  useEffect(() => {
    if (!showActions) {
      formik.resetForm();
    }
  }, [showActions]);

  return { formik, loading: false };
}
