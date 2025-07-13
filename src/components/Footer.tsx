"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "Terms", href: "/terms", icon: ExternalLink },
    { name: "Privacy", href: "/privacy", icon: ExternalLink },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © WebAudit Pro 2025. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6">
            {footerLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 