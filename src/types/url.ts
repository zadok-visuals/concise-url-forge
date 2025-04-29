
export interface UrlData {
  id: string;
  longUrl: string;
  shortUrl: string;
  urlPath: string;
  createdAt: string;
  visits: number;
  lastVisited?: string;
  referrers?: Record<string, number>;
  browsers?: Record<string, number>;
  devices?: Record<string, number>;
}

export interface UrlStatistics {
  urlPath: string;
  longUrl: string;
  shortUrl: string;
  createdAt: string;
  visits: number;
  lastVisited?: string;
  referrers: Record<string, number>;
  browsers: Record<string, number>;
  devices: Record<string, number>;
  dailyVisits: {
    date: string;
    count: number;
  }[];
}

export interface EncodeResponse {
  longUrl: string;
  shortUrl: string;
  urlPath: string;
}

export interface DecodeResponse {
  longUrl: string;
  shortUrl: string;
  urlPath: string;
}

export interface ListResponse {
  urls: UrlData[];
}
