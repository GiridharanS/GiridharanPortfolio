import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, FileDown } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import { SectionNav } from '../ui/SectionNav';
import resume from '../../public/Giridharan-Senthilkumar-Resume.pdf';
import picofme from '../../public/Up-pic.png';

export const Hero = () => {
  const startYear = 2017;
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - startYear;

  return (
    <section id="about" className="min-h-screen pt-32 pb-32 px-6 bg-gradient-to-b from-purple-50/50 to-white dark:from-gray-900 dark:to-gray-800 relative">
      <div className="container mx-auto">
        {/* Top Section with Intro and Profile */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Section: Text and Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.02, 0.98, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-3xl"
            />
            <AnimatedText
              text="Hello, I'm Giridharan, a Ruby on Rails Developer 💎"
              className="text-5xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 lg:mb-8"
            />
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 space-y-4">
              <span className="block">👋 Ruby on Rails developer with {experienceYears}+ years of experience in building high-performance, scalable applications. Expert in full-stack development with Rails (4.2 to 7.0), GraphQL, and React.js.</span>
              
              <span className="block">💡 Specialized in:</span>
              <ul className="list-none space-y-2 ml-6">
                <li>• Database optimization (PostgreSQL, MySQL, MongoDB, DynamoDB)</li>
                <li>• Microservices architecture with Docker</li>
                <li>• API integrations (Stripe, Twilio, OpenAI, Google Cloud)</li>
                <li>• Performance optimization & scalability</li>
              </ul>
              
              <span className="block">🚀 Passionate about clean code, TDD practices, and mentoring teams to deliver exceptional solutions.</span>
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                className="motion-button flex items-center gap-2 bg-purple-600 dark:bg-purple-500 text-white px-8 py-3 rounded-full"
              >
                View Projects <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                className="motion-button flex items-center gap-2 border-2 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 px-8 py-3 rounded-full"
              >
                Contact Me <Sparkles size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Section: Profile Image and Resume */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex flex-col items-center justify-between h-full"
          >
            <div className="relative w-full max-w-md mx-auto mb-8">
              <motion.div
                animate={{
                  scale: [1, 1.02, 0.98, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 dark:from-purple-500/20 dark:to-pink-500/20 rounded-full blur-2xl"
              />
              <div className="relative aspect-square overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-xl">
                <img
                  src={picofme}
                  alt="Giridharan Senthilkumar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Resume Download Button */}
            <motion.a
              id='resume-download-desktop'
              href={resume}
              download="Giridharan-Senthilkumar-Resume.pdf"
              whileHover={{ scale: 1.05 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="motion-button flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all justify-center w-full max-w-md mb-8"
            >
              <FileDown size={16} />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrow */}
      <SectionNav nextSectionId="#skills" label="View Skills" />
    </section>
  );
};
