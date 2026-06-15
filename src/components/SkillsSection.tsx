"use client";

import { motion } from "framer-motion";
import { Code, Database, Layout, Terminal, Wrench, Cloud, Brain } from "lucide-react";
import Tilt from "react-parallax-tilt";

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: <Code size={24} />,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/50",
    shadow: "shadow-[0_0_15px_rgba(0,255,102,0.2)]",
    skills: ["Python", "Java", "SQL", "JavaScript"],
  },
  {
    title: "Web Development",
    icon: <Layout size={24} />,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/50",
    shadow: "shadow-[0_0_15px_rgba(138,43,226,0.2)]",
    skills: ["HTML", "CSS", "Bootstrap", "React.js", "Node.js", "Flask", "Tailwind CSS", "REST APIs"],
  },
  {
    title: "AI / ML / DL",
    icon: <Brain size={24} />,
    color: "text-glow",
    bgColor: "bg-glow/10",
    borderColor: "border-glow/50",
    shadow: "shadow-[0_0_15px_rgba(0,229,255,0.2)]",
    skills: ["CNNs", "Anomaly Detection", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
  },
  {
    title: "Big Data",
    icon: <Database size={24} />,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/50",
    shadow: "shadow-[0_0_15px_rgba(250,204,21,0.2)]",
    skills: ["Apache Kafka", "Apache Spark", "Hive", "Pig", "HDFS"],
  },
  {
    title: "Databases",
    icon: <Terminal size={24} />,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/50",
    shadow: "shadow-[0_0_15px_rgba(251,146,60,0.2)]",
    skills: ["MySQL", "MongoDB"],
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud size={24} />,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-400/50",
    shadow: "shadow-[0_0_15px_rgba(244,114,182,0.2)]",
    skills: ["AWS", "Docker", "GitHub Actions", "CI/CD", "Nginx", "SSH"],
  },
  {
    title: "Tools",
    icon: <Wrench size={24} />,
    color: "text-white",
    bgColor: "bg-white/10",
    borderColor: "border-white/50",
    shadow: "shadow-[0_0_15px_rgba(255,255,255,0.2)]",
    skills: ["Git", "GitHub", "Postman", "Elasticsearch/OpenSearch", "Raspberry Pi", "LaTeX"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-4 uppercase tracking-tight">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full shadow-[0_0_15px_rgba(0,255,102,0.5)]"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, index) => (
            <Tilt 
              key={category.title} 
              tiltMaxAngleX={10} 
              tiltMaxAngleY={10} 
              perspective={1000} 
              scale={1.02} 
              transitionSpeed={2000}
              className={index === 1 ? "md:col-span-2 lg:col-span-1" : index === SKILL_CATEGORIES.length - 1 ? "md:col-span-2 xl:col-span-2" : ""}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass rounded-2xl p-6 flex flex-col h-full bg-black/60 border ${category.borderColor} ${category.shadow} relative group overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${category.bgColor} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${category.bgColor} ${category.color} border border-white/5`}>
                  {category.icon}
                </div>
                
                <h3 className="text-xl font-heading font-bold mb-6 text-white relative z-10">{category.title}</h3>
                
                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-mono font-medium rounded-md bg-white/5 text-foreground/90 border border-white/10 group-hover:border-white/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
