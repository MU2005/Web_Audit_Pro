"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Globe,
  TrendingUp,
  Shield,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ProgressSteps from "../ui/ProgressSteps";

export default function URLInputForm() {
  const [url, setUrl] = useState("");
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [showProgress, setShowProgress] = useState(false);
  const router = useRouter();

  const sampleSites = [
    { name: "Google", url: "google.com", description: "Search engine" },
    { name: "GitHub", url: "github.com", description: "Code repository" },
    { name: "Stack Overflow", url: "stackoverflow.com", description: "Developer Q&A" },
    { name: "MDN Web Docs", url: "developer.mozilla.org", description: "Web documentation" },
  ];

  const progressSteps = [
    {
      id: "connecting",
      title: "Connecting",
      description: "Establishing connection to PageSpeed API",
      icon: Globe,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "analyzing",
      title: "Analyzing",
      description: "Running comprehensive performance analysis",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "processing",
      title: "Processing",
      description: "Processing results and generating insights",
      icon: Shield,
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: "completing",
      title: "Completing",
      description: "Finalizing audit and preparing results",
      icon: Eye,
      color: "from-orange-500 to-red-500"
    }
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
    setShowProgress(true);

    try {
      // Normalize URL
      const normalizedUrl = url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`;
      
      // Progress step 1: Connecting
      setCurrentStep("connecting");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Progress step 2: Analyzing
      setCurrentStep("analyzing");
      
      // Call our API
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: normalizedUrl,
          device: device
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start audit');
      }

      const data = await response.json();
      
      // Progress step 3: Processing
      setCurrentStep("processing");
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Progress step 4: Completing
      setCurrentStep("completing");
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Navigate to results page with audit ID
      router.push(`/results?auditId=${data.data.auditId}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to start audit. Please try again.");
      setShowProgress(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <ProgressSteps currentStep={currentStep} steps={progressSteps} />
          </motion.div>
        )}
      </AnimatePresence>

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
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm sm:text-base lg:text-lg font-medium focus:outline-none py-1 touch-target"
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
                className={`flex items-center space-x-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base touch-target ${
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

          {/* Device Selector */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Device Type:</span>
              <div className="flex bg-secondary rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setDevice("desktop")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    device === "desktop"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setDevice("mobile")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    device === "mobile"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Mobile
                </button>
            </div>
          </div>

          {/* Submit Button - Mobile Only */}
            <div className="lg:hidden">
            <motion.button
              type="submit"
              disabled={!isValid || isLoading}
              whileHover={isValid && !isLoading ? { scale: 1.05 } : {}}
              whileTap={isValid && !isLoading ? { scale: 0.95 } : {}}
              className={`w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 text-sm touch-target ${
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
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sample Sites */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 sm:mt-8"
        >
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 text-center">
            Try with a sample site:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-xs sm:max-w-md mx-auto">
            {sampleSites.map((site, index) => (
              <motion.button
                key={site.name}
                type="button"
                onClick={() => handleSampleClick(site.url)}
                initial={{ 
                  opacity: 0, 
                  x: index % 2 === 0 ? -20 : 20,
                  y: 15
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  y: 0
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-secondary hover:bg-secondary-hover text-foreground rounded-lg transition-all duration-200 touch-target"
                title={`${site.name} - ${site.description}`}
              >
                {site.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.form>
    </div>
  );
} 