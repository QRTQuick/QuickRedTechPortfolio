import { motion } from "motion/react";
import { Building2, Users, Target, Rocket, Shield, Zap, Globe, Cpu, Code2 } from "lucide-react";

export default function Company() {
  const values = [
    {
      icon: <Zap className="w-6 h-6 text-brand-red" />,
      title: "Speed & Efficiency",
      description: "We build tools that are lightweight and lightning-fast, ensuring developers never have to wait on their software."
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-red" />,
      title: "Privacy First",
      description: "Your data is yours. Our tools are designed with a privacy-first mindset, prioritizing local execution and data sovereignty."
    },
    {
      icon: <Target className="w-6 h-6 text-brand-red" />,
      title: "Developer Ergonomics",
      description: "We focus on the human element of engineering, creating intuitive interfaces for complex system-level tasks."
    },
    {
      icon: <Cpu className="w-6 h-6 text-brand-red" />,
      title: "System Mastery",
      description: "We thrive at the low-level, mastering the interactions between software and hardware to deliver peak performance."
    }
  ];

  const milestones = [
    {
      year: "August 12, 2024",
      title: "Foundation",
      description: "Quick Red Tech was founded by Chisom Life Eke with a vision to simplify complex developer workflows and enhance system security."
    },
    {
      year: "2025",
      title: "Public Launch",
      description: "The organization officially started its publicity, sharing its mission and tools with the global developer community."
    },
    {
      year: "2025",
      title: "First Major Release",
      description: "Launch of Shinpuru Sachi, a project focused on simplicity and efficiency for public use."
    },
    {
      year: "2026",
      title: "Expansion",
      description: "Growing the ecosystem with StackCheckMate and D-Red-Bot, focusing on high-performance automation."
    }
  ];

  return (
    <div className="pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/20 rounded-full mb-8">
              <Building2 className="w-4 h-4 text-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-brand-red">The Organization</span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter leading-[0.85] mb-8 uppercase">
              QUICK RED <br />
              <span className="text-brand-red">TECH</span>
            </h1>
            <p className="text-2xl text-brand-silver/60 max-w-3xl mx-auto font-medium leading-relaxed">
              Building the tools that build the future. We are a high-performance software engineering collective dedicated to system-level excellence.
            </p>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="glass-card p-12 bg-brand-black/50 hover:border-brand-red/50 hover:shadow-[0_0_40px_rgba(255,0,0,0.15)] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center mb-8">
              <Rocket className="w-6 h-6 text-brand-red" />
            </div>
            <h2 className="text-4xl font-extrabold mb-6 uppercase tracking-tighter">Our Mission</h2>
            <p className="text-xl text-brand-silver/70 leading-relaxed">
              To deliver practical, privacy-first developer tools and automation systems that scale. We combine careful engineering with human-centered product design to remove friction from the creative process.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="glass-card p-12 border-brand-red/20 hover:border-brand-red/50 hover:shadow-[0_0_40px_rgba(255,0,0,0.15)] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center mb-8">
              <Globe className="w-6 h-6 text-brand-red" />
            </div>
            <h2 className="text-4xl font-extrabold mb-6 uppercase tracking-tighter">Our Vision</h2>
            <p className="text-xl text-brand-silver/70 leading-relaxed">
              We envision a future where routine developer work is reliably automated by tools that are predictable, transparent, and respectful of developer intent, allowing engineers to focus on what truly matters: innovation.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tighter mb-4">Core Values</h2>
            <div className="h-1 w-20 bg-brand-red mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 400, damping: 17 }}
                className="glass-card p-8 hover:border-brand-red/50 hover:shadow-[0_0_30px_rgba(255,0,0,0.1)] transition-all duration-300 group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-brand-silver/50 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What We Do */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tighter mb-8">What We Do</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="mt-1">
                  <Shield className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">The First Codebase</h4>
                  <p className="text-brand-silver/60">The very first project built for Quick Red Tech was a sophisticated C++ program designed to block webcam access unless explicitly granted from the user's mobile device, setting the standard for our privacy-first engineering.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="mt-1">
                  <Cpu className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Systems Engineering</h4>
                  <p className="text-brand-silver/60">Building low-level utilities and core software that interacts directly with system resources for maximum performance.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="mt-1">
                  <Code2 className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Developer Tooling</h4>
                  <p className="text-brand-silver/60">Creating automation scripts, CLI tools, and IDE extensions that simplify complex engineering workflows.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="mt-1">
                  <Zap className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Performance Optimization</h4>
                  <p className="text-brand-silver/60">Auditing and optimizing existing software stacks to reduce latency and resource consumption.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-card aspect-video relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-red/20 z-10 opacity-40" />
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
              alt="Technology"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="p-6 glass-card bg-brand-dark/80 backdrop-blur-md border-white/10 text-center">
                <p className="text-brand-red font-mono text-xs uppercase tracking-widest mb-2">Engineering Standard</p>
                <p className="text-2xl font-bold italic">"Performance is not a feature; it's a requirement."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tighter mb-4">Our Journey</h2>
            <div className="h-1 w-20 bg-brand-red mx-auto" />
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-brand-red/20 hidden md:block" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="flex-1 text-center md:text-right">
                    {i % 2 === 0 ? (
                      <div>
                        <span className="text-brand-red font-mono text-2xl font-bold">{m.year}</span>
                        <h4 className="text-xl font-bold mt-2">{m.title}</h4>
                        <p className="text-brand-silver/50 mt-2 max-w-md ml-auto">{m.description}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="w-4 h-4 rounded-full bg-brand-red relative z-10 shadow-[0_0_15px_rgba(255,0,0,0.5)]" />
                  <div className="flex-1 text-center md:text-left">
                    {i % 2 !== 0 ? (
                      <div>
                        <span className="text-brand-red font-mono text-2xl font-bold">{m.year}</span>
                        <h4 className="text-xl font-bold mt-2">{m.title}</h4>
                        <p className="text-brand-silver/50 mt-2 max-w-md mr-auto">{m.description}</p>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="glass-card p-12 text-center bg-brand-black/50 border-brand-red/20">
          <Users className="w-12 h-12 text-brand-red mx-auto mb-8" />
          <h2 className="text-4xl font-extrabold mb-6 uppercase tracking-tighter">The Team</h2>
          <p className="text-xl text-brand-silver/60 max-w-2xl mx-auto leading-relaxed mb-12">
            Quick Red Tech is powered by a collective of passionate engineers and designers who believe in the power of high-performance software. Led by Chisom Life Eke, we work remotely across borders to build the next generation of developer tools.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-red/80 transition-colors cursor-default">
            <Zap className="w-5 h-5" />
            <span>Building Tools That Build Developers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
