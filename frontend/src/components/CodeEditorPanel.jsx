import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    <div className="h-full flex flex-col bg-[#0f172a]">

      {/* HEADER (VS CODE STYLE) */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/10">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* dots */}
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
            <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
          </div>

          {/* language */}
          <div className="flex items-center gap-2 ml-3">
            <img
              src={LANGUAGE_CONFIG[selectedLanguage].icon}
              alt="lang"
              className="w-4 h-4"
            />

            <select
              value={selectedLanguage}
              onChange={onLanguageChange}
              className="bg-transparent text-sm text-gray-300 outline-none cursor-pointer"
            >
              {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
                <option key={key} value={key}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* RIGHT */}
        <button
          onClick={onRunCode}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-105 transition"
        >
          {isRunning ? (
            <>
              <Loader2Icon className="w-4 h-4 animate-spin" />
              Running
            </>
          ) : (
            <>
              <PlayIcon className="w-4 h-4" />
              Run
            </>
          )}
        </button>
      </div>

      {/* EDITOR */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "Fira Code, monospace",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            padding: { top: 10 },
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;