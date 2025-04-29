
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  return formatDate(dateString);
}

// Sample data generator for the demo
export function generateSampleData() {
  // This is a mock implementation for the demo
  const domains = [
    'example.com',
    'mywebsite.org',
    'bigcompany.com',
    'techblog.io',
    'news-site.com',
    'shopping-mall.store',
    'photo-sharing.net'
  ];
  
  const paths = [
    '/articles/how-to-code',
    '/products/best-sellers',
    '/blog/tech-trends-2023',
    '/services/premium-subscription',
    '/about/our-team',
    '/events/annual-conference',
    '/gallery/winter-collection'
  ];
  
  // Generate 15 sample URLs
  return Array(15).fill(0).map((_, index) => {
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const path = paths[Math.floor(Math.random() * paths.length)];
    const longUrl = `https://www.${domain}${path}/${index + 1}`;
    const urlPath = generateUrlPath();
    const shortUrl = `${window.location.origin}/${urlPath}`;
    const createdAt = generateRandomDate(new Date('2023-01-01'), new Date()).toISOString();
    const visits = Math.floor(Math.random() * 1000);
    const lastVisited = visits > 0 ? generateRandomDate(new Date(createdAt), new Date()).toISOString() : undefined;
    
    return {
      id: `url-${index + 1}`,
      longUrl,
      shortUrl,
      urlPath,
      createdAt,
      visits,
      lastVisited,
      referrers: {
        'Google': Math.floor(Math.random() * 100),
        'Direct': Math.floor(Math.random() * 50),
        'Twitter': Math.floor(Math.random() * 30),
        'Facebook': Math.floor(Math.random() * 20),
      },
      browsers: {
        'Chrome': Math.floor(Math.random() * 60),
        'Firefox': Math.floor(Math.random() * 20),
        'Safari': Math.floor(Math.random() * 15),
        'Edge': Math.floor(Math.random() * 5),
      },
      devices: {
        'Desktop': Math.floor(Math.random() * 70),
        'Mobile': Math.floor(Math.random() * 25),
        'Tablet': Math.floor(Math.random() * 5),
      }
    };
  });
}

// Generate a random URL path like "Ab3x9Z"
function generateUrlPath(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate a random date between start and end
function generateRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate statistics for a URL
export function generateUrlStatistics(urlPath: string) {
  const sampleData = generateSampleData();
  const urlData = sampleData.find(url => url.urlPath === urlPath) || sampleData[0];
  
  // Generate daily visits for the last 30 days
  const dailyVisits = Array(30).fill(0).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - index));
    return {
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 50)
    };
  });
  
  return {
    ...urlData,
    dailyVisits
  };
}
