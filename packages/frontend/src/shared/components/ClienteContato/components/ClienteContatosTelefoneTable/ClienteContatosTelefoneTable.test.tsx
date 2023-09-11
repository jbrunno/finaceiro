import {
  ContatoClassificacaoEnum,
  ContatoMarcadorEnum,
} from '@/shared/constants';
import { render } from '@test-utils/component-testing';
import { ClienteContatosTelefoneTable } from './ClienteContatosTelefoneTable';

test('should render ClienteContatosTelefoneTable', () => {
  const { container } = render(
    <ClienteContatosTelefoneTable
      telefones={[
        {
          id: '1',
          classificacao: ContatoClassificacaoEnum.EXCELENTE,
          nome: 'teste',
          numero: '92993979292',
          whatsapp: true,
          marcador: ContatoMarcadorEnum.FILHO,
        },
      ]}
    />,
  );
  expect(container).toMatchSnapshot();
});
