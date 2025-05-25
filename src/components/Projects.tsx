import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import fitnesapp from '../public/fitness-app.png';
import konkerapp from '../public/konker-app.png';
import vtapp from '../public/vt-app.png';

const projects = [
  {
    title: "Fitness App",
    description: "A comprehensive fitness tracking app with personalized workout plans and progress tracking.",
    image: fitnesapp,
    tech: ["React", "Redux", "Tailwind CSS"],
    github: "https://github.com/GiridharanS/fitness-tracker",
    live: "https://fitness-tracker.vercel.app"
  },
  {
    title: "Thedal",
    description: "A location-based service app for finding nearby resources and services.",
    image: "", // Add the image path here
    tech: ["React Native", "Firebase", "Google Maps API"],
    github: "https://github.com/yourusername/thedal",
    live: "https://thedal.vercel.app",
  },
  {
    title: "Daycare Management System",
    description: "A platform to manage daycare operations, including attendance, billing, and parent communication.",
    image: "", // Add the image path here
    tech: ["Angular", "Node.js", "MongoDB"],
    github: "https://github.com/yourusername/daycare-management",
    live: "https://daycare-management.vercel.app",
  },
  {
    title: "Family Portal",
    description: "A private portal for families to share updates, events, and manage household tasks.",
    image: "", // Add the image path here
    tech: ["Vue.js", "Firebase", "Tailwind CSS"],
    github: "https://github.com/yourusername/family-portal",
    live: "https://family-portal.vercel.app",
  },
  {
    title: "Vehicle Tracking System",
    description: "A real-time vehicle tracking system with GPS integration and route optimization.",
    image: vtapp, // Add the image path here
    tech: ["React", "Express", "PostgreSQL"],
    github: "https://github.com/yourusername/vehicle-tracking",
    live: "https://vehicle-tracking.vercel.app",
  },
  {
    title: "Konker",
    description: "Konker, a freelance marketplace that has thousands of active freelancers catering to the SEO & digital marketing needs of businesses.",
    image: konkerapp, // Add the image path here
    tech: ["React", "GraphQL", "Apollo"],
    github: "https://github.com/yourusername/konker",
    live: "https://www.konker.io/",
  },
  {
    title: "Real Estate CRM",
    description: "A CRM platform tailored for real estate agents to manage properties and client interactions.",
    image: "", // Add the image path here
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    github: "https://github.com/yourusername/eagle-crm",
    live: "https://eagle-crm.vercel.app",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white"
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative group">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-pink-600/80 dark:from-purple-500/80 dark:to-pink-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <motion.a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className="text-white hover:text-purple-200 transition-colors"
                  >
                    <Github size={24} />
                  </motion.a>
                  <motion.a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className="text-white hover:text-purple-200 transition-colors"
                  >
                    <ExternalLink size={24} />
                  </motion.a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
