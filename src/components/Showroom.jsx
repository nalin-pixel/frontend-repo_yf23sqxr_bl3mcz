import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Showroom({ onQuoteClick }) {
  const [filter, setFilter] = useState('all')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const url = `${API_BASE}/api/products${filter !== 'all' ? `?category=${filter}` : ''}`
    setLoading(true)
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setItems(data)
        else setError('Failed to load products')
      })
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false))
  }, [filter])

  return (
    <section id="showroom" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2D545D]">Showroom</h2>
          <div className="flex items-center gap-2">
            {['all', 'chair', 'mat'].map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded-lg text-sm border ${filter===cat? 'bg-[#E3C074] text-[#2D545D] border-[#E3C074]' : 'border-[#2D545D]/30 text-[#2D545D] hover:bg-[#E6F8FF]'}`}>
                {cat.charAt(0).toUpperCase()+cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading && <div className="text-[#2D545D]">Loading products…</div>}
        {error && <div className="text-red-600">{error}</div>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(p => (
            <article key={p.id} className="group rounded-2xl border border-[#2D545D]/15 bg-[#E6F8FF] overflow-hidden hover:border-[#E3C074]/60 transition-colors">
              <div className="aspect-[4/3] overflow-hidden bg-white">
                <img src={p.images?.[0] || 'https://via.placeholder.com/800x600'} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[#2D545D] font-medium">{p.title}</h3>
                  {p.price_from && <span className="text-[#2D545D]/80 text-sm">From ${p.price_from}</span>}
                </div>
                <p className="mt-1 text-sm text-[#2D545D]/80 line-clamp-2">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.entries(p.specs || {}).slice(0,3).map(([k,v]) => (
                    <span key={k} className="text-xs text-[#2D545D] border border-[#2D545D]/20 bg-white px-2 py-1 rounded">{k}: {v}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <button onClick={() => onQuoteClick({ id: p.id, title: p.title })} className="text-sm rounded-lg bg-[#E3C074] hover:bg-[#d6b15f] text-[#2D545D] font-medium px-3 py-2">Request Quote</button>
                  <span className={`text-xs ${p.in_stock? 'text-emerald-700' : 'text-amber-700'}`}>{p.in_stock? 'In stock' : 'Lead time applies'}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
