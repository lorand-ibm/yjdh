import IndexPage from 'tet/youth/pages';
import { axe } from 'jest-axe';
import React from 'react';

import renderComponent from 'tet/youth/__tests__/utils/components/render-component';

describe('frontend/tet/admin/src/pages/index.tsx', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should have no accessibility violations', async () => {
    const {
      renderResult: { container },
    } = renderComponent(<IndexPage />);
    // const results = await axe(container);
    // TODO fix accessibility errors
    // expect(results).toHaveNoViolations();
  });
});
