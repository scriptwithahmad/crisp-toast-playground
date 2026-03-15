import { toast } from 'crisp-toast'
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Info,
  Loader2,
  Rocket,
  Sparkles,
  Terminal,
  XCircle,
  Zap,
} from 'lucide-react'

const Hero = () => {
  const triggerToast = (type) => {
    const title = type.charAt(0).toUpperCase() + type.slice(1) + ' Notification'
    const description = 'Bringing premium feedback to your app.'
    switch (type) {
      case 'success': toast.success({ title, description, variant: 'flat', radius: 'lg' }); break
      case 'error':   toast.error({ title, description, variant: 'flat', radius: 'lg', color: 'danger' });   break
      case 'warning': toast.warning({ title, description, variant: 'flat', radius: 'lg' }); break
      case 'info':    toast.info({ title, description, variant: 'flat', radius: 'lg', color: 'primary' });    break
      case 'loading': {
        const p = new Promise(resolve => setTimeout(resolve, 2000))
        toast.promise(p, { 
          loading: 'Processing...', 
          success: 'Done!',
          error: 'Failed' 
        }, { variant: 'flat', radius: 'lg', description })
        break
      }
      default: toast({ title: 'Default Notification', description, variant: 'flat', radius: 'lg' })
    }
  }

  return (
    <section className="relative px-6 pt-16 pb-16 min-h-[95vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="grid-pattern opacity-[0.05] dark:opacity-[0.1]" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse duration-[10s]" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] -z-10 animate-pulse duration-[15s]" />
      <div className="radial-glow w-full h-full opacity-30" />

      <div className="flex flex-col items-center gap-6 max-w-5xl text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-tighter uppercase backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          v1.0.3 Stable Release
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tight leading-[0.85] inline-block animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 pb-2">
              Crisp Toast
            </span>
          </h1>
          <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
            Elevate your user experience with notifications that feel like part of your brand. 
            <span className="text-foreground font-semibold"> Lightweight. Fast. Beautiful.</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300 fill-mode-both">
          <a href="#playground" className="group relative px-8 h-14 flex items-center gap-3 bg-primary text-primary-foreground font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Sparkles size={20} className="text-primary-foreground/80 group-hover:rotate-12 transition-transform" />
            Open Playground 
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#guide" className="px-8 h-14 flex items-center gap-3 bg-secondary/50 hover:bg-secondary border border-border/50 text-foreground font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 backdrop-blur-sm">
            <BookOpen size={20} className="text-muted-foreground" /> 
            Documentation
          </a>
        </div>

        {/* Quick Preview Widget */}
        <div className="w-full max-w-2xl mt-8 animate-in zoom-in-95 duration-1000 delay-500 fill-mode-both">
          <div className="relative group p-[1px] rounded-[2.5rem] bg-gradient-to-b from-border/50 via-border/10 to-border/50 overflow-hidden shadow-2xl">
            <div className="relative bg-background/80 dark:bg-background/40 backdrop-blur-2xl rounded-[2.45rem] p-6 sm:p-10 border border-white/10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Terminal size={18} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold tracking-tight">Interactive Preview</h4>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Click to trigger a toast</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-border" />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { type: 'success', icon: CheckCircle2, color: 'emerald', cls: 'hover:border-emerald-500/50 hover:bg-emerald-500/[0.02]', iconCls: 'bg-emerald-500/10 text-emerald-500 group-hover/btn:bg-emerald-500/20' },
                  { type: 'error', icon: XCircle, color: 'red', cls: 'hover:border-red-500/50 hover:bg-red-500/[0.02]', iconCls: 'bg-red-500/10 text-red-500 group-hover/btn:bg-red-500/20' },
                  { type: 'warning', icon: AlertTriangle, color: 'amber', cls: 'hover:border-amber-500/50 hover:bg-amber-500/[0.02]', iconCls: 'bg-amber-500/10 text-amber-500 group-hover/btn:bg-amber-500/20' },
                  { type: 'info', icon: Info, color: 'blue', cls: 'hover:border-blue-500/50 hover:bg-blue-500/[0.02]', iconCls: 'bg-blue-500/10 text-blue-500 group-hover/btn:bg-blue-500/20' },
                  { type: 'loading', icon: Loader2, color: 'violet', cls: 'hover:border-violet-500/50 hover:bg-violet-500/[0.02]', iconCls: 'bg-violet-500/10 text-violet-500 group-hover/btn:bg-violet-500/20' },
                ].map(({ type, icon: Icon, cls, iconCls }) => (
                  <button 
                    key={type} 
                    onClick={() => triggerToast(type)}
                    className={`
                      relative group/btn flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-border/50 bg-background/50 transition-all 
                      hover:scale-105 active:scale-95 ${cls}
                    `}
                  >
                    <div className={`p-2.5 rounded-xl transition-colors ${iconCls}`}>
                      <Icon size={24} className={type === 'loading' ? 'animate-spin' : ''} />
                    </div>
                    <span className="text-[11px] uppercase font-black tracking-widest text-muted-foreground group-hover/btn:text-foreground transition-colors">
                      {type}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-10 px-4 py-3 rounded-2xl bg-muted/50 border border-border flex items-center justify-between group/code">
                <code className="text-sm font-mono text-muted-foreground group-hover/code:text-foreground transition-colors">
                  npm install <span className="text-primary font-bold">crisp-toast</span>
                </code>
                <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-background/50 px-2 py-1 rounded-lg border border-border italic">
                  <Zap size={10} className="text-amber-500 fill-amber-500" /> Ultra fast
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Pill */}
        <div className="mt-8 flex items-center gap-6 text-sm font-medium text-muted-foreground/60 animate-in fade-in duration-1000 delay-700">
           <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-primary/50" /> Fully Customizable
           </div>
           <div className="w-1 h-1 rounded-full bg-border" />
           <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-primary/50" /> Zero Dependencies
           </div>
           <div className="w-1 h-1 rounded-full bg-border" />
           <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-primary/50" /> Tiny Size
           </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
