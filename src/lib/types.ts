// PageSpeed API Response Types
export interface PageSpeedResponse {
  id: string;
  responseCode: number;
  title: string;
  ruleGroups: {
    SPEED: { score: number };
    USABILITY: { score: number };
    ACCESSIBILITY?: { score: number };
    BEST_PRACTICES?: { score: number };
    SEO?: { score: number };
  };
  pageStats: {
    numberResources: number;
    numberHosts: number;
    totalRequestBytes: number;
    numberStaticResources: number;
    htmlResponseBytes: number;
    cssResponseBytes: number;
    imageResponseBytes: number;
    javascriptResponseBytes: number;
    otherResponseBytes: number;
    numberJsResources: number;
    numberCssResources: number;
  };
  formattedResults: {
    ruleResults: {
      [key: string]: {
        localizedRuleName: string;
        ruleImpact: number;
        groups: string[];
        summary: string;
        urlBlocks?: Array<{
          header: { format: string; args: Array<{ type: string; value: string }> };
          urls: Array<{ result: { format: string; args: Array<{ type: string; value: string }> } }>;
        }>;
      };
    };
  };
  version: {
    major: number;
    minor: number;
  };
}

// Our App's Audit Types
export interface AuditRequest {
  url: string;
  device: 'mobile' | 'desktop';
}

export interface AuditResult {
  auditId: string;
  url: string;
  device: 'mobile' | 'desktop';
  timestamp: string;
  status: 'processing' | 'completed' | 'failed';
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  metrics: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    cumulativeLayoutShift: number;
    speedIndex: number;
    totalBlockingTime: number;
  };
  issues: Array<{
    id: string;
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    category: 'performance' | 'accessibility' | 'seo' | 'best-practices';
  }>;
  pageStats: {
    totalResources: number;
    totalBytes: number;
    imageBytes: number;
    cssBytes: number;
    jsBytes: number;
    htmlBytes: number;
  };
}

export interface AuditHistory {
  [auditId: string]: AuditResult;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 