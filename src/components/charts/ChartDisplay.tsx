"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TooltipItem,
} from 'chart.js';
import { Line, Bar, Doughnut, PolarArea, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartDisplayProps {
  auditData?: {
    scores: {
      performance: number;
      seo: number;
      security: number;
      accessibility: number;
    };
    metrics: {
      firstContentfulPaint: number;
      largestContentfulPaint: number;
      cumulativeLayoutShift: number;
      totalBlockingTime: number;
    };
  };
  chartType?: 'progress' | 'analytics' | 'performance' | 'radar' | 'bar' | 'line' | 'doughnut' | 'polar' | 'overview';
}

const chartTabs = [
  { key: 'progress', label: 'Progress Rings', icon: '🎯' },
  { key: 'analytics', label: 'Analytics', icon: '📊' },
  { key: 'performance', label: 'Performance', icon: '⚡' },
  { key: 'bar', label: 'Web Vitals', icon: '📈' },
  { key: 'line', label: 'Trends', icon: '📉' },
  { key: 'doughnut', label: 'Distribution', icon: '🥧' },
  { key: 'polar', label: 'Overview', icon: '🌟' },
  { key: 'radar', label: 'Radar', icon: '🕷️' },
] as const;

type ChartTab = typeof chartTabs[number]['key'];

// Custom Progress Ring Component
const ProgressRing = ({ score, label, color, size = 120 }: { 
  score: number; 
  label: string; 
  color: string; 
  size?: number;
}) => {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-slate-200 dark:text-slate-700"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={color}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">/ 100</div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 text-center">
        <div className="text-sm font-semibold text-slate-900 dark:text-white">{label}</div>
        <div className="text-xs text-slate-600 dark:text-slate-400">
          {score >= 90 ? "Excellent" : score >= 70 ? "Good" : "Needs Improvement"}
        </div>
      </div>
    </motion.div>
  );
};

