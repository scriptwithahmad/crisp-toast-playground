import { toast } from 'crisp-toast'
import {
  Terminal,
  BookOpen,
  Rocket,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import CodeBlock from './CodeBlock'

const Hero = () => {
  const triggerToast = (type) => {
    const title = type.charAt(0).toUpperCase() + type.slice(1) + ' Notification'
    const description = 'Bringing premium feedback to your app.'
    switch (type) {
      case 'success': toast.success({ title, description }); break
      case 'error':   toast.error({ title, description });   break
      case 'warning': toast.warning({ title, description }); break
      case 'info':    toast.info({ title, description });    break
      case 'loading': {
        const p = new Promise(resolve => setTimeout(resolve, 2000))
        toast.promise(p, { loading: 'Processing...', success: 'Done!', error: 'Failed' })
        break
      }
      default: toast({ title: 'Default Notification', description })
    }
  }

  return (
    <section className="relative px-6 pt-32 pb-24 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="grid-pattern" />
      <div className="radial-glow w-[800px] h-[400px] translate-y-[-50%] opacity-50" />

      <div className="flex flex-col items-center gap-8 max-w-4xl text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase animate-in fade-in slide-in-from-bottom-3">
          <Rocket size={12} /> v1.0.3 Stable Release
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.95] inline-block animate-in fade-in slide-in-from-bottom-5 duration-700">
          <span className="text-gradient">Crisp Toast</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-7 duration-1000">
          A lightweight, beautiful, and fully customizable toast notification library.
          Zero dependencies. Tiny bundle size. Developer focused.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <a href="#playground" className="btn btn-primary h-12 px-8 rounded-xl font-bold gap-2 group">
            <Sparkles size={16} /> Open Playground <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#guide" className="btn btn-outline h-12 px-8 rounded-xl font-bold gap-2">
            <BookOpen size={16} /> Documentation
          </a>
        </div>

        <div className="w-full max-w-xl p-4 sm:p-6 glass rounded-2xl border border-border shadow-xl animate-in zoom-in-95 duration-1000">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">
            <Terminal size={14} className="text-primary" /> Quick Preview
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { type: 'success', icon: CheckCircle2, cls: 'hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/50' },
              { type: 'error', icon: XCircle },
              { type: 'warning', icon: AlertTriangle, cls: 'hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-500/50' },
              { type: 'info', icon: Info, cls: 'hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/50' },
              { type: 'loading', icon: Loader2, cls: 'hover:bg-violet-500/10 hover:text-violet-500 hover:border-violet-500/50' },
            ].map(({ type, icon: Icon, cls }) => (
              <button key={type} onClick={() => triggerToast(type)}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-border bg-background transition-all active:scale-90 ${cls}`}>
                <Icon size={20} className={type === 'loading' ? 'animate-spin' : ''} />
                <span className="text-[10px] uppercase font-bold tracking-wider">{type}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-md w-full animate-in fade-in slide-in-from-top-4 duration-1000 delay-500">
          <CodeBlock code="npm install crisp-toast" />
        </div>
      </div>
    </section>
  )
}

export default Hero
