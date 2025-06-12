"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { AssetStatusProvider } from "./contexts/AssetStatusContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AssetStatusProvider>{children}</AssetStatusProvider>
    </SessionProvider>
  );
}
