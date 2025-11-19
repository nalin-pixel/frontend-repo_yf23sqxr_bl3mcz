import { useState } from 'react'

export default function Header({ onQuoteClick }) {
  const [open, setOpen] = useState(false)

  const navItem = (label, href) => (
    <a href={href} className="text-slate-200 hover:text-white transition-colors">{label}</a>
  )

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-900/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/25" />
          <div>
            <div className="text-white font-semibold tracking-tight">ErgoWorks</div>
            <div className="text-xs text-blue-200/70">Ergonomic Chairs & Mats</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItem('Showroom', '#showroom')}
          {navItem('Chairs', '#chairs')}
          {navItem('Mats', '#mats')}
          {navItem('About', '#about')}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => onQuoteClick(null)} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 transition-colors">
            Request a Quote
          </button>
          <button className="md:hidden text-slate-200" onClick={() => setOpen(!open)}>
            <span className="sr-only">Menu</span>
            ☰
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-800 px-6 pb-4 space-y-3">
          <div className="grid gap-3">
            <a href="#showroom" className="text-slate-200">Showroom</a>
            <a href="#chairs" className="text-slate-200">Chairs</a>
            <a href="#mats" className="text-slate-200">Mats</a>
            <a href="#about" className="text-slate-200">About</a>
          </div>
        </div>
      )}
    </header>
  )
}
