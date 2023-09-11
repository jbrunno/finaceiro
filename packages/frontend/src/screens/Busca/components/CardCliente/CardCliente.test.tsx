import React from 'react';
import { render } from '@test-utils/component-testing';
import { CardCliente } from './CardCliente';
import { ClienteData } from './CardCliente.gql';

test('renders the CardCustomer', () => {
  const cliente = {
    nome: 'João da Silva',
    nomeSocial: 'João',
    documento: '123.456.789-00',
  } as ClienteData;
  const { container } = render(<CardCliente {...cliente} />);
  expect(container).toMatchSnapshot();
});
