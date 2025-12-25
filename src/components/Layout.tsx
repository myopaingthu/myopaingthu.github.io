import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Code } from "lucide-react";
import BubbleMenu from "./BubbleMenu";
import Aurora from "./Aurora";

function Navbar() {

  const menuItems = [
    {
      label: "home",
      href: "/",
      ariaLabel: "Home",
      rotation: -8,
      hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" }
    },
    {
      label: "about",
      href: "/about",
      ariaLabel: "About",
      rotation: 8,
      hoverStyles: { bgColor: "#06b6d4", textColor: "#ffffff" }
    },
    {
      label: "projects",
      href: "/projects",
      ariaLabel: "Projects",
      rotation: -8,
      hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" }
    },
    {
      label: "experience",
      href: "/experience",
      ariaLabel: "Experience",
      rotation: 8,
      hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" }
    },
    {
      label: "contact",
      href: "/contact",
      ariaLabel: "Contact",
      rotation: -8,
      hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" }
    }
  ];

  return (
    <BubbleMenu
      logo={<Code />}
      items={menuItems}
      useFixedPosition={true}
      menuBg="rgba(15, 23, 42, 0.8)"
      menuContentColor="#3b82f6"
    />
  );
}

function Footer() {
  return (
    <footer className="">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Myo Paing Thu. Crafted with care.
        </p>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-dark"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Aurora effect from ReactBits */}
      <div className="absolute inset-0 opacity-60">
        <Aurora 
          colorStops={["#3b82f6", "#06b6d4", "#3b82f6"]}
          amplitude={1.2}
          blend={0.7}
          speed={0.5}
        />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-primary opacity-20" />
    </div>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col pt-28 md:pt-14">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center relative mx-auto max-w-5xl px-4">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

