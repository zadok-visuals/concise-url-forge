
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ApiCodeBlock from '@/components/ApiCodeBlock';

const ApiDocsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
        <p className="text-muted-foreground">
          Use our API to programmatically create, manage, and track shortened URLs.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Our URL Shortener API allows you to programmatically shorten URLs, decode shortened URLs,
            retrieve statistics, and list all URLs. All API endpoints use JSON for requests and responses.
          </p>
          <p className="mb-4">
            <strong>Base URL:</strong> <code className="bg-muted px-1 py-0.5 rounded">{window.location.origin}/api</code>
          </p>
          <p>
            All API requests should be made to this base URL followed by the specific endpoint path.
          </p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Endpoints</h2>

      <ApiCodeBlock
        title="Encode URL"
        endpoint="/api/encode"
        method="POST"
        description="Converts a long URL into a shortened URL."
        requestBody={`{
  "url": "https://example.com/very/long/url/that/needs/shortening"
}`}
        responseBody={`{
  "longUrl": "https://example.com/very/long/url/that/needs/shortening",
  "shortUrl": "${window.location.origin}/GeAi9K",
  "urlPath": "GeAi9K"
}`}
      />

      <ApiCodeBlock
        title="Decode URL"
        endpoint="/api/decode"
        method="GET"
        description="Retrieves the original long URL from a shortened URL path."
        requestBody={`{
  "urlPath": "GeAi9K"
}`}
        responseBody={`{
  "longUrl": "https://example.com/very/long/url/that/needs/shortening",
  "shortUrl": "${window.location.origin}/GeAi9K",
  "urlPath": "GeAi9K"
}`}
      />

      <ApiCodeBlock
        title="URL Statistics"
        endpoint="/api/statistic/{url_path}"
        method="GET"
        description="Retrieves statistical information about a shortened URL."
        responseBody={`{
  "urlPath": "GeAi9K",
  "longUrl": "https://example.com/very/long/url/that/needs/shortening",
  "shortUrl": "${window.location.origin}/GeAi9K",
  "createdAt": "2023-04-12T15:30:45.123Z",
  "visits": 1024,
  "lastVisited": "2023-05-01T18:22:10.456Z",
  "referrers": {
    "Google": 512,
    "Direct": 256,
    "Twitter": 128,
    "Facebook": 64,
    "Other": 64
  },
  "browsers": {
    "Chrome": 640,
    "Firefox": 210,
    "Safari": 102,
    "Edge": 72
  },
  "devices": {
    "Desktop": 716,
    "Mobile": 256,
    "Tablet": 52
  },
  "dailyVisits": [
    { "date": "2023-04-12", "count": 52 },
    { "date": "2023-04-13", "count": 86 },
    ...
  ]
}`}
      />

      <ApiCodeBlock
        title="List URLs"
        endpoint="/api/list"
        method="GET"
        description="Retrieves a list of all shortened URLs."
        responseBody={`{
  "urls": [
    {
      "id": "url-1",
      "longUrl": "https://example.com/very/long/url/that/needs/shortening",
      "shortUrl": "${window.location.origin}/GeAi9K",
      "urlPath": "GeAi9K",
      "createdAt": "2023-04-12T15:30:45.123Z",
      "visits": 1024,
      "lastVisited": "2023-05-01T18:22:10.456Z"
    },
    {
      "id": "url-2",
      "longUrl": "https://another-example.org/some/path",
      "shortUrl": "${window.location.origin}/Ab3x9Z",
      "urlPath": "Ab3x9Z",
      "createdAt": "2023-04-15T09:20:15.789Z",
      "visits": 572,
      "lastVisited": "2023-04-30T22:15:36.123Z"
    }
  ]
}`}
      />

      <ApiCodeBlock
        title="Redirect"
        endpoint="/{url_path}"
        method="GET"
        description="Redirects to the original long URL. This endpoint is used for the actual URL shortening service."
        responseBody="HTTP/1.1 302 Found\nLocation: https://example.com/very/long/url/that/needs/shortening"
      />
    </div>
  );
};

export default ApiDocsPage;
