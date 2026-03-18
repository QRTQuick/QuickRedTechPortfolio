export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  githubUrl: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "stackcheckmate",
    name: "StackCheckMate",
    description: "Universal environment automation tool. Automate virtual environments, dependency pinning, and reproducible builds across all languages.",
    tech: ["Go", "YAML", "CLI"],
    githubUrl: "https://github.com/QRTQuick/stackcheckmate",
    featured: true
  },
  {
    id: "d-red-bot",
    name: "D-Red-Bot",
    description: "Windows-native system utility for low-level diagnostics, memory intelligence, and automated maintenance tasks.",
    tech: ["C++", "Win32 API"],
    githubUrl: "https://github.com/QRTQuick/D-Red-Bot"
  },
  {
    id: "shinpuru-sachi",
    name: "Shinpuru-Sachi",
    description: "Lightweight terminal browser for fast web searches, link previews, and bookmarks directly from the command line.",
    tech: ["Python", "TUI"],
    githubUrl: "https://github.com/QRTQuick/Shinpuru-Sachi"
  }
];
