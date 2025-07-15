"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronRight,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
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
        return "from-gray-500 to-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-error/10 text-error border-error/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "low":
        return "bg-info/10 text-info border-info/20";
      default:
        return "bg-muted text-muted-foreground border-border";
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
        return "text-error";
      case "warning":
        return "text-warning";
      case "info":
        return "text-info";
      default:
        return "text-muted-foreground";
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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">
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
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeFilter === filter.id
                ? "bg-primary text-white shadow-lg"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary-hover"
            }`}
          >
            {filter.label}
            <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
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
                className="bg-card rounded-xl border border-border hover:border-primary/20 transition-all duration-300"
              >
                {/* Issue Header */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => toggleIssue(issue.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {/* Category Icon */}
                      <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(issue.category)} rounded-lg flex items-center justify-center`}>
                        <CategoryIcon className="w-5 h-5 text-white" />
                      </div>

                      {/* Issue Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <TypeIcon className={`w-4 h-4 ${getTypeColor(issue.type)}`} />
                          <h4 className="font-medium text-foreground truncate">
                            {issue.title}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(issue.priority)}`}>
                            {issue.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {issue.description}
                        </p>
                      </div>

                      {/* Expand/Collapse Icon */}
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
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
                      <div className="px-4 pb-4 space-y-4">
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground mb-3">
                            {issue.description}
                          </p>
                          
                          {issue.impact && (
                            <div className="mb-3">
                              <h5 className="text-sm font-medium text-foreground mb-1">Impact</h5>
                              <p className="text-sm text-muted-foreground">{issue.impact}</p>
                            </div>
                          )}
                          
                          {issue.suggestion && (
                            <div>
                              <h5 className="text-sm font-medium text-foreground mb-1">Suggestion</h5>
                              <p className="text-sm text-muted-foreground">{issue.suggestion}</p>
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