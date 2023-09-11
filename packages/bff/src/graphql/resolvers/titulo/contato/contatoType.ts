import { ContatoEmail } from '@/domain/titulo/contato/contatoEmailDomain';
import { ContatoEndereco } from '@/domain/titulo/contato/contatoEnderecoDomain';
import { ContatoTelefone } from '@/domain/titulo/contato/contatoTelefoneDomain';
import { builder } from '@bff/graphql/builder';
import { Pais } from '@/domain/titulo/paises/paisDomain';
import { ContatoTipoTelefone } from './contatoEnum';
import { Contato } from './contatoInterface';

builder.objectType(ContatoEmail, {
  name: 'ContatoEmail',
  interfaces: [Contato],
  fields: (t) => ({
    email: t.exposeString('email'),
  }),
});

builder.objectType(ContatoEndereco, {
  name: 'ContatoEndereco',
  interfaces: [Contato],
  fields: (t) => ({
    numero: t.exposeString('numero'),
    complemento: t.expose('complemento', { type: 'String', nullable: true }),
    logradouro: t.exposeString('logradouro'),
    bairro: t.exposeString('bairro'),
    cidade: t.exposeString('cidade'),
    uf: t.exposeString('uf', { nullable: true }),
    cep: t.exposeString('cep'),
    pais: t.field({
      type: Pais,
      nullable: true,
      resolve: async (root, args, context) => {
        if (!root.paisId) return null;
        return context.adapters.titulo.paises.getPaisById(String(root.paisId));
      },
    }),
  }),
});

builder.objectType(ContatoTelefone, {
  name: 'ContatoTelefone',
  interfaces: [Contato],
  fields: (t) => ({
    numero: t.exposeString('numero'),
    tipo: t.expose('tipo', { type: ContatoTipoTelefone }),
    whatsapp: t.exposeBoolean('whatsapp'),
  }),
});
