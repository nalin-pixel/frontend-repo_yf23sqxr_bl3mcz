import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function QuoteModal({ open, product, onClose }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: 1,
    message: ''
  })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (product) {
      setForm(f => ({ ...f, message: f.message || `Interested in ${product.title}` }))
    }
  }, [product])

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`${API_BASE}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product?.id || null,
          product_title: product?.title || null,
          ...form,
          quantity: Number(form.quantity) || 1,
        })
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
      } else {
        throw new Error(data.detail || 'Failed to submit')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-white font-semibold">Request a Quote</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <div className="p-5">
          {status === 'success' ? (
            <div className="text-emerald-300">Thank you! We've received your request and will contact you shortly.</div>
          ) : (
            <form className="grid grid-cols-1 gap-4" onSubmit={submit}>
              {product && (
                <div className="text-blue-200 text-sm">Product: <span className="text-white">{product.title}</span></div>
              )}
              <input className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" placeholder="Your name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
              <input className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" placeholder="Company (optional)" value={form.company} onChange={e=>setForm({...form, company:e.target.value})} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
                <input className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" placeholder="Phone (optional)" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" type="number" min="1" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form, quantity:e.target.value})} />
                <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white">
                  <option>New office fit-out</option>
                  <option>Team expansion</option>
                  <option>Replacement/refresh</option>
                </select>
              </div>
              <textarea className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" rows="4" placeholder="Additional notes" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-700 text-blue-200 hover:text-white">Cancel</button>
                <button disabled={status==='loading'} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">
                  {status==='loading'? 'Submitting…' : 'Submit Request'}
                </button>
              </div>
              {status==='error' && <div className="text-red-300 text-sm">We couldn't send your request. Please try again.</div>}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
