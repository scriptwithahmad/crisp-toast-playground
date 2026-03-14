import { useState } from 'react'
import { toast } from 'crisp-toast'
import {
  Bell, CheckCircle2, XCircle, AlertTriangle, Info,
  Palette, Layout, Timer, Settings2, Eye, Code2,
  RefreshCw, Copy, Check, Sparkles, Zap,
} from 'lucide-react'
import CodeBlock from './CodeBlock'
import useClipboard from '../hooks/useClipboard'

// ─── Constants ────────────────────────────────────────────────────────────────

const COLORS = ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
const COLOR_META = {
  default:   { bg: '#6b7280', label: 'Default' },
  primary:   { bg: '#6366f1', label: 'Primary' },
  secondary: { bg: '#8b5cf6', label: 'Secondary' },
  success:   { bg: '#10b981', label: 'Success' },
  warning:   { bg: '#f59e0b', label: 'Warning' },
  danger:    { bg: '#ef4444', label: 'Danger' },
}

const VARIANTS = ['flat', 'solid', 'bordered']
const RADIUSES = ['none', 'sm', 'md', 'lg', 'full']
const TYPES    = ['default', 'success', 'error', 'warning', 'info']

const TYPE_META = {
  default: { label: 'Default', icon: Bell,          cls: 'hover:bg-muted/80 hover:border-border' },
  success: { label: 'Success', icon: CheckCircle2,   cls: 'hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/40' },
  error:   { label: 'Error',   icon: XCircle,        cls: 'hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/40' },
  warning: { label: 'Warning', icon: AlertTriangle,  cls: 'hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-500/40' },
  info:    { label: 'Info',    icon: Info,            cls: 'hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/40' },
}

// ─── Real SVG icons from crisp-toast library ─────────────────────────────────

const CT_ICONS = {
  default:   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
  success:   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
  warning:   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
  error:     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>,
  danger:    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>,
  info:      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
  primary:   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
  secondary: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
}

// Close icon SVG
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
)

// ─── Toast Preview — uses EXACT crisp-toast CSS classes ───────────────────────
// The library's style.css (already imported globally) drives all the colours,
// backgrounds, borders, shadows and typography — we just apply the same classes.

