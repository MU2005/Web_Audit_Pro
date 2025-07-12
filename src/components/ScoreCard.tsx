"use client";

import { TrendingUp, Zap, Target, Shield, Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface ScoreCardProps {
  title: string;
  score: number;
  color: "blue" | "green" | "red" | "purple" | "yellow";
}

export default function ScoreCard({ title, score, color }: ScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return "bg-green-100 dark:bg-green-900/20";
    if (score >= 70) return "bg-yellow-100 dark:bg-yellow-900/20";
    return "bg-red-100 dark:bg-red-900/20";
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      green: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
      red: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
      purple: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      yellow: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'performance':
        return <Zap className="w-5 h-5" />;
      case 'seo':
        return <Target className="w-5 h-5" />;
      case 'security':
        return <Shield className="w-5 h-5" />;
      case 'accessibility':
        return <Eye className="w-5 h-5" />;
      default:
        return <TrendingUp className="w-5 h-5" />;
    }
  };

  const getStatus = (score: number) => {
    if (score >= 90) return { text: "Excellent", color: "text-green-600 dark:text-green-400" };
    if (score >= 70) return { text: "Good", color: "text-yellow-600 dark:text-yellow-400" };
    return { text: "Needs Improvement", color: "text-red-600 dark:text-red-400" };
  };

  const status = getStatus(score);
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{title}</h3>
          <p className={`text-sm font-medium ${status.color}`}>{status.text}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${getColorClasses(color)}`}>
          {getIcon(title)}
        </div>
      </div>
      
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-out ${getScoreColor(score)}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                {animatedScore}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">/100</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Progress</span>
          <span className={`font-medium ${getScoreColor(score)}`}>{score}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ease-out ${getScoreBackground(score)}`}
            style={{ width: `${animatedScore}%` }}
          ></div>
        </div>
      </div>

      {/* Trend indicator */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
          <TrendingUp className="w-3 h-3" />
          <span>vs last audit</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-green-600 dark:text-green-400">
          <TrendingUp className="w-3 h-3" />
          <span>+5%</span>
        </div>
      </div>
    </div>
  );
} 