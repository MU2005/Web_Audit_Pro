import HistoryCard from "../../components/HistoryCard";

export default function HistoryPage() {
  // TODO: fetch audit history from API
  const mockHistory = [
    {
      id: "1",
      url: "https://example.com",
      device: "desktop",
      timestamp: "2024-01-15T10:30:00Z",
      scores: {
        performance: 85,
        seo: 92,
        security: 78,
        accessibility: 88
      },
      status: "completed"
    },
    {
      id: "2",
      url: "https://test-site.org",
      device: "mobile",
      timestamp: "2024-01-14T15:45:00Z",
      scores: {
        performance: 72,
        seo: 85,
        security: 91,
        accessibility: 76
      },
      status: "completed"
    },
    {
      id: "3",
      url: "https://demo-app.com",
      device: "desktop",
      timestamp: "2024-01-13T09:20:00Z",
      scores: {
        performance: 94,
        seo: 89,
        security: 95,
        accessibility: 92
      },
      status: "completed"
    },
    {
      id: "4",
      url: "https://portfolio.dev",
      device: "mobile",
      timestamp: "2024-01-12T14:10:00Z",
      scores: {
        performance: 68,
        seo: 76,
        security: 82,
        accessibility: 71
      },
      status: "completed"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Audit History</h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and compare your previous website audits
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Filter by Device
                </label>
                <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">All Devices</option>
                  <option value="desktop">Desktop</option>
                  <option value="mobile">Mobile</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sort by
                </label>
                <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="date">Date</option>
                  <option value="performance">Performance</option>
                  <option value="seo">SEO</option>
                  <option value="security">Security</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              {mockHistory.length} audits found
            </div>
          </div>
        </div>

        {/* History Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockHistory.map((audit) => (
            <HistoryCard key={audit.id} audit={audit} />
          ))}
        </div>

        {/* Empty State */}
        {mockHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No audits yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start your first website audit to see results here
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Start New Audit
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 