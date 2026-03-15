import 'crisp-toast/style.css'
import { useEffect, useState } from 'react'
import './index.css'

import FeatureSection from './components/FeatureSection'
import Footer from './components/Footer'
import GuideSection from './components/GuideSection'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import PlaygroundSection from './components/PlaygroundSection'

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.className = theme === 'dark' ? 'ct-theme-dark dark' : 'ct-theme-light light'
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 transition-colors duration-300">
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="pt-16">
        <Hero />
        <FeatureSection />
        <PlaygroundSection />
        <GuideSection />
        {/* <ComparisonSection /> */}
        {/* <ToastShowcase /> */}
      </main>
      <Footer />
      <style>{`
        @keyframes progress {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0%); }
        }
        .animate-progress { animation: progress 2s infinite linear; }
      `}</style>
    </div>
  )
}

export default App
