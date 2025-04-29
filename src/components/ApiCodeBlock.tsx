
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ApiCodeBlockProps {
  title: string;
  endpoint: string;
  method: string;
  description: string;
  requestBody?: string;
  responseBody: string;
}

const ApiCodeBlock: React.FC<ApiCodeBlockProps> = ({
  title,
  endpoint,
  method,
  description,
  requestBody,
  responseBody,
}) => {
  const [showResponse, setShowResponse] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="border rounded-md overflow-hidden mb-8">
      <div className="bg-muted p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center mt-2 space-x-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            method === 'GET' ? 'bg-blue-100 text-blue-800' : 
            method === 'POST' ? 'bg-green-100 text-green-800' : 
            'bg-purple-100 text-purple-800'
          }`}>
            {method}
          </span>
          <code className="text-sm bg-secondary px-2 py-1 rounded">{endpoint}</code>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>

      {requestBody && (
        <div className="border-t">
          <div className="flex items-center justify-between bg-secondary/50 px-4 py-2">
            <h4 className="text-sm font-medium">Request Body</h4>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => copyToClipboard(requestBody)}
            >
              Copy
            </Button>
          </div>
          <pre className="bg-slate-950 text-slate-50 p-4 text-sm overflow-x-auto">
            {requestBody}
          </pre>
        </div>
      )}

      <div className="border-t">
        <div className="flex items-center justify-between bg-secondary/50 px-4 py-2">
          <h4 className="text-sm font-medium">Response</h4>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowResponse(!showResponse)}
            >
              {showResponse ? 'Hide' : 'Show'}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => copyToClipboard(responseBody)}
            >
              Copy
            </Button>
          </div>
        </div>
        {showResponse && (
          <pre className="bg-slate-950 text-slate-50 p-4 text-sm overflow-x-auto">
            {responseBody}
          </pre>
        )}
      </div>
    </div>
  );
};

export default ApiCodeBlock;
