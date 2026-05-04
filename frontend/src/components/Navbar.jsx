import { Link, useLocation } from "react-router";
import {
  BookOpenIcon,
  LayoutDashboardIcon,
  SparklesIcon,
} from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b1120]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 shadow-lg group-hover:scale-110 transition">
            <SparklesIcon className="text-white size-5" />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-wide">
              NexMeet AI
            </span>
            <span className="text-xs text-gray-400 -mt-1">
              Smart Interview Hub
            </span>
          </div>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-2">
          
          {/* PROBLEMS */}
          <Link
            to="/problems"
            className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all
              ${
                isActive("/problems")
                  ? "bg-white/10 text-purple-400 border border-purple-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            <BookOpenIcon className="size-4" />
            <span className="hidden sm:inline">Problems</span>
          </Link>

          {/* DASHBOARD */}
          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all
              ${
                isActive("/dashboard")
                  ? "bg-white/10 text-cyan-400 border border-cyan-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            <LayoutDashboardIcon className="size-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          {/* USER */}
          <div className="ml-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;