import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">
      
      {/* ACTIVE SESSIONS */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.03] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 shadow-md">
            <UsersIcon className="w-6 h-6 text-white" />
          </div>

          <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            ● Live
          </span>
        </div>

        <div className="text-4xl font-extrabold text-white mb-1">
          {activeSessionsCount}
        </div>

        <div className="text-sm text-gray-400">
          Active Sessions
        </div>
      </div>

      {/* TOTAL SESSIONS */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:border-cyan-500/40 transition-all duration-300 hover:scale-[1.03] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-md">
            <TrophyIcon className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="text-4xl font-extrabold text-white mb-1">
          {recentSessionsCount}
        </div>

        <div className="text-sm text-gray-400">
          Total Sessions
        </div>
      </div>
    </div>
  );
}

export default StatsCards;