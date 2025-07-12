"use client";

import { useState } from "react";
import { 
  Globe, 
  PlayCircle, 
  Zap, 
  Search, 
  Shield, 
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Mock data generation function
function generateMockAuditResult(url: string, device: 'mobile' | 'desktop', auditTypes: string[]) {
  const performanceScore = Math.floor(Math.random() * 40) + 60; // 60-100
  const seoScore = Math.floor(Math.random() * 30) + 70; // 70-100
  const securityScore = Math.floor(Math.random() * 25) + 75; // 75-100
  const accessibilityScore = Math.floor(Math.random() * 35) + 65; // 65-100

  const issues = [];
  
  // Generate issues based on scores and selected audit types
  if (auditTypes.includes('performance') && performanceScore < 90) {
    issues.push({
      id: 'perf-1',
      type: 'warning' as const,
      title: 'Performance can be improved',
      description: `Your performance score is ${performanceScore}/100. Consider optimizing images, minifying CSS/JS, and using a CDN.`,
      category: 'Performance',
      priority: performanceScore < 70 ? 'high' as const : 'medium' as const,
    });
  }

  if (auditTypes.includes('seo') && seoScore < 90) {
    issues.push({
      id: 'seo-1',
      type: 'warning' as const,
      title: 'SEO improvements needed',
      description: `Your SEO score is ${seoScore}/100. Check meta tags, headings, and alt text.`,
      category: 'SEO',
      priority: seoScore < 70 ? 'high' as const : 'medium' as const,
    });
  }

  if (auditTypes.includes('security') && securityScore < 90) {
    issues.push({
      id: 'sec-1',
      type: 'warning' as const,
      title: 'Security best practices',
      description: `Your security score is ${securityScore}/100. Check HTTPS, security headers, and best practices.`,
      category: 'Security',
      priority: securityScore < 70 ? 'high' as const : 'medium' as const,
    });
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    url,
    device: 'desktop', // Default to desktop for now
    timestamp: new Date().toISOString(),
    scores: {
      performance: performanceScore,
      seo: seoScore,
      security: securityScore,
      accessibility: accessibilityScore,
    },
    issues,
    metrics: {
      firstContentfulPaint: Math.round((Math.random() * 3 + 0.5) * 100) / 100,
      largestContentfulPaint: Math.round((Math.random() * 4 + 1) * 100) / 100,
      cumulativeLayoutShift: Math.round((Math.random() * 0.3) * 1000) / 1000,
      totalBlockingTime: Math.floor(Math.random() * 300 + 50),
    },
  };
}

const auditTypes = [
  { id: 'performance', label: 'Performance', icon: Zap, color: 'emerald' },
  { id: 'seo', label: 'SEO', icon: Search, color: 'teal' },
  { id: 'security', label: 'Security', icon: Shield, color: 'cyan' }
];

export default function URLInputForm() {
  const [url, setUrl] = useState("");
  const [selectedAuditTypes, setSelectedAuditTypes] = useState(['performance', 'seo', 'security']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  // Validate URL
  const validateUrl = (url: string) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Handle URL change
  const handleUrlChange = (value: string) => {
    setUrl(value);
    setError("");
    setIsValid(validateUrl(value));
  };

  // Handle checkbox change
  const handleAuditTypeChange = (typeId: string) => {
    setSelectedAuditTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) {
      setError("Please enter a valid website URL");
      return;
    }

    if (selectedAuditTypes.length === 0) {
      setError("Please select at least one audit type");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      console.log("Generating mock audit for:", url, "Types:", selectedAuditTypes);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock audit result
      const auditResult = generateMockAuditResult(url, 'desktop', selectedAuditTypes);
      
      // Store the audit result in localStorage for the results page
      localStorage.setItem('currentAudit', JSON.stringify(auditResult));
      
      // Redirect to results page
      router.push(`/results?id=${auditResult.id}`);
      
    } catch (error) {
      console.error('Audit generation error:', error);
      setError('Failed to generate audit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto"
    >
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* URL Input Field */}
        <div className="space-y-2">
          <label htmlFor="url" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Website URL *
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Globe className={`h-5 w-5 transition-colors duration-300 ${
                error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-emerald-500'
              }`} />
            </div>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://example.com"
              required
              className={`block w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 text-lg focus:outline-none focus:ring-4 ${
                error 
                  ? 'border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500/20'
              }`}
            />
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Audit Type Checkboxes */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Audit Types
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {auditTypes.map((type) => (
              <motion.label
                key={type.id}
                className={`relative flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${
                  selectedAuditTypes.includes(type.id)
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="checkbox"
                  checked={selectedAuditTypes.includes(type.id)}
                  onChange={() => handleAuditTypeChange(type.id)}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3 w-full">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                    selectedAuditTypes.includes(type.id)
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {selectedAuditTypes.includes(type.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckCircle className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <type.icon className={`w-4 h-4 ${
                      selectedAuditTypes.includes(type.id)
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      selectedAuditTypes.includes(type.id)
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {type.label}
                    </span>
                  </div>
                </div>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading || !isValid || selectedAuditTypes.length === 0}
          className="w-full group relative overflow-hidden"
          whileHover={{ scale: isValid && selectedAuditTypes.length > 0 ? 1.02 : 1 }}
          whileTap={{ scale: isValid && selectedAuditTypes.length > 0 ? 0.98 : 1 }}
        >
          <div className={`relative py-4 px-6 rounded-full font-semibold text-lg transition-all duration-300 ${
            isValid && selectedAuditTypes.length > 0 && !isLoading
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-emerald-500/25'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}>
            <div className="flex items-center justify-center space-x-3">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>ANALYZING...</span>
                </>
              ) : (
                <>
                  <PlayCircle className="h-5 w-5" />
                  <span>RUN AUDIT</span>
                </>
              )}
            </div>
            {isValid && selectedAuditTypes.length > 0 && !isLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
          </div>
        </motion.button>
      </motion.form>

      {/* Info Text */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Get comprehensive insights into your website's performance, SEO, and security
        </p>
      </motion.div>
    </motion.div>
  );
} 