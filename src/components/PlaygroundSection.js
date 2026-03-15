import { toast } from 'crisp-toast'
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Code2,
  Copy,
  Info,
  Layers,
  Layout,
  Palette,
  RefreshCw,
  RotateCcw,
  Settings2,
  Sparkles,
  Timer,
  Wand2,
  XCircle,
  Zap
} from 'lucide-react'
import { useState } from 'react'
import useClipboard from '../hooks/useClipboard'
import CodeBlock from './CodeBlock'

// ─── Constants ────────────────────────────────────────────────────────────────

const COLORS = ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
const COLOR_META = {
  default: { bg: '#6b7280', label: 'Default' },
  primary: { bg: '#6366f1', label: 'Primary' },
  secondary: { bg: '#8b5cf6', label: 'Secondary' },
  success: { bg: '#10b981', label: 'Success' },
  warning: { bg: '#f59e0b', label: 'Warning' },
  danger: { bg: '#ef4444', label: 'Danger' },
}

const VARIANTS = ['flat', 'solid', 'bordered']
const RADIUSES = ['none', 'sm', 'md', 'lg', 'full']
const TYPES = ['default', 'success', 'error', 'warning', 'info']

const TYPE_META = {
  default: { label: 'Default', icon: Bell, cls: 'hover:bg-muted/80 hover:border-border' },
  success: { label: 'Success', icon: CheckCircle2, cls: 'hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/40' },
  error: { label: 'Error', icon: XCircle, cls: 'hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/40' },
  warning: { label: 'Warning', icon: AlertTriangle, cls: 'hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-500/40' },
  info: { label: 'Info', icon: Info, cls: 'hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/40' },
}

// ─── Real SVG icons from crisp-toast library ─────────────────────────────────

