import { motion } from 'framer-motion';
import { TechStack } from './hero/TechStack';
import { CodeSnippet } from './ui/CodeSnippet';
import { InfrastructureCodeSnippet } from './ui/InfrastructureCodeSnippet';
import { IntegrationCodeSnippet } from './ui/IntegrationCodeSnippet';
import { SectionNav } from './ui/SectionNav';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 relative">
      <motion.div 
        className="container mx-auto px-4 sm:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-16 text-gray-900 dark:text-white"
        >
          Technical Skills
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          variants={containerVariants}
        >
          {/* Skills Section */}
          <motion.div 
            className="w-full"
            variants={itemVariants}
          >
            <TechStack />
          </motion.div>

          {/* Code Snippet Carousel - Hidden on mobile */}
          <motion.div 
            className="hidden lg:block w-full h-[600px]"
            variants={itemVariants}
          >
            <div className="h-full">
              <CodeSnippet />
              <br />
              <br />
              <br />
              <InfrastructureCodeSnippet />
              <br />
              <br />
              <br />
              <IntegrationCodeSnippet />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <br /><br /><br /><br />
      {/* Navigation Arrow */}
      <SectionNav nextSectionId="#experience" label="View Experience" />
    </section>
  );
}; 