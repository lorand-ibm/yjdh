import { axe } from 'jest-axe';
import React from 'react';
import Layout from 'shared/components/Layout';
import { render } from 'test-utils';

test('test for accessibility violations', async () => {
  const { container } = render(<Layout>Hello World</Layout>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
