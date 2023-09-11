import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { Pais } from '@/shared/components/ClienteContato/components/ClienteContatosEnderecoTable/ClienteContatosEnderecoTable.gql';
import {
  CONTATO_ENDERECO_EDIT_MUTATION,
  ContatoEnderecoEditInfoData,
  ContatoEnderecoEditInfoInput,
  CONTATO_ENDERECO_INSERT_MUTATION,
  ContatoEnderecoInsertInfoData,
  ContatoEnderecoInsertInfoInput,
  ContatoEnderecoPaisesData,
  CONTATO_ENDERECO_PAISES_QUERY,
  PaisData,
} from '../ClienteContatosEnderecoEdit.gql';

export enum FormFields {
  pais = 'pais',
  nome = 'nome',
  marcador = 'marcador',
  logradouro = 'logradouro',
  bairro = 'bairro',
  cidade = 'cidade',
  uf = 'uf',
  cep = 'cep',
  numero = 'numero',
  classificacao = 'classificacao',
  complemento = 'complemento',
}

const SchemaContatoInsert = {
  logradouro: yup
    .string()
    .max(40, 'Endereço deve ser no máximo 40 caracteres')
    .required('Preencha o nome da rua endereço do contato'),
  numero: yup
    .string()
    .max(10, 'Número deve ser no máximo 10 caracteres')
    .required('Preencha o numero do endereço do contato'),
  cidade: yup
    .string()
    .max(30, 'Cidade deve ser no máximo 30 caracteres')
    .required('Preencha a cidade do endereço do contato'),
  cep: yup
    .string()
    .max(9, 'CEP deve ser no máximo 8 caracteres')
    .required('Preencha o CEP do endereço do contato'),
  complemento: yup
    .string()
    .max(15, 'Complemento deve ser no máximo 15 caracteres'),
};

const SchemaContatoEdit = {
  nome: yup.string().required('Preencha o nome do contato.'),
  classificacao: yup.string().required('Escolha uma classificação.'),
};

type ContatoEndereco = {
  id: string;
  nome: string;
  marcador: ContatoMarcadorEnum | null;
  classificacao: ContatoClassificacaoEnum;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  complemento: string;
  pais: Pais;
};

export type UseClienteContatosEnderecoEditProps = {
  contatoEndereco?: ContatoEndereco | null;
  showActions: boolean;
  onSaved?: () => void;
  refetch: (target: 'emails' | 'telefones' | 'enderecos') => void;
};

export function useClienteContatosEnderecoEdit({
  contatoEndereco,
  showActions,
  onSaved,
  refetch,
}: UseClienteContatosEnderecoEditProps) {
  const semPais: PaisData = { id: '', descricao: '' };
  const [value, setValue] = useState<PaisData>(semPais);
  const [paisDefault, setPaisDefault] = useState<PaisData>(semPais);
  const [maxLength, setMaxLength] = useState<number>(100);

  const { data, loading } = useQuery<ContatoEnderecoPaisesData>(
    CONTATO_ENDERECO_PAISES_QUERY,
    { fetchPolicy: 'cache-first' },
  );

  const [mutation] = useMutation<
    ContatoEnderecoEditInfoData,
    { input: ContatoEnderecoEditInfoInput }
  >(CONTATO_ENDERECO_EDIT_MUTATION, {
    onCompleted: () => refetch('enderecos'),
  });

  const [mutationInsert] = useMutation<
    ContatoEnderecoInsertInfoData,
    { input: ContatoEnderecoInsertInfoInput }
  >(CONTATO_ENDERECO_INSERT_MUTATION, {
    onCompleted: () => refetch('enderecos'),
  });

  const { clienteId } = useParams();

  const paises = data?.paises || [];

  const formik = useFormik({
    initialValues: {
      [FormFields.nome]: contatoEndereco?.nome || '',
      [FormFields.marcador]: contatoEndereco?.marcador || null,
      [FormFields.classificacao]:
        contatoEndereco?.classificacao || ContatoClassificacaoEnum.INDEFINIDO,
      [FormFields.logradouro]: contatoEndereco?.logradouro || '',
      [FormFields.numero]: contatoEndereco?.numero || '',
      [FormFields.bairro]: contatoEndereco?.bairro || '',
      [FormFields.cidade]: contatoEndereco?.cidade || '',
      [FormFields.uf]: contatoEndereco?.uf || '',
      [FormFields.cep]: contatoEndereco?.cep || '',
      [FormFields.complemento]: contatoEndereco?.complemento || '',
      [FormFields.pais]: contatoEndereco?.pais.id || '',
    },
    validationSchema: yup.object().shape({
      ...SchemaContatoEdit,
      ...(!contatoEndereco ? SchemaContatoInsert : {}),
    }),
    onSubmit: async (values) => {
      if (contatoEndereco) {
        await mutation({
          variables: {
            input: {
              id: contatoEndereco.id,
              nome: values.nome,
              marcador: values.marcador,
              classificacao: values.classificacao,
            },
          },
        })
          .then(() => {
            onSaved?.();
            formik.resetForm({ values });

            return toast.success('Endereço alterado com sucesso!');
          })
          .catch(() => {
            toast.error('Erro ao alterar o endereço. Tente novamente!');
          });
      } else if (paisDefault === value && formik.values.uf === '')
        formik.setErrors({ uf: 'Campo obrigatório' });
      else {
        await mutationInsert({
          variables: {
            input: {
              id: clienteId ?? '',
              nome: values.nome,
              numero: values.numero,
              bairro: values.bairro ?? null,
              cep: values.cep,
              cidade: values.cidade,
              marcador: values.marcador,
              classificacao: values.classificacao,
              complemento: values.complemento,
              logradouro: values.logradouro,
              uf: values.uf ?? null,
              paisId: value.id,
            },
          },
        })
          .then(() => {
            onSaved?.();
            formik.resetForm({ values });

            return toast.success('Endereço adicionado com sucesso!');
          })
          .catch(() => {
            toast.error('Erro ao adicionar o endereço. Tente novamente!');
          });
      }
    },
  });

  useEffect(() => {
    if (!showActions) {
      formik.resetForm();
    }
  }, [showActions]);

  useEffect(() => {
    const paisDefault =
      data?.paises.filter((pais) => pais.descricao === 'Brasil')[0] || semPais;
    setValue(paisDefault);
    setPaisDefault(paisDefault);
  }, [data]);

  useEffect(() => {
    if (value === paisDefault) setMaxLength(2);
    else setMaxLength(50);
  }, [value]);

  return { formik, loading, paises, value, setValue, maxLength };
}
