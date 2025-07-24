"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface ProgressStepsProps {
  currentStep: string;
  steps: ProgressStep[];
}

export default function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
          // const isUpcoming = steps.findIndex(s => s.id === currentStep) < index;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <motion.div
                className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isActive
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-gray-100 border-gray-300 text-gray-400"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <AnimatePresence mode="wait">
                  {isCompleted ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <CheckCircle className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <step.icon className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Step Info */}
              <div className="ml-4 flex-1">
                <motion.h3
                  className={`text-sm font-semibold ${
                    isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  className={`text-xs mt-1 ${
                    isActive ? "text-blue-500" : "text-gray-400"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {step.description}
                </motion.p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-4 bg-gray-200 relative">
                  <motion.div
                    className={`absolute top-0 left-0 h-full ${
                      isCompleted ? "bg-green-500" : "bg-gray-200"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Current Step Details */}
      <AnimatePresence mode="wait">
        {steps.map((step) => {
          if (step.id === currentStep) {
            return (
              <motion.div
                key={step.id}
                className={`text-center p-6 rounded-xl bg-gradient-to-r ${step.color} text-white`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <step.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/90">{step.description}</p>
              </motion.div>
            );
          }
          return null;
        })}
      </AnimatePresence>
    </div>
  );
} 