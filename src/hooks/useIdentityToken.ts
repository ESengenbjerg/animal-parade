"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Custom hook - fetch identity token from query
export function useIdentityToken(): string | null {
  // Fetch query from URL
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null); // Null as default

  useEffect(() => {
    // Fetch token from query
    const t = searchParams.get("identity_token");

    // If token exists, save it and remove it from URL
    if (t) {
      setToken(t);

      // Remove token from URL for security & UX
      window.history.replaceState(null, "", "/");
    }
  }, [searchParams]);

  return token;
}
