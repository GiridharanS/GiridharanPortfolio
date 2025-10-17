import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { SectionNav } from './ui/SectionNav';

// Import project images

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

const projects = [
  {
    title: "Enterprise Real Estate Platform",
    description: "A scalable real estate management platform handling 100K+ properties. Features include property lifecycle management, automated workflows, and advanced analytics.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    tech: ["Ruby on Rails", "PostgreSQL", "GraphQL", "React", "Sidekiq", "OAuth", "Docker", "Heroku"],
    github: "https://github.com/GiridharanS/real-estate-platform",
    live: "https://enterprise-real-estate.com",
    highlights: [
      "Microservices architecture with Docker and Kubernetes",
      "Advanced caching with Redis and fragment caching",
      "Real-time updates using ActionCable",
      "Automated property valuation using ML models"
    ]
  },
  {
    title: "Multi-tenant SaaS Platform",
    description: "A sophisticated SaaS platform for business process automation, supporting multiple client organizations with isolated data and customizable workflows.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    tech: ["Ruby on Rails", "Angular JS", "MongoDB", "Google API's", "RazorPay", "AWS"],
    github: "https://github.com/GiridharanS/saas-platform",
    live: "https://saas-platform.com",
    highlights: [
      "Multi-tenant architecture with row-level security",
      "Custom DSL for workflow definitions",
      "Integrated billing with Stripe Subscriptions",
      "Comprehensive audit logging and compliance"
    ]
  },
  {
    title: "IoT Vehicle Tracking System",
    description: "A comprehensive vehicle tracking system managing 10K+ vehicles in real-time. Features include live GPS tracking, route optimization, and predictive maintenance alerts.",
    image: "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    tech: ["Ruby on Rails", "PostgreSQL", "Redis", "WebSocket", "RabbitMQ", "Google Maps API", "Heroku"],
    github: "https://github.com/GiridharanS/vehicle-tracking",
    live: "https://vehicle-tracking.com",
    highlights: [
      "Real-time GPS tracking with WebSocket integration",
      "Geofencing and route optimization algorithms",
      "Mobile-responsive driver application",
      "Advanced reporting and analytics dashboard"
    ]
  },
  {
    title: "Advanced E-commerce Platform",
    description: "A feature-rich e-commerce platform with multi-vendor support, real-time inventory management, and sophisticated pricing rules.",
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    tech: ["Ruby on Rails", "PostgreSQL", "Elasticsearch", "Stripe Connect", "Sidekiq", "AWS"],
    github: "https://github.com/GiridharanS/ecommerce-platform",
    live: "https://advanced-ecommerce.com",
    highlights: [
      "Elasticsearch for advanced product search",
      "Complex pricing and discount rules engine",
      "Real-time inventory management",
      "Multi-vendor marketplace features"
    ]
  },
  {
    title: "Konker - Freelance Marketplace",
    description: "A dynamic freelance marketplace platform serving thousands of active freelancers in the SEO & digital marketing space. Features include project matching, secure payments, and reputation system.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    tech: ["Ruby on Rails", "PostgreSQL", "Next JS", "Redis", "PayPal", "Heroku"],
    github: "https://github.com/GiridharanS/konker",
    live: "https://www.konker.io",
    highlights: [
      "Advanced freelancer matching algorithm",
      "Secure payment processing with Stripe Connect",
      "Real-time messaging and collaboration tools",
      "Automated dispute resolution system"
    ]
  },
  {
    title: "Daycare Management System",
    description: "A comprehensive daycare management platform handling student records, attendance tracking, billing, and parent communication for multiple daycare centers.",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    tech: ["Ruby on Rails", "PostgreSQL", "Bootstrap", "Redis", "Sidekiq", "Twilio", "Digital Ocean"],
    github: "https://github.com/GiridharanS/daycare-management",
    live: "https://daycare-management.com",
    highlights: [
      "Automated attendance tracking system",
      "Integrated billing and payment processing",
      "Real-time parent communication portal",
      "Staff scheduling and management tools"
    ]
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 relative">
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
          Featured Projects
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Project Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.4 }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Project Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Key Features:
                  </h4>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="leading-relaxed line-clamp-2">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      whileHover={{ scale: 1.05 }}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-4 text-sm">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    <Github size={16} className="shrink-0" />
                    <span className="hidden sm:inline">View Code</span>
                    <span className="sm:hidden">Code</span>
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    <ExternalLink size={16} className="shrink-0" />
                    <span className="hidden sm:inline">Live Demo</span>
                    <span className="sm:hidden">Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <br /><br />
      {/* Navigation Arrow */}
      <SectionNav nextSectionId="#contact" label="Get in Touch" />
    </section>
  );
};
