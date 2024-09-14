import React, { useState, useEffect } from "react";
import { throttle } from "lodash";

const PageLogo = () => {
  const [scrolled, setScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/img/3bolu2.png");

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 0) {
        setScrolled(true); // Kaydırılma varsa
      } else {
        setScrolled(false); // Kaydırılma yoksa
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    setLogoSrc("/img/3-2.png");
  };

  const handleMouseLeave = () => {
    setLogoSrc("/img/3bolu2.png");
  };

  return (
    <header className={`pagelogo-container ${scrolled ? "scrolled" : ""}`}>
      <img
        className={`pagelogo-logo ${scrolled ? "small" : "large"}`}
        src={logoSrc}
        alt="Logo"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </header>
  );
};

export default PageLogo;
