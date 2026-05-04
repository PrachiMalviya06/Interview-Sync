import { Link } from "react-router";
import Navbar from "../components/Navbar";
import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon } from "lucide-react";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);

  const easy = problems.filter((p) => p.difficulty === "Easy").length;
  const medium = problems.filter((p) => p.difficulty === "Medium").length;
  const hard = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">
            Practice Problems
          </h1>
          <p className="text-gray-400">
            Level up your DSA with real interview questions
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xl font-bold">{problems.length}</p>
            <p className="text-xs text-gray-400">Total</p>
          </div>

          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-xl font-bold text-green-400">{easy}</p>
            <p className="text-xs text-gray-400">Easy</p>
          </div>

          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-xl font-bold text-yellow-400">{medium}</p>
            <p className="text-xs text-gray-400">Medium</p>
          </div>

          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-xl font-bold text-red-400">{hard}</p>
            <p className="text-xs text-gray-400">Hard</p>
          </div>

        </div>

        {/* LIST */}
        <div className="space-y-4">

          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="block p-5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 transition"
            >
              <div className="flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center">
                    <Code2Icon className="text-white size-5" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">
                      {problem.title}
                    </h2>

                    <p className="text-xs text-gray-400">
                      {problem.category}
                    </p>

                    <span
                      className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                        problem.difficulty === "Easy"
                          ? "bg-green-500/20 text-green-400"
                          : problem.difficulty === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2 text-gray-400 group-hover:text-white transition">
                  <span className="text-sm">Solve</span>
                  <ChevronRightIcon className="size-4 group-hover:translate-x-1 transition" />
                </div>

              </div>
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;