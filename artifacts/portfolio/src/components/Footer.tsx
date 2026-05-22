import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 relative" style={{ borderTop: "1px solid rgba(139,92,246,0.15)" }}>
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
          &copy; {new Date().getFullYear()} <span className="gradient-text font-semibold">Dhruv Chaudhary</span> — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
