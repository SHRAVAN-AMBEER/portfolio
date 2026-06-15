"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, Calendar, Code, Laptop, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

const TIMELINE = [
  {
    year: "2023 - Present",
    title: "AI/ML Exploration & Full Stack Dev",
    description: "Architected serverless AWS pipelines, built AI-powered analytics platforms, and explored Machine Learning algorithms for anomaly detection.",
    icon: <Briefcase size={20} />,
    color: "bg-primary",
  },
  {
    year: "2023 - 2027",
    title: "B.E. Information Technology",
    description: "Enrolled at Chaitanya Bharathi Institute of Technology (CBIT). Maintaining an 8.74 CGPA while actively building projects and exploring cloud technologies.",
    icon: <Calendar size={20} />,
    color: "bg-secondary",
  },
  {
    year: "2024",
    title: "Competitive Coding & Open Source",
    description: "Achieved 4-Star Python Programmer status on HackerRank. Solved algorithmic problems on LeetCode and actively contributed to open-source on GitHub.",
    icon: <Code size={20} />,
    color: "bg-glow",
  },
  {
    year: "2023",
    title: "Learning Programming Foundation",
    description: "Started the journey with core languages (Python, Java). Discovered a passion for backend logic, web development, and database architecture.",
    icon: <Laptop size={20} />,
    color: "bg-white",
  },
];

const CERTIFICATES = [
  {
    title: "Oracle Cloud Infrastructure 2024 Certified Foundations Associate",
    date: "2024",
    link: "https://drive.google.com/file/d/1vmk4IzRMaGXp7knqJwKBs6SHT_TXOXbs/view?usp=drive_link",
  },
  {
    title: "Vault of Codes – Internship & Training",
    date: "2025",
    link: "https://drive.google.com/file/d/1x02V1m3Cw521E5-OH9Fsc1IOSVXT7rUf/view?usp=sharing",
  },
  {
    title: "MongoDB Certified Developer – Python",
    date: "2024",
    link: "https://drive.google.com/file/d/1FR4qD_JDOwkDdcYHFPLaaMojF7prXBXq/view?usp=sharing",
  },
  {
    title: "Google Cloud Computing Fundamentals",
    date: "2024",
    link: "https://drive.google.com/file/d/1qwPIPFv0gGLx43DkTGWLu63kKtGIsYeW/view?usp=sharing",
  },
  {
    title: "4-Star Python Programmer – HackerRank",
    date: "2024",
    link: "https://www.hackerrank.com/profile/shravanxd99",
  },
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
          {/* Journey Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 uppercase tracking-tight">
                My <span className="text-gradient">Journey</span>
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full shadow-[0_0_15px_rgba(0,255,102,0.5)]"></div>
            </motion.div>

            <div className="relative pl-8 md:pl-0">
              {/* Vertical line for desktop */}
              <div className="hidden md:block absolute left-[28px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent"></div>

              <div className="space-y-8">
                {TIMELINE.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative md:pl-16"
                  >
                    <div className={`hidden md:flex absolute left-[12px] top-1 w-8 h-8 rounded-full ${item.color} text-black items-center justify-center shadow-[0_0_15px_currentColor] z-10`}>
                      {item.icon}
                    </div>

                    <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} perspective={1000} scale={1.01}>
                      <div className="glass bg-black/60 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-colors">
                        <span className="text-xs font-mono font-bold text-glow mb-2 block tracking-widest uppercase">{item.year}</span>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-foreground/70 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </Tilt>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements & Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 uppercase tracking-tight">
                Certifications
              </h2>
              <div className="w-16 h-1 bg-glow rounded-full shadow-[0_0_15px_rgba(0,229,255,0.5)]"></div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              {CERTIFICATES.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000} scale={1.02}>
                    <Link href={cert.link} target="_blank" className="block group">
                      <div className="glass bg-black/60 rounded-2xl p-5 flex items-center justify-between border border-white/10 hover:border-glow/50 transition-all shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                        <div className="flex items-center space-x-4">
                          <div className="p-2.5 bg-white/5 rounded-xl text-glow group-hover:bg-glow/20 transition-colors">
                            <ShieldCheck size={20} />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-white group-hover:text-glow transition-colors">{cert.title}</h4>
                            <span className="text-xs text-foreground/50 font-mono mt-1 block">{cert.date}</span>
                          </div>
                        </div>
                        <ExternalLink size={18} className="text-foreground/40 group-hover:text-glow group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform ml-4 flex-shrink-0" />
                      </div>
                    </Link>
                  </Tilt>
                </motion.div>
              ))}
            </div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.4 }}
               className="mt-8"
            >
              <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000} scale={1.02}>
                <div className="glass neon-border-secondary rounded-2xl p-6 bg-secondary/5 relative overflow-hidden flex justify-between items-center group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-[50px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 flex items-center">
                      ⚽ Extracurriculars
                    </h4>
                    <p className="text-foreground/80 text-sm max-w-md">
                      Represented CBIT Football Team at the National-Level Inter-Engineering College Sports Fest (VJIT Sports Fest).
                    </p>
                  </div>
                  <Link href="https://drive.google.com/file/d/164f5SKQ_MsEoSyKkuTwn9PA5sn5VNHQx/view?usp=drive_link" target="_blank" className="p-3 bg-white/5 rounded-xl group-hover:bg-secondary/20 transition-colors shrink-0 z-10">
                    <ExternalLink size={20} className="text-white group-hover:text-secondary transition-colors" />
                  </Link>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
