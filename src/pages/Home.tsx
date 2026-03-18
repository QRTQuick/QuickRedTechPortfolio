import { motion } from "motion/react";
import { Terminal, Zap, ChevronRight, Code2, Cpu, Info } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { projects, Project } from "../data";

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      className="glass-card p-8 group hover:border-brand-red/50 hover:shadow-[0_0_40px_rgba(255,0,0,0.15)] transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Code2 className="w-24 h-24" />
        </div>
        <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-red transition-colors">{project.name}</h3>
        <p className="text-brand-silver/60 mb-6 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map(t => (
            <span key={t} className="px-3 py-1 bg-white/5 rounded-md text-xs font-mono text-brand-red border border-white/5">
              {t}
            </span>
          ))}
        </div>
        <a 
          href={project.githubUrl} 
          target="_blank"
          className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:gap-4 transition-all"
        >
          VIEW ON GITHUB <FontAwesomeIcon icon={faGithub} className="w-4 h-4 text-brand-red" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section id="home" className="pt-20 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-brand-teasel/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-silver/10 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/20 rounded-full mb-8">
              <Zap className="w-4 h-4 text-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-brand-red">High Performance Engineering</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8 max-w-4xl">
              NO LAG. NO CLUTTER. <br />
              <span className="text-brand-red">JUST BUILD.</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-silver/60 max-w-2xl mb-12 leading-relaxed">
              Quick Red Tech builds high-performance, minimal, and powerful tools for developers. We eliminate the friction so you can focus on shipping.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/projects" className="btn-primary">
                EXPLORE PROJECTS <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </Link>
              <Link to="/company" className="btn-secondary">
                ABOUT THE COMPANY <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Product */}
      <section className="py-16 sm:py-32 px-6 bg-brand-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-1 aspect-video relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-full h-full bg-brand-dark rounded-lg flex items-center justify-center border border-white/5">
                <Terminal className="w-20 h-20 text-brand-red/40" />
              </div>
            </motion.div>
            <div>
              <h2 className="text-4xl font-extrabold mb-6">StackCheckMate</h2>
              <p className="text-lg text-brand-silver/60 mb-8 leading-relaxed">
                Universal environment automation tool. Automate virtual environments, dependency pinning, and reproducible builds across all languages with a single command.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "One-command environment setup",
                  "Cross-language dependency management",
                  "CI/CD ready reproducible builds",
                  "Lightweight and portable CLI"
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-brand-silver">
                    <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="https://github.com/QRTQuick/stackcheckmate" className="btn-secondary w-fit">
                LEARN MORE <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-16 sm:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-5xl font-extrabold mb-4">ENGINEERING STACK</h2>
              <p className="text-brand-silver/60 text-lg max-w-xl">
                A collection of tools designed to solve real engineering problems with minimal overhead.
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/projects" className="btn-secondary">
                VIEW ALL REPOS <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Shinpuru Sachi Notice */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 p-6 glass-card border-brand-red/30 bg-brand-red/5 flex items-center gap-6"
          >
            <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center shrink-0">
              <Zap className="text-white w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider">Shinpuru Sachi: Major Updates</h4>
              <p className="text-brand-silver/60 text-sm mb-2">Major updates have been pushed to Shinpuru Sachi. Significant performance improvements are now live.</p>
              <Link to="/news" className="text-brand-red text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all uppercase">
                Read the Dev Log <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* About / Philosophy */}
      <section id="about" className="py-16 sm:py-32 px-6 bg-brand-black border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-5xl font-extrabold mb-8">CORE PHILOSOPHY</h2>
              <p className="text-2xl text-brand-silver/80 leading-relaxed mb-12">
                At Quick Red Tech, we believe that modern software has become too heavy. We build for the engineer who values <span className="text-brand-red">speed</span>, <span className="text-brand-red">clarity</span>, and <span className="text-brand-red">usability</span> above all else.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-6 glass-card">
                  <Cpu className="w-8 h-8 text-brand-red mb-4" />
                  <h4 className="text-xl font-bold mb-2">Performance First</h4>
                  <p className="text-brand-silver/60">Every line of code is optimized for execution speed and resource efficiency.</p>
                </div>
                <div className="p-6 glass-card">
                  <Zap className="w-8 h-8 text-brand-red mb-4" />
                  <h4 className="text-xl font-bold mb-2">Minimalist Design</h4>
                  <p className="text-brand-silver/60">We remove the noise so you can focus on the signal. No unnecessary features.</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-8 flex flex-col justify-between">
              <div>
                <Info className="w-10 h-10 text-brand-red mb-6" />
                <h3 className="text-2xl font-bold mb-4">The Brand</h3>
                <p className="text-brand-silver/60 leading-relaxed mb-6">
                  Our identity is built on the pillars of Red, Black, and Silver. 
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-brand-red rounded" />
                    <span className="text-xs font-mono">#FF3B3B - ENERGY & SPEED</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-brand-teasel rounded" />
                    <span className="text-xs font-mono">#6A4A5E - DEPTH & ATMOSPHERE</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-brand-black rounded border border-white/10" />
                    <span className="text-xs font-mono">#0A0A0A - FOCUS & STRENGTH</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-brand-silver rounded" />
                    <span className="text-xs font-mono">#E5E5E5 - CLARITY & PRECISION</span>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-white/5 flex flex-col gap-4">
                <Link to="/company" className="text-brand-red font-bold flex items-center gap-2 hover:gap-4 transition-all">
                  READ OUR FULL STORY <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </Link>
                <p className="text-xs font-mono text-brand-silver/40 uppercase tracking-widest">
                  Quick Red Tech • Est. 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
