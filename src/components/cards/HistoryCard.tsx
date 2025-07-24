import { Globe, Monitor, Clock, TrendingUp, Trash2, Eye } from "lucide-react";
import { AuditResult } from "../../lib/types";

interface HistoryCardProps {
  audit: AuditResult;
  onView: () => void;
  onDelete: () => void;
}

export default function HistoryCard({ audit, onView, onDelete }: HistoryCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAverageScore = (scores: AuditResult['scores']) => {
    const values = Object.values(scores);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg p-6 hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
            <h3 className="font-semibold text-foreground truncate max-w-48">
                {audit.url}
              </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Monitor className="w-4 h-4" />
                <span className="capitalize">{audit.device}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
          <div className="text-sm text-muted-foreground flex items-center space-x-1">
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
          <span className="text-sm font-medium text-foreground">Average Score</span>
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">
            <span className={getScoreColor(getAverageScore(audit.scores))}>
              {getAverageScore(audit.scores)}
            </span>
          <span className="text-muted-foreground text-lg">/100</span>
          </div>
        </div>

        {/* Score Breakdown */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-secondary/50 rounded-lg">
          <div className="text-sm text-muted-foreground">Performance</div>
            <div className={`font-semibold ${getScoreColor(audit.scores.performance)}`}>
              {audit.scores.performance}
            </div>
          </div>
        <div className="text-center p-2 bg-secondary/50 rounded-lg">
          <div className="text-sm text-muted-foreground">SEO</div>
            <div className={`font-semibold ${getScoreColor(audit.scores.seo)}`}>
              {audit.scores.seo}
            </div>
          </div>
        <div className="text-center p-2 bg-secondary/50 rounded-lg">
          <div className="text-sm text-muted-foreground">Best Practices</div>
          <div className={`font-semibold ${getScoreColor(audit.scores.bestPractices)}`}>
            {audit.scores.bestPractices}
          </div>
        </div>
        <div className="text-center p-2 bg-secondary/50 rounded-lg">
          <div className="text-sm text-muted-foreground">Accessibility</div>
            <div className={`font-semibold ${getScoreColor(audit.scores.accessibility)}`}>
              {audit.scores.accessibility}
            </div>
          </div>
        </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <button
          onClick={onView}
          className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
        <button
          onClick={onDelete}
          className="flex items-center space-x-2 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
} 