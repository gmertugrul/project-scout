import { PageHeader } from "@/app/(public)/components/page-header";
import { AuthForm } from "@/app/(public)/login/auth-form";

export default function Login({
  searchParams,
}: {
  searchParams: { returnPath?: string };
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader>Log In</PageHeader>
      <AuthForm returnPath={searchParams.returnPath} />
    </div>
  );
}
