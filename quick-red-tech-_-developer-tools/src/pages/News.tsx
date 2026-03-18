import { motion } from "motion/react";
import { Newspaper, Zap, Calendar, Code2, Monitor, Layout, ArrowRight, Bell, CheckCircle2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback } from "react";

export default function News() {
  const [subscribed, setSubscribed] = useState(false);

  const handleStayUpdated = useCallback(async () => {
    // 1. Notification Permission
    if ("Notification" in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          new Notification("Quick Red Tech", {
            body: "Notifications enabled! We'll alert you when Luvon-Sachi launches.",
          });
        }
      } catch (err) {
        console.error("Notification permission error:", err);
      }
    }

    // 2. Calendar Event Generation (ICS)
    const event = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Quick Red Tech//Luvon-Sachi//EN",
      "BEGIN:VEVENT",
      "UID:" + Date.now() + "@quickredtech.com",
      "DTSTAMP:20260318T112500Z",
      "DTSTART:20260529T090000Z",
      "DTEND:20260529T100000Z",
      "SUMMARY:Luvon-Sachi Launch - Quick Red Tech",
      "DESCRIPTION:Official launch of the Luvon-Sachi advanced project initialization tool. Built with C++ and Python.",
      "LOCATION:https://quickredtech.com",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([event], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "luvon-sachi-launch.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 5000);
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
              <Newspaper className="w-4 h-4 text-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-brand-red">Development Log</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 uppercase">
              Latest <span className="text-brand-red">News</span>
            </h1>
            <p className="text-xl text-brand-silver/60 max-w-2xl">
              Updates directly from the Quick Red Tech engineering floor. New tools, major milestones, and future promises.
            </p>
          </motion.div>
        </div>

        {/* Featured News: Luvon-Sachi */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="glass-card p-12 border-brand-red/30 bg-brand-red/5 relative overflow-hidden group mb-16"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap className="w-64 h-64 text-brand-red" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="px-4 py-1 bg-brand-red text-white text-xs font-bold tracking-widest uppercase rounded-full">
                Major Announcement
              </div>
              <div className="flex items-center gap-2 text-brand-silver/40 text-xs font-mono uppercase">
                <Calendar className="w-3 h-3" />
                March 18, 2026
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 group-hover:text-brand-red transition-colors text-white">
              INTRODUCING: LUVON-SACHI
            </h2>

            <p className="text-2xl text-brand-silver/80 leading-relaxed mb-12 max-w-4xl">
              The development team is proud to announce a new advanced software project currently in deep development. 
              <span className="text-white font-bold"> Luvon-Sachi</span> is engineered to revolutionize project initialization.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <Code2 className="w-6 h-6 text-brand-red" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">C++ CLI ENGINE</h4>
                    <p className="text-brand-silver/60">A high-performance command-line interface built with native C++ for maximum execution speed and system-level control.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <Monitor className="w-6 h-6 text-brand-red" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">PYTHON GUI</h4>
                    <p className="text-brand-silver/60">A modern, intuitive graphical interface powered by Python, ensuring ease of use without sacrificing power.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <Layout className="w-6 h-6 text-brand-red" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">INTELLIGENT STRUCTURE</h4>
                    <p className="text-brand-silver/60">Automatically generates optimized project file structures based on the specific files and technologies you choose.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-red/20 rounded-xl">
                    <Zap className="w-6 h-6 text-brand-red" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-brand-red">THE PROMISE</h4>
                    <p className="text-brand-silver/60">We are committed to delivering this tool by <span className="text-white font-bold">May 29, 2026</span>. However, given our current development velocity, we promise that <span className="text-brand-red font-bold">Luvon-Sachi might be ready even before this release date</span>.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-brand-red rounded-full animate-pulse" />
                <span className="text-sm font-mono text-brand-silver/40 uppercase tracking-widest">Status: Under Active Development</span>
              </div>
              <button 
                onClick={handleStayUpdated}
                className={`btn-primary flex items-center gap-3 ${subscribed ? 'bg-emerald-600 border-emerald-500 hover:bg-emerald-600' : ''}`}
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    CALENDAR UPDATED
                  </>
                ) : (
                  <>
                    <Bell className="w-5 h-5" />
                    STAY UPDATED
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Other News Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Shinpuru Sachi: Performance Overhaul",
              date: "March 15, 2026",
              excerpt: "Major updates have been pushed to the Shinpuru Sachi core. We've achieved significant performance gains in file processing and indexing."
            },
            {
              title: "StackCheckMate v2.0 Roadmap",
              date: "March 10, 2026",
              excerpt: "We're planning a major overhaul of our environment automation tool with better support for containerized workflows. Stay tuned for the full roadmap."
            },
            {
              title: "Internal Performance Audit",
              date: "March 05, 2026",
              excerpt: "Our latest audit shows a 15% reduction in memory overhead across all our CLI utilities, ensuring smoother operation on low-resource systems."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 group hover:border-brand-red/50 transition-all"
            >
              <div className="flex items-center gap-2 text-brand-silver/40 text-xs font-mono uppercase mb-4">
                <Calendar className="w-3 h-3" />
                {item.date}
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-red transition-colors uppercase tracking-tighter">{item.title}</h3>
              <p className="text-brand-silver/60 mb-6">{item.excerpt}</p>
              <div className="text-brand-red text-sm font-bold flex items-center gap-2 cursor-pointer hover:gap-4 transition-all">
                READ MORE <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
