"use client";

import { motion } from 'framer-motion';

interface SkillCategory {
  title: string;
  description: string;
  image: string;
  skills: {
    name: string;
    proficiency: number;
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Building beautiful, responsive user interfaces",
    image: "/Components/Frontend.jpg",
    skills: [
      { name: "React", proficiency: 32 },
      { name: "Next.js", proficiency: 41 },
      { name: "TypeScript", proficiency: 35 },
      { name: "Tailwind CSS", proficiency: 47 },
    ],
  },
  {
    title: "Backend",
    description: "Creating robust server-side applications",    image: "/Components/Backend.jpg",
    skills: [
      { name: "Node.js", proficiency: 37 },
      { name: "Python", proficiency: 5 },
      { name: "ExpressJS", proficiency: 34 },
      { name: "MongoDB", proficiency: 80 },
    ],
  },
  {
    title: "Tools & DevOps",
    description: "Streamlining development and deployment",
    image: "/Components/DevOps.jpg",
    skills: [
      { name: "Git", proficiency: 90 },
      { name: "Docker", proficiency: 25 },
      { name: "AWS", proficiency: 35 },
      { name: "CI/CD", proficiency: 40 },
    ],
  },
];

export default function TechnicalSkills() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-3 py-1 mb-4 text-sm rounded-full"
            style={{
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-primary)',
              border: '1px solid var(--card-border)',
            }}
          >
            Skills
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Technical Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Proficient in modern web technologies and development practices, with a focus on creating scalable and maintainable solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative p-6 rounded-2xl"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                border: '1px solid var(--card-border)',
              }}
            >
              <div className="mb-6 aspect-video relative rounded-lg overflow-hidden bg-gray-900">
                <div
                  className="w-full h-full bg-cover bg-center transform hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: `url(${category.image})`,
                  }}
                />
              </div>
              
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {category.title}
              </h3>
              <p className="text-sm mb-6 text-gray-600 dark:text-gray-400">
                {category.description}
              </p>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: 'var(--text-primary)' }}>{skill.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{skill.proficiency}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
