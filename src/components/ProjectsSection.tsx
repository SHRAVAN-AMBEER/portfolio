"use client";

import { motion } from "framer-motion";
import { ExternalLink, Folder, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

const PROJECTS = [
  {
    title: "Cloud-Based Log Analyzer",
    bullets: [
      "Architected a serverless AWS pipeline using S3, Lambda, and OpenSearch to ingest and analyze 10,000+ log records for real-time security monitoring.",
      "Applied Isolation Forest and z-score normalization for hybrid anomaly detection, improving identification of suspicious activities while reducing false-positive alerts.",
      "Integrated Elasticsearch/OpenSearch to enable near real-time querying across large log datasets with sub-second search performance."
    ],
    tech: ["AWS Lambda", "OpenSearch", "Python", "Isolation Forest", "AWS S3"],
    github: "https://github.com/SHRAVAN-AMBEER/Cloud_Log_Analyzer.git",
    color: "neon-border"
  },
  {
    title: "Personal Blog CI/CD Pipeline",
    bullets: [
      "Built an end-to-end CI/CD pipeline using GitHub Actions that automated 100% of deployment workflows for a personal blog hosted on AWS EC2.",
      "Implemented secure SSH-based deployment and automated build pipelines, reducing deployment time from several minutes to under 30 seconds.",
      "Configured Nginx as a reverse proxy and web server, ensuring reliable application delivery and simplified production deployment."
    ],
    tech: ["GitHub Actions", "AWS EC2", "Nginx", "Docker", "SSH"],
    github: "https://github.com/SHRAVAN-AMBEER/blog-auto-deploy.git",
    color: "neon-border-secondary"
  },
  {
    title: "CRYPTOSE",
    bullets: [
      "Designed an AI-powered cryptocurrency analytics platform featuring role-based dashboards (Admin, Member, User) for tailored market insights.",
      "Engineered real-time crypto trend visualizations and comprehensive portfolio analysis tools using Matplotlib.",
      "Built a robust REST API backend with Flask and MongoDB to securely manage user data and market metrics."
    ],
    tech: ["React.js", "Flask", "MongoDB", "Matplotlib", "AI Analytics"],
    github: "https://github.com/SHRAVAN-AMBEER/cryptose.git",
    color: "neon-border"
  },
  {
    title: "Football Analytics Platform",
    bullets: [
      "Developed a comprehensive data visualization and analysis tool for tracking football match statistics and trends.",
      "Leveraged Pandas and Scikit-learn to analyze player performance metrics and evaluate team strategies.",
      "Created interactive dashboards to present complex match data in an easily digestible visual format."
    ],
    tech: ["Python", "Pandas", "Scikit-learn", "DataViz"],
    github: "https://github.com/SHRAVAN-AMBEER/football-analytics.git",
    color: "neon-border-secondary"
  },
  {
    title: "Online Movie Ticket Booking System",
    bullets: [
      "Developed a comprehensive ticket booking platform supporting role-based access control for administrators and users.",
      "Designed robust relational database operations across multiple interconnected tables to manage movies, schedules, and bookings.",
      "Ensured safe concurrent seat booking through transactional concurrency control via JDBC, completely preventing double-booking race conditions."
    ],
    tech: ["SQL", "JDBC", "Java", "HTML/CSS"],
    github: "https://github.com/SHRAVAN-AMBEER/Online-movie-ticket-booking.git",
    color: "neon-border"
  },
  {
    title: "Cyber Physical Honeypot",
    bullets: [
      "Conducted security research by simulating vulnerable physical systems to trap and analyze malicious network actors.",
      "Engineered custom network listeners using Python to log unauthorized access attempts and payload signatures.",
      "Analyzed attack vectors to improve defensive strategies and understand emerging cyber threats."
    ],
    tech: ["Python", "Network Security", "Threat Analysis"],
    github: "https://github.com/SHRAVAN-AMBEER/cyber-physical-honeypot.git",
    color: "neon-border-secondary"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Decorative Neon Blurs */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex justify-between items-end"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-4 uppercase tracking-tight">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-secondary rounded-full shadow-[0_0_15px_rgba(138,43,226,0.5)]"></div>
          </div>
          
          <Link 
            href="https://github.com/SHRAVAN-AMBEER" 
            target="_blank"
            className="hidden md:flex items-center space-x-2 text-white hover:text-secondary transition-colors group px-6 py-3 rounded-full glass border border-white/10 hover:border-secondary/50 shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(138,43,226,0.3)]"
          >
            <FaGithub size={20} />
            <span className="font-bold text-sm tracking-widest uppercase">GitHub Profile</span>
            <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {PROJECTS.map((project, index) => (
            <Tilt key={project.title} tiltMaxAngleX={2} tiltMaxAngleY={2} perspective={2000} scale={1.01} transitionSpeed={2000}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass rounded-3xl p-8 flex flex-col h-full bg-black/80 relative group overflow-hidden border-white/5 hover:border-white/20 transition-all ${project.color} shadow-lg`}
              >
                {/* Internal Glow Effect */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${project.color.includes("secondary") ? "bg-secondary/10" : "bg-primary/10"} rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className={`p-4 ${project.color.includes("secondary") ? "bg-secondary/20 text-secondary shadow-[0_0_15px_rgba(138,43,226,0.2)]" : "bg-primary/20 text-primary shadow-[0_0_15px_rgba(0,255,102,0.2)]"} rounded-2xl`}>
                    <Folder size={32} />
                  </div>
                  <Link href={project.github} target="_blank" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                    <FaGithub size={24} />
                  </Link>
                </div>

                <h3 className="text-3xl font-heading font-black mb-6 text-white group-hover:text-glow transition-colors relative z-10">
                  {project.title}
                </h3>
                
                <ul className="space-y-4 mb-8 relative z-10 flex-grow">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start text-foreground/80 font-light leading-relaxed">
                      <CheckCircle2 size={18} className={`mr-3 mt-1 shrink-0 ${project.color.includes("secondary") ? "text-secondary" : "text-primary"}`} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto pt-6 flex flex-wrap gap-2 relative z-10 border-t border-white/10">
                  {project.tech.map((tech) => (
                    <span key={tech} className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-md bg-white/5 border border-white/10 ${project.color.includes("secondary") ? "text-secondary" : "text-primary"} shadow-[inset_0_0_5px_rgba(255,255,255,0.05)]`}>
                      {tech}
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
