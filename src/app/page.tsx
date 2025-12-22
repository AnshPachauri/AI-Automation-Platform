import { getQueryClient , trpc } from '@/trpc/server';
import { ClientPage } from './client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const Page = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
// prefetching to use speed of server components

  return (
    <div className="p-20">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientPage />
      </HydrationBoundary>
    </div>
  )
}

export default Page;
