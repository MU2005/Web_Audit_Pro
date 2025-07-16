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
  Award
} from "lucide-react";

export default function AboutPage() {
  const techStack = [
    { name: "Next.js", category: "Framework", icon: Code, color: "from-black to-gray-800" },
    { name: "React", category: "Library", icon: Code, color: "from-blue-500 to-cyan-500" },
    { name: "TypeScript", category: "Language", icon: Code, color: "from-blue-600 to-blue-700" },
    { name: "Tailwind CSS", category: "Styling", icon: Palette, color: "from-cyan-500 to-blue-500" },
    { name: "Framer Motion", category: "Animation", icon: Rocket, color: "from-purple-500 to-pink-500" },
    { name: "PageSpeed API", category: "API", icon: Database, color: "from-green-500 to-emerald-500" },
    { name: "Vercel", category: "Deployment", icon: Globe, color: "from-black to-gray-800" },
    { name: "Lucide React", category: "Icons", icon: Palette, color: "from-gray-500 to-gray-600" },
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-surface py-20 lg:py-32">
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
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
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
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl p-8 border border-border shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
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
      <section className="py-20 lg:py-32 bg-gradient-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                  <div className={`w-12 h-12 bg-gradient-to-r ${tech.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <tech.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {tech.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="py-20 lg:py-32 bg-gradient-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-8">
              Meet the <span className="gradient-text">Creator</span>
            </h2>
            
            <div className="bg-card rounded-2xl p-8 border border-border shadow-xl max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">U</span>
              </div>
              
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Umar
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A passionate developer and web enthusiast who believes in creating tools that make 
                the web better for everyone. WebAudit Pro was born from the need for accessible, 
                professional-grade web auditing tools.
              </p>
              
              <div className="flex justify-center space-x-4">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-secondary hover:bg-secondary-hover rounded-xl transition-all duration-200"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-secondary hover:bg-secondary-hover rounded-xl transition-all duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:contact@webauditpro.com"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-secondary hover:bg-secondary-hover rounded-xl transition-all duration-200"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
      </div>
      </section>
    </div>
  );
} 