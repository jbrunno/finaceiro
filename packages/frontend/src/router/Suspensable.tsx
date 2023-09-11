import React, { ComponentType, lazy, Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

function ErrorFallback({ error }: FallbackProps) {
  return (
    <div>
      <p>Something went wrong:</p>
      <p>{error.message}</p>
    </div>
  );
}

export type SuspensibleComponent<C = ComponentType<{}>> =
  | C
  | Promise<{ default: C }>;

type SuspensibleProps = {
  component: SuspensibleComponent;
  suspense?: boolean;
  children: JSX.Element;
};

export function Suspensible({
  children,
  suspense = true,
  component,
}: SuspensibleProps) {
  const Component =
    component instanceof Promise ? lazy(() => component) : component;

  if (suspense) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Component />
          {children}
        </ErrorBoundary>
      </Suspense>
    );
  }

  return (
    <>
      <Component />
      {children}
    </>
  );
}
