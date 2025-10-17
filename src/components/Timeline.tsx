// import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Building } from 'lucide-react';
import { SectionNav } from './ui/SectionNav';

const experiences = [
  {
    title: "Senior Software Engineer | Ruby on Rails Developer",
    company: "Real Estate SaaS Platform (Product Company)",
    period: "Jul 2023 – Present | Bangalore, India",
    description: [
      "Led large-scale Rails and PostgreSQL upgrades, refactored monolithic architecture, and implemented GraphQL APIs to boost performance. Built microservices with Docker, automated deployment pipelines, and integrated OpenAI and third-party APIs to streamline real estate data and marketing workflows. Advocated TDD practices and mentored junior engineers."
    ]
  },
  {
    title: "Software Engineer | Ruby on Rails Developer",
    company: "IoT & Web Technology Startup",
    period: "Feb 2021 – Jun 2023 | Coimbatore, India",
    description: [
      "Designed and developed full-stack web applications using Rails, PostgreSQL, and Sidekiq. Collaborated with clients, created reusable components, and optimized database performance with partitioning and query tuning. Integrated RabbitMQ for IoT messaging and Google Maps APIs for real-time location features. Delivered projects from planning to production on Heroku."
    ]
  },
  {
    title: "Ruby on Rails Developer",
    company: "Business Automation Solutions Provider",
    period: "Feb 2019 – Feb 2021 | Coimbatore, India",
    description: [
      "Built secure authentication systems and transactional email flows using Devise and ActionMailer. Enhanced user experience with AJAX-based dynamic updates and modularized views. Managed schema migrations and streamlined deployments using GitLab CI/CD, Unicorn, and Capistrano on Nginx servers."
    ]
  },
  {
    title: "Web Developer | Ruby on Rails Developer",
    company: "IT Services & Training Firm",
    period: "Nov 2018 – Jan 2019 | Coimbatore, India",
    description: [
      "Gained foundational experience in Ruby on Rails through intensive DSA training and practical application. Implemented data structures and algorithms specific to Rails applications, improving code efficiency. Contributed to codebase maintenance by identifying and fixing minor bugs, enhancing test coverage, and learning Rails best practices through hands-on debugging experience."
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const Timeline = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800 relative">
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
          Professional Experience
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative pl-6 sm:pl-8 pb-8 sm:pb-12 last:pb-0"
            >
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-purple-200 dark:bg-purple-800" />
              
              {/* Timeline dot */}
              <div className="absolute left-[-4px] sm:left-[-8px] top-0 w-2 sm:w-4 h-2 sm:h-4 rounded-full bg-purple-600 dark:bg-purple-400 shadow-md" />

              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <Building className="text-purple-600 dark:text-purple-400 hidden sm:block" size={20} />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    {experience.title}
                  </h3>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="shrink-0" />
                    <span>{experience.company}</span>
                  </div>
                  <span className="hidden sm:block mx-2">•</span>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="shrink-0" />
                    <span>{experience.period}</span>
                  </div>
                </div>

                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {experience.description.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <br /><br />
      {/* Navigation Arrow */}
      <SectionNav nextSectionId="#projects" label="View Projects" />
    </section>
  );
};
