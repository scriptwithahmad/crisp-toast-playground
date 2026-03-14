import { Github, Sparkles } from 'lucide-react'
import CodeBlock from './CodeBlock'

const GuideSection = () => (
  <section id="guide" className="px-6 py-24">
    <div className="max-w-3xl mx-auto flex flex-col gap-16">
      <div className="text-center flex flex-col gap-4">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Get Started.</h2>
        <p className="text-muted-foreground text-lg">Integrated in seconds, ready for production.</p>
      </div>

      <div className="flex flex-col gap-12">
        {[
          {
            step: 1, title: 'Install Dependencies',
            desc: 'Run this in your project root to fetch the package.',
            code: 'npm install crisp-toast'
          },
          {
            step: 2, title: 'Import & Configure',
            desc: 'Import the toast function and the global stylesheet.',
            code: `import { toast } from "crisp-toast"\nimport "crisp-toast/style.css"`
          },
          {
            step: 3, title: 'Universal Usage',
            desc: 'Trigger notifications from anywhere in your application.',
            code: `// Simple toast\ntoast("Hello World")\n\n// Featured toast\ntoast.success({\n  title: "Success",\n  description: "Changes applied!",\n  progressBar: true\n})`
          }
        ].map(({ step, title, desc, code }) => (
          <div key={step} className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">{step}</div>
              <h3 className="font-bold text-xl tracking-tight">{title}</h3>
            </div>
            <p className="text-muted-foreground pl-12 -mt-4">{desc}</p>
            <div className="pl-12"><CodeBlock code={code} /></div>
          </div>
        ))}
      </div>

      <div className="p-10 rounded-[2.5rem] bg-primary text-primary-foreground text-center relative overflow-hidden isolate shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        <div className="flex flex-col items-center gap-6 relative z-10">
          <h3 className="text-3xl font-bold tracking-tight">Ready to launch?</h3>
          <p className="opacity-90 max-w-md mx-auto leading-relaxed">Join 10,000+ developers building faster, cleaner notification systems.</p>
          <div className="flex gap-4">
            <a href="#playground" className="h-14 px-10 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-transform inline-flex items-center gap-2">
              <Sparkles size={16} /> Try Playground
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="h-14 px-10 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors hidden sm:inline-flex items-center gap-2">
              <Github size={16} /> View GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default GuideSection
