
import React from 'react';
import UrlForm from '@/components/UrlForm';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Shorten and Track Your URLs
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create shortened links with our powerful URL shortening service.
          Monitor traffic and gather insights with detailed analytics.
        </p>
      </div>
      
      <UrlForm />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Simple URL Shortening</h3>
          <p className="text-muted-foreground">
            Transform long, unwieldy links into clean, memorable and trackable URLs in just a few seconds.
          </p>
        </div>
        
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-2">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Detailed Analytics</h3>
          <p className="text-muted-foreground">
            Get valuable insights into your audience with comprehensive click tracking and detailed visitor statistics.
          </p>
        </div>
        
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Developer API</h3>
          <p className="text-muted-foreground">
            Integrate our URL shortening service into your applications with our simple and powerful REST API.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
