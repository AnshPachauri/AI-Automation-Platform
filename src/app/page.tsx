import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {
  await requireAuth(); // this makes the page protected

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      protected server component

    </div>
  )
}

export default Page;
