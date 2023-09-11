import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { createTheme, defaultTheme, ThemeProvider } from '@frontend/styles';
import { MemoryRouter } from 'react-router';
import { ApiProvider, GlobalServicesProvider } from '@frontend/contexts';
import { PropsWithChildren } from '@frontend/types';
import { mockApiClient } from '../api-testing';

function RenderWrapper({ children }: PropsWithChildren) {
  const theme = createTheme(defaultTheme);

  return (
    <GlobalServicesProvider>
      <ApiProvider client={mockApiClient}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </MemoryRouter>
      </ApiProvider>
    </GlobalServicesProvider>
  );
}

const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: RenderWrapper, ...options });

export * from '@testing-library/react';
export { render as tlRender } from '@testing-library/react';
export { renderWithProviders as render };
