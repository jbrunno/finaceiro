import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { createTheme, defaultTheme, ThemeProvider } from '@frontend/styles';
import { MemoryRouter } from 'react-router';
import { GlobalServicesProvider } from '@frontend/contexts';
import { renderHook, WrapperComponent } from '@testing-library/react-hooks';

type RenderWrapperProps = {
  children: React.ReactNode | JSX.Element;
};

function RenderWrapper({ children }: RenderWrapperProps) {
  const theme = createTheme(defaultTheme);

  return (
    <GlobalServicesProvider>
      <MemoryRouter>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MemoryRouter>
    </GlobalServicesProvider>
  );
}

const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: RenderWrapper, ...options });

const renderHookWithProviders = <Result, Props>(
  callback: (initialProps: Props) => Result,
  options?: Omit<RenderOptions, 'wrapper'>,
) =>
  renderHook(callback, {
    wrapper: RenderWrapper as WrapperComponent<Props>,
    ...options,
  });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export {
  act,
  addCleanup,
  cleanup,
  removeCleanup,
  suppressErrorOutput,
} from '@testing-library/react-hooks';
export type {
  RenderResult,
  RenderHookResult,
  RenderHookOptions,
} from '@testing-library/react-hooks';
export * from '@testing-library/react-hooks';
export { render as tlRender } from '@testing-library/react';
export { renderWithProviders as render };
export { renderHookWithProviders as renderHook };
