import { lazy, Suspense } from 'react';

const Shell = lazy(() => import('login/Shell'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Shell />
    </Suspense>
  );
}

export default App;
