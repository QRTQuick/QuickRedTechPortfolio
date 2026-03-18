import { motion } from "motion/react";
import { User, Target, Rocket, Heart, Cpu, Zap, ExternalLink, Code2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok, faInstagram, faYoutube, faWhatsapp, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function CEO() {
  return (
    <div className="pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/20 rounded-full mb-8">
              <User className="w-4 h-4 text-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-brand-red">Leadership</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8">
              CHISOM <br />
              <span className="text-brand-red">LIFE EKE</span>
            </h1>
            <p className="text-2xl text-brand-silver font-bold mb-6">
              16-Year-Old Founder & CEO
            </p>
            <p className="text-xl text-brand-silver/60 leading-relaxed mb-8">
              A self-driven engineer and product builder from Nigeria who combines systems-level engineering with intuitive product design. Chisom is on a mission to redefine developer ergonomics by building tools that remove friction and amplify impact.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card aspect-square relative overflow-hidden flex items-center justify-center group"
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-transparent opacity-40" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>

            {/* Scanning Animation */}
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-brand-red/50 shadow-[0_0_15px_rgba(239,68,68,0.5)] z-20 pointer-events-none"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating Tech Bits */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute font-mono text-[10px] text-brand-red/20"
                  initial={{ 
                    x: Math.random() * 100 + "%", 
                    y: Math.random() * 100 + "%",
                    opacity: 0 
                  }}
                  animate={{ 
                    y: ["0%", "-10%"],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 4, 
                    repeat: Infinity, 
                    delay: i * 0.8 
                  }}
                >
                  {["0x7F", "SYS_INIT", "CORE_LOAD", "10110", "RUN_RT", "DEV_MODE", "QRT_OS", "ROOT"][i]}
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 1, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full h-full p-12"
            >
              <img 
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" 
                alt="Digital Core Representation"
                className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border border-brand-red/30 rounded-full animate-ping opacity-20" />
                <div className="absolute w-48 h-48 border border-brand-red/10 rounded-full animate-pulse" />
              </div>
            </motion.div>

            <div className="absolute bottom-8 left-8 right-8 p-6 glass-card bg-brand-dark/80 z-30 backdrop-blur-lg border-white/10 group-hover:border-brand-red/30 transition-colors">
              <p className="text-sm font-mono text-brand-red mb-2 uppercase tracking-widest">Current Focus</p>
              <p className="text-lg font-bold">High-performance developer automation & system utilities.</p>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-32">
          <div className="glass-card p-8">
            <Target className="w-10 h-10 text-brand-red mb-6" />
            <h3 className="text-2xl font-bold mb-4">The Vision</h3>
            <p className="text-brand-silver/60 leading-relaxed">
              "I envision a future where routine developer work is reliably automated by tools that are predictable, transparent, and respectful of developer intent."
            </p>
          </div>
          <div className="glass-card p-8 border-brand-red/30">
            <Rocket className="w-10 h-10 text-brand-red mb-6" />
            <h3 className="text-2xl font-bold mb-4">The Mission</h3>
            <p className="text-brand-silver/60 leading-relaxed">
              To deliver practical, privacy-first developer tools and automation systems that scale. We combine careful engineering with human-centered product design.
            </p>
          </div>
          <div className="glass-card p-8">
            <Heart className="w-10 h-10 text-brand-red mb-6" />
            <h3 className="text-2xl font-bold mb-4">The Philosophy</h3>
            <p className="text-brand-silver/60 leading-relaxed">
              Pragmatism over hype. We ship solutions that solve real problems—not hypothetical ones. If it doesn't make a developer faster, we don't build it.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 bg-brand-black/50 border-brand-red/20"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 uppercase tracking-tighter">Technical Career</h2>
            <p className="text-xl text-brand-silver/70 leading-relaxed mb-8">
              Chisom's engineering career is centered on <span className="text-white font-bold">system-level software</span>. He thrives in the low-level layers of the stack, where performance and resource management are paramount.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono text-brand-red mb-3 uppercase tracking-widest">Favorite Languages</p>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 font-mono text-sm">C</div>
                  <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 font-mono text-sm">C++</div>
                  <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 font-mono text-sm">Assembly</div>
                </div>
              </div>
              <p className="text-brand-silver/50 text-sm italic">
                "C and C++ provide the control necessary to build tools that don't just work, but excel in high-pressure environments."
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col justify-center p-6">
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Cpu className="text-brand-red w-6 h-6" />
                  System-Level Focus
                </h3>
                <p className="text-brand-silver/60 leading-relaxed">
                  His work involves building core utilities, terminal-based applications, and automation scripts that interact directly with system resources. This focus ensures that Quick Red Tech products are lightweight and lightning-fast.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Code2 className="text-brand-red w-6 h-6" />
                  Engineering Excellence
                </h3>
                <p className="text-brand-silver/60 leading-relaxed">
                  From memory management to process optimization, Chisom applies rigorous engineering standards to every project, ensuring that the "Quick" in Quick Red Tech is a technical reality, not just a name.
                </p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 text-center"
        >
          <div className="inline-block p-12 glass-card border-brand-red/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter italic leading-tight max-w-4xl mx-auto">
              "Curiosity grants you great innovation, doing research grants you knowledge which <span className="text-brand-red">== power</span>."
            </h2>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-brand-red/30" />
              <p className="text-brand-red font-mono uppercase tracking-[0.3em] text-sm">Chisom Life Eke</p>
              <div className="h-px w-12 bg-brand-red/30" />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-32">
          <div className="glass-card p-6 sm:p-12 bg-brand-black/50">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 uppercase tracking-tighter">Pushing Boundaries</h2>
            <p className="text-xl text-brand-silver/70 leading-relaxed mb-8">
              At just 16, Chisom has already led the creation of several high-impact projects including StackCheckMate and D-Red-Bot, with <span className="text-brand-red font-bold">Shinpuru Sachi</span> being one of his favorite projects released for public use. His leadership emphasizes fast iteration, clear technical documentation, and building for long-term maintainability.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-brand-red/10 rounded-lg">
                  <Cpu className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Systems Engineering</h4>
                  <p className="text-sm text-brand-silver/50">Deep focus on performance and resource efficiency.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-brand-red/10 rounded-lg">
                  <Zap className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Rapid Iteration</h4>
                  <p className="text-sm text-brand-silver/50">Shipping small, high-value features fast.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-12 border-brand-red/20">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 uppercase tracking-tighter">Connect</h2>
            <p className="text-brand-silver/60 mb-10">Follow the journey and get in touch for collaborations or inquiries.</p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="https://www.tiktok.com/@shinpuru_sachi" target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-brand-red/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faTiktok} className="w-5 h-5 text-brand-red" />
                  <span className="font-bold">TikTok</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://www.instagram.com/quick_red_tech/" target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-brand-red/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5 text-brand-red" />
                  <span className="font-bold">Instagram</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://www.youtube.com/@QuickRedTechTips-x" target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-brand-red/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faYoutube} className="w-5 h-5 text-brand-red" />
                  <span className="font-bold">YouTube</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://wa.me/2347062423270" target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-brand-red/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5 text-brand-red" />
                  <span className="font-bold">WhatsApp</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://github.com/QRTQuick" target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-brand-red/10 transition-colors group sm:col-span-2">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faGithub} className="w-5 h-5 text-brand-red" />
                  <span className="font-bold">GitHub Organization</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
