"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ScoreCard from "../../components/ScoreCard";
import ChartDisplay from "../../components/ChartDisplay";
import IssueList from "../../components/IssueList";
import { BarChart3, CalendarDays, Share2, Copy, RefreshCw } from "lucide-react";
import { ToastContainer, ToastProps } from "../../components/Toast";

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
    type: 'error' | 'warning' | 'info' | 'success';
    title: string;
    description: string;
    category: string;
    priority: 'high' | 'medium' | 'low';
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
        
        // If no stored audit, show error
        setError('No audit data found. Please start a new audit.');
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading audit results...</p>
        </div>
      </div>
    );
  }

  if (error || !auditData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Error Loading Results</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error || 'No audit data available'}</p>
          <Link 
            href="/" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-10 px-2 md:px-0">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Summary Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white break-all">{url}</div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>{deviceLabel}</span>
                <CalendarDays className="w-4 h-4 ml-4 mr-1" />
                <span suppressHydrationWarning>{new Date(timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow">{overallScore}/100</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <button 
                onClick={handleShare}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button 
                onClick={handleCopyResults}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 font-medium text-sm hover:bg-purple-200 dark:hover:bg-purple-800 transition"
              >
                <Copy className="w-4 h-4" />
                Copy Results
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-medium text-sm hover:bg-green-200 dark:hover:bg-green-800 transition">
                <RefreshCw className="w-4 h-4" />
                Re-run Audit
              </button>
            </div>
          </div>
        </div>

        {/* Score Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScoreCard title="Performance" score={scores.performance} color="blue" />
          <ScoreCard title="SEO" score={scores.seo} color="green" />
          <ScoreCard title="Security" score={scores.security} color="red" />
          <ScoreCard title="Accessibility" score={scores.accessibility} color="purple" />
        </div>

        {/* Chart & Issues Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ChartDisplay */}
          <div className="col-span-1">
            <ChartDisplay auditData={auditData} />
          </div>
          {/* Issue List */}
          <div className="col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 h-full">
              <IssueList issues={auditData.issues} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
} 