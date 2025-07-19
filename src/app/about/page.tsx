"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  Github, 
  Linkedin, 
  Mail, 
  Globe,
  Code,
  Database,
  Palette,
  Shield,
  Rocket,
  Users,
  Award,
  Heart,
  Sparkles,
  Star,
  Coffee
} from "lucide-react";

export default function AboutPage() {
  const techStack = [
    { name: "Next.js", category: "Framework", icon: Code, color: "bg-gray-900" },
    { name: "React", category: "Library", icon: Code, color: "bg-blue-600" },
    { name: "TypeScript", category: "Language", icon: Code, color: "bg-blue-700" },
    { name: "Tailwind CSS", category: "Styling", icon: Palette, color: "bg-cyan-600" },
    { name: "Framer Motion", category: "Animation", icon: Rocket, color: "bg-purple-600" },
    { name: "PageSpeed API", category: "API", icon: Database, color: "bg-green-600" },
    { name: "Vercel", category: "Deployment", icon: Globe, color: "bg-gray-900" },
    { name: "Lucide React", category: "Icons", icon: Palette, color: "bg-gray-600" },
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get comprehensive audit results in seconds, not minutes."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is never stored or shared. All audits are processed securely."
    },
    {
      icon: Users,
      title: "User Focused",
      description: "Designed with developers and marketers in mind for optimal workflow."
    },
    {
      icon: Award,
      title: "Professional Grade",
      description: "Built using industry best practices and modern web standards."
    }
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

  const techCardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring" as const,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      y: -8,
      transition: {
        duration: 0.2
      }
    }
  };

  // Unique animations for different sections
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" as const }
    }
  };

  const rotateIn = {
    hidden: { opacity: 0, rotate: -10, scale: 0.8 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  const bounceIn = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const flipIn = {
    hidden: { opacity: 0, rotateY: 90, scale: 0.8 },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.9, ease: "easeOut" as const }
    }
  };

  const slideInFromBottom = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight mb-6">
              About <span className="gradient-text">WebAudit Pro</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A professional web auditing tool built with modern technologies to help developers, 
              marketers, and business owners optimize their websites for success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideInFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:col-span-1"
            >
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-8">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                WebAudit Pro was created to democratize professional web auditing tools. 
                We believe every website deserves to be optimized for performance, accessibility, 
                and user experience.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                By providing comprehensive analysis tools that were previously only available 
                to enterprise clients, we&apos;re helping businesses of all sizes improve their 
                online presence and achieve better results.
              </p>
              
              <div className="flex items-center space-x-4">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-3 bg-secondary hover:bg-secondary-hover rounded-xl transition-all duration-200"
                >
                  <Github className="w-5 h-5" />
                  <span>View on GitHub</span>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              variants={slideInFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-border shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">WebAudit Pro</h3>
                      <p className="text-sm text-muted-foreground">Professional Web Auditing</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Performance</span>
                      <span className="text-sm font-medium text-success">Excellent</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">SEO</span>
                      <span className="text-sm font-medium text-success">Optimized</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Security</span>
                      <span className="text-sm font-medium text-success">Secure</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Accessibility</span>
                      <span className="text-sm font-medium text-success">Compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Why Choose <span className="gradient-text">WebAudit Pro</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with modern technologies and best practices to deliver professional-grade results.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ 
                  opacity: 0, 
                  y: 50,
                  scale: 0.8,
                  rotateX: -15
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  rotateX: 0
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full relative overflow-hidden">
                  {/* Animated Background */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl"
                  />
                  
                  {/* Icon Container */}
                  <motion.div 
                    className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10"
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: 1.1,
                      transition: { duration: 0.6 }
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0.4)",
                        "0 0 0 8px rgba(59, 130, 246, 0)",
                        "0 0 0 0 rgba(59, 130, 246, 0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.3,
                        ease: "easeInOut"
                      }}
                    >
                    <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <motion.h3 
                      className="text-lg font-semibold text-foreground mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      className="text-muted-foreground leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                  
                  {/* Mobile-specific tap animation */}
                  <motion.div
                    className="lg:hidden absolute inset-0 rounded-2xl bg-blue-600/5 opacity-0 group-active:opacity-100 transition-opacity duration-200"
                    whileTap={{ scale: 0.95 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Built with <span className="gradient-text">Modern Tech</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leveraging the latest web technologies to deliver fast, reliable, and beautiful experiences.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                variants={techCardVariants}
                whileHover="hover"
                custom={index}
                className="group"
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
                  <div className={`w-12 h-12 ${tech.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <tech.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {tech.category}
                  </p>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Creator Section - Redesigned */}
      <section className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={bounceIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Meet the <span className="gradient-text">Creator</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The passionate mind behind WebAudit Pro
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Profile Card */}
            <motion.div
              variants={rotateIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-8"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-border shadow-xl relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10" />
                
                <div className="relative z-10 text-center">
                  {/* Avatar */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <span className="text-4xl font-bold text-white">MU</span>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
                    >
                      <Star className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Name and Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Muhammad Umar
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Full Stack Developer & Web Enthusiast
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">5+</div>
                      <div className="text-xs text-muted-foreground">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600">50+</div>
                      <div className="text-xs text-muted-foreground">Projects Built</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600">100%</div>
                      <div className="text-xs text-muted-foreground">Passion</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Story and Social */}
            <motion.div
              variants={flipIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-8"
            >
              {/* Story */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-border shadow-xl h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">The Story</h4>
                </div>
                <div className="flex flex-col h-full">
                  <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
                A passionate developer and web enthusiast who believes in creating tools that make 
                the web better for everyone. WebAudit Pro was born from the need for accessible, 
                professional-grade web auditing tools.
              </p>
                  <p className="text-muted-foreground leading-relaxed">
                    With a deep understanding of web technologies and user experience, I strive to build 
                    solutions that not only work flawlessly but also make a positive impact on the digital world.
                  </p>
                </div>
              </div>

              {/* Skills & Interests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  variants={slideInFromLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-border shadow-xl h-full"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground">Skills</h4>
                  </div>
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">React & Next.js</span>
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">TypeScript</span>
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-18 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">UI/UX Design</span>
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-14 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={slideInFromRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-border shadow-xl h-full"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                      <Coffee className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground">Interests</h4>
                  </div>
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">Web Performance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Cybersecurity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-muted-foreground">Open Source</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div
                variants={slideInFromBottom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-border shadow-xl h-full"
              >
                <h4 className="font-semibold text-foreground mb-4">Let's Connect</h4>
                <div className="flex flex-wrap gap-3 flex-grow">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                    <Github className="w-4 h-4" />
                    <span className="text-sm">GitHub</span>
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm">LinkedIn</span>
                </motion.a>
                <motion.a
                  href="mailto:contact@webauditpro.com"
                    whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Email</span>
                </motion.a>
              </div>
              </motion.div>
          </motion.div>
          </div>
      </div>
      </section>
    </div>
  );
} 