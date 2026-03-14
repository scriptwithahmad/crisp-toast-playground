import { Github, Moon, Sun } from 'lucide-react'

const Navbar = ({ theme, setTheme }) => (
  <nav className="fixed top-0 inset-x-0 h-16 border-b border-border bg-background/80 backdrop-blur-lg z-50">
    <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
      <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-sm transition-transform group-hover:scale-110 group-hover:-rotate-6">
          <img className='w-5' src="/logo.png" alt="logo here" />
        </div>
        <span className="font-bold text-xl tracking-tight hidden sm:inline-block">Crisp Toast</span>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:inline-block">Features</a>
        <a href="#playground" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:inline-block">Playground</a>
        <a href="#guide" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:inline-block">Guide</a>
        <div className="h-4 w-[1px] bg-border mx-1 hidden md:inline-block" />
        <a href="https://github.com/scriptwithahmad/Crisp-Toast-2.0" target="_blank" rel="noreferrer" className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground">
          <Github size={20} />
        </a>
        <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground" aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button className="btn btn-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold sm:px-6">
          Get Started
        </button>
      </div>
    </div>
  </nav>
)

export default Navbar
