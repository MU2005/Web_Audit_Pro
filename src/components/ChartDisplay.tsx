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

  // Chart Data (same as before)
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
      legend: { position: 'bottom' as const, labels: { color: '#374151', usePointStyle: true, padding: 20 } },
      title: { display: false },
    },
  };
  const chartComponents = {
    radar: <Radar data={radarData} options={radarOptions} />,
    bar: <Bar data={barData} options={barOptions} />,
    line: <Line data={lineData} options={lineOptions} />,
    doughnut: <Doughnut data={doughnutData} options={doughnutOptions} />,
  };

  // Stats row
  const stats = [
    { label: 'Performance', value: scores.performance, color: 'text-blue-600', Icon: Zap },
    { label: 'SEO', value: scores.seo, color: 'text-green-600', Icon: Target },
    { label: 'Security', value: scores.security, color: 'text-red-600', Icon: Shield },
    { label: 'Accessibility', value: scores.accessibility, color: 'text-purple-600', Icon: Eye },
  ];

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Analytics & Visualizations</h3>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Real-time</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {chartTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveChart(tab.key)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-colors border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${activeChart === tab.key
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/20'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="h-80">
          {chartComponents[activeChart]}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <stat.Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 