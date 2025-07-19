import { Suspense } from "react";
import ResultsClient from "./ResultsClient";

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin mx-auto" style={{ animationDelay: '-1s' }}></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Analyzing Website</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Running comprehensive audit...</p>
          </div>
        </div>
      </div>
    }>
      <ResultsClient />
    </Suspense>
  );
} 