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
      <div className="w-full max-w-lg rounded-2xl bg-white border border-[#2D545D]/20" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-[#2D545D]/20 flex items-center justify-between bg-[#E6F8FF] rounded-t-2xl">
          <h3 className="text-[#2D545D] font-semibold">Request a Quote</h3>
          <button onClick={onClose} className="text-[#2D545D]/70 hover:text-[#2D545D]">✕</button>
        </div>
        <div className="p-5">
          {status === 'success' ? (
            <div className="text-emerald-700">Thank you! We've received your request and will contact you shortly.</div>
          ) : (
            <form className="grid grid-cols-1 gap-4" onSubmit={submit}>
              {product && (
                <div className="text-sm text-[#2D545D]">Product: <span className="font-medium">{product.title}</span></div>
              )}
              <input className="bg-white border border-[#2D545D]/30 rounded-lg px-3 py-2 text-[#2D545D] placeholder-[#2D545D]/60" placeholder="Your name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
              <input className="bg-white border border-[#2D545D]/30 rounded-lg px-3 py-2 text-[#2D545D] placeholder-[#2D545D]/60" placeholder="Company (optional)" value={form.company} onChange={e=>setForm({...form, company:e.target.value})} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input className="bg-white border border-[#2D545D]/30 rounded-lg px-3 py-2 text-[#2D545D] placeholder-[#2D545D]/60" type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
                <input className="bg-white border border-[#2D545D]/30 rounded-lg px-3 py-2 text-[#2D545D] placeholder-[#2D545D]/60" placeholder="Phone (optional)" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input className="bg-white border border-[#2D545D]/30 rounded-lg px-3 py-2 text-[#2D545D] placeholder-[#2D545D]/60" type="number" min="1" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form, quantity:e.target.value})} />
                <select className="bg-white border border-[#2D545D]/30 rounded-lg px-3 py-2 text-[#2D545D]">
                  <option>New office fit-out</option>
                  <option>Team expansion</option>
                  <option>Replacement/refresh</option>
                </select>
              </div>
              <textarea className="bg-white border border-[#2D545D]/30 rounded-lg px-3 py-2 text-[#2D545D] placeholder-[#2D545D]/60" rows="4" placeholder="Additional notes" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-[#2D545D]/30 text-[#2D545D] hover:bg-[#E6F8FF]">Cancel</button>
                <button disabled={status==='loading'} className="px-4 py-2 rounded-lg bg-[#E3C074] hover:bg-[#d6b15f] text-[#2D545D] font-medium">
                  {status==='loading'? 'Submitting…' : 'Submit Request'}
                </button>
              </div>
              {status==='error' && <div className="text-red-700 text-sm">We couldn't send your request. Please try again.</div>}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
