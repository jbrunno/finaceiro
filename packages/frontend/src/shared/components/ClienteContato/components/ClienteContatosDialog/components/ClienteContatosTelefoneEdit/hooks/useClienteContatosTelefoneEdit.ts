import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';
import { useParams } from 'react-router';
import {
  ContatoTelefoneEditInfoData,
  ContatoTelefoneEditInfoInput,
  ContatoTelefoneInsertInfoData,
  ContatoTelefoneInsertInfoInput,
  CONTATO_TELEFONE_EDIT_MUTATION,
  CONTATO_TELEFONE_INSERT_MUTATION,
} from '../ClienteContatosTelefoneEdit.gql';

export enum FormFields {
  nome = 'nome',
  marcador = 'marcador',
  numero = 'numero',
  classificacao = 'classificacao',
  whatsapp = 'whatsapp',
}

const SchemaContato = {
  nome: yup.string().required('Preencha o nome do contato.'),
  marcador: yup.string().required('Escolha um marcador.'),
  numero: yup
    .string()
    .matches(
      /(\(\d{2}\))?\s?([\d]?)\s?(\d{4,5})-?(\d{4})/,
      'Preencha um número de telefone do contato válido.',
    )
    .required('Preencha o número de telefone do contato.'),
};

type ContatoTelefone = {
  id: string;
  nome: string;
  numero: string;
  whatsapp: boolean;
  marcador: ContatoMarcadorEnum | null;
  classificacao: ContatoClassificacaoEnum;
};

export type UseClienteContatosTelefoneEditProps = {
  contatoTelefone?: ContatoTelefone | null;
  showActions: boolean;
  onSaved: () => void;
  refetch: (target: 'emails' | 'telefones' | 'enderecos') => void;
};

export function useClienteContatosTelefoneEdit({
  contatoTelefone,
  showActions,
  onSaved,
  refetch,
}: UseClienteContatosTelefoneEditProps) {
  const [mutation] = useMutation<
    ContatoTelefoneEditInfoData,
    { input: ContatoTelefoneEditInfoInput }
  >(CONTATO_TELEFONE_EDIT_MUTATION, {
    onCompleted: () => refetch('telefones'),
  });

  const [mutationInsert] = useMutation<
    ContatoTelefoneInsertInfoData,
    { input: ContatoTelefoneInsertInfoInput }
  >(CONTATO_TELEFONE_INSERT_MUTATION, {
    onCompleted: () => refetch('telefones'),
  });

  const { clienteId } = useParams();

  const formik = useFormik({
    initialValues: {
      [FormFields.nome]: contatoTelefone?.nome || '',
      [FormFields.marcador]:
        contatoTelefone?.marcador || ContatoMarcadorEnum.PESSOAL,
      [FormFields.numero]: contatoTelefone?.numero || '',
      [FormFields.classificacao]:
        contatoTelefone?.classificacao || ContatoClassificacaoEnum.INDEFINIDO,
      [FormFields.whatsapp]: contatoTelefone?.whatsapp || false,
    },
    validationSchema: yup.object().shape(SchemaContato),
    onSubmit: async (values) => {
      if (contatoTelefone) {
        await mutation({
          variables: {
            input: {
              id: contatoTelefone.id,
              nome: values.nome,
              marcador: values.marcador,
              classificacao: values.classificacao,
              whatsapp: values.whatsapp,
            },
          },
        })
          .then(() => {
            onSaved();
            formik.resetForm({ values });

            toast.success('Telefone alterado com sucesso!');
          })
          .catch(() => {
            toast.error('Erro ao alterar o telefone. Tente novamente!');
          });
      } else {
        await mutationInsert({
          variables: {
            input: {
              id: clienteId ?? '',
              nome: values.nome,
              marcador: values.marcador,
              classificacao: values.classificacao,
              numero: values.numero,
              whatsapp: values.whatsapp,
            },
          },
        })
          .then(() => {
            onSaved();
            formik.resetForm({ values });

            return toast.success('Telefone adicionado com sucesso!');
          })
          .catch(() => {
            toast.error('Erro ao adicionar o telefone. Tente novamente!');
          });
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
