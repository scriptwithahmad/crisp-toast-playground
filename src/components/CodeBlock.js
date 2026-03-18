import { toast } from 'crisp-toast'
import { Copy, Check } from 'lucide-react'
import useClipboard from '../hooks/useClipboard'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeBlock = ({ code, language = 'javascript' }) => {
  const [copied, copy] = useClipboard()

  return (
    <div className="relative group rounded-2xl border border-border bg-[#1d1e22] font-mono text-xs sm:text-sm overflow-hidden shadow-sm transition-all hover:border-primary/20">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-[#282a36]/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60 shadow-[0_0_8px_rgba(248,113,113,0.3)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60 shadow-[0_0_8px_rgba(251,191,36,0.3)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60 shadow-[0_0_8px_rgba(52,211,153,0.3)]" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">{language}</span>
        <button
          onClick={() => { copy(code); toast.success({ title: 'Copied!' }) }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/50 bg-background/5 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all text-[10px] font-bold uppercase tracking-wider active:scale-95"
        >
          {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-0 text-foreground/90 whitespace-pre-wrap overflow-x-auto selection:bg-primary/20">
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: 'var(--code-font-size, 0.85rem)',
            lineHeight: '1.6',
          }}
          codeTagProps={{
            style: {
              background: 'transparent',
              fontFamily: 'inherit',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeBlock
