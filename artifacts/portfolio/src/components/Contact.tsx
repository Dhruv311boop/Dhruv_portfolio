import React, { useState } from "react";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Mail, Phone, Copy, Check } from "lucide-react";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("eternaldhruv311@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="float absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-08"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 65%)" }} />
        <div className="float-fast absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-08"
          style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ background: "rgba(6,182,212,0.15)", color: "#22d3ee", border: "1px solid rgba(6,182,212,0.3)" }}>
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-5 gradient-text">
            Let's Build Something
          </h2>
          <p className="text-lg mb-12" style={{ color: "rgba(255,255,255,0.55)" }}>
            I'm currently open to new opportunities. Whether you have a project, a question, or just want to say hi — I'll get back to you!
          </p>

          {/* Contact cards */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {/* Email with copy */}
            <motion.button
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={copyEmail}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.15))",
                border: "1px solid rgba(139,92,246,0.4)",
                color: "#a78bfa",
                boxShadow: "0 0 24px rgba(139,92,246,0.15)"
              }}
            >
              <Mail className="w-5 h-5 shrink-0" />
              <span className="text-sm">eternaldhruv311@gmail.com</span>
              {copied
                ? <Check className="w-4 h-4 text-green-400 shrink-0" />
                : <Copy className="w-4 h-4 opacity-60 shrink-0" />
              }
            </motion.button>

            {/* Phone */}
            <motion.a
              href="tel:+918810225526"
              whileHover={{ scale: 1.04, y: -3 }}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300"
              style={{
                background: "rgba(6,182,212,0.1)",
                border: "1px solid rgba(6,182,212,0.3)",
                color: "#22d3ee",
                boxShadow: "0 0 20px rgba(6,182,212,0.1)"
              }}
            >
              <Phone className="w-5 h-5 shrink-0" />
              <span className="text-sm">+91 8810225526</span>
            </motion.a>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-5">
            {[
              {
                href: "https://github.com/dhruv311boop",
                icon: SiGithub,
                label: "GitHub",
                color: "#a78bfa",
                bg: "rgba(139,92,246,0.12)",
                border: "rgba(139,92,246,0.35)",
                glow: "rgba(139,92,246,0.4)"
              },
              {
                href: "https://www.linkedin.com/in/dhruv-chaudhary-nsut",
                icon: FaLinkedin,
                label: "LinkedIn",
                color: "#f472b6",
                bg: "rgba(236,72,153,0.12)",
                border: "rgba(236,72,153,0.35)",
                glow: "rgba(236,72,153,0.4)"
              }
            ].map(({ href, icon: Icon, label, color, bg, border, glow }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                data-testid={`link-${label.toLowerCase()}-contact`}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{ background: bg, border: `1px solid ${border}`, color }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 24px ${glow}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
