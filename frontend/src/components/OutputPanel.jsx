function OutputPanel({ output }) {
  return (
    <div className="h-full flex flex-col bg-black">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/50 border-b border-white/10 text-xs">

        <div className="flex items-center gap-2">
          {/* terminal dots */}
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
          <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />

          <span className="ml-2 text-gray-400">Terminal</span>
        </div>

        <span className="text-gray-500">Output</span>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-auto p-4 text-sm font-mono text-green-400">

        {output === null ? (
          <p className="text-gray-500">
            ▶ Run your code to see output...
          </p>

        ) : output.success ? (
          <pre className="whitespace-pre-wrap">
            {output.output}
          </pre>

        ) : (
          <div className="space-y-2">

            {output.output && (
              <pre className="text-gray-300 whitespace-pre-wrap">
                {output.output}
              </pre>
            )}

            <pre className="text-red-400 whitespace-pre-wrap">
              {output.error}
            </pre>

          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;