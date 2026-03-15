import React from 'react'
import { 
  Code2, 
  Layers, 
  Palette, 
  MousePointer2, 
  Maximize, 
  Timer, 
  Activity, 
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  ExternalLink
} from 'lucide-react'

const ApiReference = () => {
  const options = [
    {
      name: 'title',
      type: 'string',
      defaultValue: '""',
      description: 'The primary message text of the notification. Supports plain text and emojis.',
      tags: ['Required']
    },
    {
      name: 'description',
      type: 'string | ReactNode',
      defaultValue: 'undefined',
      description: 'Optional secondary text or custom JSX components to provide more context.',
      tags: ['Optional']
    },
    {
      name: 'variant',
      type: '"solid" | "bordered" | "flat"',
      defaultValue: '"solid"',
      description: 'Defines the visual style. Solid uses full background colors, bordered uses outlines, and flat uses subtle washes.',
      tags: ['Styling']
    },
    {
      name: 'color',
      type: 'string',
      defaultValue: '"default"',
      description: 'Semantic colors: default, primary, secondary, success, warning, danger. Can be overridden globally.',
      tags: ['Styling']
    },
    {
      name: 'placement',
      type: 'string',
      defaultValue: '"bottom-right"',
      description: 'Screen position: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right.',
      tags: ['Layout']
    },
    {
      name: 'radius',
      type: '"none" | "sm" | "md" | "lg" | "full"',
      defaultValue: '"md"',
      description: 'Controls the corner roundness of the toast container.',
      tags: ['Styling']
    },
    {
      name: 'duration',
      type: 'number',
      defaultValue: '3000',
      description: 'Time in milliseconds before the toast automatically dismisses itself.',
      tags: ['Behavior']
    },
    {
      name: 'progressBar',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether to display the animated countdown bar at the bottom of the toast.',
      tags: ['Dynamic']
    },
    {
      name: 'icon',
      type: 'boolean | ReactNode',
      defaultValue: 'true',
      description: 'Show/hide the default semantic icon or provide your own custom React component.',
      tags: ['Optional']
    },
    {
      name: 'action',
      type: '{ label: string, onClick: Fn }',
      defaultValue: 'undefined',
      description: 'Adds a call-to-action button inside the toast for immediate user interaction.',
      tags: ['Interactive']
    }
  ]

  return (
    <section id="api" className="relative px-6 py-32 bg-muted/20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col gap-24">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="flex flex-col gap-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                Full Specification
              </div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                API Reference.
              </h2>
              <p className="text-muted-foreground text-lgs font-medium max-w-xl">
                A technical deep-dive into every property and method. 
                Built to be flexible, typed, and incredibly easy to use.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4 p-5 rounded-[2rem] bg-background/50 border border-border backdrop-blur-md shadow-xl">
                  <div className="p-3 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <Code2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black tracking-tight">TypeScript First</h4>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">v1.0.3 Definitions Included</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Configuration Options - Table View */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary whitespace-nowrap">Interface: ToastOptions</h3>
              <div className="h-px w-full bg-gradient-to-r from-primary/20 to-transparent" />
            </div>

            <div className="relative group p-[1px] rounded-[2.5rem] bg-gradient-to-b from-border/50 via-border/10 to-border/50 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto bg-background/40 backdrop-blur-3xl rounded-[2.45rem] border border-white/5">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/30">
                      <th className="py-8 px-10 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Property</th>
                      <th className="py-8 px-8 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Type</th>
                      <th className="py-8 px-8 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Default</th>
                      <th className="py-8 px-10 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {options.map((opt, i) => (
                      <tr key={i} className="group/row hover:bg-primary/[0.02] transition-colors duration-300">
                        <td className="py-6 px-10 align-top">
                          <div className="flex flex-col gap-2">
                            <code className="text-primary font-black text-base tracking-tight group-hover/row:translate-x-1 transition-transform inline-block">
                              {opt.name}
                            </code>
                            <div className="flex gap-1">
                              {opt.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 rounded-md bg-primary/5 text-[8px] font-black uppercase tracking-tighter text-primary/60 border border-primary/10">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="py-8 px-8 align-top">
                          <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-orange-500/5 border border-orange-500/10 text-[10px] font-bold font-mono text-orange-500 whitespace-nowrap">
                            {opt.type}
                          </div>
                        </td>
                        <td className="py-8 px-8 align-top">
                          <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-muted/60 border border-border text-[10px] font-bold font-mono text-muted-foreground whitespace-nowrap">
                            {opt.defaultValue}
                          </div>
                        </td>
                        <td className="py-8 px-10 align-top">
                          <p className="text-sm text-muted-foreground leading-relaxed font-medium max-w-sm">
                            {opt.description}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Methods Section */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary whitespace-nowrap">Core Methods</h3>
              <div className="h-px w-full bg-gradient-to-r from-primary/20 to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'toast(opts)', desc: 'The architectural foundation for triggering generic notifications.', icon: Zap },
                { name: 'toast.success(opts)', desc: 'semantic helper for positive feedback and completion states.', icon: CheckCircle2 },
                { name: 'toast.error(opts)', desc: 'High-priority alerts for failures and critical system errors.', icon: XCircle },
                { name: 'toast.warning(opts)', desc: 'Attention-grabbing messages for potential issues.', icon: AlertTriangle },
                { name: 'toast.info(opts)', desc: 'Non-disruptive informational updates and news.', icon: Info },
                { name: 'toast.promise(p, msgs, ...) ', desc: 'The cleaner way to handle async request life-cycles.', icon: Activity },
              ].map((method, i) => (
                <div key={i} className="group relative p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                   <div className="absolute -z-10 bg-primary/5 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="flex flex-col gap-5">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                          <method.icon size={20} />
                        </div>
                        <code className="text-sm font-black text-foreground">{method.name}</code>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium leading-relaxed">{method.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 p-12 rounded-[4rem] bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-[80px]" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
              <div className="flex flex-col gap-4 text-center md:text-left max-w-lg">
                <h3 className="text-4xl font-black tracking-tight">Level up your UI.</h3>
                <p className="text-primary-foreground/80 font-medium text-lg">
                  Join hundreds of developers building premium experiences with Crisp Toast.
                </p>
              </div>
              <a href="https://github.com/scriptwithahmad/Crisp-Toast-2.0" target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center gap-3 px-10 py-5 bg-background text-foreground rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl hover:bg-white hover:text-black">
                Source Code <ExternalLink size={18} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ApiReference
