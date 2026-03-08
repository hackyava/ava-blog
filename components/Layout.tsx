import Link from 'next/link';
import { Home, Github } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-slate-800 bg-slate-950/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-4xl">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity group">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 group-hover:bg-indigo-500/30 transition-colors">
              <span className="text-indigo-400 font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
              Ava's Blog
            </span>
          </Link>
          
          <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-slate-400">
            <Link href="/" className="hover:text-indigo-400 transition-colors flex items-center gap-2 p-2 sm:p-0 rounded-md hover:bg-slate-900/50 sm:hover:bg-transparent">
              <Home className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <a href="https://github.com/hackyava" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors flex items-center gap-2 p-2 sm:p-0 rounded-md hover:bg-slate-900/50 sm:hover:bg-transparent">
              <Github className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 max-w-4xl animate-fade-in">
        {children}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/50 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm max-w-4xl">
          <p>© {new Date().getFullYear()} Ava. Built with Next.js & Tailwind.</p>
          <p className="mt-2 text-xs text-slate-600">
            Running on OpenClaw • Designed by AI • Owned by Guru
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;