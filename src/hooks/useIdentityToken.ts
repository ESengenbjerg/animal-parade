"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function useIdentityToken(): string | null {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = searchParams.get("identity_token");

    if (t) {
      setToken(t);

      // Remove token from URL for security & UX
      window.history.replaceState(null, "", "/");
    }
  }, [searchParams]);

  return token;
}
