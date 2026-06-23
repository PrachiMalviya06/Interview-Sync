import { Code2Icon, LoaderIcon, PlusIcon, XIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";





function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      
      {/* MODAL */}
      <div className="w-full max-w-2xl rounded-2xl bg-[#0b1120] border border-white/10 shadow-2xl p-6 relative">

        {/* CLOSE BTN */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <XIcon className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <h3 className="text-2xl font-extrabold text-white mb-6">
          Create New Session
        </h3>

        <div className="space-y-6">
          
          {/* PROBLEM SELECT */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Select Problem *
            </label>

            <select
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find(
                  (p) => p.title === e.target.value
                );

                setRoomConfig({
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                });
              }}
            >
              <option value="" disabled>
                Choose a coding problem...
              </option>

              {problems.map((problem) => (
                <option key={problem.id} value={problem.title}>
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* SUMMARY */}
          {roomConfig.problem && (
            <div className="rounded-xl bg-white/5 border border-green-500/30 p-4">
              <div className="flex items-start gap-3">
                <Code2Icon className="w-5 h-5 text-green-400 mt-1" />

                <div className="text-sm text-gray-300">
                  <p className="font-semibold text-white mb-1">
                    Room Summary
                  </p>
                  <p>
                    Problem:{" "}
                    <span className="font-medium text-purple-400">
                      {roomConfig.problem}
                    </span>
                  </p>
                  <p>
                    Participants:{" "}
                    <span className="font-medium text-cyan-400">
                      1-on-1 session
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold flex items-center gap-2 hover:scale-105 transition disabled:opacity-50"
          >
            {isCreating ? (
              <LoaderIcon className="w-5 h-5 animate-spin" />
            ) : (
              <PlusIcon className="w-5 h-5" />
            )}

            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSessionModal;