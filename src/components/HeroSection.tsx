"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Terminal } from "lucide-react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

const ROLES = [
  "AI/ML Engineer", 
  "Software Developer", 
  "Full Stack Builder",
  "DevOps Engineer",
  "Cloud Architect",
  "Data Science Enthusiast"
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      {/* Animated Matrix/Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,102,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,102,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>
      </div>

      {/* Floating Orbs */}
      <motion.div 
        animate={{ 
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[15%] w-72 h-72 bg-primary/20 rounded-full blur-[100px] z-0 pointer-events-none"
      />
      <motion.div 
        animate={{ 
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-secondary/20 rounded-full blur-[100px] z-0 pointer-events-none"
      />

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.05} transitionSpeed={2000}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full neon-border bg-black/40 backdrop-blur-md mb-8"
            >
              <Terminal size={18} className="text-primary" />
              <span className="text-sm font-medium tracking-wide text-white">System.out.println("Hello, World!");</span>
            </motion.div>
          </Tilt>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter mb-6 text-white drop-shadow-lg"
          >
            I'm <span className="text-gradient">Ambeer</span> <br className="hidden md:block" />
            <span>Shravan Kumar</span>
          </motion.h1>

          <div className="h-[50px] md:h-[70px] mb-8 overflow-hidden relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -50, rotateX: 90 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium text-foreground absolute inset-0 flex items-center justify-center transform-gpu"
              >
                <span className="bg-white/5 px-6 py-2 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  {ROLES[roleIndex]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            Engineering scalable cloud infrastructure, deploying intelligent machine learning models, and building high-performance full-stack applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.05}>
              <Link
                href="#projects"
                className="px-8 py-4 rounded-xl bg-primary text-black font-bold flex items-center space-x-2 hover:bg-[#00E5FF] transition-colors shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] w-full sm:w-auto justify-center"
              >
                <span>Explore Projects</span>
                <ArrowRight size={20} className="font-bold" />
              </Link>
            </Tilt>
            
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.05}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl glass neon-border hover:bg-primary/10 text-primary font-medium flex items-center space-x-2 transition-all w-full sm:w-auto justify-center group"
              >
                <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                <span>View Resume</span>
              </a>
            </Tilt>
          </motion.div>
        </div>
      </div>

      {/* Decorative Neon Lines */}
      <div className="absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent to-primary/50"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-transparent to-secondary/50"></div>
    </section>
  );
}
