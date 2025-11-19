import { useState } from 'react'

export default function Header({ onQuoteClick }) {
  const [open, setOpen] = useState(false)

  const navItem = (label, href) => (
    <a href={href} className="text-white/90 hover:text-white transition-colors">{label}</a>
  )

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#2D545D]/95 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E3C074] to-[#2D545D] shadow-lg shadow-black/10" />
          <div>
            <div className="text-white font-semibold tracking-tight">ergolife</div>
            <div className="text-xs text-white/70">Ergonomic Chairs & Mats</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItem('Showroom', '#showroom')}
          {navItem('Chairs', '#chairs')}
          {navItem('Mats', '#mats')}
          {navItem('About', '#about')}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => onQuoteClick(null)} className="inline-flex items-center gap-2 rounded-lg bg-[#E3C074] hover:bg-[#d6b15f] text-[#2D545D] font-medium px-4 py-2 transition-colors">
            Request a Quote
          </button>
          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            <span className="sr-only">Menu</span>
            ☰
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 px-6 pb-4 space-y-3 bg-[#2D545D]">
          <div className="grid gap-3">
            <a href="#showroom" className="text-white">Showroom</a>
            <a href="#chairs" className="text-white">Chairs</a>
            <a href="#mats" className="text-white">Mats</a>
            <a href="#about" className="text-white">About</a>
          </div>
        </div>
      )}
    </header>
  )
}
