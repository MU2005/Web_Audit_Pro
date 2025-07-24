"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  Globe, 
  BarChart3, 
  AlertTriangle,
  Search,
  Filter,
  RefreshCw
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AuditResult } from "../../lib/types";
import { HistoryCard } from "../../components/cards";

export default function HistoryPage() {
  const [audits, setAudits] = useState<AuditResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const router = useRouter();

  useEffect(() => {
    fetchAuditHistory();
  }, []);

  const fetchAuditHistory = async () => {
    try {
      const response = await fetch('/api/audit');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAudits(data.data.audits || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch audit history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuditClick = (auditId: string) => {
    router.push(`/results?auditId=${auditId}`);
  };

  const handleDeleteAudit = async (auditId: string) => {
    try {
      const response = await fetch(`/api/audit/${auditId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setAudits(audits.filter(audit => audit.auditId !== auditId));
      }
    } catch (error) {
      console.error('Failed to delete audit:', error);
    }
  };

  const filteredAudits = audits.filter(audit => {
    const matchesSearch = audit.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || 
      (filterCategory === "high" && audit.scores.performance < 70) ||
      (filterCategory === "medium" && audit.scores.performance >= 70 && audit.scores.performance < 90) ||
      (filterCategory === "low" && audit.scores.performance >= 90);
    
    return matchesSearch && matchesCategory;
  });

  const getAverageScore = (audits: AuditResult[]) => {
    if (audits.length === 0) return 0;
    const total = audits.reduce((sum, audit) => {
      return sum + (audit.scores.performance + audit.scores.accessibility + audit.scores.bestPractices + audit.scores.seo) / 4;
    }, 0);
    return Math.round(total / audits.length);
  };

  const getTotalIssues = (audits: AuditResult[]) => {
    return audits.reduce((sum, audit) => sum + audit.issues.length, 0);
  };

  const getRecentAudits = (audits: AuditResult[], days: number = 7) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return audits.filter(audit => new Date(audit.timestamp) > cutoffDate);
  };

  const averageScore = getAverageScore(audits);
  const totalIssues = getTotalIssues(audits);
  const recentAudits = getRecentAudits(audits);
  const totalAudits = audits.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <RefreshCw className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground">Loading History...</h2>
          <p className="text-muted-foreground mt-2">Fetching your audit history</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Audit History</h1>
              <p className="text-muted-foreground mt-2">Track your website performance over time</p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              New Audit
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-border shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Audits</p>
                  <p className="text-3xl font-bold text-foreground">{totalAudits}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-border shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-3xl font-bold text-foreground">{averageScore}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border border-border shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Issues</p>
                    <p className="text-3xl font-bold text-foreground">{totalIssues}</p>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl border border-border shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
    <div>
                  <p className="text-sm text-muted-foreground">Recent (7 days)</p>
                  <p className="text-3xl font-bold text-foreground">{recentAudits.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-2xl border border-border shadow-lg p-6 mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by URL..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="all">All Audits</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Audit List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {filteredAudits.length === 0 ? (
              <div className="text-center py-12">
                <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No audits found</h3>
                <p className="text-muted-foreground mb-6">
                  {audits.length === 0 
                    ? "Start your first audit to see results here"
                    : "No audits match your current filters"
                  }
                </p>
                {audits.length === 0 && (
                  <button
                    onClick={() => router.push('/')}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Start First Audit
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnimatePresence mode="wait">
                  {filteredAudits.map((audit, index) => (
                    <motion.div
                      key={audit.auditId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <HistoryCard
                        audit={audit}
                        onView={() => handleAuditClick(audit.auditId)}
                        onDelete={() => handleDeleteAudit(audit.auditId)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 