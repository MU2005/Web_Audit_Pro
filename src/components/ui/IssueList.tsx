"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight,
  AlertTriangle,
  AlertCircle,
  Info,
  Zap,
  Eye,
  Shield,
  BarChart3
} from "lucide-react";

interface Issue {
  id: string;
  title: string;
  description: string;
  category: "performance" | "seo" | "security" | "accessibility";
  priority: "high" | "medium" | "low";
  type: "error" | "warning" | "info";
  impact?: string;
  suggestion?: string;
}

interface IssueListProps {
  issues: Issue[];
  title?: string;
  className?: string;
}

export default function IssueList({ issues, title = "Issues Found", className = "" }: IssueListProps) {
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const toggleIssue = (issueId: string) => {
    const newExpanded = new Set(expandedIssues);
    if (newExpanded.has(issueId)) {
      newExpanded.delete(issueId);
    } else {
      newExpanded.add(issueId);
    }
    setExpandedIssues(newExpanded);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "performance":
        return Zap;
      case "seo":
        return Eye;
      case "security":
        return Shield;
      case "accessibility":
        return BarChart3;
      default:
        return Info;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "performance":
        return "from-blue-500 to-cyan-500";
      case "seo":
        return "from-green-500 to-emerald-500";
      case "security":
        return "from-red-500 to-pink-500";
      case "accessibility":
        return "from-purple-500 to-indigo-500";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "low":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "error":
        return AlertCircle;
      case "warning":
        return AlertTriangle;
      case "info":
        return Info;
      default:
        return Info;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-600 dark:text-red-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "info":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-slate-600 dark:text-slate-400";
    }
  };

  const filters = [
    { id: "all", label: "All Issues", count: issues.length },
    { id: "performance", label: "Performance", count: issues.filter(i => i.category === "performance").length },
    { id: "seo", label: "SEO", count: issues.filter(i => i.category === "seo").length },
    { id: "security", label: "Security", count: issues.filter(i => i.category === "security").length },
    { id: "accessibility", label: "Accessibility", count: issues.filter(i => i.category === "accessibility").length },
  ];

  const filteredIssues = activeFilter === "all" 
    ? issues 
    : issues.filter(issue => issue.category === activeFilter);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 mt-1">
            {filteredIssues.length} issue{filteredIssues.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeFilter === filter.id
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {filter.label}
            <span className="ml-2 px-2 py-0.5 bg-white/20 dark:bg-black/20 rounded-full text-xs">
              {filter.count}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {filteredIssues.map((issue, index) => {
            const CategoryIcon = getCategoryIcon(issue.category);
            const TypeIcon = getTypeIcon(issue.type);
            const isExpanded = expandedIssues.has(issue.id);

            return (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg"
              >
                {/* Issue Header */}
                <div
                  className="p-4 lg:p-6 cursor-pointer"
                  onClick={() => toggleIssue(issue.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      {/* Category Icon */}
                      <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${getCategoryColor(issue.category)} rounded-xl flex items-center justify-center shadow-lg`}>
                        <CategoryIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                      </div>

                      {/* Issue Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <div className="flex items-center space-x-2">
                            <TypeIcon className={`w-4 h-4 ${getTypeColor(issue.type)}`} />
                            <h4 className="font-semibold text-slate-900 dark:text-white text-sm lg:text-base truncate">
                              {issue.title}
                            </h4>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(issue.priority)}`}>
                            {issue.priority}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                          {issue.description}
                        </p>
                      </div>

                      {/* Expand/Collapse Icon */}
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <ChevronRight className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Issue Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 lg:px-6 pb-4 lg:pb-6 space-y-4">
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                          <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                            {issue.description}
                          </p>
                          
                          {issue.impact && (
                            <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                              <h5 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                Impact
                              </h5>
                              <p className="text-sm text-slate-700 dark:text-slate-300">{issue.impact}</p>
                            </div>
                          )}
                          
                          {issue.suggestion && (
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                              <h5 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                Suggestion
                              </h5>
                              <p className="text-sm text-slate-700 dark:text-slate-300">{issue.suggestion}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
} 