// Analytics Heatmap Component
const AnalyticsHeatmap = ({ auditData }: { 
  auditData: {
    scores: {
      performance: number;
      accessibility: number;
      security: number;
      seo: number;
    };
    metrics: {
      firstContentfulPaint: number;
      largestContentfulPaint: number;
      cumulativeLayoutShift: number;
      totalBlockingTime: number;
    };
  };
}) => {
  const metrics = [
    { name: 'Performance', value: auditData.scores.performance, color: 'from-blue-500 to-cyan-500' },
    { name: 'Accessibility', value: auditData.scores.accessibility, color: 'from-green-500 to-emerald-500' },
    { name: 'Security', value: auditData.scores.security, color: 'from-purple-500 to-indigo-500' },
    { name: 'SEO', value: auditData.scores.seo, color: 'from-orange-500 to-red-500' },
  ];

  const webVitals = [
    { name: 'FCP', value: auditData.metrics.firstContentfulPaint, unit: 's', color: 'from-blue-400 to-blue-600' },
    { name: 'LCP', value: auditData.metrics.largestContentfulPaint, unit: 's', color: 'from-green-400 to-green-600' },
    { name: 'CLS', value: auditData.metrics.cumulativeLayoutShift * 1000, unit: '', color: 'from-yellow-400 to-yellow-600' },
    { name: 'TBT', value: auditData.metrics.totalBlockingTime, unit: 'ms', color: 'from-red-400 to-red-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Performance Metrics Heatmap */}
      <div>
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Performance Metrics</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`bg-gradient-to-br ${metric.color} rounded-2xl p-4 text-white shadow-lg transform transition-all duration-300 group-hover:scale-105`}>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{metric.value}</div>
                  <div className="text-sm opacity-90">{metric.name}</div>
                </div>
                {/* Progress bar overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-2xl">
                  <div 
                    className="h-full bg-white/40 rounded-b-2xl transition-all duration-1000"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Web Vitals Heatmap */}
      <div>
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Web Vitals</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {webVitals.map((vital, index) => (
            <motion.div
              key={vital.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 4) * 0.1 }}
              className="relative group"
            >
              <div className={`bg-gradient-to-br ${vital.color} rounded-2xl p-4 text-white shadow-lg transform transition-all duration-300 group-hover:scale-105`}>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">{vital.value.toFixed(1)}{vital.unit}</div>
                  <div className="text-sm opacity-90">{vital.name}</div>
                </div>
                {/* Animated pulse effect */}
                <div className="absolute inset-0 bg-white/10 rounded-2xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ChartDisplay({ auditData, chartType = 'progress' }: ChartDisplayProps) {
  const [activeChart, setActiveChart] = useState<ChartTab>('progress');

  const defaultScores = {
    performance: 85,
    seo: 92,
    security: 78,
    accessibility: 88
  };
  const defaultMetrics = {
    firstContentfulPaint: 1.2,
    largestContentfulPaint: 2.1,
    cumulativeLayoutShift: 0.05,
    totalBlockingTime: 150
  };
  const scores = auditData?.scores || defaultScores;
  const metrics = auditData?.metrics || defaultMetrics;

  // Radar Chart Data
  const radarData = {
    labels: ['Performance', 'Accessibility', 'Security', 'SEO', 'Speed', 'Quality'],
    datasets: [
      {
        label: 'Current Scores',
        data: [
          scores.performance,
          scores.accessibility,
          scores.security,
          scores.seo,
          Math.max(0, 100 - metrics.firstContentfulPaint * 20),
          Math.max(0, 100 - metrics.totalBlockingTime / 10)
        ],
        backgroundColor: 'rgba(59,130,246,0.2)',
        borderColor: 'rgba(59,130,246,1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(59,130,246,1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };
  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { 
          stepSize: 20, 
          color: '#6B7280',
          font: { size: 12 }
        },
        grid: { 
          color: '#E5E7EB',
          lineWidth: 1
        },
        pointLabels: { 
          color: '#374151', 
          font: { size: 12 },
          padding: 15
        },
      },
    },
  };

  const barData = {
    labels: ['FCP', 'LCP', 'CLS', 'TBT'],
    datasets: [
      {
        label: 'Current',
        data: [
          metrics.firstContentfulPaint, 
          metrics.largestContentfulPaint, 
          metrics.cumulativeLayoutShift * 1000, 
          metrics.totalBlockingTime
        ],
        backgroundColor: [
          'rgba(59,130,246,0.8)',
          'rgba(16,185,129,0.8)',
          'rgba(245,158,11,0.8)',
          'rgba(239,68,68,0.8)',
        ],
        borderRadius: 12,
        borderWidth: 0,
        borderSkipped: false,
      },
    ],
  };
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { 
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: { 
          label: (ctx: TooltipItem<'bar'>) => `${ctx.dataset.label}: ${ctx.parsed.y}` 
        } 
      },
    },
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: '#E5E7EB', lineWidth: 1 }, 
        ticks: { color: '#6B7280', font: { size: 12 } } 
      },
      x: { 
        grid: { display: false }, 
        ticks: { color: '#6B7280', font: { size: 12 } } 
      },
    },
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance',
        data: [75, 78, 82, 79, 85, scores.performance],
        borderColor: 'rgba(59,130,246,1)',
        backgroundColor: 'rgba(59,130,246,0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgba(59,130,246,1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'SEO',
        data: [85, 87, 89, 88, 90, scores.seo],
        borderColor: 'rgba(16,185,129,1)',
        backgroundColor: 'rgba(16,185,129,0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgba(16,185,129,1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top' as const, 
        labels: { 
          color: '#374151', 
          usePointStyle: true,
          font: { size: 12 },
          padding: 20
        } 
      },
      title: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
    scales: {
      y: { 
        beginAtZero: true, 
        max: 100, 
        grid: { color: '#E5E7EB', lineWidth: 1 }, 
        ticks: { color: '#6B7280', font: { size: 12 } } 
      },
      x: { 
        grid: { display: false }, 
        ticks: { color: '#6B7280', font: { size: 12 } } 
      },
    },
  };

  const doughnutData = {
    labels: ['Performance', 'SEO', 'Security', 'Accessibility'],
    datasets: [
      {
        data: [scores.performance, scores.seo, scores.security, scores.accessibility],
        backgroundColor: [
          'rgba(59,130,246,0.8)',
          'rgba(16,185,129,0.8)',
          'rgba(239,68,68,0.8)',
          'rgba(139,92,246,0.8)',
        ],
        borderColor: [
          'rgba(59,130,246,1)',
          'rgba(16,185,129,1)',
          'rgba(239,68,68,1)',
          'rgba(139,92,246,1)',
        ],
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'bottom' as const, 
        labels: { 
          color: '#374151', 
          usePointStyle: true,
          font: { size: 12 },
          padding: 20
        } 
      },
      title: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
  };

  const polarData = {
    labels: ['Performance', 'SEO', 'Security', 'Accessibility'],
    datasets: [
      {
        label: 'Audit Scores',
        data: [scores.performance, scores.seo, scores.security, scores.accessibility],
        backgroundColor: [
          'rgba(59,130,246,0.6)',
          'rgba(16,185,129,0.6)',
          'rgba(239,68,68,0.6)',
          'rgba(139,92,246,0.6)',
        ],
        borderColor: [
          'rgba(59,130,246,1)',
          'rgba(16,185,129,1)',
          'rgba(239,68,68,1)',
          'rgba(139,92,246,1)',
        ],
        borderWidth: 2,
      },
    ],
  };
  const polarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'bottom' as const, 
        labels: { 
          color: '#374151', 
          usePointStyle: true,
          font: { size: 12 },
          padding: 20
        } 
      },
      title: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { 
          stepSize: 20, 
          color: '#6B7280',
          font: { size: 12 }
        },
        grid: { 
          color: '#E5E7EB',
          lineWidth: 1
        },
        pointLabels: { 
          color: '#374151', 
          font: { size: 12 },
          padding: 15
        },
      },
    },
  };

  const renderChart = () => {
    // If chartType is specified, use that instead of activeChart
    const currentChart = chartType === 'analytics' ? 'radar' : activeChart;
    
    switch (currentChart) {
      case 'progress':
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            <ProgressRing 
              score={scores.performance} 
              label="Performance" 
              color="text-blue-600 dark:text-blue-400"
            />
            <ProgressRing 
              score={scores.accessibility} 
              label="Accessibility" 
              color="text-green-600 dark:text-green-400"
            />
            <ProgressRing 
              score={scores.security} 
              label="Security" 
              color="text-red-600 dark:text-red-400"
            />
            <ProgressRing 
              score={scores.seo} 
              label="SEO" 
              color="text-purple-600 dark:text-purple-400"
            />
          </div>
        );
      case 'analytics':
        return <AnalyticsHeatmap auditData={{ scores, metrics }} />;
      case 'radar':
        return <Radar data={radarData} options={radarOptions} />;
      case 'bar':
        return <Bar data={barData} options={barOptions} />;
      case 'line':
        return <Line data={lineData} options={lineOptions} />;
      case 'doughnut':
        return <Doughnut data={doughnutData} options={doughnutOptions} />;
      case 'polar':
        return <PolarArea data={polarData} options={polarOptions} />;
      default:
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            <ProgressRing 
              score={scores.performance} 
              label="Performance" 
              color="text-blue-600 dark:text-blue-400"
            />
            <ProgressRing 
              score={scores.accessibility} 
              label="Accessibility" 
              color="text-green-600 dark:text-green-400"
            />
            <ProgressRing 
              score={scores.security} 
              label="Security" 
              color="text-red-600 dark:text-red-400"
            />
            <ProgressRing 
              score={scores.seo} 
              label="SEO" 
              color="text-purple-600 dark:text-purple-400"
            />
          </div>
        );
    }
  };

  // If chartType is specified, don't show tabs
  if (chartType) {
    return (
      <div className="w-full">
        <div className="relative">
          <div className="h-80 lg:h-96 w-full">
            {renderChart()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Chart Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {chartTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveChart(tab.key)}
            className={`px-4 py-2 text-sm rounded-xl transition-all duration-200 font-medium flex items-center gap-2 ${
                activeChart === tab.key
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
            <span className="text-lg">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
      </div>
      
      {/* Chart Container */}
      <div className="relative">
        <div className="h-80 lg:h-96 w-full">
        {renderChart()}
        </div>
        
        {/* Chart Info Overlay */}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl p-3 border border-slate-200 dark:border-slate-700">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            <div className="font-semibold mb-1">Chart Info</div>
            <div className="space-y-1">
              <div>FCP: First Contentful Paint</div>
              <div>LCP: Largest Contentful Paint</div>
              <div>CLS: Cumulative Layout Shift</div>
              <div>TBT: Total Blocking Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 