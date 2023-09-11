import { builder } from '@bff/graphql/builder';
import { Titulo } from '@/domain/titulo/titulo/tituloDomain';
import { TituloQuestionarioModel } from '@/gateway/titulo/titulo/models/tituloModel';

const TituloQuestionario = builder
  .objectRef<TituloQuestionarioModel>('TituloQuestionario')
  .implement({
    fields: (t) => ({
      contaAnteriorFalencia: t.exposeBoolean('contaAnteriorFalencia'),
      observacao: t.expose('observacao', { type: 'String', nullable: true }),
      siteRegistro: t.expose('siteRegistro', {
        type: 'String',
        nullable: true,
      }),
      tipoAtivoInvestido: t.expose('tipoAtivoInvestido', {
        type: 'String',
        nullable: true,
      }),
      tipoConta: t.expose('tipoConta', { type: 'String', nullable: true }),
      valorDepositos: t.expose('valorDepositos', {
        type: 'String',
        nullable: true,
      }),
    }),
  });

builder.objectType(Titulo, {
  name: 'Titulo',
  fields: (t) => ({
    id: t.exposeID('id'),
    tituloQuestionario: t.expose('tituloQuestionario', {
      type: TituloQuestionario,
    }),
    assinatura: t.exposeBoolean('assinatura'),
  }),
});
