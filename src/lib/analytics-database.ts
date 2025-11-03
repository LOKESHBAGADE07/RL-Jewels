import { supabase } from './supabase';
import { ProductView, SearchQuery, AnalyticsSummary, InquiryTrend } from '../types/analytics';

export async function trackProductView(productId: string, productName: string): Promise<void> {
  try {
    const sessionId = getSessionId();
    await supabase.from('product_views').insert({
      product_id: productId,
      product_name: productName,
      session_id: sessionId,
      viewed_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Failed to track product view:', err);
  }
}

export async function trackSearch(query: string, resultsCount: number): Promise<void> {
  try {
    await supabase.from('search_queries').insert({
      query,
      results_count: resultsCount,
      searched_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Failed to track search:', err);
  }
}

export async function getProductViews(days: number = 30): Promise<ProductView[]> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('product_views')
    .select('*')
    .gte('viewed_at', startDate.toISOString())
    .order('viewed_at', { ascending: false });

  if (error) {
    console.error('Error fetching product views:', error);
    throw new Error(`Failed to fetch product views: ${error.message}`);
  }

  return data || [];
}

export async function getSearchQueries(days: number = 30): Promise<SearchQuery[]> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('search_queries')
    .select('*')
    .gte('searched_at', startDate.toISOString())
    .order('searched_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error('Error fetching search queries:', error);
    throw new Error(`Failed to fetch search queries: ${error.message}`);
  }

  return data || [];
}

export async function getAnalyticsSummary(days: number = 30): Promise<AnalyticsSummary> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const startDateStr = startDate.toISOString();

  const [viewsResult, inquiriesResult, searchesResult] = await Promise.all([
    supabase.from('product_views').select('*', { count: 'exact', head: true }).gte('viewed_at', startDateStr),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }).gte('created_at', startDateStr),
    supabase.from('search_queries').select('*', { count: 'exact', head: true }).gte('searched_at', startDateStr),
  ]);

  const popularProducts = await getPopularProducts(days);
  const recentSearches = await getSearchQueries(7);
  const inquiryTrends = await getInquiryTrends(days);

  return {
    total_product_views: viewsResult.count || 0,
    total_inquiries: inquiriesResult.count || 0,
    total_searches: searchesResult.count || 0,
    popular_products: popularProducts,
    recent_searches: recentSearches.slice(0, 10),
    inquiry_trends: inquiryTrends as InquiryTrend[],
  };
}

export async function getPopularProducts(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data: viewData } = await supabase
    .from('product_views')
    .select('product_id, product_name')
    .gte('viewed_at', startDate.toISOString());

  const viewCounts = (viewData || []).reduce((acc: any, view) => {
    if (!acc[view.product_id]) {
      acc[view.product_id] = {
        product_id: view.product_id,
        product_name: view.product_name,
        view_count: 0,
      };
    }
    acc[view.product_id].view_count++;
    return acc;
  }, {});

  const { data: inquiryData } = await supabase
    .from('inquiries')
    .select('product_interest')
    .gte('created_at', startDate.toISOString())
    .not('product_interest', 'is', null);

  const inquiryCounts = (inquiryData || []).reduce((acc: any, inq) => {
    const product = inq.product_interest;
    if (!acc[product]) {
      acc[product] = 0;
    }
    acc[product]++;
    return acc;
  }, {});

  const combined = Object.values(viewCounts).map((item: any) => ({
    ...item,
    inquiry_count: inquiryCounts[item.product_name] || 0,
  }));

  return combined
    .sort((a: any, b: any) => b.view_count - a.view_count)
    .slice(0, 10);
}

export async function getInquiryTrends(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data } = await supabase
    .from('inquiries')
    .select('created_at, status')
    .gte('created_at', startDate.toISOString());

  if (!data) return [];

  const trends: any = {};
  data.forEach((inquiry) => {
    const date = new Date(inquiry.created_at).toISOString().split('T')[0];
    if (!trends[date]) {
      trends[date] = {
        date,
        count: 0,
        status_breakdown: { new: 0, contacted: 0, resolved: 0, cancelled: 0 },
      };
    }
    trends[date].count++;
    trends[date].status_breakdown[inquiry.status as keyof typeof trends[string]['status_breakdown']]++;
  });

  return Object.values(trends).sort((a: any, b: any) => a.date.localeCompare(b.date));
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}
