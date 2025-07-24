"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Eye, 
  Shield, 
  BarChart3,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info
} from "lucide-react";

interface ScoreCardProps {
  title: string;
  score: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description?: string;
  className?: string;
}

export default function ScoreCard({ 
  title, 
  score, 
  icon: Icon, 
  color, 
  description,
  className = "" 
}: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 90) return { text: "Excellent", icon: CheckCircle, color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/20" };
    if (score >= 70) return { text: "Good", icon: AlertTriangle, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/20" };
    return { text: "Needs Improvement", icon: XCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/20" };
  };

  const status = getScoreStatus(score);
  const StatusIcon = status.icon;

  // Calculate stroke dasharray for circular progress
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 lg:p-6 hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm lg:text-base truncate">{title}</h3>
            {description && (
              <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-400 truncate">{description}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <StatusIcon className={`w-4 h-4 ${status.color}`} />
          <span className={`text-xs font-medium ${status.color} hidden sm:inline`}>
            {status.text}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Circular Progress */}
        <div className="relative">
          <svg className="w-20 h-20 lg:w-24 lg:h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-slate-200 dark:text-slate-700"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={getScoreColor(score)}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1 }}
            />
          </svg>
          
          {/* Score text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-xl lg:text-2xl font-bold ${getScoreColor(score)}`}>
                {score}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">/ 100</div>
            </div>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="flex-1 min-w-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs lg:text-sm text-slate-600 dark:text-slate-400">Performance</span>
              <span className="text-xs lg:text-sm font-medium text-slate-900 dark:text-white">
                {score >= 90 ? "Excellent" : score >= 70 ? "Good" : "Poor"}
              </span>
            </div>
            
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            
            <div className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-400">
              <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                {score >= 90 
                  ? "Your website is performing excellently in this category"
                  : score >= 70 
                  ? "There's room for improvement in this area"
                  : "This area needs significant attention"
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Predefined score card configurations
export const scoreCardConfigs = {
  performance: {
    title: "Performance",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
    description: "Core Web Vitals & Loading Speed"
  },
  seo: {
    title: "SEO",
    icon: Eye,
    color: "from-green-500 to-emerald-500",
    description: "Search Engine Optimization"
  },
  security: {
    title: "Security",
    icon: Shield,
    color: "from-red-500 to-pink-500",
    description: "Security & Best Practices"
  },
  accessibility: {
    title: "Accessibility",
    icon: BarChart3,
    color: "from-purple-500 to-indigo-500",
    description: "WCAG Compliance"
  }
}; 