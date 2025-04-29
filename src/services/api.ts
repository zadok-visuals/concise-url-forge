
import { EncodeResponse, DecodeResponse, ListResponse, UrlStatistics } from '@/types/url';
import { generateSampleData, generateUrlStatistics } from '@/lib/utils';

// Mock implementation of localStorage for persistence in demo
const storageKey = 'url-shortener-data';

const getStoredUrls = () => {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    return JSON.parse(stored);
  }
  const sampleData = generateSampleData();
  localStorage.setItem(storageKey, JSON.stringify(sampleData));
  return sampleData;
};

const saveUrls = (urls: any[]) => {
  localStorage.setItem(storageKey, JSON.stringify(urls));
};

// API endpoint implementations
export async function encodeUrl(longUrl: string): Promise<EncodeResponse> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const urls = getStoredUrls();
      
      // Generate a unique path
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let urlPath = '';
      for (let i = 0; i < 6; i++) {
        urlPath += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      
      const shortUrl = `${window.location.origin}/${urlPath}`;
      
      const newUrl = {
        id: `url-${Date.now()}`,
        longUrl,
        shortUrl,
        urlPath,
        createdAt: new Date().toISOString(),
        visits: 0,
        referrers: {},
        browsers: {},
        devices: {}
      };
      
      urls.push(newUrl);
      saveUrls(urls);
      
      resolve({
        longUrl,
        shortUrl,
        urlPath
      });
    }, 500); // Simulated delay
  });
}

export async function decodeUrl(urlPath: string): Promise<DecodeResponse> {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const urls = getStoredUrls();
      const url = urls.find((u: any) => u.urlPath === urlPath);
      
      if (url) {
        resolve({
          longUrl: url.longUrl,
          shortUrl: url.shortUrl,
          urlPath
        });
      } else {
        reject(new Error('URL not found'));
      }
    }, 300);
  });
}

export async function getUrlStatistics(urlPath: string): Promise<UrlStatistics> {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const stats = generateUrlStatistics(urlPath);
        resolve(stats as UrlStatistics);
      } catch (error) {
        reject(new Error('Failed to get URL statistics'));
      }
    }, 800);
  });
}

export async function listUrls(): Promise<ListResponse> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const urls = getStoredUrls();
      resolve({ urls });
    }, 600);
  });
}

export async function redirectToLongUrl(urlPath: string): Promise<string> {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const urls = getStoredUrls();
      const url = urls.find((u: any) => u.urlPath === urlPath);
      
      if (url) {
        // Update visit count
        url.visits += 1;
        url.lastVisited = new Date().toISOString();
        
        // Update referrer info (in a real app this would come from the request)
        const referrer = document.referrer || 'Direct';
        url.referrers = {
          ...url.referrers,
          [referrer]: (url.referrers[referrer] || 0) + 1
        };
        
        // Update browser info
        const browser = detectBrowser();
        url.browsers = {
          ...url.browsers,
          [browser]: (url.browsers[browser] || 0) + 1
        };
        
        // Update device info
        const device = detectDevice();
        url.devices = {
          ...url.devices,
          [device]: (url.devices[device] || 0) + 1
        };
        
        saveUrls(urls);
        resolve(url.longUrl);
      } else {
        reject(new Error('URL not found'));
      }
    }, 300);
  });
}

// Helper functions for statistics
function detectBrowser() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
  if (userAgent.indexOf('Safari') > -1) return 'Safari';
  if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
  if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) return 'IE';
  if (userAgent.indexOf('Edge') > -1) return 'Edge';
  return 'Other';
}

function detectDevice() {
  const userAgent = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(userAgent)) return 'Mobile';
  if (/Android/.test(userAgent)) {
    return userAgent.indexOf('Mobile') > -1 ? 'Mobile' : 'Tablet';
  }
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'Tablet';
  return 'Desktop';
}
