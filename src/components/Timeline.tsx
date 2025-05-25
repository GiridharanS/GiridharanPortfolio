// import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Building } from 'lucide-react';

const experiences = [
  {
    title: "Seniror Software Engineer | Ruby on Rails Developer",
    company: "MRI Software.",
    period: "Jul 2023 – Present | Bangalore, India",
    description: [
      "Led large-scale Rails and PostgreSQL upgrades, refactored monolithic architecture, and implemented GraphQL APIs to boost performance. Built microservices with Docker, automated deployment pipelines, and integrated OpenAI and third-party APIs to streamline real estate data and marketing workflows. Advocated TDD practices and mentored junior engineers."
    ]
  },
  {
    title: "Software Engineer | Ruby on Rails Developer",
    company: "ByteForza Technologies Private Limited.",
    period: "Feb 2021 – Jun 2023 | Coimbatore, India",
    description: [
      "Designed and developed full-stack web applications using Rails, PostgreSQL, and Sidekiq. Collaborated with clients, created reusable components, and optimized database performance with partitioning and query tuning. Integrated RabbitMQ for IoT messaging and Google Maps APIs for real-time location features. Delivered projects from planning to production on Heroku."
    ]
  },
  {
    title: "Ruby on Rails Developer",
    company: "AutoAttend.",
    period: "Feb 2019 – Feb 2021 | Coimbatore, India",
    description: [
      "Built secure authentication systems and transactional email flows using Devise and ActionMailer. Enhanced user experience with AJAX-based dynamic updates and modularized views. Managed schema migrations and streamlined deployments using GitLab CI/CD, Unicorn, and Capistrano on Nginx servers."
    ]
  },
  {
    title: "Web Developer | Ruby on Rails Developer",
    company: "Knila IT Solutions India Pvt. Ltd.",
    period: "Nov'2023 - Jan'2023",
    description: [
      "Collaborated on various web projects and learned modern frontend technologies."
    ]
  }
];


export const Timeline = () => {
  const gradientVariants = {
    initial: { borderImageSource: 'linear-gradient(90deg, #6ee7b7, #9333ea)' },
    animate: {
      borderImageSource: [
        'linear-gradient(90deg, #6ee7b7, #9333ea)',
        'linear-gradient(90deg, #9333ea, #6ee7b7)',
        'linear-gradient(90deg, #6ee7b7, #9333ea)',
      ],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "loop" as "loop",
      },
    },
  };

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-center mb-16 text-gray-900 dark:text-white"
        >
          My Professional Journey
        </motion.h2>
        <div className="relative">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              // initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex items-center gap-12 mb-16 flex-col ${
                index % 2 === 0 ? 'lg:flex-row md:flex-row' : 'lg:flex-row-reverse md:flex-row-reverse'
              }`}
            >
              <motion.div
                className="flex flex-col justify-between p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-4 relative group h-full"
                variants={gradientVariants}
                initial="initial"
                animate="animate"
                style={{
                  backgroundClip: 'padding-box',
                  borderImage: 'linear-gradient(90deg, #6ee7b7, #9333ea) 1',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-20 rounded-lg blur-xl transition-all"></div>
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="text-purple-600 dark:text-purple-400" size={24} />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                </div>
                {/* <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3">
                  <Building className="text-purple-600 dark:text-purple-400" size={20} />
                  <span className="text-lg">{exp.company}</span>
                </div> */}
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                  <Calendar size={18} />
                  <span>{exp.period}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
              </motion.div>
              <div className="w-6 h-6 hidden lg:block md:block bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 rounded-full relative">
                <div className="absolute w-1 h-32 bg-gradient-to-b from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700 left-1/2 -translate-x-1/2"></div>
              </div>
              <div className="flex-1"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
