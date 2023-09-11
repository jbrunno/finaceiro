import { ContatoClassificacao } from '@/domain/titulo/contato/contatoClassificacaoDomain';
import { ContatoMarcador } from '@/domain/titulo/contato/contatoMarcadorDomain';
import {
  contatoEmailPatch,
  contatoEnderecoPatch,
  contatoTelefonePatch,
} from '@/gateway/titulo/contato/contatoGateway.mock';

export * from '@/gateway/titulo/contato/contatoGateway.mock';

export const contatoTelefonePatchAdapter = {
  ...contatoTelefonePatch,
  marcador: ContatoMarcador[contatoTelefonePatch.marcador],
  classificacao: ContatoClassificacao[contatoTelefonePatch.classificacao],
};

export const contatoEnderecoPatchAdpter = {
  ...contatoEnderecoPatch,
  marcador: ContatoMarcador[contatoEnderecoPatch.marcador],
  classificacao: ContatoClassificacao[contatoEnderecoPatch.classificacao],
};

export const contatoEmailPatchAdapter = {
  ...contatoEmailPatch,
  marcador: ContatoMarcador[contatoEmailPatch.marcador],
  classificacao: ContatoClassificacao[contatoEmailPatch.classificacao],
};
