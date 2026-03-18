import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Terminal, Zap, AlertCircle, Code2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/QRTQuick/repos")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch repos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/20 rounded-full mb-6">
              <Code2 className="w-4 h-4 text-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-brand-red">Live Repositories</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
              THE <span className="text-brand-red">ENGINEERING</span> STACK
            </h1>
            <p className="text-xl text-brand-silver/60 max-w-2xl">
              Real-time feed of our open-source projects directly from GitHub. High-performance tools, built for speed.
            </p>
          </motion.div>
        </div>

        {/* Major Update Notice for Shinpuru Sachi */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-16 p-8 glass-card border-brand-red/30 bg-brand-red/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="w-32 h-32 text-brand-red" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 bg-brand-red rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-red/20">
              <AlertCircle className="text-white w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 text-white">SHINPURU SACHI: MAJOR UPDATES IN PROGRESS</h2>
              <p className="text-brand-silver/70 max-w-3xl leading-relaxed">
                We are currently pushing major updates to <span className="text-brand-red font-bold">Shinpuru Sachi</span>. Expect significant performance improvements, a refined terminal UI, and enhanced search capabilities. The repository may undergo frequent changes during this period.
              </p>
              <div className="mt-6 flex gap-4">
                <a 
                  href="https://github.com/QRTQuick/Shinpuru-Sachi" 
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:gap-4 transition-all"
                >
                  FOLLOW DEVELOPMENT <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Repos Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-brand-red/20 border-t-brand-red rounded-full animate-spin mb-4" />
            <p className="text-brand-silver/40 font-mono text-sm uppercase tracking-widest">Fetching from GitHub...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo, index) => (
              <motion.div 
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}
                className="glass-card p-8 group hover:border-brand-red/50 hover:shadow-[0_0_40px_rgba(255,0,0,0.15)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-2 bg-white/5 rounded-lg">
                        <Terminal className="w-5 h-5 text-brand-red" />
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-brand-silver/40">
                        <Zap className="w-3 h-3 text-brand-red" />
                        {repo.language || "Native"}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-brand-red transition-colors">{repo.name}</h2>
                    <p className="text-brand-silver/60 text-sm leading-relaxed mb-8 line-clamp-3">
                      {repo.description || "No description provided for this high-performance utility."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-brand-red transition-colors"
                    >
                      VIEW ON GITHUB <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
                    </a>
                    <div className="flex items-center gap-1 text-xs font-mono text-brand-silver/60">
                      <FontAwesomeIcon icon={faStar} className="text-brand-red w-3 h-3" /> {repo.stargazers_count}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
