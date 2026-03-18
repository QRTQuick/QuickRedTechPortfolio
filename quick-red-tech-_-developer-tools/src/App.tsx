import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { Terminal } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok, faInstagram, faYoutube, faWhatsapp, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHome, faCode, faUserTie, faBars, faTimes, faBuilding, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import CEO from "./pages/CEO";
import Projects from "./pages/Projects";
import Company from "./pages/Company";
import News from "./pages/News";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: faHome },
    { name: "Company", path: "/company", icon: faBuilding },
    { name: "Projects", path: "/projects", icon: faCode },
    { name: "News", path: "/news", icon: faNewspaper },
    { name: "CEO", path: "/ceo", icon: faUserTie },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Terminal className="text-white w-6 h-6" />
          </div>
          <span className="font-extrabold text-xl tracking-tighter text-white">QUICK RED TECH</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase text-brand-silver/60">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`hover:text-brand-red transition-colors ${location.pathname === link.path ? 'text-brand-red' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <a href="https://github.com/QRTQuick" target="_blank" className="hover:text-brand-red transition-colors flex items-center gap-2">
            <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-brand-dark border-b border-white/5 md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`flex items-center gap-4 text-lg font-bold tracking-widest uppercase p-4 rounded-xl transition-colors ${location.pathname === link.path ? 'bg-brand-red/10 text-brand-red' : 'text-brand-silver/60 hover:bg-white/5'}`}
                >
                  <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
              <a 
                href="https://github.com/QRTQuick" 
                target="_blank" 
                className="flex items-center gap-4 text-lg font-bold tracking-widest uppercase p-4 rounded-xl text-brand-silver/60 hover:bg-white/5 transition-colors"
              >
                <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="py-20 border-t border-white/5 bg-brand-black">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-3">
        <Terminal className="text-brand-red w-6 h-6" />
        <span className="font-extrabold text-lg tracking-tighter text-white">QUICK RED TECH</span>
      </div>
      <p className="text-brand-silver/40 text-sm font-medium">
        Built by Quick Red Tech Team • © 2026
      </p>
      <div className="flex gap-6">
        <a href="https://www.tiktok.com/@shinpuru_sachi" target="_blank" className="text-brand-silver/60 hover:text-brand-red transition-colors">
          <FontAwesomeIcon icon={faTiktok} className="w-6 h-6" />
        </a>
        <a href="https://www.instagram.com/quick_red_tech/" target="_blank" className="text-brand-silver/60 hover:text-brand-red transition-colors">
          <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
        </a>
        <a href="https://www.youtube.com/@QuickRedTechTips-x" target="_blank" className="text-brand-silver/60 hover:text-brand-red transition-colors">
          <FontAwesomeIcon icon={faYoutube} className="w-6 h-6" />
        </a>
        <a href="https://wa.me/2347062423270" target="_blank" className="text-brand-silver/60 hover:text-brand-red transition-colors">
          <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6" />
        </a>
        <a href="https://github.com/QRTQuick" target="_blank" className="text-brand-silver/60 hover:text-brand-red transition-colors">
          <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
        </a>
      </div>
    </div>
  </footer>
);

const BackgroundAnimation = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const logoX = useSpring(useTransform(mouseX, [0, window.innerWidth], [20, -20]), springConfig);
  const logoY = useSpring(useTransform(mouseY, [0, window.innerHeight], [20, -20]), springConfig);
  
  const particleX = useSpring(useTransform(mouseX, [0, window.innerWidth], [-40, 40]), springConfig);
  const particleY = useSpring(useTransform(mouseY, [0, window.innerHeight], [-40, 40]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-brand-dark">
      {/* Interactive Logo Background */}
      <motion.div 
        style={{ x: logoX, y: logoY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] flex items-center justify-center opacity-[0.03] select-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop" 
          alt="Quick Red Tech Logo Background"
          className="w-full h-full object-contain grayscale brightness-200"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Floating Tech Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{ x: particleX, y: particleY }}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.2 + 0.1
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [null, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-brand-red rounded-full blur-[1px]"
        />
      ))}

      {/* Atmospheric Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-teasel/10 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-silver/5 blur-[120px]"
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Grainy Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans relative">
        <BackgroundAnimation />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/news" element={<News />} />
          <Route path="/ceo" element={<CEO />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
