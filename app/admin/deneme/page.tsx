"use client";

import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
  ViewMagicLink,
} from "@supabase/auth-ui-shared";

import { createClient } from "@/app/lib/supabase/client";

export default function Anan() {
  const client = createClient();

  return (
    <Auth
      magicLink
      view={"magic_link"}
      supabaseClient={client}
      appearance={{ theme: ThemeSupa }}
    />
  );
}
