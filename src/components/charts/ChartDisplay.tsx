"use client";

import { useState } from "react";
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
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, Zap, Shield, Eye, Target } from "lucide-react";

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
}

const chartTabs = [
  { key: 'radar', label: 'Scores' },
  { key: 'bar', label: 'Web Vitals' },
  { key: 'line', label: 'Trends' },
  { key: 'doughnut', label: 'Distribution' },
] as const;

type ChartTab = typeof chartTabs[number]['key'];

export default function ChartDisplay({ auditData }: ChartDisplayProps) {
  const [activeChart, setActiveChart] = useState<ChartTab>('radar');

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

  // Chart Data
  const radarData = {
    labels: ['Performance', 'SEO', 'Security', 'Accessibility'],
    datasets: [
      {
        label: 'Audit Scores',
        data: [scores.performance, scores.seo, scores.security, scores.accessibility],
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };
  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20, color: '#6B7280' },
        grid: { color: '#E5E7EB' },
        pointLabels: { color: '#374151', font: { size: 13, weight: 700 } },
      },
    },
  };
  const barData = {
    labels: ['FCP', 'LCP', 'CLS', 'TBT'],
    datasets: [
      {
        label: 'Current',
        data: [metrics.firstContentfulPaint, metrics.largestContentfulPaint, metrics.cumulativeLayoutShift * 1000, metrics.totalBlockingTime],
        backgroundColor: [
          'rgba(59,130,246,0.8)',
          'rgba(16,185,129,0.8)',
          'rgba(245,158,11,0.8)',
          'rgba(239,68,68,0.8)',
        ],
        borderRadius: 8,
        borderWidth: 0,
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
        callbacks: { 
          label: (ctx: TooltipItem<'bar'>) => `${ctx.dataset.label}: ${ctx.parsed.y}` 
        } 
      },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#E5E7EB' }, ticks: { color: '#6B7280' } },
      x: { grid: { display: false }, ticks: { color: '#6B7280' } },
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
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'SEO',
        data: [85, 87, 89, 88, 90, scores.seo],
        borderColor: 'rgba(16,185,129,1)',
        backgroundColor: 'rgba(16,185,129,0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const, labels: { color: '#374151', usePointStyle: true } },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true, max: 100, grid: { color: '#E5E7EB' }, ticks: { color: '#6B7280' } },
      x: { grid: { display: false }, ticks: { color: '#6B7280' } },
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
        borderWidth: 2,
      },
    ],
  };
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { color: '#374151', usePointStyle: true } },
      title: { display: false },
    },
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'radar':
        return <Radar data={radarData} options={radarOptions} />;
      case 'bar':
        return <Bar data={barData} options={barOptions} />;
      case 'line':
        return <Line data={lineData} options={lineOptions} />;
      case 'doughnut':
        return <Doughnut data={doughnutData} options={doughnutOptions} />;
      default:
        return <Radar data={radarData} options={radarOptions} />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Analytics</h3>
        <div className="flex space-x-1">
          {chartTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveChart(tab.key)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                activeChart === tab.key
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-80">
        {renderChart()}
      </div>
    </div>
  );
} 