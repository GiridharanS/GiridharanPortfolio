import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SectionNavProps {
  nextSectionId: string;
  label?: string;
}

export const SectionNav = ({ nextSectionId, label = 'Scroll Down' }: SectionNavProps) => {
  const scrollToNextSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isBackToTop = label === 'Back to Top';

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-8 bg-gradient-to-t from-white/80 dark:from-gray-900/80 to-transparent pt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.button
        onClick={() => scrollToNextSection(nextSectionId)}
        className="group flex flex-col items-center gap-3"
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors backdrop-blur-sm px-3 py-1 rounded-full">
          {label}
        </span>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 dark:from-purple-500/20 dark:to-pink-500/20 rounded-full blur-md" />
          <motion.div
            className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 border border-gray-200 dark:border-gray-700 shadow-lg"
            animate={{
              y: isBackToTop ? [0, -4, 0] : [0, 4, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            {isBackToTop ? (
              <ChevronUp 
                size={20} 
                className="text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" 
              />
            ) : (
              <ChevronDown 
                size={20} 
                className="text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" 
              />
            )}
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  );
}; 