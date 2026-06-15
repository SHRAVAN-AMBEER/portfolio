"use client";

import { motion } from "framer-motion";
import { BrainCircuit, GraduationCap, BookOpen } from "lucide-react";
import Tilt from "react-parallax-tilt";

const COURSEWORK = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "Operating Systems",
  "Computer Networks",
  "Machine Learning",
  "Deep Learning",
  "Artificial Intelligence",
  "Database Management Systems"
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Neon background lines */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-primary via-transparent to-transparent"></div>
        <div className="absolute bottom-1/4 right-0 w-full h-[1px] bg-gradient-to-l from-secondary via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-4 uppercase tracking-tight">
            About <span className="text-gradient-secondary">Me</span>
          </h2>
          <div className="w-24 h-1 bg-secondary rounded-full shadow-[0_0_15px_rgba(138,43,226,0.5)]"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Bio Card */}
          <div className="lg:col-span-7">
            <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000} scale={1.01} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass neon-border rounded-3xl p-8 h-full relative overflow-hidden group"
              >
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] group-hover:bg-secondary/20 transition-colors duration-700"></div>
                
                <h3 className="text-2xl font-heading font-bold mb-6 flex items-center text-white">
                  <BrainCircuit className="text-secondary mr-3" size={32} />
                  Passion for Intelligent Systems
                </h3>
                
                <p className="text-foreground/80 text-lg leading-relaxed mb-6 font-light">
                  I am <strong className="text-primary font-semibold">Ambeer Shravan Kumar</strong>, an undergraduate Information Technology student passionate about AI/ML, software engineering, and building impactful products.
                </p>
                <p className="text-foreground/80 text-lg leading-relaxed font-light">
                  I enjoy solving challenging problems, developing intelligent systems, and creating scalable applications. Whether it's architecting a serverless AWS pipeline or training a machine learning model for anomaly detection, I thrive at the intersection of data and software.
                </p>
              </motion.div>
            </Tilt>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Education Card */}
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass rounded-3xl p-8 relative overflow-hidden flex flex-col border-t-4 border-t-primary shadow-[0_0_20px_rgba(0,255,102,0.1)]"
              >
                <GraduationCap className="text-primary mb-4" size={36} />
                <h4 className="text-xl font-heading font-bold mb-2 text-white">Education</h4>
                <p className="text-white font-medium mb-1">Chaitanya Bharathi Institute of Technology</p>
                <p className="text-foreground/60 text-sm mb-6">B.E. in Information Technology</p>
                
                <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
                  <div>
                    <span className="block text-foreground/60 text-xs uppercase tracking-wider mb-1">Graduating</span>
                    <span className="text-white font-bold font-mono">2027</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-foreground/60 text-xs uppercase tracking-wider mb-1">CGPA</span>
                    <span className="text-gradient font-black text-2xl font-mono">8.74</span>
                  </div>
                </div>
              </motion.div>
            </Tilt>

            {/* Coursework Card */}
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02} className="flex-grow">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass neon-border-secondary rounded-3xl p-8 h-full flex flex-col"
              >
                <h4 className="text-xl font-heading font-bold mb-4 text-white flex items-center">
                  <BookOpen className="text-secondary mr-2" size={24} />
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {COURSEWORK.map((course, i) => (
                    <motion.span
                      key={course}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + (i * 0.05) }}
                      className="px-3 py-1.5 text-xs font-medium rounded-md bg-secondary/10 text-white border border-secondary/30 shadow-[inset_0_0_10px_rgba(138,43,226,0.1)]"
                    >
                      {course}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
