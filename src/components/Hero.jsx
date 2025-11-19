export default function Hero({ onQuoteClick }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Ergonomics that scale with your business</h1>
          <p className="mt-5 text-lg text-blue-200/90 max-w-xl">Showroom of business-grade ergonomic chairs and anti-fatigue mats. We quote to your spec and deliver nationwide.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => onQuoteClick(null)} className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-5 py-3">Request a Quote</button>
            <a href="#showroom" className="rounded-lg border border-blue-400/40 text-blue-200 hover:text-white hover:border-blue-300 px-5 py-3">Explore Showroom</a>
          </div>
          <div className="mt-6 flex items-center gap-6 text-blue-200/80 text-sm">
            <div>Bulk pricing</div>
            <div>On-site trials</div>
            <div>Warranty support</div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 shadow-xl overflow-hidden">
            <img className="w-full h-full object-cover opacity-90" src="https://images.unsplash.com/photo-1688578735972-b61ec274df7b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxFcmdvbm9taWMlMjBjaGFpcnxlbnwwfDB8fHwxNzYzNTczOTE3fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Ergonomic chair" />
          </div>
        </div>
      </div>
    </section>
  )
}
