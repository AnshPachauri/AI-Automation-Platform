// src/app/(dashboard)/(rest)/workflows/page.tsx
import { WorkflowsContainer, WorkflowsList } from "@/features/workflows/components/workflows";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
    await requireAuth();

    prefetchWorkflows();

    return (
        // wrap with WorkflowsContainer to provide header, search, pagination
        <WorkflowsContainer>
        <HydrateClient>
            <ErrorBoundary fallback={<div>Failed to load workflows.</div>}>
                <Suspense fallback={<div>Loading workflows...</div>}>
                    {/* Workflow list component goes here */}
                    <WorkflowsList/>
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
        </WorkflowsContainer>
    )
}
export default Page; 