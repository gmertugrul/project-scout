"use client";

import { Montserrat } from "next/font/google";
import "./globals.css";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { UserProvider } from "@/app/user-context";

/* Solana Wallet Connection & Adapters */
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
require("@solana/wallet-adapter-react-ui/styles.css");

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  // const user = await getSessionUser(cookies());

  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network]
  );

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <UserProvider user={null}>{children}</UserProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
