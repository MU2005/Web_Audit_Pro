"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Share2, 
  RefreshCw, 
  TrendingUp, 
  Shield, 
  Eye, 
  Zap,
  Globe,
  Clock,
  BarChart3,
  AlertTriangle,
  XCircle,
  Smartphone,
  Monitor,
  Copy,
  Check,
  Activity,
  TrendingDown,
  AlertCircle
} from "lucide-react";
import { AuditResult } from "../../lib/types";
import { ScoreCard } from "../../components/cards";
import { ChartDisplay } from "../../components/charts";
import { IssueList } from "../../components/ui";

function ResultsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const auditId = searchParams.get('auditId');

  useEffect(() => {
    if (!auditId) {
      setError("No audit ID provided");
      setLoading(false);
      return;
    }

    fetchAuditResult(auditId);
  }, [auditId]);

  const fetchAuditResult = async (id: string) => {
    try {
      const response = await fetch(`/api/audit/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch audit result');
      }
      
      const data = await response.json();
      if (data.success) {
        setAuditResult(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch audit result');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  const handleShare = async () => {
    if (navigator.share && auditResult) {
      try {
        await navigator.share({
          title: `WebAudit Results for ${auditResult.url}`,
          text: `Check out the performance audit results for ${auditResult.url}`,
          url: window.location.href,
        });
      } catch {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRefresh = () => {
    if (auditId) {
      setLoading(true);
      setError(null);
      fetchAuditResult(auditId);
    }
  };

  const handleCopyUrl = () => {
    if (auditResult) {
      navigator.clipboard.writeText(auditResult.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm mx-auto"
        >
          <div className="relative">
            <RefreshCw className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-6" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Analyzing Website...</h2>
          <p className="text-slate-600 dark:text-slate-400">Fetching your comprehensive audit results</p>
        </motion.div>
      </div>
    );
  }

  if (error || !auditResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="relative mb-6">
            <XCircle className="w-20 h-20 text-red-500 mx-auto" />
            <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-20"></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Error Loading Results</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">{error || 'No audit result found'}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            {auditId && (
              <button
                onClick={handleRefresh}
                className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 font-medium flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  const overallScore = Math.round(
    (auditResult.scores.performance + 
     auditResult.scores.accessibility + 
     auditResult.scores.bestPractices + 
     auditResult.scores.seo) / 4
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getOverallStatus = (score: number) => {
    if (score >= 90) return { text: "Excellent", color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/20" };
    if (score >= 70) return { text: "Good", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/20" };
    return { text: "Needs Improvement", color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/20" };
  };

  const overallStatus = getOverallStatus(overallScore);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'issues', label: 'Issues', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 border-b sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </button>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white truncate">Audit Results</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Globe className="w-4 h-4 text-slate-500" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{auditResult.url}</p>
                  <button
                    onClick={handleCopyUrl}
                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Copy URL"
                  >
                    {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-slate-500" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
                title="Share Results"
              >
                <Share2 className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </button>
              <button
                onClick={handleRefresh}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
                title="Refresh Results"
              >
                <RefreshCw className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Score Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-6 sticky top-24">
              {/* Overall Score */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <div className={`text-4xl font-bold text-white`}>
                        {overallScore}
                      </div>
                      <div className="text-sm text-blue-100">Overall</div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${overallStatus.bg} ${overallStatus.color}`}>
                      {overallStatus.text}
                    </div>
                  </div>
                </div>
              </div>

              {/* Individual Scores */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-slate-900 dark:text-white">Performance</span>
                  </div>
                  <span className={`text-lg font-bold ${getScoreColor(auditResult.scores.performance)}`}>
                    {auditResult.scores.performance}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-3">
                    <Eye className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-slate-900 dark:text-white">Accessibility</span>
                  </div>
                  <span className={`text-lg font-bold ${getScoreColor(auditResult.scores.accessibility)}`}>
                    {auditResult.scores.accessibility}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-slate-900 dark:text-white">Best Practices</span>
                  </div>
                  <span className={`text-lg font-bold ${getScoreColor(auditResult.scores.bestPractices)}`}>
                    {auditResult.scores.bestPractices}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold text-slate-900 dark:text-white">SEO</span>
                  </div>
                  <span className={`text-lg font-bold ${getScoreColor(auditResult.scores.seo)}`}>
                    {auditResult.scores.seo}
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Resources</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{auditResult.pageStats.totalResources}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Size</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {(auditResult.pageStats.totalBytes / 1024 / 1024).toFixed(1)} MB
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Device</span>
                    <span className="font-semibold text-slate-900 dark:text-white capitalize">{auditResult.device}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Issues</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{auditResult.issues.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            {/* Tab Navigation */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-2 mb-6">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Progress Rings */}
                  <div className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Performance Overview</h3>
                    <ChartDisplay 
                      auditData={{
                        scores: {
                          performance: auditResult.scores.performance,
                          seo: auditResult.scores.seo,
                          security: auditResult.scores.bestPractices,
                          accessibility: auditResult.scores.accessibility
                        },
                        metrics: auditResult.metrics
                      }}
                      chartType="progress"
                    />
                  </div>

                  {/* Web Vitals Metrics */}
                  <div className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Web Vitals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Zap className="w-5 h-5 text-blue-600" />
                          <span className="text-xs text-slate-600 dark:text-slate-400">FCP</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                          {auditResult.metrics.firstContentfulPaint.toFixed(1)}s
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">First Contentful Paint</div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Activity className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-slate-600 dark:text-slate-400">LCP</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                          {auditResult.metrics.largestContentfulPaint.toFixed(1)}s
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Largest Contentful Paint</div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <TrendingDown className="w-5 h-5 text-yellow-600" />
                          <span className="text-xs text-slate-600 dark:text-slate-400">CLS</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                          {(auditResult.metrics.cumulativeLayoutShift * 1000).toFixed(0)}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Cumulative Layout Shift</div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <span className="text-xs text-slate-600 dark:text-slate-400">TBT</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                          {auditResult.metrics.totalBlockingTime}ms
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Total Blocking Time</div>
                      </div>
                    </div>
                  </div>

                  {/* Page Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Page Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center space-x-3">
                            <Globe className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-slate-900 dark:text-white">Total Resources</span>
                          </div>
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">{auditResult.pageStats.totalResources}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center space-x-3">
                            <BarChart3 className="w-5 h-5 text-green-600" />
                            <span className="font-semibold text-slate-900 dark:text-white">Total Size</span>
                          </div>
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">
                            {(auditResult.pageStats.totalBytes / 1024 / 1024).toFixed(1)} MB
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Audit Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center space-x-3">
                            <Clock className="w-5 h-5 text-purple-600" />
                            <span className="font-semibold text-slate-900 dark:text-white">Audit Date</span>
                          </div>
                          <span className="text-lg font-semibold text-slate-900 dark:text-white">
                            {new Date(auditResult.timestamp).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center space-x-3">
                            {auditResult.device === 'mobile' ? (
                              <Smartphone className="w-5 h-5 text-orange-600" />
                            ) : (
                              <Monitor className="w-5 h-5 text-orange-600" />
                            )}
                            <span className="font-semibold text-slate-900 dark:text-white">Device Type</span>
                          </div>
                          <span className="text-lg font-semibold text-slate-900 dark:text-white capitalize">
                            {auditResult.device}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'performance' && (
                <motion.div
                  key="performance"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Score Cards Grid */}
                  <div className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Detailed Performance Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ScoreCard
                        title="Performance"
                        score={auditResult.scores.performance}
                        icon={Zap}
                        color="from-blue-500 to-cyan-500"
                      />
                      <ScoreCard
                        title="Accessibility"
                        score={auditResult.scores.accessibility}
                        icon={Eye}
                        color="from-green-500 to-emerald-500"
                      />
                      <ScoreCard
                        title="Best Practices"
                        score={auditResult.scores.bestPractices}
                        icon={Shield}
                        color="from-purple-500 to-indigo-500"
                      />
                      <ScoreCard
                        title="SEO"
                        score={auditResult.scores.seo}
                        icon={TrendingUp}
                        color="from-orange-500 to-red-500"
                      />
                    </div>
                  </div>

                  {/* Performance Trends */}
                  <div className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Performance Trends</h3>
                    <div className="h-80">
                      <ChartDisplay 
                        auditData={{
                          scores: {
                            performance: auditResult.scores.performance,
                            seo: auditResult.scores.seo,
                            security: auditResult.scores.bestPractices,
                            accessibility: auditResult.scores.accessibility
                          },
                          metrics: auditResult.metrics
                        }}
                        chartType="performance"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Analytics Dashboard */}
                  <div className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Performance Analytics</h3>
                    <div className="h-96">
                      <ChartDisplay 
                        auditData={{
                          scores: {
                            performance: auditResult.scores.performance,
                            seo: auditResult.scores.seo,
                            security: auditResult.scores.bestPractices,
                            accessibility: auditResult.scores.accessibility
                          },
                          metrics: auditResult.metrics
                        }}
                        chartType="analytics"
                      />
                    </div>
                  </div>

                  {/* Metrics Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Core Web Vitals</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">FCP</span>
                          <span className="text-lg font-bold text-blue-600">{auditResult.metrics.firstContentfulPaint.toFixed(1)}s</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">LCP</span>
                          <span className="text-lg font-bold text-green-600">{auditResult.metrics.largestContentfulPaint.toFixed(1)}s</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">CLS</span>
                          <span className="text-lg font-bold text-yellow-600">{(auditResult.metrics.cumulativeLayoutShift * 1000).toFixed(0)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Page Statistics</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">Resources</span>
                          <span className="text-lg font-bold text-purple-600">{auditResult.pageStats.totalResources}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">Size</span>
                          <span className="text-lg font-bold text-orange-600">{(auditResult.pageStats.totalBytes / 1024 / 1024).toFixed(1)} MB</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">TBT</span>
                          <span className="text-lg font-bold text-red-600">{auditResult.metrics.totalBlockingTime}ms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'issues' && (
                <motion.div
                  key="issues"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                                  <div className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-6">
                  <IssueList issues={auditResult.issues.map(issue => ({
                    ...issue,
                    priority: issue.impact,
                    type: issue.impact === 'high' ? 'error' : issue.impact === 'medium' ? 'warning' : 'info',
                    category: issue.category === 'best-practices' ? 'security' : issue.category as 'performance' | 'accessibility' | 'seo' | 'security'
                  }))} />
                </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-sm mx-auto">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Loading...</h2>
          <p className="text-slate-600 dark:text-slate-400">Preparing your audit results</p>
        </div>
      </div>
    }>
      <ResultsPageContent />
    </Suspense>
  );
}