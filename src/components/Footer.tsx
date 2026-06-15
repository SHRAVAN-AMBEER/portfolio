import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black relative overflow-hidden mt-24">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-3xl font-heading font-black mb-4 tracking-tight text-white">
              Ambeer Shravan Kumar<span className="text-primary">.</span>
            </h3>
            <p className="text-foreground/70 max-w-md mb-8 leading-relaxed font-light">
              Engineering scalable cloud infrastructure, deploying intelligent machine learning models, and building high-performance full-stack applications.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="https://github.com/SHRAVAN-AMBEER" target="_blank" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(0,255,102,0.2)] transition-all text-white hover:text-primary">
                <FaGithub size={22} />
              </Link>
              <Link href="https://www.linkedin.com/in/shravan-kumar-577a9a29b/" target="_blank" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-secondary/50 hover:bg-secondary/10 hover:shadow-[0_0_15px_rgba(138,43,226,0.2)] transition-all text-white hover:text-secondary">
                <FaLinkedin size={22} />
              </Link>
              <Link href="mailto:shravanxd99@gmail.com" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-glow/50 hover:bg-glow/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all text-white hover:text-glow">
                <Mail size={22} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-white uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="#about" className="text-foreground/70 hover:text-primary transition-colors font-mono text-sm uppercase">About</Link></li>
              <li><Link href="#skills" className="text-foreground/70 hover:text-primary transition-colors font-mono text-sm uppercase">Skills</Link></li>
              <li><Link href="#experience" className="text-foreground/70 hover:text-primary transition-colors font-mono text-sm uppercase">Experience</Link></li>
              <li><Link href="#projects" className="text-foreground/70 hover:text-primary transition-colors font-mono text-sm uppercase">Projects</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-white uppercase tracking-widest">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <a href="mailto:shravanxd99@gmail.com" className="text-foreground/70 hover:text-primary transition-colors flex items-center group font-mono text-sm">
                  shravanxd99@gmail.com
                  <ArrowUpRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0" />
                </a>
              </li>
              <li className="flex items-start text-foreground/70 font-mono text-sm">
                Hyderabad, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm font-mono text-foreground/50">
          <p>© {new Date().getFullYear()} Ambeer Shravan Kumar. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Designed & Built with <span className="text-primary font-bold">Next.js</span> & <span className="text-secondary font-bold">Framer Motion</span></p>
        </div>
      </div>
    </footer>
  );
}
