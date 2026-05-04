import { Code2, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl w-full">

      {/* HEADER */}
      <div className="p-5 border-b border-white/10">
        <h2 className="text-lg font-semibold">Recent Sessions</h2>
      </div>

      {/* BODY */}
      <div className="p-5 space-y-4">

        {isLoading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session._id}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              {/* ICON */}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <p className="font-medium text-sm">{session.problem}</p>

                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(session.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No recent sessions</p>
        )}

      </div>
    </div>
  );
}

export default RecentSessions;