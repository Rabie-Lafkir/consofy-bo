import darkLogo  from "@shared/assets/logo/consofy-dark.png";
import lightLogo from "@shared/assets/logo/consofy-light.png";
import { useEffect, useState } from "react";

type LogoProps = {
    className?: string;
  };

/* ─────────────────────────────────────────────────────────────── */
/* Logo component: switches source based on .light class          */
/* ─────────────────────────────────────────────────────────────── */
const Logo = ({ className = "" }: LogoProps) => {
  const [isLight, setIsLight] = useState(
    document.documentElement.classList.contains("light")
  );

  /* listen for theme-toggle side effects */
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsLight(document.documentElement.classList.contains("light"))
    );
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);

  return (
    <img
      src={isLight ? lightLogo : darkLogo}
      alt="Consofy logo"
      className={`w-auto ${className}`}
    />
  );
};

export default Logo;