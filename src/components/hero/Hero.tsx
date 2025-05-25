import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import { TechStack } from './TechStack';
import { FileDown } from 'lucide-react';
import resume from '../../public/Giridharan-Senthilkumar-Resume.pdf';
import picofme from '../../public/Up-pic.png';

export const Hero = () => {
  return (
    <section id="about" className="lg:min-h-screen md:min-h-[430] pt-32 pb-16 px-6 bg-gradient-to-b from-purple-50/50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
              text="Hello, I'm Giridharan, a Ruby on Rails Developer"
              className="text-5xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 lg:mb-8"
            />
            {/* <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              <br />
              👋 Hey there! I'm a Ruby on Rails developer with 10+ years of experience, passionate about crafting high-performance, scalable applications that make an impact. I thrive on clean, efficient code, ensuring seamless user experiences and robust system architecture.
              <br />
              <br />
              💡 I specialize in full-stack development, working with Rails (4.2 to 7.0), GraphQL, and React.js to bring ideas to life. Whether it's optimizing databases (PostgreSQL, MySQL, MongoDB, DynamoDB), scaling applications with Sidekiq & RabbitMQ, or deploying on AWS, Heroku, and DigitalOcean, I love turning complex challenges into elegant solutions.
              <br />
              <br />
              🔗 I've integrated powerful third-party APIs like Stripe, Twilio, OpenAI, and Google Cloud, enhancing app capabilities and automation. From refactoring legacy code to leading Rails upgrades, I focus on performance, security, and maintainability.
              <br />
              <br />
              👨‍💻 Beyond coding, I enjoy mentoring teams, automating workflows, and implementing TDD best practices to ensure software quality. My mission? To build innovative, future-ready applications that drive success.
              <br />
              <br />
              ✨ Let's build something incredible together! 🚀
            </p> */}
            <div className="flex flex-wrap gap-4 mb-12">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-purple-600 dark:bg-purple-500 text-white px-8 py-3 rounded-full"
              >
                View Projects <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 border-2 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 px-8 py-3 rounded-full"
              >
                Contact Me <Sparkles size={18} />
              </motion.a>
            </div>
            {/* Tech Stack Section */}
            <TechStack />
            <motion.a
              id='resume-download'
              href={resume}
              download="Giridharan-Senthilkumar-Resume.pdf"
              whileHover={{ scale: 1.05 }}
              className="flex block lg:hidden md:hidden items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow w-2/3 max-w-xs mx-auto"
            >
              <FileDown size={16} />
              <span className="text-sm sm:text-base">Download My Resume </span>
            </motion.a>
          </motion.div>

          {/* Right Section: Image */}

          <div className="relative">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full blur-2xl opacity-20 dark:opacity-40"
                />
                <img
                  src={picofme}
                  alt="Giridharan Senthilkumar"
                  className="rounded-full relative z-10 w-full max-w-md mx-auto shadow-2xl mt-[-128px] sm:hidden lg:block"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
