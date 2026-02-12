import { useState, useCallback } from 'react';

type CopyStatus = 'idle' | 'success' | 'error';

export function useClipboardCopy() {
  const [status, setStatus] = useState<CopyStatus>('idle');

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  }, []);

  return { copyToClipboard, status };
}
