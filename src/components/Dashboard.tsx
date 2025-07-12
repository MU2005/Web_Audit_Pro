"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  Search, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe, 
  Settings, 
  Bell, 
  User,
  FileText,
  Target
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Search, label: "Audit Reports", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: Shield, label: "Security", active: false },
    { icon: Zap, label: "Performance", active: false },
    { icon: Globe, label: "SEO", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  const stats = [
    { title: "Total Audits", value: "1,247", change: "+12%", icon: FileText, color: "blue" },
    { title: "Security Score", value: "94/100", change: "+3%", icon: Shield, color: "green" },
    { title: "Performance", value: "87/100", change: "+8%", icon: Zap, color: "yellow" },
    { title: "SEO Score", value: "92/100", change: "+5%", icon: Target, color: "purple" },
  ];

  const recentAudits = [
    { name: "example.com", status: "completed", score: 94, date: "2 hours ago" },
    { name: "test-site.org", status: "in-progress", score: 87, date: "4 hours ago" },
    { name: "demo-app.com", status: "completed", score: 91, date: "1 day ago" },
    { name: "portfolio.dev", status: "completed", score: 89, date: "2 days ago" },
  ];

  const alerts = [
    { type: "warning", message: "SSL certificate expires in 30 days", time: "5 min ago" },
    { type: "error", message: "Critical security vulnerability detected", time: "1 hour ago" },
    { type: "info", message: "New audit report available", time: "2 hours ago" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              {sidebarOpen && (
                <span className="text-xl font-bold text-gray-900">WebAudit Pro</span>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <div className="w-4 h-4 flex flex-col justify-center items-center">
                <div className="w-4 h-0.5 bg-gray-600 mb-1"></div>
                <div className="w-4 h-0.5 bg-gray-600 mb-1"></div>
                <div className="w-4 h-0.5 bg-gray-600"></div>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </a>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              {sidebarOpen && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your audits.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Audits */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Audits</h2>
                <p className="text-sm text-gray-600 mt-1">Latest website audit reports</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentAudits.map((audit, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Globe className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{audit.name}</p>
                          <p className="text-sm text-gray-500">{audit.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{audit.score}/100</p>
                          <p className="text-sm text-gray-500">Score</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          audit.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {audit.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alerts & Activity */}
            <div className="space-y-6">
              {/* Alerts */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Alerts</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {alerts.map((alert, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          alert.type === 'error' ? 'bg-red-500' :
                          alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                      <Search className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">New Audit</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900">View Reports</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                      <Settings className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 