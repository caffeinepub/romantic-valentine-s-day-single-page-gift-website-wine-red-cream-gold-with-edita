import { useEffect, useState } from 'react';

/**
 * Hook that reads and tracks the caffeineAdminToken from window.location.hash
 * Returns the token value if present, or null if not found
 */
export function useAdminTokenFromHash(): string | null {
  const [adminToken, setAdminToken] = useState<string | null>(null);

  useEffect(() => {
    const extractToken = () => {
      const hash = window.location.hash;
      const match = hash.match(/caffeineAdminToken=([a-f0-9]+)/);
      setAdminToken(match ? match[1] : null);
    };

    // Extract on mount
    extractToken();

    // Listen for hash changes
    const handleHashChange = () => {
      extractToken();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return adminToken;
}
