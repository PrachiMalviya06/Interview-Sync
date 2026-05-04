import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();

  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);
  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } =
    useStreamClient(session, loadingSession, isHost, isParticipant);

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(problemData?.starterCode?.javascript || "");

  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;
    joinSessionMutation.mutate(id, { onSuccess: refetch });
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  useEffect(() => {
    if (!session || loadingSession) return;
    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession]);

  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problemData?.starterCode?.[lang] || "");
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (confirm("End session?")) {
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  return (
    <div className="h-screen bg-[#020617] text-white flex flex-col">
      <Navbar />

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-5 py-2 bg-black/40 border-b border-white/10 text-sm">
        <span className="text-purple-400 font-semibold">
          {session?.problem || "Loading..."}
        </span>

        {isHost && (
          <button
            onClick={handleEndSession}
            className="px-3 py-1.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center gap-2"
          >
            <LogOutIcon className="w-4 h-4" />
            End
          </button>
        )}
      </div>

      <div className="flex-1">
        <PanelGroup direction="horizontal">

          {/* LEFT */}
          <Panel defaultSize={50}>
            <PanelGroup direction="vertical">

              {/* PROBLEM */}
              <Panel defaultSize={50}>
                <div className="h-full bg-[#0f172a] border-r border-white/10 overflow-auto p-5">

                  <h1 className="text-2xl font-bold mb-2">
                    {session?.problem}
                  </h1>

                  <p className="text-gray-400 text-sm mb-4">
                    {problemData?.category}
                  </p>

                  <div className="space-y-4 text-sm text-gray-300">
                    <p>{problemData?.description?.text}</p>
                  </div>

                </div>
              </Panel>

              <PanelResizeHandle className="h-1 bg-white/10 hover:bg-purple-500" />

              {/* EDITOR + OUTPUT */}
              <Panel defaultSize={50}>
                <PanelGroup direction="vertical">

                  <Panel defaultSize={70}>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={setCode}
                      onRunCode={handleRunCode}
                    />
                  </Panel>

                  <PanelResizeHandle className="h-1 bg-white/10 hover:bg-purple-500" />

                  <Panel defaultSize={30}>
                    <div className="bg-black text-green-400 p-3 text-xs font-mono h-full">
                      <OutputPanel output={output} />
                    </div>
                  </Panel>

                </PanelGroup>
              </Panel>

            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-1 bg-white/10 hover:bg-purple-500" />

          {/* RIGHT (VIDEO) */}
          <Panel defaultSize={50}>
            <div className="h-full bg-black/30 flex items-center justify-center">

              {isInitializingCall ? (
                <Loader2Icon className="w-10 h-10 animate-spin text-purple-400" />
              ) : !streamClient || !call ? (
                <div className="text-center">
                  <PhoneOffIcon className="w-12 h-12 text-red-400 mx-auto mb-2" />
                  <p>Connection Failed</p>
                </div>
              ) : (
                <StreamVideo client={streamClient}>
                  <StreamCall call={call}>
                    <VideoCallUI chatClient={chatClient} channel={channel} />
                  </StreamCall>
                </StreamVideo>
              )}

            </div>
          </Panel>

        </PanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;