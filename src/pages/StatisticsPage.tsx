
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/StatsCard';
import { getUrlStatistics } from '@/services/api';
import { UrlStatistics } from '@/types/url';
import { formatDate, getRelativeTime } from '@/lib/utils';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const StatisticsPage = () => {
  const { urlPath } = useParams<{ urlPath: string }>();
  const [stats, setStats] = useState<UrlStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStatistics() {
      if (!urlPath) return;
      
      try {
        const data = await getUrlStatistics(urlPath);
        setStats(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        toast.error('Failed to fetch URL statistics');
      } finally {
        setIsLoading(false);
      }
    }

    fetchStatistics();
  }, [urlPath]);

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  // Convert object data to array for charts
  const prepareChartData = (data: Record<string, number> = {}) => {
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  };

  const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#f43f5e', '#f59e0b', '#10b981'];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Statistics not found</h2>
          <p className="mt-2 text-muted-foreground">The URL you're looking for doesn't exist or has been removed.</p>
          <Link to="/urls">
            <Button variant="outline" className="mt-4">Back to My URLs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold">URL Statistics</h1>
            <p className="text-muted-foreground">
              Detailed analytics for your shortened URL
            </p>
          </div>
          <Link to="/urls">
            <Button variant="outline">Back to My URLs</Button>
          </Link>
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div>
                <h3 className="font-semibold">Original URL</h3>
                <p className="break-all text-sm">{stats.longUrl}</p>
              </div>
              <div>
                <h3 className="font-semibold">Shortened URL</h3>
                <div className="flex items-center gap-2">
                  <p className="break-all text-sm">{stats.shortUrl}</p>
                  <Button 
                    onClick={() => copyToClipboard(stats.shortUrl)} 
                    variant="ghost" 
                    size="sm"
                  >
                    Copy
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Created</h3>
                <p className="text-sm">{formatDate(stats.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Total Clicks"
          value={stats.visits}
          description="All-time URL visits"
        />
        {stats.lastVisited && (
          <StatsCard 
            title="Last Clicked"
            value={getRelativeTime(stats.lastVisited)}
          />
        )}
        <StatsCard 
          title="Top Referrer"
          value={Object.entries(stats.referrers).sort((a, b) => b[1] - a[1])[0]?.[0] || "None"}
          description={`${Object.entries(stats.referrers).sort((a, b) => b[1] - a[1])[0]?.[1] || 0} visits`}
        />
        <StatsCard 
          title="Top Device"
          value={Object.entries(stats.devices).sort((a, b) => b[1] - a[1])[0]?.[0] || "None"}
          description={`${Object.entries(stats.devices).sort((a, b) => b[1] - a[1])[0]?.[1] || 0} visits`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Daily Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.dailyVisits}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => date.split('-').slice(1).join('/')} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} clicks`, 'Visits']} />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prepareChartData(stats.referrers)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {prepareChartData(stats.referrers).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} clicks`, 'Visits']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Browsers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prepareChartData(stats.browsers)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {prepareChartData(stats.browsers).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} clicks`, 'Visits']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prepareChartData(stats.devices)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {prepareChartData(stats.devices).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} clicks`, 'Visits']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPage;
