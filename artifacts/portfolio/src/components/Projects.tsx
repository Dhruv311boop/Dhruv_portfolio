import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, CheckCircle2 } from "lucide-react";

type Project = {
  title: string;
  subtitle?: string;
  description: string;
  stack: string[];
  github: string;
  live: string;
  gradient: string;
  accent: string;
  glow: string;
  number: string;
  highlights?: string[];
};

const projects: Project[] = [
  {
    title: "AI-Powered Commerce Intelligence Platform",
    subtitle: "CommerceFlow",
    description: "CommerceFlow is an AI-powered commerce intelligence platform that helps businesses analyze customers, orders, products, inventory, and revenue through intelligent insights and automated analytics. The platform transforms raw business data into actionable decisions using advanced dashboards, customer intelligence, inventory intelligence, and sales analytics.",
    stack: [
      "React", "Node.js", "Express.js", "JavaScript", 
      "Framer Motion", "Tailwind CSS", "Vercel", "REST APIs", 
      "AI-Powered Analytics", "CSV Processing", "Excel Data Import", "Data Visualization"
    ],
    github: "https://github.com/Dhruv311boop/Commerce_Flow",
    live: "https://commerce-flow-beige.vercel.app",
    gradient: "from-blue-600/20 via-blue-900/10 to-transparent",
    accent: "#2563eb",
    glow: "rgba(37,99,235,0.3)",
    number: "01",
    highlights: [
      "AI Sales Insights",
      "Customer Intelligence",
      "Product Analytics",
      "Inventory Intelligence",
      "Order Tracking",
      "Revenue Analytics",
      "Smart Data Mapping",
      "CSV & Excel Imports",
      "Interactive Dashboards"
    ]
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
    number: "02",
  },
];

const Projects = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      {/* Background orb */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="float absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 70%)" }} />
        <div className="float-slow absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-08"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }} />
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
            style={{ background: "rgba(37,99,235,0.15)", color: "#3b82f6", border: "1px solid rgba(37,99,235,0.3)" }}>
            My Work
          </span>
          <h2 className="text-4xl md:text-6xl font-black gradient-text">Featured Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {projects.map((project, index) => {
            const isHovered = hovered === index;
            const isFeatured = index === 0;

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
                className={`relative rounded-2xl p-8 flex flex-col h-full cursor-pointer transition-all duration-400 overflow-hidden`}
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

                <div className={`flex flex-col h-full`}>
                  <div className={`flex-1 flex flex-col relative z-10`}>
                    {/* Top row */}
                    <div className="flex justify-between items-start mb-6">
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
                          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
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
                          <Github className="w-5 h-5" />
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Live demo"
                          data-testid={`link-live-project-${index}`}
                          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
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
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      {project.subtitle && (
                        <h4
                          className="text-sm font-bold tracking-widest uppercase mb-2"
                          style={{ color: project.accent }}
                        >
                          {project.subtitle}
                        </h4>
                      )}
                      <h3
                        className={`${isFeatured ? 'text-3xl md:text-4xl' : 'text-2xl'} font-black transition-all duration-300`}
                        style={{ color: isHovered ? project.accent : "rgba(255,255,255,0.95)" }}
                      >
                        {project.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className={`flex-grow ${isFeatured ? 'mb-8' : 'mb-6'} leading-relaxed ${isFeatured ? 'text-base md:text-lg' : 'text-sm'}`}
                      style={{ color: "rgba(255,255,255,0.65)" }}>
                      {project.description}
                    </p>
                    
                    {/* Stack badges */}
                    <div className="flex flex-wrap gap-2 mt-auto">
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
                  </div>

                  {/* Highlights section (only for featured) */}
                  {isFeatured && project.highlights && (
                    <div className="flex-1 mt-8 relative z-10 flex flex-col justify-center">
                      <div className="p-6 rounded-xl" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-white/80">Project Highlights</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {project.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: project.accent }} />
                              <span className="text-sm text-white/70">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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
