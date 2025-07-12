"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, Info, XCircle, ChevronDown, ChevronRight, ExternalLink, Copy, BookOpen } from "lucide-react";

interface Issue {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

interface IssueListProps {
  issues?: Issue[];
}

export default function IssueList({ issues = [] }: IssueListProps) {
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());

  const toggleIssue = (issueId: string) => {
    const newExpanded = new Set(expandedIssues);
    if (newExpanded.has(issueId)) {
      newExpanded.delete(issueId);
    } else {
      newExpanded.add(issueId);
    }
    setExpandedIssues(newExpanded);
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "low":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "SEO":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400";
      case "Performance":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400";
      case "Security":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400";
      case "Accessibility":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300";
    }
  };

  const getSeverityScore = (priority: string) => {
    switch (priority) {
      case "high": return 3;
      case "medium": return 2;
      case "low": return 1;
      default: return 0;
    }
  };

  // Sort issues by severity (high priority first)
  const sortedIssues = [...issues].sort((a, b) => getSeverityScore(b.priority) - getSeverityScore(a.priority));

  const issueCounts = {
    error: issues.filter(i => i.type === 'error').length,
    warning: issues.filter(i => i.type === 'warning').length,
    success: issues.filter(i => i.type === 'success').length,
    info: issues.filter(i => i.type === 'info').length,
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Issues & Recommendations</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {issues.length} issues found • {sortedIssues.filter(i => i.priority === 'high').length} critical
          </p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center space-x-1">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-gray-600 dark:text-gray-400">{issueCounts.error}</span>
          </span>
          <span className="flex items-center space-x-1">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <span className="text-gray-600 dark:text-gray-400">{issueCounts.warning}</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-gray-600 dark:text-gray-400">{issueCounts.success}</span>
          </span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedIssues.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Issues Found</h4>
            <p className="text-gray-600 dark:text-gray-400">Great job! Your website is performing well.</p>
          </div>
        ) : (
          sortedIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleIssue(issue.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIssueIcon(issue.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {issue.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(issue.category)}`}>
                          {issue.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </span>
                        {expandedIssues.has(issue.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {issue.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedIssues.has(issue.id) && (
                <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Description</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {issue.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition">
                          <BookOpen className="w-3 h-3" />
                          <span>Learn More</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                          <ExternalLink className="w-3 h-3" />
                          <span>View Docs</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-1 px-2 py-1 rounded text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition">
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </button>
                        <button className="flex items-center space-x-1 px-2 py-1 rounded text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition">
                          <span>Dismiss</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {issues.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Priority breakdown:</span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  {sortedIssues.filter(i => i.priority === 'high').length} High
                </span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  {sortedIssues.filter(i => i.priority === 'medium').length} Medium
                </span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  {sortedIssues.filter(i => i.priority === 'low').length} Low
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 