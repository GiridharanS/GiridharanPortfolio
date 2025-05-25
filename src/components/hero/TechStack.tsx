//import React from 'react';
import { motion } from "framer-motion";
import {
  SiBootstrap,
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiRuby,
  SiReact,
  SiBackbone,
  SiRubyonrails,
  SiGraphql,
  SiPostgresql,
  SiApache,
  SiBitbucket,
  SiDigitalocean,
  SiGithub,
  SiGitlab,
  SiGoogle,
  SiHeroku,
  SiMongodb,
  SiNginx,
  SiOpenai,
  SiPaypal,
  SiPuma,
  SiSendgrid,
  SiSqlite,
  SiStripe,
  SiTwilio,
  SiAmazondynamodb,
  SiAmazonec2,
  SiAmazons3,
  SiGooglecloud,
} from "react-icons/si";
import { DiPython } from "react-icons/di";
import { ImEmbed2 } from "react-icons/im";
import { GiUnicorn } from "react-icons/gi";
import { BiLogoFirebase } from "react-icons/bi";

// Floating animation variants
const floatingVariants = (duration: number) => ({
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0], // Moving slightly up and down
    transition: {
      duration: duration, // Slow movement
      ease: "easeInOut", // Smooth easing
      repeat: Infinity, // Infinite looping
    },
  },
});

export const TechStack = () => {
  const skillCategories = [
    {
      title: "🚀 Programming Languages",
      skills: [
        {
          name: "Ruby",
          icon: <SiRuby className="text-5xl text-red-500" />,
          delay: 3,
        },
        {
          name: "JavaScript",
          icon: <SiJavascript className="text-5xl text-yellow-500" />,
          delay: 3.5,
        },
        {
          name: "Python",
          icon: <DiPython className="text-5xl text-blue-500" />,
          delay: 4,
        },
      ],
    },
    {
      title: "🎨 Frontend Technologies",
      skills: [
        {
          name: "HTML",
          icon: <SiHtml5 className="text-5xl text-orange-500" />,
          delay: 3,
        },
        {
          name: "CSS",
          icon: <SiCss3 className="text-5xl text-blue-500" />,
          delay: 3.5,
        },
        {
          name: "Bootstrap",
          icon: <SiBootstrap className="text-5xl text-purple-500" />,
          delay: 4,
        },
        {
          name: "AJAX",
          icon: <SiReact className="text-5xl text-blue-500" />,
          delay: 4.5,
        }, // Placeholder
        {
          name: "React.js",
          icon: <SiReact className="text-5xl text-blue-500" />,
          delay: 5,
        },
        {
          name: "Backbone.js",
          icon: <SiBackbone className="text-5xl text-blue-500" />,
          delay: 5.5,
        },
      ],
    },
    {
      title: "⚙️ Frameworks & Libraries",
      skills: [
        {
          name: "Ruby on Rails",
          icon: <SiRubyonrails className="text-5xl text-red-500" />,
          delay: 3,
        },
        {
          name: "GraphQL",
          icon: <SiGraphql className="text-5xl text-pink-500" />,
          delay: 3.5,
        },
        {
          name: "Liquid Template",
          icon: <ImEmbed2 className="text-5xl text-blue-500" />,
          delay: 4,
        }, // Placeholder
      ],
    },
    {
      title: "🗄 Databases",
      skills: [
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="text-5xl text-blue-500" />,
          delay: 3,
        },
        {
          name: "MySQL",
          icon: <SiMysql className="text-5xl text-blue-600" />,
          delay: 3.5,
        },
        {
          name: "MongoDB",
          icon: <SiMongodb className="text-5xl text-green-500" />,
          delay: 4,
        },
        {
          name: "Amazon DynamoDB",
          icon: <SiAmazondynamodb className="text-5xl text-orange-500" />,
          delay: 4.5,
        },
        {
          name: "SQLite",
          icon: <SiSqlite className="text-5xl text-blue-500" />,
          delay: 5,
        },
      ],
    },
    {
      title: "🚀 Cloud & Deployment",
      skills: [
        {
          name: "Amazon S3",
          icon: <SiAmazons3 className="text-5xl text-orange-500" />,
          delay: 3,
        },
        {
          name: "Google Cloud",
          icon: <SiGooglecloud className="text-5xl text-purple-500" />,
          delay: 3.5,
        },
        {
          name: "Amazon ec2",
          icon: <SiAmazonec2 className="text-5xl text-orange-500" />,
          delay: 3,
        },
        {
          name: "Heroku",
          icon: <SiHeroku className="text-5xl text-purple-500" />,
          delay: 3.5,
        },
        {
          name: "DigitalOcean",
          icon: <SiDigitalocean className="text-5xl text-blue-500" />,
          delay: 4,
        },
      ],
    },
    {
      title: "🖥 Servers & App Hosting",
      skills: [
        {
          name: "Puma",
          icon: <SiPuma className="text-5xl text-gray-500" />,
          delay: 3,
        },
        {
          name: "Nginx",
          icon: <SiNginx className="text-5xl text-green-500" />,
          delay: 4,
        },
        {
          name: "Apache",
          icon: <SiApache className="text-5xl text-red-500" />,
          delay: 4.5,
        },
        {
          name: "Unicorn",
          icon: <GiUnicorn className="text-5xl text-purple-500" />,
          delay: 5,
        },
      ],
    },
    {
      title: "🔗 Version Control & CI/CD",
      skills: [
        {
          name: "GitHub",
          icon: <SiGithub className="text-5xl text-black" />,
          delay: 3,
        },
        {
          name: "GitLab",
          icon: <SiGitlab className="text-5xl text-orange-500" />,
          delay: 3.5,
        },
        {
          name: "Bitbucket",
          icon: <SiBitbucket className="text-5xl text-blue-500" />,
          delay: 4,
        },
      ],
    },
    {
      title: "🔌 Third-Party Integrations",
      skills: [
        {
          name: "Stripe",
          icon: <SiStripe className="text-5xl text-blue-500" />,
          delay: 3,
        },
        {
          name: "PayPal",
          icon: <SiPaypal className="text-5xl text-blue-500" />,
          delay: 3.5,
        },
        {
          name: "Twilio",
          icon: <SiTwilio className="text-5xl text-red-500" />,
          delay: 4,
        },
        {
          name: "SendGrid",
          icon: <SiSendgrid className="text-5xl text-blue-500" />,
          delay: 4.5,
        },
        {
          name: "Google APIs",
          icon: <SiGoogle className="text-5xl text-blue-500" />,
          delay: 5,
        },
        {
          name: "Firebase",
          icon: <BiLogoFirebase className="text-5xl text-yellow-500" />,
          delay: 5.5,
        },
        {
          name: "OpenAI API",
          icon: <SiOpenai className="text-5xl text-green-500" />,
          delay: 5.5,
        },
      ],
    },
  ];

  return (
    <div className="w-full space-y-8">
      {skillCategories.map((category) => (
        <div key={category.title}>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {category.title}
          </h2>
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 1.5 }}
            className="grid grid-cols-4 gap-4"
          >
            {category.skills.map((tech) => (
              <motion.div
                key={tech.name}
                variants={floatingVariants(tech.delay)}
                initial="initial"
                animate="animate"
                className="flex flex-col items-center justify-center space-y-1"
              >
                <div className="bg-gray-800 text-white rounded-full p-4 w-20 h-20 flex items-center justify-center shadow-md">
                  {tech.icon}
                </div>
                <span className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};
