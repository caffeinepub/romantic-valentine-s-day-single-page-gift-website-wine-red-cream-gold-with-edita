import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Rocket, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useActor } from '@/hooks/useActor';

type PublishStatus = 'idle' | 'publishing' | 'success' | 'error';

export function PublishDraftBar() {
  const { actor } = useActor();
  const [status, setStatus] = useState<PublishStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handlePublish = async () => {
    if (!actor) {
      setStatus('error');
      setErrorMessage('Backend actor not available');
      return;
    }

    setStatus('publishing');
    setErrorMessage('');

    try {
      await actor.publishDraftToProduction();
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to publish draft');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-wine-600 to-wine-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            <span className="font-semibold">Draft Mode</span>
          </div>

          <div className="flex items-center gap-3">
            {status === 'success' && (
              <Alert className="bg-green-50 border-green-200 text-green-800 py-2 px-3">
                <CheckCircle2 className="w-4 h-4 inline mr-2" />
                <AlertDescription className="inline">
                  Published! Hard refresh your live site (Shift + Reload) or open in incognito to see changes.
                </AlertDescription>
              </Alert>
            )}

            {status === 'error' && (
              <Alert className="bg-red-50 border-red-200 text-red-800 py-2 px-3">
                <AlertCircle className="w-4 h-4 inline mr-2" />
                <AlertDescription className="inline">
                  {errorMessage || 'Failed to publish'}
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handlePublish}
              disabled={status === 'publishing' || !actor}
              className="bg-white text-wine-700 hover:bg-cream-100 font-semibold"
            >
              {status === 'publishing' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4 mr-2" />
                  Publish to Production
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
