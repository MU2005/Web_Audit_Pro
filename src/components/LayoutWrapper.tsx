"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header onMenuClick={toggleSidebar} />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar - Always visible on desktop, overlay on mobile */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Main Content Area */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 lg:ml-64 min-h-screen flex flex-col"
        >
          {/* Content */}
          <div className="flex-1 p-6">
            {children}
          </div>

          {/* Footer */}
          <Footer />
        </motion.main>
      </div>
    </div>
  );
} 