import { UsuarioById } from '@/domain/usuario/usuarioByIdDomain';
import { Usuarios } from '@/domain/usuario/usuariosDomain';
import { builder } from '@bff/graphql/builder';
import {
  Carteiras as CarteirasModel,
  Equipes as EquipesModel,
} from '@/gateway/permissionamento/usuario/models/usuariosModel';

builder.objectType(UsuarioById, {
  name: 'UsuarioById',
  fields: (t) => ({
    id: t.exposeID('id'),
    nome: t.exposeString('nome'),
    username: t.exposeString('username'),
    turno: t.exposeInt('turno'),
    cargaHoraria: t.exposeString('cargaHoraria'),
  }),
});

builder.objectType(Usuarios, {
  name: 'Usuarios',
  fields: (t) => ({
    id: t.exposeID('id'),
    nome: t.exposeString('nome'),
    username: t.exposeString('username'),
    cargo: t.exposeString('cargo'),
    turno: t.exposeString('turno'),
    cargaHoraria: t.exposeString('cargaHoraria'),
    carteiras: t.expose('carteiras', { type: [Carteiras] }),
    equipes: t.expose('equipes', { type: [Equipes] }),
  }),
});

const Carteiras = builder.objectRef<CarteirasModel>('Carteiras').implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    nome: t.exposeString('nome'),
    codigo: t.exposeString('codigo'),
    dataAlteracao: t.expose('dataAlteracao', { type: 'Date' }),
    idUsuarioCriacao: t.exposeString('idUsuarioCriacao'),
    idUsuarioAlteracao: t.exposeString('idUsuarioAlteracao'),
  }),
});

const Equipes = builder.objectRef<EquipesModel>('Equipes').implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    nome: t.exposeString('nome'),
    dataCriacao: t.expose('dataCriacao', { type: 'Date' }),
    idUsuarioCriacao: t.exposeString('idUsuarioCriacao'),
    idUsuarioAlteracao: t.exposeString('idUsuarioAlteracao'),
  }),
});
