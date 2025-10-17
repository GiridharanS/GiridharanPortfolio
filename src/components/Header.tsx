import { motion } from 'framer-motion';
import { Github, Linkedin, FileDown, MessageCircle, MessageSquare } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';
import resume from '../public/Giridharan-Senthilkumar-Resume.pdf';
import picofme from '../public/Up-pic.png';
import { useState, useEffect } from 'react';

export const Header = () => {
  const [activeSection, setActiveSection] = useState('about');

  const handleScroll = (id: string) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id.replace('#', ''));
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100; // offset for header height

      for (const section of sections) {
        const element = document.querySelector(`#${section}`);
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Header Name / Logo */}
          <motion.a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleScroll('#about');
            }}
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            {/* Mobile View: Photo + Name */}
            <div className="flex items-center gap-3 lg:hidden">
              <div className="relative w-8 h-8 overflow-hidden rounded-full border-2 border-purple-600 dark:border-purple-400">
                <img
                  src={picofme}
                  alt="Giridharan Senthilkumar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Giridharan S
              </span>
            </div>

            {/* Desktop View: Full Name */}
            <span className="hidden lg:block text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Giridharan Senthilkumar
            </span>
          </motion.a>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(`#${item.id}`)}
                className={`text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                  activeSection === item.id ? 'text-purple-600 dark:text-purple-400 font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Social Links and Theme Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.a
              href="https://github.com/GiridharanS"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/giridharan-s/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              <Linkedin size={18} />
            </motion.a>
            <motion.a
              href="https://discord.com/users/_giridharan"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              <MessageCircle size={18} />
            </motion.a>
            <motion.a
              href="https://join.slack.com/t/giridharansworkspace/shared_invite/zt-368xmbmmc-nJoB0_M2k8z3djcl_GuRwQ"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              <MessageSquare size={18} />
            </motion.a>
            
            {/* Resume Download - Desktop */}
            <motion.a
              href={resume}
              download="Giridharan-Senthilkumar-Resume.pdf"
              whileHover={{ scale: 1.05 }}
              className="hidden lg:flex items-center gap-2 bg-purple-600 dark:bg-purple-500 text-white px-4 py-2 rounded-full text-sm"
            >
              <FileDown size={16} />
              <span>Resume</span>
            </motion.a>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

