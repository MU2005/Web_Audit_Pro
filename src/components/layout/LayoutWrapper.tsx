"use client";

import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import ThemeProvider from "./ThemeProvider";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Fixed Header */}
        <Header />

        {/* Main Content Area */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-16 min-h-screen flex flex-col"
        >
          {/* Content Container */}
          <div className="flex-1 w-full max-w-none p-4 sm:p-6 lg:p-8">
            {children}
          </div>

          {/* Footer */}
          <Footer />
        </motion.main>
      </div>
    </ThemeProvider>
  );
} 