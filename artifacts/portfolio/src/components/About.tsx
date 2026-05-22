import React from "react";
import { motion } from "framer-motion";
import { Code2, Zap, Star } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Clean Code", color: "#a78bfa" },
  { icon: Zap, label: "Fast Delivery", color: "#fb923c" },
  { icon: Star, label: "Top Quality", color: "#fbbf24" },
];

const About = () => {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="float-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 65%)" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row items-center gap-16"
        >
          {/* Avatar */}
          <div className="w-full lg:w-2/5 flex justify-center shrink-0">
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative"
            >
              {/* Outer ring */}
              <div className="absolute -inset-4 rounded-full opacity-60"
                style={{ background: "conic-gradient(from 0deg, #8b5cf6, #ec4899, #fb923c, #06b6d4, #8b5cf6)", filter: "blur(8px)" }} />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(236,72,153,0.15) 50%, rgba(6,182,212,0.15) 100%)", border: "2px solid rgba(139,92,246,0.4)" }}>
                <div className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ background: "rgba(139,92,246,0.08)" }}>
                  <span className="text-7xl font-black gradient-text">DC</span>
                </div>
              </div>

              {/* Floating badges */}
              {highlights.map((h, i) => {
                const Icon = h.icon;
                const positions = [
                  "absolute -top-2 -right-6",
                  "absolute -bottom-4 -right-4",
                  "absolute top-1/2 -left-8 -translate-y-1/2"
                ];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15, type: "spring" }}
                    className={`${positions[i]} flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold`}
                    style={{ background: "rgba(10,10,20,0.9)", border: `1px solid ${h.color}50`, color: h.color }}
                  >
                    <Icon className="w-3 h-3" />
                    {h.label}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
                style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }}>
                About Me
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Crafting digital<br />
                <span className="gradient-text">experiences that matter</span>
              </h2>
              <div className="space-y-5 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                <p>
                  I'm a full-stack web developer specializing in{" "}
                  <span className="font-semibold" style={{ color: "#a78bfa" }}>React, Node.js, Express.js, MongoDB,</span> and{" "}
                  <span className="font-semibold" style={{ color: "#67e8f9" }}>Tailwind CSS</span>.
                  I build modern, responsive, and visually engaging web applications with clean UI and smooth user experiences.
                </p>
                <p>
                  What makes me stand out is my creativity, fast learning ability, and focus on building projects that look
                  professional and perform efficiently. I believe code is craft — every project is an opportunity to build
                  something{" "}
                  <span className="font-semibold" style={{ color: "#f472b6" }}>exceptional</span>.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
