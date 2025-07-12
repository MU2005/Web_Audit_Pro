import { Globe, Monitor, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

interface AuditScores {
  performance: number;
  seo: number;
  security: number;
  accessibility: number;
}

interface Audit {
  id: string;
  url: string;
  device: string;
  timestamp: string;
  scores: AuditScores;
  status: string;
}

interface HistoryCardProps {
  audit: Audit;
}

export default function HistoryCard({ audit }: HistoryCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAverageScore = (scores: AuditScores) => {
    const values = Object.values(scores);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <Link href={`/results?id=${audit.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white truncate max-w-48">
                {audit.url}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Monitor className="w-4 h-4" />
                <span className="capitalize">{audit.device}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatDate(audit.timestamp)}</span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              audit.status === 'completed' 
                ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' 
                : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
            }`}>
              {audit.status}
            </div>
          </div>
        </div>

        {/* Average Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Score</span>
            <TrendingUp className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="text-2xl font-bold">
            <span className={getScoreColor(getAverageScore(audit.scores))}>
              {getAverageScore(audit.scores)}
            </span>
            <span className="text-gray-400 dark:text-gray-500 text-lg">/100</span>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Performance</div>
            <div className={`font-semibold ${getScoreColor(audit.scores.performance)}`}>
              {audit.scores.performance}
            </div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">SEO</div>
            <div className={`font-semibold ${getScoreColor(audit.scores.seo)}`}>
              {audit.scores.seo}
            </div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Security</div>
            <div className={`font-semibold ${getScoreColor(audit.scores.security)}`}>
              {audit.scores.security}
            </div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Accessibility</div>
            <div className={`font-semibold ${getScoreColor(audit.scores.accessibility)}`}>
              {audit.scores.accessibility}
            </div>
          </div>
        </div>

        {/* View Details */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="text-center">
            <span className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 