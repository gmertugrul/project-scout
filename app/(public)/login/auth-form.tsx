"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@/app/lib/supabase/client";

export function AuthForm({ returnPath = "/" }: { returnPath?: string }) {
  const client = createClient();

  return (
    <div className="card">
      <Auth
        magicLink
        view={"magic_link"}
        supabaseClient={client}
        appearance={{ theme: ThemeSupa }}
        providers={["google", "apple"]}
        redirectTo={`${process.env.NEXT_PUBLIC_BASE!}${returnPath}`}
      />
    </div>
  );
}
