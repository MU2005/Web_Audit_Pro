"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ScoreCard, scoreCardConfigs } from "../../components/cards";
import { ChartDisplay } from "../../components/charts";
import { IssueList } from "../../components/ui";
import { BarChart3, CalendarDays, Share2, Copy, RefreshCw } from "lucide-react";
import { ToastContainer, ToastProps } from "../../components/ui";

// Define the audit result interface
interface AuditResult {
  id: string;
  url: string;
  device: string;
  timestamp: string;
  scores: {
    performance: number;
    seo: number;
    security: number;
    accessibility: number;
  };
  issues: Array<{
    id: string;
    type: 'error' | 'warning' | 'info';
    title: string;
    description: string;
    category: 'performance' | 'seo' | 'security' | 'accessibility';
    priority: 'high' | 'medium' | 'low';
    impact?: string;
    suggestion?: string;
  }>;
  metrics: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    totalBlockingTime: number;
  };
}

export default function ResultsClient() {
  const [auditData, setAuditData] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadAuditData = () => {
      try {
        const storedAudit = localStorage.getItem('currentAudit');
        if (storedAudit) {
          const parsedAudit = JSON.parse(storedAudit);
          setAuditData(parsedAudit);
          setLoading(false);
          return;
        }
        
        // Generate sample audit data if no stored audit
        const sampleAudit: AuditResult = {
          id: 'sample-audit-' + Date.now(),
          url: 'example.com',
          device: 'desktop',
          timestamp: new Date().toISOString(),
          scores: {
            performance: 85,
            seo: 92,
            security: 78,
            accessibility: 88
          },
          issues: [
            {
              id: 'issue-1',
              type: 'warning',
              title: 'Slow First Contentful Paint',
              description: 'Your website takes too long to display the first content. Consider optimizing images and reducing render-blocking resources.',
              category: 'performance',
              priority: 'medium',
              impact: 'Affects user experience and Core Web Vitals',
              suggestion: 'Optimize images, minimize CSS/JS, use CDN'
            },
            {
              id: 'issue-2',
              type: 'error',
              title: 'Missing Meta Description',
              description: 'Your page is missing a meta description tag, which is important for SEO.',
              category: 'seo',
              priority: 'high',
              impact: 'Reduces search engine visibility',
              suggestion: 'Add a compelling meta description under 160 characters'
            },
            {
              id: 'issue-3',
              type: 'warning',
              title: 'Insecure HTTP Connection',
              description: 'Your website is not using HTTPS, which can affect security and SEO.',
              category: 'security',
              priority: 'high',
              impact: 'Security vulnerability and SEO penalty',
              suggestion: 'Implement SSL certificate and redirect HTTP to HTTPS'
            },
            {
              id: 'issue-4',
              type: 'info',
              title: 'Missing Alt Text on Images',
              description: 'Some images lack alt text, which affects accessibility for screen readers.',
              category: 'accessibility',
              priority: 'medium',
              impact: 'Reduces accessibility for visually impaired users',
              suggestion: 'Add descriptive alt text to all images'
            }
          ],
          metrics: {
            firstContentfulPaint: 1.8,
            largestContentfulPaint: 2.4,
            cumulativeLayoutShift: 0.12,
            totalBlockingTime: 180
          }
        };
        
        setAuditData(sampleAudit);
        setLoading(false);
      } catch {
        setError('Failed to load audit data');
        setLoading(false);
      }
    };
    loadAuditData();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Loading audit results...</p>
        </div>
      </div>
    );
  }

  if (error || !auditData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Error Loading Results</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">{error || 'No audit data available'}</p>
          <Link 
            href="/" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base touch-target"
          >
            Start New Audit
          </Link>
        </div>
      </div>
    );
  }

  // Calculate overall score (average)
  const { scores, url, device, timestamp } = auditData;
  const overallScore = Math.round((scores.performance + scores.seo + scores.security + scores.accessibility) / 4);
  const deviceLabel = device === 'mobile' ? 'Mobile' : 'Desktop';

  const addToast = (toast: Omit<ToastProps, 'id' | 'onDismiss'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id, onDismiss: dismissToast }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: 'WebAudit Pro Report',
        text: `Website audit results for ${url}`,
        url: window.location.href,
      };
      
      if (navigator.share) {
        await navigator.share(shareData);
        addToast({ type: 'success', title: 'Shared Successfully!', message: 'Your audit results have been shared.' });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        addToast({ type: 'success', title: 'Link Copied!', message: 'Audit link copied to clipboard.' });
      }
    } catch {
      console.error('Share failed');
      addToast({ type: 'error', title: 'Share Failed', message: 'Please try again.' });
    }
  };

  const handleCopyResults = async () => {
    try {
      const resultsText = `
WebAudit Pro Results for ${url}
Device: ${deviceLabel}
Overall Score: ${overallScore}/100

Performance: ${scores.performance}/100
SEO: ${scores.seo}/100
Security: ${scores.security}/100
Accessibility: ${scores.accessibility}/100

Generated: ${new Date(timestamp).toLocaleString()}
      `.trim();
      
      await navigator.clipboard.writeText(resultsText);
      addToast({ type: 'success', title: 'Results Copied!', message: 'Audit results copied to clipboard.' });
    } catch {
      console.error('Copy failed');
      addToast({ type: 'error', title: 'Copy Failed', message: 'Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-6 sm:py-10">
      <div className="container-responsive space-y-6 sm:space-y-8">
        {/* Summary Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white break-all">{url}</div>
              <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>{deviceLabel}</span>
                <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4 ml-3 sm:ml-4 mr-1" />
                <span suppressHydrationWarning>{new Date(timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-base sm:text-lg shadow">{overallScore}/100</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <button 
                onClick={handleShare}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium text-xs sm:text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition touch-target"
              >
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button 
                onClick={handleCopyResults}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-medium text-xs sm:text-sm hover:bg-green-200 dark:hover:bg-green-800 transition touch-target"
              >
                <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Copy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-responsive-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Object.entries(scores).map(([key, score]) => {
            const config = scoreCardConfigs[key as keyof typeof scoreCardConfigs];
            return (
              <ScoreCard
                key={key}
                title={config.title}
                score={score}
                icon={config.icon}
                color={config.color}
                description={config.description}
              />
            );
          })}
        </div>

        {/* Charts and Issues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Performance Metrics Chart */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Performance Metrics</h3>
            <ChartDisplay auditData={auditData} />
          </div>

          {/* Issues List */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Issues Found</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{auditData.issues.length} issues</span>
            </div>
            <IssueList issues={auditData.issues} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary inline-flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>New Audit</span>
          </Link>
          <button
            onClick={handleShare}
            className="btn-secondary inline-flex items-center justify-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Results</span>
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
} 