const ToastPreview = ({ config }) => {
  // Map toast type to the color key the library uses for the icon lookup
  const iconKey = config.type === 'error' ? 'danger'
                : config.type === 'default' ? (config.color === 'default' ? 'default' : config.color)
                : config.type  // success | warning | info

  const icon = CT_ICONS[iconKey] ?? CT_ICONS.default

  // The library's buildClasses():
  // ["ct-toast", darkMode ? "ct-theme-dark" : "ct-theme-light",
  //  `ct-${variant}`, `ct-color-${color}`, `ct-radius-${radius}`]
  const themeClass   = config.darkMode ? 'ct-theme-dark' : 'ct-theme-light'
  const variantClass = `ct-${config.variant}`                 // ct-flat | ct-solid | ct-bordered
  const colorClass   = `ct-color-${config.color}`             // ct-color-success etc.
  const radiusClass  = `ct-radius-${config.radius}`           // ct-radius-lg etc.

  return (
    <div
      className={`ct-toast ${themeClass} ${variantClass} ${colorClass} ${radiusClass}`}
      style={{ position: 'relative', minWidth: 0, maxWidth: '100%', animation: 'none' }}
    >
      {/* Icon */}
      {config.icon !== false && (
        <div className="ct-icon">
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="ct-content">
        <div className="ct-title">{config.title || 'Toast Title'}</div>
        {config.description && (
          <div className="ct-description">{config.description}</div>
        )}
      </div>

      {/* Close button (decorative) */}
      <div className="ct-actions">
        <button className="ct-close" tabIndex={-1} aria-hidden="true">
          <CloseIcon />
        </button>
      </div>

      {/* Progress bar */}
      {config.progressBar && (
        <div
          className="ct-progress-bar"
          style={{ animation: 'none', width: '55%' }}
        />
      )}
    </div>
  )
}

// ─── Placement Picker ────────────────────────────────────────────────────────

const PlacementPicker = ({ value, onChange }) => {
  const grid = [
    'top-left',    'top-center',    'top-right',
    null,           null,            null,
    'bottom-left', 'bottom-center', 'bottom-right',
  ]
  return (
    <div className="grid grid-cols-3 gap-1.5 w-full max-w-[200px]">
      {grid.map((p, i) => {
        if (!p) return (
          <div key={i} className={`h-8 rounded-md flex items-center justify-center text-[8px] font-bold uppercase tracking-widest text-muted-foreground/30 ${i === 4 ? 'border-2 border-dashed border-border/30' : ''}`}>
            {i === 4 ? 'screen' : ''}
          </div>
        )
        const isActive = value === p
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            title={p}
            className={`h-8 rounded-md text-[9px] font-bold uppercase tracking-wide transition-all border active:scale-90 ${
              isActive
                ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.05]'
                : 'border-border hover:border-primary/40 hover:bg-muted/60 text-muted-foreground'
            }`}
          >
            {p.split('-')[1]?.slice(0, 1).toUpperCase() + p.split('-')[0]?.slice(0, 1).toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}

// ─── Toggle Chip ─────────────────────────────────────────────────────────────

const ToggleChip = ({ label, checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
      checked
        ? 'bg-primary/10 text-primary border-primary/30'
        : 'bg-muted/50 text-muted-foreground border-border hover:border-primary/20'
    }`}
  >
    <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center transition-colors ${checked ? 'bg-primary border-primary' : 'border-muted-foreground/40'}`}>
      {checked && <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
    </span>
    {label}
  </button>
)

// ─── Section Label ────────────────────────────────────────────────────────────

const SectionLabel = ({ icon: Icon, children, hint }) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
      <Icon size={12} className="text-primary" />
      {children}
    </div>
    {hint && (
      <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-primary/60 bg-primary/8 border border-primary/15 px-2 py-0.5 rounded-full">
        <Zap size={8} /> fires toast
      </span>
    )}
  </div>
)

// ─── Playground Section ───────────────────────────────────────────────────────

const PlaygroundSection = () => {
  const [config, setConfig] = useState({
    type:        'success',
    title:       'Changes saved!',
    description: 'Project saved successfully.',
    variant:     'flat',
    color:       'success',
    placement:   'bottom-right',
    radius:      'lg',
    duration:    5000,
    progressBar: true,
    icon:        true,
    darkMode:    true,
  })
  const [activeTab, setActiveTab] = useState('preview')
  const [copied, copy] = useClipboard()

  // Update a single key in config (for global options — no toast fired)
  const set = (key, val) => setConfig(prev => ({ ...prev, [key]: val }))

  // Build the opts object from current config + any overrides, then fire
  const fireToast = (overrides = {}) => {
    const merged = { ...config, ...overrides }
    const opts = {
      title:       merged.title,
      description: merged.description || undefined,
      variant:     merged.variant,
      color:       merged.color,
      placement:   merged.placement,
      radius:      merged.radius,
      duration:    merged.duration,
      progressBar: merged.progressBar,
      darkMode:    merged.darkMode,
      ...(merged.icon === false && { icon: false }),
    }
    switch (merged.type) {
      case 'success': toast.success(opts); break
      case 'error':   toast.error(opts);   break
      case 'warning': toast.warning(opts); break
      case 'info':    toast.info(opts);    break
      default:        toast(opts)
    }
  }

  // Set state AND fire toast immediately
  const setAndFire = (key, val) => {
    setConfig(prev => ({ ...prev, [key]: val }))
    fireToast({ [key]: val })
  }

  const generateCode = () => {
    const fn = config.type === 'default' ? 'toast' : `toast.${config.type}`
    const lines = []
    lines.push(`  title: "${config.title}",`)
    if (config.description) lines.push(`  description: "${config.description}",`)
    lines.push(`  variant: "${config.variant}",`)
    lines.push(`  color: "${config.color}",`)
    lines.push(`  placement: "${config.placement}",`)
    lines.push(`  radius: "${config.radius}",`)
    lines.push(`  duration: ${config.duration},`)
    lines.push(`  progressBar: ${config.progressBar},`)
    if (!config.icon) lines.push(`  icon: false,`)
    lines.push(`  darkMode: ${config.darkMode},`)
    return `${fn}({\n${lines.join('\n')}\n})`
  }

  return (
    <section id="playground" className="px-4 sm:px-6 py-24 bg-muted/10 border-y border-border">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col gap-3 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mx-auto">
            <Sparkles size={12} /> Interactive Lab
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Toast Playground.</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Click any <span className="text-primary font-semibold">type</span>, <span className="text-primary font-semibold">color</span>, <span className="text-primary font-semibold">variant</span>, or <span className="text-primary font-semibold">radius</span> to instantly fire a toast. Global options apply to every toast.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">

          {/* ── Left: Interactive Controls ── */}
          <div className="flex flex-col gap-6">

            {/* ── Type Selector — fires toast ── */}
            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
              <SectionLabel icon={Bell} hint>Toast Type</SectionLabel>
              <div className="grid grid-cols-5 gap-2">
                {TYPES.map(type => {
                  const { label, icon: Icon, cls } = TYPE_META[type]
                  const isActive = config.type === type
                  return (
                    <button
                      key={type}
                      onClick={() => setAndFire('type', type)}
                      className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                        isActive
                          ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
                          : `border-border bg-background text-muted-foreground ${cls}`
                      }`}
                    >
                      <Icon size={18} />
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Appearance — Color, Variant, Radius — all fire toast ── */}
            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
              <SectionLabel icon={Palette} hint>Appearance</SectionLabel>
              <div className="flex flex-col gap-6">

                {/* Color */}
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2.5">Color</span>
                  <div className="flex flex-wrap gap-2.5">
                    {COLORS.map(color => {
                      const { bg, label } = COLOR_META[color]
                      const isActive = config.color === color
                      return (
                        <button
                          key={color}
                          onClick={() => setAndFire('color', color)}
                          title={label}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all active:scale-90 ${
                            isActive
                              ? 'border-foreground/40 bg-foreground/10 text-foreground scale-[1.05]'
                              : 'border-border text-muted-foreground hover:border-foreground/20'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-offset-1 ring-offset-card"
                            style={{ background: bg }}
                          />
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Variant */}
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2.5">Variant</span>
                  <div className="flex gap-2">
                    {VARIANTS.map(v => (
                      <button
                        key={v}
                        onClick={() => setAndFire('variant', v)}
                        className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border capitalize transition-all active:scale-95 ${
                          config.variant === v
                            ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
                            : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-muted/50'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Radius */}
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2.5">Radius</span>
                  <div className="flex gap-2">
                    {RADIUSES.map(r => (
                      <button
                        key={r}
                        onClick={() => setAndFire('radius', r)}
                        className={`flex-1 py-2 px-2 text-xs font-bold border capitalize transition-all active:scale-95 ${
                          r === 'none' ? 'rounded-none'
                          : r === 'sm' ? 'rounded-sm'
                          : r === 'md' ? 'rounded-md'
                          : r === 'lg' ? 'rounded-lg'
                          : 'rounded-full'
                        } ${
                          config.radius === r
                            ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
                            : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-muted/50'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Content — global, no toast fired ── */}
            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
              <SectionLabel icon={Settings2}>Content</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Title</label>
                  <input
                    type="text"
                    value={config.title}
                    onChange={e => set('title', e.target.value)}
                    placeholder="Toast title..."
                    className="w-full bg-muted/50 dark:bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Description</label>
                  <input
                    type="text"
                    value={config.description}
                    onChange={e => set('description', e.target.value)}
                    placeholder="Optional description..."
                    className="w-full bg-muted/50 dark:bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* ── Global Behavior — no toast fired ── */}
            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
              <SectionLabel icon={Timer}>Global Config</SectionLabel>
              <div className="flex flex-col gap-5">

                {/* Duration */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Duration</span>
                    <span className="text-xs font-bold text-primary tabular-nums font-mono">{(config.duration / 1000).toFixed(1)}s</span>
                  </div>
                  <input
                    type="range" min="1000" max="10000" step="500"
                    value={config.duration}
                    onChange={e => set('duration', parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[9px] text-muted-foreground/50 font-bold mt-1">
                    <span>1s</span><span>5s</span><span>10s</span>
                  </div>
                </div>

                {/* Toggles */}
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2.5">Options</span>
                  <div className="flex flex-wrap gap-2">
                    <ToggleChip label="Progress Bar"     checked={config.progressBar} onChange={v => set('progressBar', v)} />
                    <ToggleChip label="Show Icon"        checked={config.icon}        onChange={v => set('icon', v)} />
                    <ToggleChip label="Toast Dark Mode"  checked={config.darkMode}    onChange={v => set('darkMode', v)} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Preview + Placement + Copy ── */}
          <div className="flex flex-col gap-6">

            {/* Live Preview / Code Tab */}
            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 p-1 rounded-xl bg-muted/50 border border-border">
                  {[{ id: 'preview', icon: Eye, label: 'Preview' }, { id: 'code', icon: Code2, label: 'Code' }].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeTab === tab.id
                          ? 'bg-card text-foreground shadow-sm border border-border'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <tab.icon size={12} />{tab.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev }))}
                  className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                  title="Refresh preview"
                >
                  <RefreshCw size={13} />
                </button>
              </div>

              {activeTab === 'preview' ? (
                <div className="flex flex-col gap-4">
                  <div className="w-full rounded-xl border border-dashed border-border/60 bg-muted/20 overflow-hidden p-4">
                    <ToastPreview config={config} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 text-center">Visual Preview — exact library styles</p>
                </div>
              ) : (
                <CodeBlock code={generateCode()} />
              )}
            </div>

            {/* Placement Picker — global config, no toast fired */}
            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
              <SectionLabel icon={Layout}>Placement</SectionLabel>
              <div className="flex items-start gap-6">
                <PlacementPicker value={config.placement} onChange={v => set('placement', v)} />
                <div className="flex flex-col gap-1.5 text-xs flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Selected</div>
                  <div className="px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold text-sm w-fit">
                    {config.placement}
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed mt-1">
                    Global — applies to every toast fired from this playground.
                  </p>
                </div>
              </div>
            </div>

            {/* Copy Config Code */}
            <button
              onClick={() => { copy(generateCode()); toast.success({ title: 'Copied to clipboard!' }) }}
              className="btn btn-outline h-12 rounded-2xl font-bold gap-2 text-sm w-full hover:border-primary/40"
            >
              {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              {copied ? 'Copied to clipboard!' : 'Copy Config Code'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlaygroundSection
