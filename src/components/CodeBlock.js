import { toast } from 'crisp-toast'
import { Copy, Check } from 'lucide-react'
import useClipboard from '../hooks/useClipboard'

const CodeBlock = ({ code }) => {
  const [copied, copy] = useClipboard()

  return (
    <div className="relative group rounded-2xl border border-border bg-[hsl(var(--muted)/0.4)] font-mono text-xs sm:text-sm overflow-hidden shadow-sm transition-all hover:border-primary/20">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-[hsl(var(--muted)/0.6)]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">javascript</span>
        <button
          onClick={() => { copy(code); toast.success({ title: 'Copied to clipboard!' }) }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-background/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all text-[10px] font-bold uppercase tracking-wider active:scale-95"
        >
          {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-foreground/90 whitespace-pre-wrap overflow-x-auto leading-relaxed selection:bg-primary/20">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default CodeBlock
