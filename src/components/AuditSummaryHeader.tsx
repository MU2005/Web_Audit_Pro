import { Globe, Monitor, Clock } from "lucide-react";

interface AuditSummaryHeaderProps {
  url: string;
  device: string;
  timestamp: string;
}

export default function AuditSummaryHeader({ url, device, timestamp }: AuditSummaryHeaderProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{url}</h1>
            <p className="text-gray-600 dark:text-gray-300">Website Audit Results</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center space-x-2">
            <Monitor className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{device}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{formatDate(timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 