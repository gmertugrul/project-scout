import { PageHeader } from "@/app/(public)/components/page-header";
import { getUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function MyBallers() {
  const user = await getUser();

  if (!user) {
    return redirect(`/login?return=${encodeURIComponent("/my-ballers")}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader>My Ballers</PageHeader>
    </div>
  );
}
