"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Search,
  Zap,
  Shield,
  Eye,
  TrendingUp,
  Bell,
  Star,
  Clock,
  Activity,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Home", href: "/", icon: Zap, category: "main" },
    { name: "Results", href: "/results", icon: TrendingUp, category: "audit" },
    { name: "History", href: "/history", icon: Eye, category: "audit" },
    { name: "About", href: "/about", icon: Shield, category: "info" },
    { name: "Contact", href: "/contact", icon: Search, category: "info" },
  ];

  const quickActions = [
    { name: "Recent Audits", icon: Clock, count: 3 },
    { name: "Favorites", icon: Star, count: 5 },
    { name: "Activity", icon: Activity, count: 12 },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          isScrolled 
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-2xl" 
            : "bg-white dark:bg-gray-900 border-b border-gray-200/50 dark:border-gray-700/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Enhanced Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 sm:space-x-3"
              onHoverStart={() => setIsHoveringLogo(true)}
              onHoverEnd={() => setIsHoveringLogo(false)}
            >
              <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
                <div className="relative">
                  <motion.div 
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                    animate={{ 
                      boxShadow: isHoveringLogo 
                        ? [
                            "0 0 0 0 rgba(59, 130, 246, 0.4)",
                            "0 0 0 10px rgba(59, 130, 246, 0)",
                            "0 0 0 0 rgba(59, 130, 246, 0)"
                          ]
                        : "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    }}
                    transition={{
                      duration: isHoveringLogo ? 2 : 0.3,
                      repeat: isHoveringLogo ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div
                      animate={{ 
                        scale: isHoveringLogo ? [1, 1.1, 1] : 1,
                        rotate: isHoveringLogo ? [0, 5, -5, 0] : 0
                      }}
                      transition={{
                        duration: isHoveringLogo ? 3 : 0.3,
                        repeat: isHoveringLogo ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </motion.div>
                    
                    {/* Sparkle effect on hover */}
                    <AnimatePresence>
                      {isHoveringLogo && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Sparkles className="w-4 h-4 text-white/80" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <div className="block">
                  <h1 className="text-lg sm:text-xl font-display font-bold gradient-text">
                    <span className="hidden xs:inline">WebAudit Pro</span>
                    <span className="xs:hidden">WebAudit</span>
                  </h1>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-muted-foreground hidden sm:block">Live</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium relative group"
                  >
                    <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>{item.name}</span>
                    
                    {/* Hover underline effect */}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-3 rounded-xl bg-secondary hover:bg-secondary-hover transition-all duration-200 focus-ring relative overflow-hidden group"
                aria-label="Toggle theme"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                />
                <AnimatePresence mode="wait">
                  {theme === "light" ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-5 h-5 text-foreground" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="w-5 h-5 text-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/"
                  className="btn-primary inline-flex items-center space-x-2 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                  <Zap className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Start Audit</span>
                </Link>
              </motion.div>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-3 rounded-xl bg-secondary hover:bg-secondary-hover transition-all duration-200 focus-ring relative overflow-hidden group"
                aria-label="Toggle theme"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                />
                <AnimatePresence mode="wait">
                  {theme === "light" ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-5 h-5 text-foreground" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="w-5 h-5 text-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-3 rounded-xl bg-secondary hover:bg-secondary-hover transition-all duration-200 focus-ring mobile-menu-container overflow-hidden group"
                aria-label="Toggle mobile menu"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                />
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="w-5 h-5 text-foreground" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu className="w-5 h-5 text-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Notification Badge */}
                {hasNotifications && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Floating CTA Button for Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed bottom-6 right-6 z-40 lg:hidden"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/"
            className="btn-primary inline-flex items-center space-x-2 px-6 py-4 rounded-full shadow-2xl relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-semibold">Audit</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Enhanced Mobile Menu Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 bg-card/95 backdrop-blur-xl border-l border-border lg:hidden mobile-menu-container"
            >
              <div className="h-full flex flex-col">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-display font-bold gradient-text">WebAudit Pro</h2>
                      <p className="text-xs text-muted-foreground">Professional Web Auditing</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-secondary hover:bg-secondary-hover transition-all duration-200"
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </motion.button>
                </div>

                {/* Menu Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Quick Actions</h3>
                    <div className="space-y-2">
                      {quickActions.map((action, index) => (
                        <motion.div
                          key={action.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-all duration-200 group">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-secondary-hover transition-colors">
                                <action.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                              </div>
                              <span className="font-medium text-foreground">{action.name}</span>
                            </div>
                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-xs font-semibold text-primary">{action.count}</span>
                            </div>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Navigation</h3>
                    <div className="space-y-2">
                      {navItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index + quickActions.length) * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-secondary transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-secondary-hover transition-colors">
                              <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </div>
                            <span className="font-medium text-foreground">{item.name}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="p-6 border-t border-border">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (navItems.length + quickActions.length) * 0.1 + 0.2 }}
                  >
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn-primary w-full inline-flex items-center justify-center space-x-3 py-4 text-lg font-medium relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      />
                      <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span>Start New Audit</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 