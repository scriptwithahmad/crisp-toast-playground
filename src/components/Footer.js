const Footer = () => (
  <footer className="px-6 py-12 border-t border-border bg-muted/20">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex flex-col items-center md:items-start gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">C</div>
          <span className="font-bold tracking-tight">Crisp Toast</span>
        </div>
        <p className="text-xs text-muted-foreground font-medium">Distributed under MIT License. &copy; 2026</p>
      </div>

      <div className="flex gap-8 text-xs font-bold text-muted-foreground uppercase tracking-widest">
        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
        <a href="#playground" className="hover:text-foreground transition-colors">Playground</a>
        <a href="#guide" className="hover:text-foreground transition-colors">Guide</a>
        <a href="https://github.com" className="hover:text-foreground transition-colors">GitHub</a>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground cursor-help" title="System Status: Fully Operational">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Operational</span>
      </div>
    </div>
  </footer>
)

export default Footer
