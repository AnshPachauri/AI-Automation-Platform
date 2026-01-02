"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

const Page = () => {
  const trpc = useTRPC();

  const testAi = useMutation(trpc.testAi.mutationOptions());

  return (
    <div className="min-h-screen flex items-center justify-center relative z-50">
      Protected Client Component

      <button
        type="button"
        className="px-4 py-2 bg-black text-white rounded pointer-events-auto"
        onClick={() => {
          console.log("clicked");
          testAi.mutate();
        }}
      >
        Test AI
      </button>
    </div>
  );
};

export default Page;
