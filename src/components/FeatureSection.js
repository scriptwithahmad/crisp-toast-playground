import { toast } from 'crisp-toast'
import {
  Cpu, Box, Zap, Palette, Activity, MousePointer2,
  CheckCircle2,
} from 'lucide-react'

// ─── Size Gauge ───────────────────────────────────────────────────────────────

const SizeGauge = ({ label, value, subValue, percentage }) => (
  <div className="flex flex-col gap-3 p-5 rounded-2xl border border-border bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all hover:scale-[1.02] group">
    <div className="flex justify-between items-end">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-2xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">{value}</span>
    </div>
    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }} />
    </div>
    <span className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">{subValue}</span>
  </div>
)

// ─── Feature Card ─────────────────────────────────────────────────────────────

const FeatureCard = ({ title, description, icon: Icon, demo }) => (
  <div className="card group p-6 flex flex-col gap-4 relative isolate bg-gradient-to-br from-card to-card/50">
    <div className="absolute -z-10 bg-primary/5 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    <div className="flex items-center gap-3">
      <div className="p-2.5 rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
        <Icon size={18} />
      </div>
      <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{description}</p>
    {demo && <div className="mt-2 pt-4 border-t border-border/50">{demo}</div>}
  </div>
)

// ─── Feature Section ──────────────────────────────────────────────────────────

const FeatureSection = () => {
  const features = [
    {
      title: 'Zero Dependencies', description: 'Built using pure TypeScript. No external dependency weight.', icon: Cpu,
      demo: <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-full w-fit"><CheckCircle2 size={12} /> Pure Vanilla</div>
    },
    {
      title: 'Tiny Bundle Size', description: '8.9kB minified. 2.6kB gzipped. Optimized for modern web performance.', icon: Box,
      demo: <SizeGauge label="Minified" value="8.9kB" percentage={30} subValue="Optimized" />
    },
    {
      title: 'Tree Shakeable', description: 'Include only the code you use. Full support for Vite and Webpack.', icon: Zap,
      demo: <div className="flex gap-2"><button className="btn btn-primary h-8 px-4 rounded-lg text-[10px] font-bold">VITE</button><button className="btn btn-secondary h-8 px-4 rounded-lg text-[10px] font-bold">NEXT.JS</button></div>
    },
    {
      title: 'Multiple Variants', description: 'Solid, Bordered, and Flat variants to match any design system.', icon: Palette,
      demo: <div className="flex gap-1.5">{['solid', 'bordered', 'flat'].map(v => (<button key={v} onClick={() => toast({ title: `${v.charAt(0).toUpperCase() + v.slice(1)} Variant`, variant: v })} className="flex-1 py-1 px-2 border border-border text-[9px] font-bold uppercase rounded-md hover:bg-muted transition-colors">{v}</button>))}</div>
    },
    {
      title: 'Progress Bars', description: 'Built-in progress bars that clearly communicate toast lifespan.', icon: Activity,
      demo: <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden relative"><div className="absolute inset-0 bg-primary animate-progress" /></div>
    },
    {
      title: 'Flexible Actions', description: 'Attach actions or custom JSX components to any notification.', icon: MousePointer2,
      demo: <div className="flex gap-2"><button onClick={() => toast({ title: 'File deleted', description: 'Click undo to restore it.', action: { label: 'Undo', onClick: () => {} } })} className="flex-1 py-1.5 bg-muted border border-border text-[9px] font-bold uppercase rounded-md hover:bg-primary/10 transition-colors">Preview Action</button></div>
    }
  ]

  return (
    <section id="features" className="px-6 py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">Core Capabilities</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Everything you need.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">A complete feature set designed for modern developer workflows.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
