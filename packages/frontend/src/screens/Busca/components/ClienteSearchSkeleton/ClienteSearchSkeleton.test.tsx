import React from 'react';
import { render } from '@test-utils/component-testing';
import { ClienteSearchSkeleton } from './ClienteSearchSkeleton';

test('renders the CardCustomer', () => {
  const { container } = render(<ClienteSearchSkeleton cards={3} />);
  expect(container).toMatchSnapshot();
});
