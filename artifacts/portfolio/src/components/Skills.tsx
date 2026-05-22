import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { SiReact, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss, SiOpenai } from "react-icons/si";

const skills = [
  { name: "React", icon: SiReact, color: "#61DAFB", glow: "rgba(97,218,251,0.35)" },
  { name: "Node.js", icon: SiNodedotjs, color: "#6cc24a", glow: "rgba(108,194,74,0.35)" },
  { name: "Express.js", icon: SiExpress, color: "#d4d4d4", glow: "rgba(212,212,212,0.25)" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", glow: "rgba(71,162,72,0.35)" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", glow: "rgba(6,182,212,0.35)" },
  { name: "AI APIs", icon: SiOpenai, color: "#c084fc", glow: "rgba(192,132,252,0.35)" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 14 } }
};

const Skills = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="float-slow absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }} />
        <div className="float absolute bottom-1/4 left-1/5 w-60 h-60 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }}>
            What I Use
          </span>
          <h2 className="text-4xl md:text-6xl font-black gradient-text">Tech Arsenal</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const isHovered = hovered === index;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.06 }}
                onHoverStart={() => setHovered(index)}
                onHoverEnd={() => setHovered(null)}
                className="relative rounded-2xl p-7 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300"
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, ${skill.glow.replace("0.35", "0.15")}, rgba(139,92,246,0.08))`
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isHovered ? skill.color + "60" : "rgba(255,255,255,0.07)"}`,
                  boxShadow: isHovered ? `0 0 32px ${skill.glow}, inset 0 1px 0 rgba(255,255,255,0.08)` : "none",
                }}
              >
                {/* Glow dot top-right */}
                {isHovered && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full pulse-glow"
                    style={{ background: skill.color }} />
                )}
                <Icon
                  className="w-12 h-12 transition-all duration-300"
                  style={{
                    color: skill.color,
                    filter: isHovered ? `drop-shadow(0 0 8px ${skill.color})` : "none",
                    transform: isHovered ? "scale(1.15)" : "scale(1)"
                  }}
                />
                <span className="font-semibold text-sm text-center leading-tight"
                  style={{ color: isHovered ? skill.color : "rgba(255,255,255,0.75)" }}>
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
