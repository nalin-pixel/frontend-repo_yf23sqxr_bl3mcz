export default function Hero({ onQuoteClick }) {
  return (
    <section className="relative overflow-hidden bg-[#2D545D]">
      <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-[#E6F8FF]/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-[#E3C074]/20 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Ergonomics that scale with your business</h1>
          <p className="mt-5 text-lg text-white/90 max-w-xl">Showroom of business-grade ergonomic chairs and anti-fatigue mats. We quote to your spec and deliver nationwide.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => onQuoteClick(null)} className="rounded-lg bg-[#E3C074] hover:bg-[#d6b15f] text-[#2D545D] font-medium px-5 py-3">Request a Quote</button>
            <a href="#showroom" className="rounded-lg border border-white/30 text-white hover:bg-white/10 px-5 py-3">Explore Showroom</a>
          </div>
          <div className="mt-6 flex items-center gap-6 text-white/80 text-sm">
            <div>Bulk pricing</div>
            <div>On-site trials</div>
            <div>Warranty support</div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-[#E6F8FF] border border-white/20 shadow-xl overflow-hidden">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1688578735972-b61ec274df7b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxFcmdvbm9taWMlMjBjaGFpcnxlbnwwfDB8fHwxNzYzNTczOTE3fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Ergonomic chair" />
          </div>
        </div>
      </div>
    </section>
  )
}
