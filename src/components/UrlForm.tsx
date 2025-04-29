
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { encodeUrl } from '@/services/api';
import { toast } from 'sonner';
import { isValidUrl } from '@/lib/utils';

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!longUrl) {
      toast.error('Please enter a URL');
      return;
    }

    if (!isValidUrl(longUrl)) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    try {
      const result = await encodeUrl(longUrl);
      setShortUrl(result.shortUrl);
      toast.success('URL shortened successfully!');
    } catch (error) {
      toast.error('Failed to shorten URL');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Shorten Your URL</CardTitle>
        <CardDescription>Enter a long URL to create a shortened version</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? 'Shortening...' : 'Shorten URL'}
            </Button>
          </div>
          
          {shortUrl && (
            <div className="p-4 bg-accent rounded-md mt-4">
              <div className="font-semibold mb-2">Your shortened URL:</div>
              <div className="flex items-center gap-2">
                <Input 
                  readOnly 
                  value={shortUrl} 
                  className="flex-1 bg-white" 
                />
                <Button 
                  onClick={copyToClipboard} 
                  variant="secondary"
                  className="whitespace-nowrap"
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default UrlForm;
