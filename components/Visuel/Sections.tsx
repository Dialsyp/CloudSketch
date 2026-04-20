import Link from "next/link";

export function HeaderSection() {
  return (
    <header
      className="h-12 shrink-0 flex items-center justify-between px-4
                         border-b border-white/5 bg-[#0d0d14] z-50"
    >
      {/* Left — Logo + breadcrumb */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-6 h-6 rounded-md bg-linear-to-br from-blue-500
                            to-violet-600 flex items-center justify-center
                            group-hover:opacity-80 transition-opacity"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 3h4v4H1zM7 5h4v4H7z" fill="white" />
            </svg>
          </div>
          <span
            className="text-sm font-semibold text-white/80
                             group-hover:text-white transition-colors"
          >
            CloudSketch
          </span>
        </Link>

        <span className="text-white/20">/</span>

        {/* File name editable-looking */}
        <div
          className="flex items-center gap-1.5 px-2 py-1 rounded-md
                          hover:bg-white/5 cursor-pointer transition-colors group"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="text-white/30"
          >
            <path
              d="M2 1h5l3 3v7H2V1z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path d="M7 1v3h3" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span
            className="text-sm text-white/50 group-hover:text-white/70
                             transition-colors font-mono"
          >
            main.tf
          </span>
        </div>
      </div>

      {/* Center — Status */}
      <div className="hidden md:flex items-center gap-1.5 text-xs text-white/30">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        Auto-saved
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2">
        {/* Undo / Redo */}
        <div
          className="hidden sm:flex items-center border border-white/5
                          rounded-lg overflow-hidden"
        >
          <button
            className="px-2.5 py-1.5 text-white/40 hover:text-white
                               hover:bg-white/5 transition-all text-xs"
          >
            ↩
          </button>
          <div className="w-px h-4 bg-white/5" />
          <button
            className="px-2.5 py-1.5 text-white/40 hover:text-white
                               hover:bg-white/5 transition-all text-xs"
          >
            ↪
          </button>
        </div>

        {/* Share */}
        <button
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5
                             rounded-lg border border-white/10 bg-white/5
                             text-white/60 hover:text-white hover:bg-white/10
                             transition-all text-xs font-medium"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle
              cx="9"
              cy="2"
              r="1.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle
              cx="9"
              cy="10"
              r="1.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle
              cx="3"
              cy="6"
              r="1.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M7.5 2.8L4.5 5.2M7.5 9.2L4.5 6.8"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          Share
        </button>

        {/* Export */}
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                             bg-white text-black font-medium text-xs
                             hover:bg-white/90 transition-all"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1v7M3 5l3 3 3-3M2 10h8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Export
        </button>

        {/* Avatar */}
        <div
          className="w-7 h-7 rounded-full bg-linear-to-br from-blue-500
                          to-violet-600 flex items-center justify-center
                          text-xs font-semibold cursor-pointer ml-1"
        >
          JD
        </div>
      </div>
    </header>
  );
}
