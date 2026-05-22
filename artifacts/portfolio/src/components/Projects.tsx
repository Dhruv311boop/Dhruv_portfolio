import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "SaaS Platform",
    description: "A full-featured Software-as-a-Service web application with user authentication, role-based dashboards, and subscription management.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/dhruv311boop/saas-platform",
    live: "https://saas-platform.vercel.app",
    gradient: "from-violet-600/20 via-violet-900/10 to-transparent",
    accent: "#8b5cf6",
    glow: "rgba(139,92,246,0.3)",
    number: "01",
  },
  {
    title: "Real-Time Chat App",
    description: "End-to-end real-time messaging using WebSockets with chat rooms, user presence indicators, and full message history.",
    stack: ["Node.js", "Express", "Socket.io", "React"],
    github: "https://github.com/dhruv311boop/chat-app",
    live: "https://chatflow-app.onrender.com",
    gradient: "from-pink-600/20 via-pink-900/10 to-transparent",
    accent: "#ec4899",
    glow: "rgba(236,72,153,0.3)",
    number: "02",
  },
  {
    title: "SkyPulse",
    subtitle: "Modern Weather Dashboard",
    description: "A sleek weather application that shows real-time forecasts, hourly breakdowns, and location-based weather data using a live weather API.",
    stack: ["HTML", "Tailwind CSS", "OpenWeatherMap API"],
    github: "https://github.com/Dhruv311boop/Skypulse",
    live: "https://skypulse-bay.vercel.app/",
    gradient: "from-cyan-600/20 via-cyan-900/10 to-transparent",
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.3)",
    number: "03",
  },
];

const Projects = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      {/* Background orb */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="float absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)" }} />
        <div className="float-slow absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-08"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ background: "rgba(236,72,153,0.15)", color: "#f472b6", border: "1px solid rgba(236,72,153,0.3)" }}>
            My Work
          </span>
          <h2 className="text-4xl md:text-6xl font-black gradient-text">Featured Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project, index) => {
            const isHovered = hovered === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -12 }}
                onHoverStart={() => setHovered(index)}
                onHoverEnd={() => setHovered(null)}
                className="relative rounded-2xl p-8 flex flex-col h-full cursor-pointer transition-all duration-400 overflow-hidden"
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, ${project.accent}18, rgba(139,92,246,0.06), rgba(10,10,20,0.9))`
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isHovered ? project.accent + "55" : "rgba(255,255,255,0.07)"}`,
                  boxShadow: isHovered ? `0 8px 48px ${project.glow}, 0 0 0 1px ${project.accent}30` : "none",
                }}
              >
                {/* Number watermark */}
                <div className="absolute top-4 right-6 text-6xl font-black opacity-5 select-none"
                  style={{ color: project.accent }}>
                  {project.number}
                </div>

                {/* Top row */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <motion.div
                    animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black"
                    style={{ background: `${project.accent}22`, color: project.accent, border: `1px solid ${project.accent}40` }}
                  >
                    {project.number}
                  </motion.div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View on GitHub"
                      data-testid={`link-github-project-${index}`}
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.5)",
                        border: "1px solid rgba(255,255,255,0.1)"
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLAnchorElement).style.color = project.accent;
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = project.accent + "60";
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 12px ${project.glow}`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Live demo"
                      data-testid={`link-live-project-${index}`}
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.5)",
                        border: "1px solid rgba(255,255,255,0.1)"
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLAnchorElement).style.color = project.accent;
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = project.accent + "60";
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 12px ${project.glow}`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Title */}
                <div className="mb-3 relative z-10">
                  <h3
                    className="text-2xl font-black transition-all duration-300"
                    style={{ color: isHovered ? project.accent : "rgba(255,255,255,0.95)" }}
                  >
                    {project.title}
                  </h3>
                  {"subtitle" in project && project.subtitle && (
                    <p
                      className="text-xs font-semibold tracking-widest uppercase mt-1"
                      style={{ color: project.accent, opacity: 0.75 }}
                    >
                      {project.subtitle}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="flex-grow mb-7 leading-relaxed text-sm relative z-10"
                  style={{ color: "rgba(255,255,255,0.55)" }}>
                  {project.description}
                </p>

                {/* Stack badges */}
                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-3 py-1 rounded-full transition-all duration-200"
                      style={{
                        background: isHovered ? `${project.accent}20` : "rgba(255,255,255,0.06)",
                        color: isHovered ? project.accent : "rgba(255,255,255,0.5)",
                        border: `1px solid ${isHovered ? project.accent + "40" : "rgba(255,255,255,0.08)"}`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
