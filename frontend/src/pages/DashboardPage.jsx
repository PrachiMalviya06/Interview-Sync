import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSessions";

import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({
    problem: "",
    difficulty: "",
  });

  const createSessionMutation = useCreateSession();

  const { data: activeSessionsData, isLoading: loadingActiveSessions } =
    useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } =
    useMyRecentSessions();

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };

  const isUserInSession = (session) => {
    if (!session || !user?.id) return false;

    return (
      session.host?.clerkId === user.id ||
      session.participant?.clerkId === user.id
    );
  };

  return (
    <>
      <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
        <Navbar />

        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10 blur-3xl opacity-30 pointer-events-none" />

        {/* HERO */}
        <div className="relative z-10">
          <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />
        </div>

        {/* MAIN */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 space-y-12">

          {/* STATS */}
          <div className="max-w-3xl">
            <StatsCards
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={recentSessions.length}
            />
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-start">

            {/* LEFT */}
            <div className="lg:col-span-2">
              <ActiveSessions
                sessions={activeSessions}
                isLoading={loadingActiveSessions}
                isUserInSession={isUserInSession}
              />
            </div>

            {/* RIGHT */}
            <div>
              <RecentSessions
                sessions={recentSessions}
                isLoading={loadingRecentSessions}
              />
            </div>

          </div>
        </div>

        {/* FLOAT BUTTON */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="fixed bottom-6 right-6 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 shadow-lg hover:scale-105 transition z-50"
        >
          + Create
        </button>
      </div>

      {/* MODAL */}
      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashboardPage;