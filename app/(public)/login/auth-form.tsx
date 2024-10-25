"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@/app/lib/supabase/client";
import useAuth from "@/app/hooks/useAuth";

export function AuthForm({ returnPath = "/" }: { returnPath?: string }) {
  const client = createClient();
  const { handleSignIn } = useAuth();

  return (
    <div className="card flex flex-col items-center p-4 shadow-lg rounded-lg bg-white">
      <span onClick={handleSignIn}>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-md transition duration-300 ease-in-out hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Connect Wallet
        </button>
      </span>
      <div className="mt-4 w-full">
        <Auth
          magicLink
          view={"magic_link"}
          supabaseClient={client}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "apple"]}
          redirectTo={`${process.env.NEXT_PUBLIC_BASE!}${returnPath}`}
        />
      </div>
    </div>
  );
}
