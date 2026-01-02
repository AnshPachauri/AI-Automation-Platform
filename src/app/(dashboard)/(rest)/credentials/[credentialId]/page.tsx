import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
    params: Promise<{
        credentialId: string;
    }>
};

const Page = async ({ params } : PageProps)=>{
    await requireAuth();
    // dynamic routes in Next.js 13 receive params as a promise
    // so that we can await any async data fetching if needed
    const { credentialId } = await params; 

    return <p>Credential {credentialId}</p>
};

export default Page;