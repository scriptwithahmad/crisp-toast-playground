import { Github, Sparkles } from 'lucide-react'
import CodeBlock from './CodeBlock'
import Banner from './Banner'

const GuideSection = () => (
  <section id="guide" className="px-6 py-24 space-y-16">
    <div className="max-w-3xl mx-auto flex flex-col">
      <div className="text-center flex flex-col gap-4">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Get Started.</h2>
        <p className="text-muted-foreground text-lg">Integrated in seconds, ready for production.</p>
      </div>

      <div className="flex flex-col gap-0">
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

    </div>

    <Banner />

  </section>
)

export default GuideSection
