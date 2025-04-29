
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { redirectToLongUrl } from '@/services/api';

const RedirectPage = () => {
  const { urlPath } = useParams<{ urlPath: string }>();
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!urlPath) {
      setError("URL path is missing");
      return;
    }

    let countdownTimer: NodeJS.Timeout;
    
    const redirect = async () => {
      try {
        const longUrl = await redirectToLongUrl(urlPath);
        
        // Start countdown
        countdownTimer = setInterval(() => {
          setCountdown((prev) => {
            const newCount = prev - 1;
            if (newCount <= 0) {
              window.location.href = longUrl;
              clearInterval(countdownTimer);
            }
            return newCount;
          });
        }, 1000);
        
      } catch (error) {
        console.error('Redirect error:', error);
        setError('The URL you are trying to access does not exist or has been removed.');
      }
    };

    redirect();

    return () => {
      if (countdownTimer) clearInterval(countdownTimer);
    };
  }, [urlPath]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4">Link Not Found</h1>
          <p className="mb-6 text-muted-foreground">{error}</p>
          <Link to="/">
            <Button>Go to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Redirecting you</h1>
        <p className="mb-6 text-muted-foreground">
          You'll be redirected to your destination in {countdown} seconds...
        </p>
      </div>
    </div>
  );
};

export default RedirectPage;
