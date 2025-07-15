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
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-error";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 90) return { text: "Excellent", icon: CheckCircle, color: "text-success" };
    if (score >= 70) return { text: "Good", icon: AlertTriangle, color: "text-warning" };
    return { text: "Needs Improvement", icon: XCircle, color: "text-error" };
  };

  const status = getScoreStatus(score);
  const StatusIcon = status.icon;

  // Calculate stroke dasharray for circular progress
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <StatusIcon className={`w-4 h-4 ${status.color}`} />
          <span className={`text-xs font-medium ${status.color}`}>
            {status.text}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Circular Progress */}
        <div className="relative">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/20"
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
              <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                {score}
              </div>
              <div className="text-xs text-muted-foreground">/ 100</div>
            </div>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="flex-1 ml-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Performance</span>
              <span className="text-sm font-medium text-foreground">
                {score >= 90 ? "Excellent" : score >= 70 ? "Good" : "Poor"}
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Info className="w-3 h-3" />
              <span>
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