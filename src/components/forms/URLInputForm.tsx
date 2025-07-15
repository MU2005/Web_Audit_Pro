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
    try {
      const urlObj = new URL(input.startsWith('http') ? input : `https://${input}`);
      return urlObj.hostname.length > 0;
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
        setError("Please enter a valid URL");
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
    
    if (!isValid) {
      setError("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Normalize URL
      const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
      
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
        <div className="relative bg-card rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all duration-300 p-2">
          <div className="flex items-center space-x-3 p-4">
            {/* Search Icon */}
            <div className="flex-shrink-0">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>

            {/* URL Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder="Enter website URL (e.g., example.com)"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-lg font-medium focus:outline-none"
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

            {/* Status Indicators */}
            <div className="flex items-center space-x-2">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-2"
                  >
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <span className="text-sm text-muted-foreground">Analyzing...</span>
                  </motion.div>
                ) : isValid ? (
                  <motion.div
                    key="valid"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm text-success">Valid URL</span>
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-2"
                  >
                    <AlertCircle className="w-5 h-5 text-error" />
                    <span className="text-sm text-error">Invalid URL</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!isValid || isLoading}
              whileHover={isValid && !isLoading ? { scale: 1.05 } : {}}
              whileTap={isValid && !isLoading ? { scale: 0.95 } : {}}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
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
              className="mt-3 flex items-center space-x-2 text-error text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sample Sites */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6"
        >
          <p className="text-sm text-muted-foreground text-center mb-4">
            Try auditing these popular websites:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                className="p-3 rounded-xl bg-secondary hover:bg-secondary-hover transition-all duration-200 text-left group"
              >
                <div className="font-medium text-foreground group-hover:text-primary transition-colors">
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
          className="mt-6 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Enter any website URL to get instant performance, SEO, security, and accessibility insights
          </p>
        </motion.div>
      </motion.form>
    </div>
  );
} 