export interface ProductView {
  id: string;
  product_id: string;
  product_name: string;
  viewed_at: string;
  session_id?: string;
}

export interface SearchQuery {
  id: string;
  query: string;
  results_count: number;
  searched_at: string;
}

export interface AnalyticsSummary {
  total_product_views: number;
  total_inquiries: number;
  total_searches: number;
  popular_products: PopularProduct[];
  recent_searches: SearchQuery[];
  inquiry_trends: InquiryTrend[];
}

export interface PopularProduct {
  product_id: string;
  product_name: string;
  view_count: number;
  inquiry_count: number;
}

export interface InquiryTrend {
  date: string;
  count: number;
  status_breakdown: {
    new: number;
    contacted: number;
    resolved: number;
    cancelled: number;
  };
}
