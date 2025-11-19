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
    <section id="showroom" className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Showroom</h2>
        <div className="flex items-center gap-2">
          {['all', 'chair', 'mat'].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded-lg text-sm border ${filter===cat? 'bg-blue-600 text-white border-blue-600' : 'border-slate-700 text-blue-200 hover:text-white'}`}>
              {cat.charAt(0).toUpperCase()+cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="text-blue-200">Loading products…</div>}
      {error && <div className="text-red-300">{error}</div>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(p => (
          <article key={p.id} className="group rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-blue-500/40 transition-colors">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.images?.[0] || 'https://via.placeholder.com/800x600'} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">{p.title}</h3>
                {p.price_from && <span className="text-blue-300 text-sm">From ${p.price_from}</span>}
              </div>
              <p className="mt-1 text-sm text-blue-200/80 line-clamp-2">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(p.specs || {}).slice(0,3).map(([k,v]) => (
                  <span key={k} className="text-xs text-blue-200/70 border border-slate-700 px-2 py-1 rounded">{k}: {v}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button onClick={() => onQuoteClick({ id: p.id, title: p.title })} className="text-sm rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-3 py-2">Request Quote</button>
                <span className={`text-xs ${p.in_stock? 'text-emerald-300' : 'text-amber-300'}`}>{p.in_stock? 'In stock' : 'Lead time applies'}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
