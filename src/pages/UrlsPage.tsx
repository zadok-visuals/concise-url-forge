
import React, { useEffect, useState } from 'react';
import UrlList from '@/components/UrlList';
import { listUrls } from '@/services/api';
import { UrlData } from '@/types/url';
import { toast } from 'sonner';

const UrlsPage = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUrls() {
      try {
        const response = await listUrls();
        setUrls(response.urls);
      } catch (error) {
        console.error('Error fetching URLs:', error);
        toast.error('Failed to fetch URLs');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUrls();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My URLs</h1>
        <p className="text-muted-foreground">
          Manage and track all your shortened URLs. Search, copy, or view statistics for any URL.
        </p>
      </div>

      <UrlList urls={urls} isLoading={isLoading} />
    </div>
  );
};

export default UrlsPage;
