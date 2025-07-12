"use client";

import { useEffect, useState } from "react";
import URLInputForm from "../components/URLInputForm";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Shield, 
  Search, 
  TrendingUp, 
  Globe, 
  BarChart3, 
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Clock,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Performance Analysis",
      description: "Lightning-fast insights into your website's speed and optimization opportunities",
      color: "from-emerald-500 to-teal-500",
      delay: 0.1
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Comprehensive search engine optimization analysis and recommendations",
      color: "from-teal-500 to-cyan-500",
      delay: 0.2
    },
    {
      icon: Shield,
      title: "Security Audit",
      description: "Advanced security scanning to identify vulnerabilities and threats",
      color: "from-cyan-500 to-blue-500",
      delay: 0.3
    }
  ];

  const stats = [
    { number: "10K+", label: "Websites Audited", icon: Globe },
    { number: "99.9%", label: "Accuracy Rate", icon: CheckCircle },
    { number: "24/7", label: "Available", icon: Clock },
    { number: "50K+", label: "Happy Users", icon: Users }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Digital Marketing Manager",
      company: "TechCorp",
      content: "WebAudit Pro transformed our website performance. The insights were invaluable!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "SEO Specialist",
      company: "GrowthLab",
      content: "The most comprehensive web auditing tool I've ever used. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16"
        >
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 backdrop-blur-sm rounded-full border border-emerald-500/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-300">
                Trusted by 50,000+ professionals
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-6 font-poppins"
            >
              Professional
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Web Auditing
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-inter leading-relaxed"
            >
              Analyze your website's performance, SEO, and security with our comprehensive 
              auditing tool. Get detailed insights and actionable recommendations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-1 transition-all duration-300">
                <span className="flex items-center gap-2">
                  Start Free Audit
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                Watch Demo
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* URL Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 mb-20"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 p-8 md:p-12">
            <URLInputForm />
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
              Why Choose WebAudit Pro?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive analysis with cutting-edge technology and professional insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence>
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: feature.delay, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 font-poppins">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-poppins">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of satisfied professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: index === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-emerald-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 text-center mb-20"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">
              Ready to Transform Your Website?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get started with your first audit today and see the difference
            </p>
            <button className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300">
              Start Your Free Audit
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
