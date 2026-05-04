import { Link } from "react-router";
import {
  ArrowRightIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

function HomePage() {
  return (
    <div className="bg-[#020617] text-white min-h-screen">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500">
              <SparklesIcon className="text-white size-5" />
            </div>

            <div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                NexMeet AI
              </span>
              <p className="text-xs text-gray-400 -mt-1">
                Code • Collaborate • Grow
              </p>
            </div>
          </Link>

          <SignInButton mode="modal">
            <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-105 transition">
              Get Started →
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div className="space-y-6">

          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-sm">
            ⚡ Real-time Coding Collaboration
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Code Together,
            </span>
            <br />
            Crack Interviews
          </h1>

          <p className="text-gray-400 text-lg max-w-lg">
            Live coding sessions with real people. Practice, learn, and ace your technical interviews with confidence.
          </p>

          {/* CTA */}
          <div className="flex gap-4">
            <SignInButton mode="modal">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center gap-2 hover:scale-105 transition">
                Start Coding Now
                <ArrowRightIcon className="size-4" />
              </button>
            </SignInButton>

            <button className="px-6 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/10 transition flex items-center gap-2">
              <VideoIcon className="size-4" />
              Watch Demo
            </button>
          </div>

          {/* FEATURES */}
          <div className="flex gap-6 text-sm text-gray-400 pt-4">
            <span>🎥 Live Video</span>
            <span>💻 Code Editor</span>
            <span>👥 2-Person Rooms</span>
          </div>

          {/* STATS */}
          <div className="flex gap-10 pt-6">
            <div>
              <p className="text-xl font-bold">10K+</p>
              <p className="text-xs text-gray-400">Active Users</p>
            </div>

            <div>
              <p className="text-xl font-bold">50K+</p>
              <p className="text-xs text-gray-400">Sessions</p>
            </div>

            <div>
              <p className="text-xl font-bold">99.9%</p>
              <p className="text-xs text-gray-400">Uptime</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE UI MOCKUP */}
        <div className="relative">

          {/* Glow */}
          <div className="absolute -inset-10 bg-gradient-to-r from-purple-600/30 to-cyan-500/30 blur-3xl opacity-30" />

          {/* Card */}
          <div className="relative bg-[#0f172a] border border-white/10 rounded-2xl p-4 shadow-2xl">

            <div className="text-xs text-gray-400 mb-3 flex justify-between">
              <span>Two Sum Problem</span>
              <span className="text-green-400">● Live</span>
            </div>

            <div className="grid grid-cols-3 gap-4">

              {/* Video */}
              <div className="space-y-3">
                <div className="bg-black/40 h-20 rounded-lg flex items-center justify-center text-xs">
                  👤 User 1
                </div>
                <div className="bg-black/40 h-20 rounded-lg flex items-center justify-center text-xs">
                  👤 User 2
                </div>
              </div>

              {/* Code */}
              <div className="col-span-2 bg-black/40 rounded-lg p-3 text-xs text-green-400 font-mono">
{`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(nums[i], i);
  }
}`}
              </div>

            </div>

            <div className="flex justify-between mt-3 text-xs text-gray-400">
              <span>✔ All test cases passed</span>
              <button className="px-3 py-1 bg-purple-600 rounded text-white">
                Run Code
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to <span className="text-purple-400">Succeed</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <VideoIcon className="mb-4 text-purple-400" />
            <h3 className="font-semibold mb-2">HD Video Calls</h3>
            <p className="text-sm text-gray-400">
              Crystal clear interviews with real-time discussion.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <Code2Icon className="mb-4 text-cyan-400" />
            <h3 className="font-semibold mb-2">Live Code Editor</h3>
            <p className="text-sm text-gray-400">
              Collaborate with instant code sync.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <UsersIcon className="mb-4 text-purple-400" />
            <h3 className="font-semibold mb-2">Secure Sessions</h3>
            <p className="text-sm text-gray-400">
              Private and safe coding environment.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;