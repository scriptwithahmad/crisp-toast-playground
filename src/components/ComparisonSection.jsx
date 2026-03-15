import { toast } from 'crisp-toast';
import { Award, Flame, Package, ShieldAlert, ShieldCheck, Zap } from 'lucide-react';

const ComparisonSection = () => {
  const data = [
    { name: 'React Toastify', size: '16.4kB', dep: 'React', provider: true, feel: 'Heavy' },
    { name: 'React Hot Toast', size: '5.2kB', dep: 'React', provider: true, feel: 'Medium' },
    { name: 'Sonner', size: '3.1kB', dep: 'React', provider: true, feel: 'Modern' },
    { name: 'Crisp Toast', size: '2.6kB', dep: 'None', provider: false, feel: 'Elite', highlight: true },
  ];

  const testToast = () => {
    toast.success({
      title: "The Lightweight Winner!",
      description: "2.6kB of pure performance. Zero dependencies. Zero providers.",
      variant: 'flat',
      radius: 'lg',
      color: 'success',
      progressBar: true
    });
  };

  return (
    <section className="px-6 py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-bold tracking-widest uppercase">
            <Award size={12} /> Market Comparison
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gradient">Why settle for less?</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Crisp Toast is engineered for speed and simplicity. No context providers, no heavy bundles.
          </p>
        </div>

        <div className="glass rounded-[2rem] border border-border/50 overflow-hidden shadow-2xl transition-all hover:border-primary/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="py-6 px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Library</th>
                  <th className="py-6 px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-center">Gzip Size</th>
                  <th className="py-6 px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Dependency</th>
                  <th className="py-6 px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right">No Provider?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {data.map((item) => (
                  <tr 
                    key={item.name} 
                    className={`group transition-colors ${item.highlight ? 'bg-primary/[0.03]' : 'hover:bg-muted/20'}`}
                  >
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-3">
                        {item.highlight ? (
                          <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <Flame size={16} />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                            <Package size={16} />
                          </div>
                        )}
                        <div>
                          <p className={`font-bold ${item.highlight ? 'text-foreground' : 'text-foreground/70'}`}>
                            {item.name}
                          </p>
                          {item.highlight && <span className="text-[9px] font-black uppercase text-orange-500 tracking-tighter">Recommended</span>}
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8 text-center font-mono">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.highlight ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'text-muted-foreground'}`}>
                        {item.size}
                      </span>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        {item.dep === 'None' ? (
                          <span className="flex items-center gap-1.5 text-primary">
                            <Zap size={14} /> Zero Dependencies
                          </span>
                        ) : (
                          <span>{item.dep}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-6 px-8 text-right">
                       {!item.provider ? (
                         <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase border border-emerald-500/20">
                           <ShieldCheck size={12} /> Yes
                         </div>
                       ) : (
                         <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-500/50 text-[10px] font-bold uppercase border border-red-500/10">
                           <ShieldAlert size={12} /> No
                         </div>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-border/50">
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <p className="text-sm font-bold text-foreground">Switch to Crisp Toast today.</p>
              <p className="text-xs text-muted-foreground">Improve your LCP and reduce TTI instantly.</p>
            </div>
            <button 
              onClick={testToast}
              className="group relative h-12 px-8 rounded-xl bg-primary text-primary-foreground font-bold shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <Zap size={16} className="fill-current" />
              <span>Verify Performance</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;