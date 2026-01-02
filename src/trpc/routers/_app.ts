import { inngest } from "@/inngest/client";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure
    .query(() => {
        return prisma.workflow.findMany();
    }),
    createWorkflow: protectedProcedure.mutation(async()=>{
      return  inngest.send({
        name: "test/hello.world", // should match the event defined in the function
        data: {
          name: "Test Workflow"
        }
      });
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;
