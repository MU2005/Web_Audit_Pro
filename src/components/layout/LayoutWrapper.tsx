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
      <div className="min-h-screen bg-background flex flex-col">
        {/* Fixed Header */}
        <Header />

        {/* Main Content Area */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col pt-16 lg:pt-20"
        >
          {/* Content Container with Enhanced Responsive Design */}
          <div className="flex-1 w-full container-responsive">
            <div className="py-4 sm:py-6 lg:py-8 xl:py-10">
              {children}
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </motion.main>
      </div>
    </ThemeProvider>
  );
} 