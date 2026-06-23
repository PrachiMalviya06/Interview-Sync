import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500">
            <ZapIcon className="size-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Live Sessions</h2>
        </div>

        <span className="text-sm text-gray-400">
          {sessions.length} active
        </span>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoaderIcon className="size-8 animate-spin text-purple-400" />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session._id}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4 flex-1">
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center">
                  <Code2Icon className="size-5 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{session.problem}</h3>

                    <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">
                      {session.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                    <div className="flex items-center gap-1">
                      <CrownIcon className="size-3" />
                      {session.host?.name}
                    </div>

                    <div className="flex items-center gap-1">
                      <UsersIcon className="size-3" />
                      {session.participant ? "2/2" : "1/2"}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/session/${session._id}`
                    );
                    alert("Invite Link Copied!");
                  }}
                  className="px-3 py-2 text-xs rounded-lg bg-green-600 hover:bg-green-700 text-white"
                >
                  Invite
                </button>

                {session.participant && !isUserInSession(session) ? (
                  <span className="text-xs px-3 py-1 rounded bg-red-500/20 text-red-400">
                    Full
                  </span>
                ) : (
                  <Link
                    to={`/session/${session._id}`}
                    className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-105 transition"
                  >
                    {isUserInSession(session) ? "Rejoin" : "Join"}
                    <ArrowRightIcon className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <SparklesIcon className="mx-auto mb-3 text-purple-400" />
            <p className="text-gray-400">No active sessions</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActiveSessions;