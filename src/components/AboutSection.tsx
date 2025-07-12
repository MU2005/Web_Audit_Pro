import { 
  Shield, 
  Zap, 
  Search, 
  Globe, 
  Code, 
  Github, 
  Linkedin, 
  Mail,
  BarChart3,
  Users,
  Award
} from "lucide-react";

export default function AboutSection() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About WebAudit Pro</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A comprehensive web auditing platform designed to help businesses optimize their 
          websites for performance, security, and search engine optimization.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Our Mission</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          WebAudit Pro was created to democratize website optimization. We believe every 
          website owner deserves access to professional-grade auditing tools that provide 
          actionable insights for improving their online presence. Our platform combines 
          cutting-edge technology with user-friendly interfaces to deliver comprehensive 
          website analysis.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Security Audits</h3>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Identify and fix security vulnerabilities to protect your website and users
            </p>
          </div>
          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Zap className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">Performance Analysis</h3>
            <p className="text-sm text-green-700 dark:text-green-400">
              Optimize loading speed and user experience for better engagement
            </p>
          </div>
          <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Search className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">SEO Optimization</h3>
            <p className="text-sm text-purple-700 dark:text-purple-400">
              Improve search engine rankings and organic traffic
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Comprehensive Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Detailed performance metrics, SEO analysis, and security assessments
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Multi-Device Testing</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Test your website on desktop and mobile devices for complete coverage
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Actionable Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Get specific, implementable suggestions to improve your website
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">User-Friendly Interface</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Intuitive design that makes complex data easy to understand
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Next.js</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">React Framework</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">TypeScript</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Type Safety</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">TailwindCSS</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Styling</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">PageSpeed API</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Performance Data</div>
          </div>
        </div>
      </div>

      {/* Developer Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Developer</h2>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">WebAudit Pro Team</h3>
            <p className="text-gray-600 dark:text-gray-300">Full-Stack Developer & Web Performance Expert</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
          <a 
            href="mailto:info@webauditpro.com"
            className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>Email</span>
          </a>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Have questions about WebAudit Pro or need help with your website optimization? 
          We'd love to hear from you!
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <a 
            href="mailto:info@webauditpro.com"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            Contact Us
          </a>
          <a 
            href="/"
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
          >
            Start Auditing
          </a>
        </div>
      </div>
    </div>
  );
} 