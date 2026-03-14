import { Github, Sparkles } from "lucide-react"

const Banner = () => {
    return (
         <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[3rem] p-14 text-center isolate
    bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600
    shadow-[0_50px_120px_-20px_rgba(0,0,0,0.6)]">

      {/* glow background */}
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-cyan-400/30 blur-[140px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-fuchsia-500/30 blur-[140px] rounded-full" />

      {/* overlay for readability */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex flex-col items-center gap-4">

        {/* badge */}
        <div className="px-4 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-sm font-medium text-white">
          🚀 Production Ready Toast Library
        </div>

        {/* heading */}
        <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Ready to launch?
        </h3>

        {/* description */}
        <p className="text-white/90 max-w-xl text-lg leading-relaxed">
          Join <span className="font-semibold">10,000+ developers</span> building
          fast, elegant notification systems with <span className="font-semibold">Crisp Toast</span>.
        </p>

        {/* buttons */}
        <div className="flex flex-wrap justify-center gap-4">

          <a
            href="#playground"
            className="h-14 px-10 rounded-2xl bg-white text-black font-bold
            inline-flex items-center gap-2 shadow-xl
            hover:scale-105 transition-all"
          >
            <Sparkles size={18} />
            Try Interactive Playground
          </a>

          <a
            href="https://github.com/scriptwithahmad/Crisp-Toast-2.0"
            target="_blank"
            rel="noreferrer"
            className="h-14 px-10 rounded-2xl bg-white/15 backdrop-blur-md
            border border-white/30 text-white font-semibold
            inline-flex items-center gap-2 hover:bg-white/25 transition-all"
          >
            <Github size={18} />
            View on GitHub
          </a>

        </div>

        {/* stats */}
        <div className="flex gap-10 pt-6 text-white/90">

          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">10K+</span>
            <span className="text-sm opacity-80">Developers</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">0 deps</span>
            <span className="text-sm opacity-80">Lightweight</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">2.6kB</span>
            <span className="text-sm opacity-80">Bundle Size</span>
          </div>

        </div>

      </div>
    </div>
    )
}

export default Banner