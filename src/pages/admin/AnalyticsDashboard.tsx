import React, { useState, useEffect } from 'react';
import { FiEye, FiSearch, FiMessageSquare, FiTrendingUp, FiBarChart2 } from 'react-icons/fi';
import { getAnalyticsSummary } from '../../lib/analytics-database';
import { AnalyticsSummary } from '../../types/analytics';

const AnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<number>(30);

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getAnalyticsSummary(timeRange);
      setAnalytics(data);
      setError(null);
    } catch (err) {
      setError('Failed to load analytics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-ink-900">Analytics Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(Number(e.target.value))}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
        >
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiEye className="text-2xl text-blue-600" />
                </div>
                <FiTrendingUp className="text-green-600" />
              </div>
              <h3 className="text-neutral-600 text-sm mb-1">Total Product Views</h3>
              <p className="text-3xl font-bold text-ink-900">{analytics.total_product_views}</p>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FiMessageSquare className="text-2xl text-green-600" />
                </div>
                <FiTrendingUp className="text-green-600" />
              </div>
              <h3 className="text-neutral-600 text-sm mb-1">Total Inquiries</h3>
              <p className="text-3xl font-bold text-ink-900">{analytics.total_inquiries}</p>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FiSearch className="text-2xl text-purple-600" />
                </div>
                <FiTrendingUp className="text-green-600" />
              </div>
              <h3 className="text-neutral-600 text-sm mb-1">Total Searches</h3>
              <p className="text-3xl font-bold text-ink-900">{analytics.total_searches}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FiBarChart2 className="text-brand-red" />
                <h2 className="text-xl font-semibold text-ink-900">Popular Products</h2>
              </div>
              {analytics.popular_products.length === 0 ? (
                <p className="text-neutral-600 text-center py-8">No product data yet</p>
              ) : (
                <div className="space-y-3">
                  {analytics.popular_products.map((product, index) => (
                    <div key={product.product_id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-red text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-ink-900">{product.product_name}</p>
                          <p className="text-sm text-neutral-600">
                            {product.view_count} views • {product.inquiry_count} inquiries
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-brand-red">{product.view_count}</div>
                        <div className="text-xs text-neutral-600">views</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FiSearch className="text-brand-red" />
                <h2 className="text-xl font-semibold text-ink-900">Recent Searches</h2>
              </div>
              {analytics.recent_searches.length === 0 ? (
                <p className="text-neutral-600 text-center py-8">No search data yet</p>
              ) : (
                <div className="space-y-2">
                  {analytics.recent_searches.map((search) => (
                    <div key={search.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FiSearch className="text-neutral-400" />
                        <span className="text-ink-900">{search.query}</span>
                      </div>
                      <div className="text-sm text-neutral-600">
                        {search.results_count} results
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiTrendingUp className="text-brand-red" />
              <h2 className="text-xl font-semibold text-ink-900">Inquiry Trends</h2>
            </div>
            {analytics.inquiry_trends.length === 0 ? (
              <p className="text-neutral-600 text-center py-8">No inquiry data yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Date</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">Total</th>
                      <th className="text-center py-3 px-4 font-semibold text-blue-700">New</th>
                      <th className="text-center py-3 px-4 font-semibold text-yellow-700">Contacted</th>
                      <th className="text-center py-3 px-4 font-semibold text-green-700">Resolved</th>
                      <th className="text-center py-3 px-4 font-semibold text-red-700">Cancelled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.inquiry_trends.map((trend) => (
                      <tr key={trend.date} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 text-ink-900">
                          {new Date(trend.date).toLocaleDateString()}
                        </td>
                        <td className="text-center py-3 px-4 font-semibold">{trend.count}</td>
                        <td className="text-center py-3 px-4 text-blue-700">{trend.status_breakdown.new}</td>
                        <td className="text-center py-3 px-4 text-yellow-700">{trend.status_breakdown.contacted}</td>
                        <td className="text-center py-3 px-4 text-green-700">{trend.status_breakdown.resolved}</td>
                        <td className="text-center py-3 px-4 text-red-700">{trend.status_breakdown.cancelled}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
