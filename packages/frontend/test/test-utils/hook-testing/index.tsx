import { createTheme, defaultTheme, ThemeProvider } from '@frontend/styles';
import { MemoryRouter } from 'react-router';
import { renderHook, RenderHookOptions } from '@testing-library/react-hooks';
import { ApiProvider, GlobalServicesProvider } from '@frontend/contexts';
import { ChildrenProp } from '@frontend/types';
import { mockApiClient } from '../api-testing';

function RenderWrapper<T>(props: T) {
  const theme = createTheme(defaultTheme);

  return (
    <GlobalServicesProvider>
      <ApiProvider client={mockApiClient}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            {(props as unknown as ChildrenProp).children}
          </ThemeProvider>
        </MemoryRouter>
      </ApiProvider>
    </GlobalServicesProvider>
  );
}

const renderHookWithProviders = <Props, Result>(
  callback: (initialProps: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>,
) =>
  renderHook<Props, Result>(callback, {
    wrapper: RenderWrapper,
    ...options,
  });

export { default as userEvent } from '@testing-library/user-event';
export * from '@testing-library/react-hooks';
export { renderHookWithProviders as renderHook };
