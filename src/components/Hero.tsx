import { motion } from 'framer-motion';
import picofme from '../../public/Up-pic.png';

export const Hero = () => {
  return (
    <section id="about" className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between lg:gap-12 gap-16">
        {/* Text Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h1 className="text-5xl font-bold mb-6">
            Hi, I'm Giridharan Senthilkumar
            <span className="block text-purple-600">Full Stack Developer</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            I craft scalable web applications with modern technologies.
            Specialized in Ruby on Rails, React, TypeScript, and modern web development.
          </p>
          <div className="flex gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              className="bg-purple-600 text-white px-8 py-3 rounded-full cursor-pointer"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full cursor-pointer"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <img
            src={picofme}
            alt="Giridharan Senthilkumar"
            className="rounded-full w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-cover mx-auto shadow-2xl mb-8 lg:mb-0"
          />
        </motion.div>
      </div>
    </section>
  );
};
