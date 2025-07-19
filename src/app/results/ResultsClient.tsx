"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Share2, 
  Copy, 
  RefreshCw,
  Globe,
  Clock,
  Smartphone,
  Monitor,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Zap,
  Eye,
  Shield,
  BarChart3,
  Activity,
  Target,
  Gauge,
  AlertCircle,
  Star,
  Download,
  ExternalLink
} from "lucide-react";

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
  const [activeTab, setActiveTab] = useState('overview');
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
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 px-4"
        >
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent border-t-indigo-500 rounded-full"
              style={{ animationDelay: '-1s' }}
            ></motion.div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Analyzing Website</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Running comprehensive audit...</p>
        </div>
        </motion.div>
      </div>
    );
  }

  if (error || !auditData) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md mx-auto p-6 sm:p-8"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 dark:text-red-400" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Error Loading Results</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{error || 'No audit data available'}</p>
          </div>
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Start New Audit</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Calculate overall score (average)
  const { scores, url, device, timestamp } = auditData;
  const overallScore = Math.round((scores.performance + scores.seo + scores.security + scores.accessibility) / 4);
  const deviceLabel = device === 'mobile' ? 'Mobile' : 'Desktop';

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 70) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 90) return { text: "Excellent", icon: CheckCircle, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" };
    if (score >= 70) return { text: "Good", icon: AlertTriangle, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" };
    return { text: "Needs Improvement", icon: XCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" };
  };

  const overallStatus = getScoreStatus(overallScore);
  const OverallStatusIcon = overallStatus.icon;

  const handleShare = async () => {
    try {
      const shareData = {
        title: 'WebAudit Pro Report',
        text: `Website audit results for ${url}`,
        url: window.location.href,
      };
      
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      console.error('Share failed');
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
    } catch {
      console.error('Copy failed');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'seo', label: 'SEO', icon: Eye },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'accessibility', label: 'Accessibility', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium text-sm sm:text-base">Back to Home</span>
            </Link>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button 
                onClick={handleShare}
                className="inline-flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button 
                onClick={handleCopyResults}
                className="inline-flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Copy</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center space-y-4 sm:space-y-6"
          >
            <div className="flex items-center justify-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Audit Results</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-4">
              Comprehensive analysis of your website's performance, SEO, security, and accessibility
            </p>
          </motion.div>

          {/* URL and Score Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 lg:p-8 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* URL Information */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white break-all">{url}</h2>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
                      <span className="flex items-center space-x-1">
                        {device === 'mobile' ? <Smartphone className="w-3 h-3 sm:w-4 sm:h-4" /> : <Monitor className="w-3 h-3 sm:w-4 sm:h-4" />}
                        <span>{deviceLabel}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span suppressHydrationWarning className="truncate">{new Date(timestamp).toLocaleString()}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overall Score */}
              <div className="flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="text-center space-y-3 sm:space-y-4"
                >
                  <div className={`inline-flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1 sm:py-2 rounded-full ${overallStatus.bg}`}>
                    <OverallStatusIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${overallStatus.color}`} />
                    <span className={`text-xs sm:text-sm font-medium ${overallStatus.color}`}>
                      {overallStatus.text}
                    </span>
                  </div>
                  <div className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${getScoreColor(overallScore)}`}>
                    {overallScore}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Overall Score</div>
                </motion.div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{auditData.issues.length}</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Issues Found</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round((auditData.issues.filter(i => i.priority === 'high').length / auditData.issues.length) * 100)}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">High Priority</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 justify-center px-2"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-xs sm:text-sm ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 sm:space-y-8"
            >
              {activeTab === 'overview' && (
                <div className="space-y-6 sm:space-y-8">
        {/* Score Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {Object.entries(scores).map(([key, score], index) => {
                      const status = getScoreStatus(score);
                      const StatusIcon = status.icon;
                      const icons = { performance: Zap, seo: Eye, security: Shield, accessibility: BarChart3 };
                      const Icon = icons[key as keyof typeof icons];
                      
            return (
                        <motion.div
                key={key}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900 dark:text-white capitalize text-sm sm:text-base">{key}</h3>
                                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${status.bg}`}>
                                  <StatusIcon className={`w-3 h-3 ${status.color}`} />
                                  <span className={status.color}>{status.text}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className={`text-2xl sm:text-3xl font-bold ${getScoreColor(score)}`}>
                              {score}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">/ 100</div>
                          </div>
                        </motion.div>
            );
          })}
        </div>

                  {/* Charts and Issues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 shadow-lg">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Performance Metrics</h3>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Core Web Vitals & Loading Speed</p>
                        </div>
                      </div>
                      <div className="h-48 sm:h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Chart Component</p>
                      </div>
          </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 shadow-lg">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Issues Found</h3>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{auditData.issues.length} issues detected</p>
                        </div>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        {auditData.issues.slice(0, 3).map((issue, index) => (
                          <motion.div
                            key={issue.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                          >
                            <div className="flex items-start space-x-2 sm:space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                issue.priority === 'high' ? 'bg-red-500' : 
                                issue.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`}></div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{issue.title}</h4>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">{issue.description}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other tab contents would go here */}
              {activeTab !== 'overview' && (
                <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-lg">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                      <Star className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Coming Soon</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Detailed {activeTab} analysis will be available soon.</p>
          </div>
        </div>
              )}
            </motion.div>
          </AnimatePresence>

        {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8"
          >
          <Link
            href="/"
              className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>New Audit</span>
          </Link>
          <button
            onClick={handleShare}
              className="inline-flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700 text-sm sm:text-base"
          >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Share Results</span>
          </button>
            <button
              onClick={handleCopyResults}
              className="inline-flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700 text-sm sm:text-base"
            >
              <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Copy Report</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 