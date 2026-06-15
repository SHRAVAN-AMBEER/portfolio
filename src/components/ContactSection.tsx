"use client";

import { motion } from "framer-motion";
import { Send, Mail, MapPin } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { useState } from "react";

export default function ContactSection() {
  const [result, setResult] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    // Replace with your Web3Forms Access Key
    formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      setResult("An error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-glow/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-4 uppercase tracking-tight">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full shadow-[0_0_15px_rgba(0,255,102,0.5)] mx-auto"></div>
          <p className="mt-6 text-foreground/70 max-w-xl mx-auto font-light">
            I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-8"
          >
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02}>
              <div className="glass neon-border rounded-2xl p-6 bg-black/60 flex items-center space-x-6 group">
                <div className="p-4 bg-primary/20 text-primary rounded-xl group-hover:bg-primary group-hover:text-black transition-colors">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-sm font-mono text-primary mb-1 uppercase tracking-widest">Email Me</h4>
                  <a href="mailto:shravanxd99@gmail.com" className="text-xl font-bold text-white hover:text-primary transition-colors">
                    shravanxd99@gmail.com
                  </a>
                </div>
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02}>
              <div className="glass neon-border-secondary rounded-2xl p-6 bg-black/60 flex items-center space-x-6 group">
                <div className="p-4 bg-secondary/20 text-secondary rounded-xl group-hover:bg-secondary group-hover:text-white transition-colors">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-sm font-mono text-secondary mb-1 uppercase tracking-widest">Location</h4>
                  <p className="text-xl font-bold text-white">
                    Hyderabad, India
                  </p>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={onSubmit} className="glass neon-border rounded-3xl p-8 bg-black/80 flex flex-col space-y-6">
              
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-sm font-mono text-white/70">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-light"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm font-mono text-white/70">Your Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-light"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="text-sm font-mono text-white/70">Message</label>
                <textarea 
                  name="message" 
                  id="message" 
                  rows={4}
                  required 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-light resize-none"
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary text-black font-bold text-lg py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#00E5FF] transition-all shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] mt-4"
              >
                <span>Send Message</span>
                <Send size={20} />
              </button>

              {result && (
                <p className={`text-center font-mono text-sm mt-4 ${result.includes("success") ? "text-primary" : "text-glow"}`}>
                  {result}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
