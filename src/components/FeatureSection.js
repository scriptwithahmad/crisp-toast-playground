import React, { useRef } from 'react'
import { toast } from 'crisp-toast'
import {
  Cpu, Box, Zap, Palette, Activity, MousePointer2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

// ─── Size Gauge ───────────────────────────────────────────────────────────────

const SizeGauge = ({ label, value, subValue, percentage }) => (
  <div className="flex flex-col gap-3 p-5 rounded-2xl border border-border/50 bg-background/30 backdrop-blur-sm transition-all group-hover:bg-background/50">
    <div className="flex justify-between items-end">
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
      <span className="text-2xl font-black tracking-tight text-foreground">{value}</span>
    </div>
    <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden p-0.5">
      <div className="h-full bg-gradient-to-r from-primary/40 via-primary to-primary/40 bg-[length:200%_auto] animate-gradient-move rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }} />
    </div>
    <div className="flex items-center gap-2">
       <Sparkles size={10} className="text-primary animate-pulse" />
       <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{subValue}</span>
    </div>
  </div>
)

// ─── Feature Card ─────────────────────────────────────────────────────────────

const FeatureCard = ({ title, description, icon: Icon, demo, color = "primary" }) => {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--x', `${x}px`)
    cardRef.current.style.setProperty('--y', `${y}px`)
  }

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="card group p-8 flex flex-col gap-5 relative isolate overflow-hidden bg-background/50 dark:bg-background/20 backdrop-blur-md rounded-[2.5rem] border border-border/50 hover:border-primary/30 transition-all duration-500"
    >
      {/* Spotlight Effect */}
      <div className="absolute -z-10 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--x,50%)_var(--y,50%),rgba(var(--primary-rgb),0.08)_0%,transparent_80%)]" 
             style={{ '--primary-rgb': 'var(--primary)' }} />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="p-3.5 rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.2)]">
          <Icon size={24} />
        </div>
        <h3 className="font-bold text-xl tracking-tight">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed flex-grow font-medium">{description}</p>
      {demo && (
        <div className="mt-4 p-4 rounded-3xl bg-muted/20 border border-border/30 backdrop-blur-sm transition-all duration-500 group-hover:bg-muted/30">
          {demo}
        </div>
      )}
    </div>
  )
}

// ─── Feature Section ──────────────────────────────────────────────────────────

const FeatureSection = () => {
  const features = [
    {
      title: 'Zero Dependencies', 
      description: 'Engineered for speed. Built with pure vanilla logic to ensure the fastest possible integration.', 
      icon: Cpu,
      demo: (
        <div className="flex items-center gap-3 text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-2xl w-fit border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <CheckCircle2 size={14} className="animate-pulse" /> Production Ready
        </div>
      )
    },
    {
      title: 'Tiny Bundle Size', 
      description: 'Microscopic footprint. We optimized every byte so your users never feel the weight.', 
      icon: Box,
      demo: <SizeGauge label="Minified & Gzipped" value="2.6kB" percentage={15} subValue="Best in class" />
    },
    {
      title: 'Tree Shakeable', 
      description: 'Modern architecture that plays nice with Vite, Webpack, and Rollup out of the box.', 
      icon: Zap,
      demo: (
        <div className="flex gap-2">
          {['VITE', 'NEXT.JS', 'TURBOPACK'].map(tech => (
            <div key={tech} className="flex-1 py-2 text-center rounded-xl bg-background/50 border border-border shadow-sm text-[10px] font-black tracking-widest text-muted-foreground">
              {tech}
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Multiple Variants', 
      description: 'Beautiful by default. Choose between Solid, Bordered, or Flat to match your UI perfectly.', 
      icon: Palette,
      demo: (
        <div className="flex gap-2">
          {['solid', 'bordered', 'flat'].map(v => (
            <button 
              key={v} 
              onClick={() => toast({ title: `${v.charAt(0).toUpperCase() + v.slice(1)} Variant`, variant: v })} 
              className="flex-1 py-2 bg-background hover:bg-muted border border-border text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-sm"
            >
              {v}
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'Dynamic Progress', 
      description: 'Interactive countdowns that keep users informed about the notification lifespan.', 
      icon: Activity,
      demo: (
        <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden relative p-0.5">
          <div className="absolute inset-0.5 bg-primary rounded-full animate-progress" />
        </div>
      )
    },
    {
      title: 'Custom Logic', 
      description: 'Fully extensible actions and custom JSX support. Your toasts, your rules.', 
      icon: MousePointer2,
      demo: (
        <button 
          onClick={() => toast({ 
            title: 'Action Triggered', 
            description: 'This is a custom action demo.', 
            action: { label: 'Explore', onClick: () => alert('Hello!') } 
          })} 
          className="w-full py-2.5 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-[0_8px_20px_rgba(var(--primary),0.3)] transition-all active:scale-95"
        >
          Try Custom Action
        </button>
      )
    }
  ]

  return (
    <section id="features" className="relative px-6 py-32 bg-background overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-20 relative z-10">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            The Blueprint
          </div>
          <h2 className="text-5xl sm:text-6xl font-black tracking-tight leading-tight">
            Built for <span className="text-primary italic">performance</span>. <br />
            Designed for <span className="text-primary">humans</span>.
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl font-medium">
            Every feature is meticulously crafted to provide the best developer experience 
            without compromising on end-user delight.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
