import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import bs58 from "bs58";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { randomBytes } from "crypto";
import { SigninMessage } from "../utils/signMessage";

const useAuth = () => {
  const wallet = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const walletModal = useWalletModal();

  const handleSignIn = async () => {
    try {
      if (!wallet.connected) {
        walletModal.setVisible(true);
        setIsConnecting(true);
        return;
      }

      const result = await signMessage();
      if (!result) {
        console.error("Sign-in error");
      } else {
        const walletAddress = wallet.publicKey?.toBase58();
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ walletAddress }),
        });
        const data = await response.json();
        if (data.success) {
          console.log("User data:", data);
        } else {
          console.error("Error retrieving or creating user:", data.error);
        }

        setIsConnecting(false);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setIsConnecting(false);
    }
  };

  const handleSignOut = async () => {
    wallet.disconnect();
  };

  const signMessage = async () => {
    if (!wallet.publicKey || !wallet.signMessage) return;

    const message = new SigninMessage({
      domain: window.location.host,
      publicKey: wallet.publicKey?.toBase58(),
      statement: `Sign this message to sign in to Project Scout.`,
      nonce: randomBytes(4).toString(),
    });

    const data = new TextEncoder().encode(message.prepare());
    const signature = await wallet.signMessage(data);
    const serializedSignature = bs58.encode(signature);

    return serializedSignature;
  };

  useEffect(() => {
    if (isConnecting && wallet.connected) {
      handleSignIn();
    }
  }, [wallet.connected, isConnecting]);

  return {
    isConnecting,

    handleSignIn,
    handleSignOut,
  };
};

export default useAuth;
