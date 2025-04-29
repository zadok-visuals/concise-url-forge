
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';
import { UrlData } from '@/types/url';

interface UrlListProps {
  urls: UrlData[];
  isLoading: boolean;
}

const UrlList: React.FC<UrlListProps> = ({ urls, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUrls = urls.filter(url => 
    searchQuery.length < 3 || url.longUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <Card className="w-full">
      <div className="p-4 border-b">
        <Input
          placeholder="Search URLs (enter at least 3 characters)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Original URL</TableHead>
              <TableHead>Short URL</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Visits</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <div className="h-8 w-full rounded shimmer"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : filteredUrls.length > 0 ? (
              filteredUrls.map((url) => (
                <TableRow key={url.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {url.longUrl}
                  </TableCell>
                  <TableCell>{url.shortUrl}</TableCell>
                  <TableCell>{formatDate(url.createdAt)}</TableCell>
                  <TableCell>{url.visits}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(url.shortUrl)}
                    >
                      Copy
                    </Button>
                    <Link to={`/statistics/${url.urlPath}`}>
                      <Button variant="secondary" size="sm">
                        Stats
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  {searchQuery.length >= 3 ? 'No URLs matching your search' : 'No URLs found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default UrlList;