const CT_ICONS = {
  default: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
  success: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
  warning: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
  error: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>,
  danger: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>,
  info: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
  primary: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
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
  // In crisp-toast, typed toasts (success, error, etc.) use specific default colors.
  // We calculate the effective color to ensure the preview matches the actual library behavior.
  const effectiveColor = config.type === 'success' ? 'success'
    : config.type === 'error' ? 'danger'
      : config.type === 'warning' ? 'warning'
        : config.type === 'info' ? 'primary'
          : config.color

  // Map toast type to the color key the library uses for the icon lookup
  const iconKey = config.type === 'error' ? 'danger'
    : config.type === 'default' ? (config.color === 'default' ? 'default' : config.color)
      : config.type  // success | warning | info

  const getPreviewIcon = () => {
    if (config.customIcon === 'rocket') return '🚀'
    if (config.customIcon === 'sparkle') return <Sparkles size={16} />
    return CT_ICONS[iconKey] ?? CT_ICONS.default
  }

  const icon = getPreviewIcon()

  // The library's buildClasses():
  // ["ct-toast", darkMode ? "ct-theme-dark" : "ct-theme-light",
  //  `ct-${variant}`, `ct-color-${color}`, `ct-radius-${radius}`]
  const themeClass = config.darkMode ? 'ct-theme-dark' : 'ct-theme-light'
  const variantClass = `ct-${config.variant}`                 // ct-flat | ct-solid | ct-bordered
  const colorClass = `ct-color-${effectiveColor}`           // ct-color-success etc.
  const radiusClass = `ct-radius-${config.radius}`           // ct-radius-lg etc.

  return (
    <div
      className={`ct-toast ${themeClass} ${variantClass} ${colorClass} ${radiusClass}`}
      style={{ position: 'relative', minWidth: 0, maxWidth: '100%', animation: 'none' }}
    >
      <div className="ct-body">
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

        {/* Actions (Decorative) */}
        <div className="ct-actions">
          {config.actionPreset !== 'none' && (
            <div className="ct-action-wrapper" style={{ opacity: 0.8 }}>
              {config.actionPreset === 'explore' ? (
                <button className="px-2 py-1 border border-primary/30 text-primary rounded-md text-[10px] font-bold">explore</button>
              ) : 'UNDO'}
            </div>
          )}
          <button className="ct-close" tabIndex={-1} aria-hidden="true">
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* endContent */}
      {config.endContentPreset !== 'none' && (
        <div className="ct-end-content">
          {config.endContentPreset === 'upgrade' && <button className="w-full py-2 px-3 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold mt-1 uppercase tracking-wider">Upgrade to Pro ✨</button>}
          {config.endContentPreset === 'undo' && <div className="flex items-center gap-2 p-2 bg-muted/40 rounded-lg w-full text-[10px]"><span className="opacity-60 font-bold uppercase tracking-tighter">Mistake?</span> <button className="text-primary font-bold uppercase">Undo</button></div>}
          {config.endContentPreset === 'emoji' && <div className="text-lg py-1">🚀 🔥 🎉 💎</div>}
        </div>
      )}

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
    'top-left', 'top-center', 'top-right',
    null, null, null,
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
            className={`h-8 rounded-md text-[9px] font-bold uppercase tracking-wide transition-all border active:scale-90 ${isActive
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
    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${checked
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
    type: 'success',
    title: 'Changes saved!',
    description: 'Project saved successfully.',
    variant: 'flat',
    color: 'success',
    placement: 'bottom-right',
    radius: 'lg',
    duration: 5000,
    progressBar: true,
    icon: true,
    darkMode: true,
    pauseOnHover: false,
    actionPreset: 'none',
    endContentPreset: 'none',
    customIcon: 'none',
  })
  const [activeTab, setActiveTab] = useState('preview')
  const [copied, copy] = useClipboard()

  // Update a single key in config (for global options — no toast fired)
  const set = (key, val) => setConfig(prev => ({ ...prev, [key]: val }))

  // Build the opts object from current config + any overrides, then fire
  const fireToast = (overrides = {}) => {
    const merged = { ...config, ...overrides }

    const getAction = (preset) => {
      switch (preset) {
        case 'explore': return {
          label: <button style={{ background: 'rgba(37,99,235,0.1)', color: '#2563eb', border: '1px solid #2563eb', borderRadius: '6px', padding: '4px 10px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>explore</button>,
          onClick: () => alert('Explore!')
        }
        case 'text': return { label: 'UNDO', onClick: () => alert('Undone!') }
        default: return undefined
      }
    }

    const getEndContent = (preset) => {
      switch (preset) {
        case 'upgrade': return (
          <button style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 12px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', width: '100%', marginTop: '4px' }}>
            Upgrade to Premium ✨
          </button>
        )
        case 'undo': return (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%', padding: '8px', background: 'rgba(128,128,128,0.1)', borderRadius: '6px', marginTop: '4px' }}>
            <span style={{ fontSize: '12px', opacity: 0.7 }}>Accidentally deleted?</span>
            <button style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, fontSize: '12px', cursor: 'pointer', padding: 0 }}>Undo</button>
          </div>
        )
        case 'emoji': return <div style={{ fontSize: '20px', padding: '4px 0' }}>🎉 🚀 🔥 💎</div>
        default: return undefined
      }
    }

    const opts = {
      title: merged.title,
      description: merged.description || undefined,
      variant: merged.variant,
      color: merged.color,
      placement: merged.placement,
      radius: merged.radius,
      duration: merged.duration,
      progressBar: merged.progressBar,
      darkMode: merged.darkMode,
      pauseOnHover: merged.pauseOnHover,
      action: getAction(merged.actionPreset),
      endContent: getEndContent(merged.endContentPreset),
      ...(merged.customIcon !== 'none' && { icon: merged.customIcon === 'rocket' ? '🚀' : <Sparkles size={16} /> }),
      ...(merged.icon === false && { icon: false }),
    }
    switch (merged.type) {
      case 'success': toast.success(opts); break
      case 'error': toast.error(opts); break
      case 'warning': toast.warning(opts); break
      case 'info': toast.info(opts); break
      default: toast(opts)
    }
  }

  // Set state AND fire toast immediately
  const setAndFire = (key, val) => {
    const updates = { [key]: val }

    // Sync color with type for a more intuitive playground experience
    // that matches the library's default color for each semantic type.
    if (key === 'type') {
      const typeDefaults = {
        success: 'success',
        error: 'danger',
        warning: 'warning',
        info: 'primary',
        default: 'default'
      }
      if (typeDefaults[val]) updates.color = typeDefaults[val]
    }

    setConfig(prev => ({ ...prev, ...updates }))
    fireToast(updates)
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
    lines.push(`  pauseOnHover: ${config.pauseOnHover},`)
    if (!config.icon) lines.push(`  icon: false,`)
    lines.push(`  darkMode: ${config.darkMode},`)
    if (config.actionPreset === 'explore') {
      lines.push(`  action: {`)
      lines.push(`    label: <button>explore</button>,`)
      lines.push(`    onClick: () => { /* ... */ }`)
      lines.push(`  },`)
    } else if (config.actionPreset === 'text') {
      lines.push(`  action: { label: "UNDO", onClick: () => {} },`)
    }
    if (config.endContentPreset !== 'none') {
      lines.push(`  endContent: <JSX />,`)
    }
    if (config.customIcon !== 'none') {
      lines.push(`  icon: ${config.customIcon === 'rocket' ? '"🚀"' : '<JSX />'},`)
    }
    return `${fn}({\n${lines.join('\n')}\n})`
  }

  const PRESETS = [
    { name: 'Welcome', type: 'success', title: 'Welcome Back!', description: 'Great to see you again.', icon: 'rocket' },
    { name: 'Premium', type: 'info', title: 'Upgrade Now', description: 'Unlock all features with Pro.', endContentPreset: 'upgrade' },
    { name: 'Undo Demo', type: 'error', title: 'File Deleted', description: 'Your file has been removed.', endContentPreset: 'undo' },
    { name: 'Party!', type: 'default', color: 'secondary', title: 'Achievement Unlocked', description: 'You have reached level 10.', endContentPreset: 'emoji', actionPreset: 'explore' },
  ]

  return (
    <section id="playground" className="px-4 sm:px-6 py-24 bg-muted/10 border-y border-border relative overflow-hidden">
      <div className="grid-pattern" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative">

        {/* Header */}
        <div className="flex flex-col gap-3 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.2em] uppercase mx-auto transition-all hover:scale-105">
            <Sparkles size={12} className="animate-pulse" /> THE DESIGN LAB
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-gradient">Custom Toast.</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Experiment with our flexible API. Build notifications that match your <span className="text-primary font-bold">brand's DNA</span>.
          </p>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Left Column: Configuration (8 cols) ── */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* 1. Core Config: Type & Content */}
            <div className="glass p-8 rounded-[2rem] border border-border shadow-2xl space-y-8">
              <SectionLabel icon={Settings2}>Core Configuration</SectionLabel>

              <div className="grid gap-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Semantic Type</span>
                  <div className="grid grid-cols-5 gap-4">
                    {TYPES.map(type => {
                      const { icon: Icon, cls } = TYPE_META[type]
                      const isActive = config.type === type
                      return (
                        <button
                          key={type}
                          onClick={() => setAndFire('type', type)}
                          className={`flex flex-col items-center gap-2 py-3 rounded-xl border transition-all active:scale-90 ${isActive
                            ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105 z-10'
                            : `border-border bg-background/50 text-muted-foreground ${cls}`
                            }`}
                        >
                          <Icon size={16} />
                          <span className={`text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`}>{type}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Message Content</span>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={config.title}
                      onChange={e => set('title', e.target.value)}
                      placeholder="Title..."
                      className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all"
                    />
                    <input
                      type="text"
                      value={config.description}
                      onChange={e => set('description', e.target.value)}
                      placeholder="Description..."
                      className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Visual Style: Color, Variant, Radius */}
            <div className="glass p-8 rounded-[2rem] border border-border shadow-2xl space-y-8">
              <SectionLabel icon={Palette}>Visual Identity</SectionLabel>

              <div className="space-y-8">
                {/* Colors */}
                <div className="flex flex-wrap gap-2.5">
                  {COLORS.map(color => {
                    const { bg, label } = COLOR_META[color]
                    const isActive = config.color === color
                    return (
                      <button
                        key={color}
                        onClick={() => setAndFire('color', color)}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-tighter transition-all active:scale-90 ${isActive
                          ? 'border-primary bg-primary/10 text-primary scale-105'
                          : 'border-border bg-background/40 text-muted-foreground hover:border-primary/30'
                          }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: bg }} />
                        {label}
                      </button>
                    )
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Variant */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Variant</span>
                    <div className="flex gap-2 p-1 bg-muted/30 rounded-2xl border border-border">
                      {VARIANTS.map(v => (
                        <button
                          key={v}
                          onClick={() => setAndFire('variant', v)}
                          className={`flex-1 py-2 px-3 text-[11px] font-bold rounded-xl capitalize transition-all ${config.variant === v
                            ? 'bg-background text-primary shadow-sm ring-1 ring-border'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Radius */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Corner Radius</span>
                    <div className="flex gap-2 p-1 bg-muted/30 rounded-2xl border border-border">
                      {RADIUSES.map(r => (
                        <button
                          key={r}
                          onClick={() => setAndFire('radius', r)}
                          className={`flex-1 py-2 text-[10px] font-bold rounded-xl capitalize transition-all ${config.radius === r
                            ? 'bg-background text-primary shadow-sm ring-1 ring-border'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                          {r === 'none' ? '0' : r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Advanced Layouts: Actions & endContent */}
            <div className="glass p-8 rounded-[2rem] border border-border shadow-2xl space-y-6">
              <SectionLabel icon={Layout}>Layout Extensions</SectionLabel>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Action Type</span>
                  <div className="flex gap-2 p-1 bg-muted/30 rounded-2xl border border-border">
                    {[
                      { id: 'none', label: 'None' },
                      { id: 'explore', label: 'Explore' },
                      { id: 'text', label: 'Undo' }
                    ].map(action => (
                      <button
                        key={action.id}
                        onClick={() => setAndFire('actionPreset', action.id)}
                        className={`flex-1 py-2 px-1 text-[11px] font-bold rounded-xl transition-all ${config.actionPreset === action.id
                          ? 'bg-background text-primary shadow-sm ring-1 ring-border shadow-primary/5'
                          : 'text-muted-foreground hover:text-foreground'
                          }`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Stacked Block</span>
                  <div className="flex gap-1 p-1 bg-muted/30 rounded-2xl border border-border">
                    {[
                      { id: 'none', label: 'None' },
                      { id: 'upgrade', label: 'Upgrade' },
                      { id: 'undo', label: 'History' },
                      { id: 'emoji', label: 'Emoji' }
                    ].map(block => (
                      <button
                        key={block.id}
                        onClick={() => setAndFire('endContentPreset', block.id)}
                        className={`flex-1 py-2 px-1 text-[11px] font-bold rounded-xl transition-all ${config.endContentPreset === block.id
                          ? 'bg-background text-primary shadow-sm ring-1 ring-border shadow-primary/5'
                          : 'text-muted-foreground hover:text-foreground'
                          }`}
                      >
                        {block.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Icon Customization</span>
                <div className="flex gap-2 p-1 bg-muted/30 rounded-2xl border border-border w-fit min-w-[300px]">
                  {['none', 'rocket', 'sparkle'].map(icon => (
                    <button
                      key={icon}
                      onClick={() => setAndFire('customIcon', icon)}
                      className={`flex-1 py-2 px-4 text-[11px] font-bold rounded-xl capitalize transition-all flex items-center justify-center gap-2 ${config.customIcon === icon
                        ? 'bg-background text-primary shadow-sm ring-1 ring-border'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                      {icon === 'none' ? 'Standard' : icon === 'rocket' ? '🚀' : <><Sparkles size={14} /> Sparkle</>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Quick Presets */}
            <div className="flex flex-wrap gap-3">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest w-full mb-1 pl-4">Quick Presets</span>
              {PRESETS.map(p => (
                <button
                  key={p.name}
                  onClick={() => {
                    const newConfig = { ...config, ...p }
                    setConfig(newConfig)
                    fireToast(p)
                  }}
                  className="px-4 py-2 rounded-xl border border-border bg-background/50 text-[11px] font-bold hover:border-primary/30 transition-all hover:scale-105 active:scale-95"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* ── Right Column: Preview & Behavior (4 cols) ── */}
          <div className="lg:col-span-4 flex flex-col gap-8">

            {/* Live Preview Console */}
            <div className="glass p-6 rounded-[2.5rem] border-2 border-primary/20 bg-primary/5 shadow-2xl space-y-6 sticky top-24">
              <div className="flex items-center justify-between">
                <div className="flex gap-2 p-1 bg-background/50 rounded-2xl border border-primary/20">
                  <button onClick={() => setActiveTab('preview')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'preview' ? 'bg-primary text-primary-foreground shadow-md' : 'text-primary/60 hover:text-primary'}`}>PREVIEW</button>
                  <button onClick={() => setActiveTab('code')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'code' ? 'bg-primary text-primary-foreground shadow-md' : 'text-primary/60 hover:text-primary'}`}>CODE</button>
                </div>
                <button onClick={() => setConfig(prev => ({ ...prev }))} className="p-2 hover:bg-primary/10 rounded-full transition-colors text-primary"><RefreshCw size={16} /></button>
              </div>

              <div className="min-h-[140px] flex flex-col justify-center gap-6">
                {activeTab === 'preview' ? (
                  <>
                    <div className="relative group p-4 bg-muted/20 border border-dashed border-primary/10 rounded-2xl">
                      <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <ToastPreview config={config} />
                      </div>
                    </div>
                    {/* <button onClick={() => fireToast()} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all">
                        Fire Toast 🚀
                      </button> */}
                  </>
                ) : (
                  <div className="relative">
                    <CodeBlock code={generateCode()} />
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-primary/10 space-y-6">
                <SectionLabel icon={Timer}>Behavior</SectionLabel>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black text-primary/60 uppercase tracking-wide">
                      <span>Visible For</span>
                      <span>{config.duration}ms</span>
                    </div>
                    <input
                      type="range" min="1000" max="10000" step="500"
                      value={config.duration}
                      onChange={e => set('duration', parseInt(e.target.value))}
                      className="w-full h-1.5 bg-primary/20 rounded-full appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <ToggleChip label="Progress Bar" checked={config.progressBar} onChange={v => set('progressBar', v)} />
                    <ToggleChip label="Hide Icon" checked={config.icon} onChange={v => set('icon', v)} />
                    <ToggleChip label="Dark UI" checked={config.darkMode} onChange={v => set('darkMode', v)} />
                    <ToggleChip label="Pause On Hover" checked={config.pauseOnHover} onChange={v => set('pauseOnHover', v)} />
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-black text-primary/60 uppercase tracking-tighter block">Engagement Point</span>
                  <PlacementPicker value={config.placement} onChange={v => set('placement', v)} />
                </div>
              </div>

              <button
                onClick={() => { copy(generateCode()); toast.success({ title: 'Copied Config!' }) }}
                className="w-full py-4 rounded-2xl border-2 border-primary/20 hover:border-primary/50 text-[10px] font-black uppercase tracking-[0.1em] transition-all flex items-center justify-center gap-2"
              >
                {copied ? <CheckCircle2 size={14} className="text-[#10b981]" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Get the code'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Advanced Integrations ── */}
        <div className="flex flex-col gap-6 mt-12">
          <div className="flex items-center gap-2 px-4 py-2 w-fit rounded-lg bg-muted/20 border border-border">
            <Code2 size={16} className="text-primary" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Advanced Integrations</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Styled Content */}
            <button
              onClick={() => toast({
                title: (
                  <div className="flex items-center gap-2">
                    <span className="font-black text-white">Full Customization</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[8px] font-black text-white uppercase tracking-widest">Premium</span>
                  </div>
                ),
                description: (
                  <div className="space-y-2 mt-1">
                    <p className="text-[11px] text-white/90 leading-relaxed font-medium">
                      Custom gradients, white thematic text, and advanced JSX nesting for maximum control.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                       <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white w-[75%] animate-pulse" />
                       </div>
                       <span className="text-[9px] text-white/70 font-black">75%</span>
                    </div>
                  </div>
                ),
                duration: 6000,
                icon: <div className="p-2 bg-white/20 rounded-xl text-white shadow-inner"><Wand2 size={18} /></div>,
                customStyle: {
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.4)',
                  padding: '20px'
                }
              })}
              className="glass p-6 rounded-3xl border border-border hover:border-primary/40 transition-all text-left group active:scale-95"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
                  <Wand2 size={24} />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-tight mb-1">Styled Content</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Custom colors, JSX content, gradients, and full css control.</p>
                </div>
              </div>
            </button>

            {/* Card 2: Rich Interactive */}
            <button
              onClick={() => toast.info({
                title: "Rich Interactive",
                color: 'default',
                pauseOnHover: true,
                description: (
                  <div className="flex flex-col gap-3 mt-1">
                    <p className="text-[11px] opacity-80">Toasts containing inputs, multiple buttons, and callbacks.</p>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Verify code..." className="flex-1 bg-muted/60 border border-border rounded-lg px-2 py-1.5 text-[10px] outline-none focus:ring-1 focus:ring-primary" />
                      <button onClick={(e) => { e.stopPropagation(); alert('Verified!'); }} className="bg-primary text-black px-3 py-1.5 rounded-lg text-[10px] font-bold">Check</button>
                    </div>
                  </div>
                ),
                customIcon: <Layers size={16} />
              })}
              className="glass p-6 rounded-3xl border border-border hover:border-primary/40 transition-all text-left group active:scale-95"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                  <Layers size={24} />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-tight mb-1">Rich Interactive</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Toasts containing inputs, multiple action buttons, and callbacks.</p>
                </div>
              </div>
            </button>

            {/* Card 3: Async Process */}
            <button
              onClick={() => {
                const p = new Promise(resolve => setTimeout(resolve, 2000))
                toast.promise(p, {
                  loading: 'Processing...',
                  success: 'Done!',
                  error: 'Failed'
                }, { variant: 'flat', radius: 'lg', description: "Your file has been processed successfully." })
              }}
              className="glass p-6 rounded-3xl border border-border hover:border-primary/40 transition-all text-left group active:scale-95"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                  <RotateCcw size={24} />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-tight mb-1">Async Process</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Update content and progress bars on the fly via toast ID.</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlaygroundSection
