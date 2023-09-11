import { Sidebar } from '@/shared/components';
import { TopBar } from '@frontend/components';
import { Outlet } from 'react-router';
import { PageContainer } from './PageWrapper.styles';
import { usePageWrapper } from './hooks/usePageWrapper';

export function PageWrapper() {
  const { search, handleSearch, handleClear } = usePageWrapper();

  return (
    <>
      <Sidebar />
      <PageContainer>
        <TopBar value={search} onSearch={handleSearch} onClear={handleClear} />
        <Outlet />
      </PageContainer>
    </>
  );
}
