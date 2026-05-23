import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Mail, Sparkles } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

const roles = ["Full Stack Developer", "React Specialist", "Node.js Engineer", "UI/UX Enthusiast"];

const Hero = () => {
  const name = "Dhruv Chaudhary";
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(i => (i + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen relative flex items-center pt-16 overflow-hidden">
      {/* Cursor glow */}
      <div ref={cursorRef} className="cursor-glow" />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }} />

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="float absolute top-[15%] left-[10%] w-72 h-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }} />
        <div className="float-slow absolute top-[40%] right-[8%] w-96 h-96 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)" }} />
        <div className="float-fast absolute bottom-[15%] left-[35%] w-64 h-64 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }} />
        <div className="float absolute top-[70%] right-[30%] w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #fb923c 0%, transparent 70%)" }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 glow-border"
            style={{ background: "rgba(139,92,246,0.12)", borderColor: "rgba(139,92,246,0.4)" }}
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-semibold text-violet-300">Available for hire</span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl md:text-3xl font-semibold mb-3"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Hi, I'm
          </motion.p>

          {/* Name — letter by letter with gradient */}
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mb-6 flex flex-wrap gap-x-6 leading-none">
            {name.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-flex overflow-hidden">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + wordIndex * 0.25 + charIndex * 0.04,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="inline-block gradient-text"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Animated role switcher */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-2 h-2 rounded-full pulse-glow" style={{ background: "#a78bfa" }} />
            <div className="text-xl md:text-2xl font-bold overflow-hidden h-9 flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="gradient-text-cyan inline-block"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Full Stack Developer crafting{" "}
            <span className="font-semibold" style={{ color: "#f472b6" }}>modern web experiences</span>{" "}
            that are fast, beautiful, and built to last.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-view-work"
              className="group px-8 py-4 font-bold rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                boxShadow: "0 0 24px rgba(139,92,246,0.4)",
                color: "white"
              }}
            >
              View My Work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-contact"
              className="px-8 py-4 font-bold rounded-xl border-2 flex items-center gap-2 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: "rgba(139,92,246,0.5)",
                color: "#a78bfa",
                background: "rgba(139,92,246,0.08)"
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(139,92,246,0.2)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(139,92,246,0.9)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(139,92,246,0.08)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(139,92,246,0.5)";
              }}
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </button>

            <div className="flex items-center gap-3 ml-1">
              <a
                href="https://github.com/dhruv311boop"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-github-hero"
                aria-label="GitHub"
                className="group w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ borderColor: "rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.08)", color: "#a78bfa" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#8b5cf6";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 16px rgba(139,92,246,0.5)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(139,92,246,0.3)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                <SiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/dhruv-chaudhary"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin-hero"
                aria-label="LinkedIn"
                className="w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ borderColor: "rgba(236,72,153,0.3)", background: "rgba(236,72,153,0.08)", color: "#f472b6" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#ec4899";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 16px rgba(236,72,153,0.5)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(236,72,153,0.3)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pulse-glow"
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-violet-500 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
