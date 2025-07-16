"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function URLInputForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  const sampleSites = [
    { name: "Google", url: "google.com", description: "Search engine" },
    { name: "GitHub", url: "github.com", description: "Code repository" },
    { name: "Stack Overflow", url: "stackoverflow.com", description: "Developer Q&A" },
    { name: "MDN Web Docs", url: "developer.mozilla.org", description: "Web documentation" },
  ];

  const validateUrl = (input: string) => {
    if (!input || input.trim().length === 0) {
      return false;
    }
    
    try {
      // Remove whitespace and normalize
      const cleanInput = input.trim();
      const urlObj = new URL(cleanInput.startsWith('http') ? cleanInput : `https://${cleanInput}`);
      
      // Check if it's a valid URL with proper hostname
      return urlObj.hostname.length > 0 && 
             urlObj.hostname.includes('.') && 
             !urlObj.hostname.startsWith('.') && 
             !urlObj.hostname.endsWith('.');
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    setError("");
    
    if (value.length > 0) {
      const valid = validateUrl(value);
      setIsValid(valid);
      if (!valid) {
        setError("Please enter a valid URL (e.g., example.com)");
      }
    } else {
      setIsValid(false);
    }
  };

  const handleSampleClick = (sampleUrl: string) => {
    setUrl(sampleUrl);
    setIsValid(true);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Additional validation before submission
    if (!url || url.trim().length === 0) {
      setError("Please enter a website URL");
      return;
    }
    
    if (!isValid) {
      setError("Please enter a valid URL (e.g., example.com)");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Normalize URL
      const normalizedUrl = url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`;
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to results page with URL parameter
      router.push(`/results?url=${encodeURIComponent(normalizedUrl)}`);
    } catch {
      setError("Failed to start audit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="relative"
      >
        {/* Main Input Container */}
        <div className="relative bg-card rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all duration-300 p-2 sm:p-3">
          {/* Input Row - Mobile: Input + Status, Desktop: Input + Status + Button */}
          <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6">
            {/* Search Icon */}
            <div className="flex-shrink-0">
              <Search className="w-4 h-4 sm:w-6 sm:h-6 text-muted-foreground" />
            </div>

            {/* URL Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder="Enter website URL (e.g., example.com)"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-base sm:text-lg font-medium focus:outline-none py-1"
                disabled={isLoading}
              />
              
              {/* Floating Label */}
              <AnimatePresence>
                {url.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-2 left-0 text-xs text-muted-foreground bg-card px-2"
                  >
                    Website URL
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Status Indicators - Hidden on very small screens */}
            <div className="hidden sm:flex items-center space-x-3">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-3"
                  >
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-spin" />
                    <span className="text-xs sm:text-sm text-primary">Processing...</span>
                  </motion.div>
                ) : isValid ? (
                  <motion.div
                    key="valid"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                    <span className="text-xs sm:text-sm text-success">Valid URL</span>
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-3"
                  >
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-error" />
                    <span className="text-xs sm:text-sm text-error">Invalid URL</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Submit Button - Desktop Only */}
            <div className="hidden lg:block">
              <motion.button
                type="submit"
                disabled={!isValid || isLoading}
                whileHover={isValid && !isLoading ? { scale: 1.05 } : {}}
                whileTap={isValid && !isLoading ? { scale: 0.95 } : {}}
                className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 text-base ${
                  isValid && !isLoading
                    ? "bg-gradient-primary text-white shadow-lg hover:shadow-xl"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Start Audit</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Submit Button - Mobile Only */}
          <div className="lg:hidden px-4 sm:px-6 pb-4 sm:pb-6">
            <motion.button
              type="submit"
              disabled={!isValid || isLoading}
              whileHover={isValid && !isLoading ? { scale: 1.05 } : {}}
              whileTap={isValid && !isLoading ? { scale: 0.95 } : {}}
              className={`w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 text-sm ${
                isValid && !isLoading
                  ? "bg-gradient-primary text-white shadow-lg hover:shadow-xl"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Start Audit</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-center space-x-3 text-error text-xs sm:text-sm"
            >
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sample Sites */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 sm:mt-8"
        >
          <p className="text-xs sm:text-sm text-muted-foreground text-center mb-4 sm:mb-6">
            Try auditing these popular websites:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {sampleSites.map((site, index) => (
              <motion.button
                key={site.name}
                type="button"
                onClick={() => handleSampleClick(site.url)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="p-3 sm:p-4 rounded-xl bg-secondary border border-border hover:bg-secondary-hover hover:border-primary/30 transition-all duration-200 text-left group"
              >
                <div className="font-medium text-foreground group-hover:text-primary transition-colors text-sm sm:text-base mb-1">
                  {site.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {site.description}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 sm:mt-8 text-center"
        >
          <p className="text-xs sm:text-sm text-muted-foreground">
            Enter any website URL to get instant performance, SEO, security, and accessibility insights
          </p>
        </motion.div>
      </motion.form>
    </div>
  );
} 