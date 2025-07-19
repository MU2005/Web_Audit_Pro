"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  TrendingUp, 
  Shield, 
  Eye, 
  ArrowRight,
  CheckCircle,
  Globe,
  Clock,
  BarChart3,
  ChevronDown,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { URLInputForm } from "../components/forms";
import { useState } from "react";

export default function HomePage() {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const features = [
    {
      icon: TrendingUp,
      title: "Performance Analysis",
      description: "Get detailed insights into your website's loading speed, Core Web Vitals, and performance metrics.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Eye,
      title: "SEO Optimization",
      description: "Comprehensive SEO analysis including meta tags, structured data, and search engine optimization.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Security Audit",
      description: "Identify security vulnerabilities, SSL certificates, and best practices for web security.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Accessibility Check",
      description: "Ensure your website is accessible to all users with WCAG compliance analysis.",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const benefits = [
    "Instant audit results in seconds",
    "Comprehensive performance metrics",
    "Detailed SEO recommendations",
    "Security vulnerability detection",
    "Accessibility compliance check",
    "Export reports as PDF",
    "Historical audit tracking",
    "Mobile and desktop analysis"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container-responsive">
          <div className="text-center">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-responsive-4xl sm:text-responsive-5xl lg:text-responsive-6xl font-display font-bold leading-tight"
            >
              <span className="gradient-text">Get Instant</span>
              <br />
              <span className="text-foreground">Website Audit Reports</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 sm:mt-6 text-responsive-lg lg:text-responsive-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Professional web auditing tool that analyzes performance, SEO, security, and accessibility. 
              Get actionable insights to improve your website&apos;s success.
            </motion.p>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 sm:mt-10"
            >
              <URLInputForm />
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 sm:mt-16 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-responsive-sm text-muted-foreground"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-info" />
                <span>Instant results</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span>Global analysis</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack & Integrations Section */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-background">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Powered by Advanced Tech</span>
            </motion.div>
            <h2 className="text-responsive-2xl sm:text-responsive-3xl lg:text-responsive-4xl font-display font-bold text-foreground mb-3 sm:mb-4 lg:mb-6">
              Built with <span className="gradient-text">Cutting-Edge Technology</span>
            </h2>
            <p className="text-responsive-sm sm:text-responsive-lg text-muted-foreground max-w-3xl mx-auto px-2">
              Our platform leverages the latest technologies and tools to provide you with the most accurate and comprehensive web audits available.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8 lg:space-y-12"
          >
            {[
              {
                id: "ai-ml",
                title: "AI & Machine Learning",
                icon: Sparkles,
                color: "from-purple-500 to-pink-600",
                description: "Advanced AI algorithms for intelligent analysis",
                technologies: [
                  { name: "TensorFlow", type: "AI Framework", status: "Active" },
                  { name: "OpenAI GPT", type: "Language Model", status: "Integrated" },
                  { name: "Computer Vision", type: "Image Analysis", status: "Processing" },
                  { name: "NLP Engine", type: "Text Analysis", status: "Ready" }
                ],
                features: [
                  "Intelligent pattern recognition",
                  "Predictive performance analysis",
                  "Automated issue detection",
                  "Smart recommendation engine"
                ]
              },
              {
                id: "cloud-infra",
                title: "Cloud Infrastructure",
                icon: Globe,
                color: "from-blue-500 to-cyan-600",
                description: "Scalable cloud infrastructure for global performance",
                technologies: [
                  { name: "AWS Lambda", type: "Serverless", status: "Running" },
                  { name: "Google Cloud", type: "Compute Engine", status: "Active" },
                  { name: "Azure CDN", type: "Content Delivery", status: "Optimized" },
                  { name: "Docker", type: "Containerization", status: "Deployed" }
                ],
                features: [
                  "Global CDN distribution",
                  "Auto-scaling capabilities",
                  "99.9% uptime guarantee",
                  "Real-time monitoring"
                ]
              },
              {
                id: "security-tools",
                title: "Security & Compliance",
                icon: ShieldCheck,
                color: "from-green-500 to-emerald-600",
                description: "Enterprise-grade security tools and compliance",
                technologies: [
                  { name: "OWASP ZAP", type: "Security Scanner", status: "Scanning" },
                  { name: "SSL Labs", type: "SSL Testing", status: "Verified" },
                  { name: "HackerOne", type: "Bug Bounty", status: "Active" },
                  { name: "SOC 2", type: "Compliance", status: "Certified" }
                ],
                features: [
                  "Real-time threat detection",
                  "Vulnerability assessment",
                  "Compliance reporting",
                  "Security monitoring"
                ]
              },
              {
                id: "analytics",
                title: "Advanced Analytics",
                icon: BarChart3,
                color: "from-orange-500 to-red-600",
                description: "Comprehensive analytics and data visualization",
                technologies: [
                  { name: "Google Analytics", type: "Web Analytics", status: "Tracking" },
                  { name: "Mixpanel", type: "Event Analytics", status: "Active" },
                  { name: "Tableau", type: "Data Visualization", status: "Connected" },
                  { name: "BigQuery", type: "Data Warehouse", status: "Processing" }
                ],
                features: [
                  "Real-time data processing",
                  "Custom dashboard creation",
                  "Predictive analytics",
                  "Performance insights"
                ]
              }
            ].map((stack, index) => (
              <motion.div
                key={stack.id}
                variants={itemVariants}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="group"
              >
                <motion.div
                  whileHover={{ 
                    y: -4,
                    scale: 1.01,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Stack Header */}
                  <div 
                    className="p-3 sm:p-4 lg:p-6 cursor-pointer touch-target"
                    onClick={() => setExpandedFeature(expandedFeature === stack.id ? null : stack.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                      <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                        <motion.div 
                          className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r ${stack.color} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg`}
                          whileHover={{ 
                            rotate: 360,
                            scale: 1.1,
                            transition: { duration: 0.5 }
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <stack.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-1 truncate">
                            {stack.title}
                          </h3>
                          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground line-clamp-2">
                            {stack.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3 lg:space-x-4">
                        {/* Technology Pills - Mobile Optimized */}
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {stack.technologies.slice(0, 2).map((tech, techIndex) => (
                            <motion.div
                              key={tech.name}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: techIndex * 0.1 }}
                              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full"
                            >
                              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                                tech.status === 'Active' || tech.status === 'Running' ? 'bg-green-500' :
                                tech.status === 'Processing' || tech.status === 'Scanning' ? 'bg-blue-500' :
                                tech.status === 'Ready' || tech.status === 'Optimized' ? 'bg-purple-500' :
                                'bg-gray-500'
                              } animate-pulse`}></div>
                              <span className="text-xs font-medium text-foreground truncate max-w-16 sm:max-w-none">{tech.name}</span>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Expand/Collapse Icon */}
                        <motion.div
                          animate={{ 
                            rotate: expandedFeature === stack.id ? 180 : 0,
                            scale: expandedFeature === stack.id ? 1.1 : 1
                          }}
                          transition={{ duration: 0.3 }}
                          className="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors touch-target flex-shrink-0"
                        >
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedFeature === stack.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 border-t border-gray-200 dark:border-gray-800">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 pt-4 sm:pt-6">
                            {/* Technologies Grid */}
                            <div>
                              <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Technologies Used:</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                {stack.technologies.map((tech, techIndex) => (
                                  <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: techIndex * 0.1 }}
                                    className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                                  >
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-xs sm:text-sm text-foreground truncate">{tech.name}</div>
                                      <div className="text-xs text-muted-foreground truncate">{tech.type}</div>
                                    </div>
                                    <div className="flex items-center space-x-1 sm:space-x-2 ml-2">
                                      <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                                        tech.status === 'Active' || tech.status === 'Running' ? 'bg-green-500' :
                                        tech.status === 'Processing' || tech.status === 'Scanning' ? 'bg-blue-500' :
                                        tech.status === 'Ready' || tech.status === 'Optimized' ? 'bg-purple-500' :
                                        'bg-gray-500'
                                      } animate-pulse`}></div>
                                      <span className="text-xs font-medium text-muted-foreground truncate max-w-16 sm:max-w-none">{tech.status}</span>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            {/* Features List */}
                            <div>
                              <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Key Features:</h4>
                              <ul className="space-y-2 sm:space-y-3">
                                {stack.features.map((feature, featureIndex) => (
                                  <motion.li
                                    key={feature}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: featureIndex * 0.1 }}
                                    className="flex items-center space-x-2 sm:space-x-3"
                                  >
                                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r ${stack.color} flex-shrink-0`}></div>
                                    <span className="text-xs sm:text-sm lg:text-base text-muted-foreground">{feature}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Bottom Action */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-800"
                          >
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                              <div className="flex items-center space-x-3 sm:space-x-4">
                                <div className="flex items-center space-x-1 sm:space-x-2">
                                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                                  <span className="text-xs text-muted-foreground">Live & Active</span>
                                </div>
                                <div className="flex items-center space-x-1 sm:space-x-2">
                                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                  <span className="text-xs text-muted-foreground">Real-time Updates</span>
                                </div>
                              </div>
                              <motion.button 
                                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 touch-target"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Learn More
                              </motion.button>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-background">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-responsive-3xl lg:text-responsive-4xl font-display font-bold text-foreground mb-4 sm:mb-6">
              Comprehensive <span className="gradient-text">Web Analysis</span>
            </h2>
            <p className="text-responsive-lg text-muted-foreground max-w-3xl mx-auto">
              Our advanced auditing tool provides detailed insights across all critical aspects of your website&apos;s performance and user experience.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-responsive-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg h-full">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-background">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-responsive-3xl lg:text-responsive-4xl font-display font-bold text-foreground mb-6 sm:mb-8">
                Why Choose <span className="gradient-text">WebAudit Pro</span>?
              </h2>
              <p className="text-responsive-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Our professional-grade auditing tool provides comprehensive analysis with actionable insights to help you optimize your website for success.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {benefits.map((benefit) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: benefits.indexOf(benefit) * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0" />
                    <span className="text-foreground text-sm sm:text-base">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 sm:mt-8"
              >
                <button className="btn-primary inline-flex items-center space-x-2">
                  <span>Start Your Free Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xl">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm sm:text-base">Performance Score</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">Core Web Vitals</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-success">85</div>
                      <div className="text-xs text-muted-foreground">Excellent</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">First Contentful Paint</span>
                      <span className="text-sm font-medium text-foreground">1.2s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Largest Contentful Paint</span>
                      <span className="text-sm font-medium text-foreground">2.1s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cumulative Layout Shift</span>
                      <span className="text-sm font-medium text-foreground">0.05</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Overall Score</span>
                      <span className="font-bold text-success">92/100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-success/20 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-4 h-4 text-success" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center"
              >
                <TrendingUp className="w-3 h-3 text-primary" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
