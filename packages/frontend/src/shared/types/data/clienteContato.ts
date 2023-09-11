import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';

export type ClienteContato = {
  nome: string;
  marcador: ContatoMarcadorEnum | null;
  classificacao: ContatoClassificacaoEnum;
};
