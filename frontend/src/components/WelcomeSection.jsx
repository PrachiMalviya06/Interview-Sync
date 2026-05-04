import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-cyan-900/30 blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* LEFT SIDE */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Welcome back, {user?.firstName || "Coder"} 👋
              </h1>
            </div>

            <p className="text-lg text-gray-400 ml-16 max-w-lg">
              Practice real-time coding interviews, collaborate, and improve faster with NexMeet AI.
            </p>
          </div>

          {/* RIGHT CTA */}
          <button
            onClick={onCreateSession}
            className="group px-7 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-lg shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <ZapIcon className="w-5 h-5" />
              <span>Create Session</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;