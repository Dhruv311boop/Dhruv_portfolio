import React, { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    ["hero", "about", "skills", "projects", "contact"].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={scrolled ? {
        background: "rgba(10, 8, 20, 0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139,92,246,0.15)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.4)"
      } : { background: "transparent" }}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} className="font-black text-2xl tracking-tighter gradient-text">
          DC.
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              style={{
                color: active === id ? "#a78bfa" : "rgba(255,255,255,0.55)",
                background: active === id ? "rgba(139,92,246,0.12)" : "transparent",
              }}
              onMouseEnter={e => {
                if (active !== id) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={e => {
                if (active !== id) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)";
              }}
            >
              {label}
              {active === id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-500" />
              )}
            </button>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/dhruv311boop"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-github-navbar"
            aria-label="GitHub"
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#a78bfa";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(139,92,246,0.4)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 12px rgba(139,92,246,0.3)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            <SiGithub className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/dhruv-chaudhary-nsut"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-linkedin-navbar"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#f472b6";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(236,72,153,0.4)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 12px rgba(236,72,153,0.3)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
