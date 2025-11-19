import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Showroom from './components/Showroom'
import QuoteModal from './components/QuoteModal'

function App() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteProduct, setQuoteProduct] = useState(null)

  const openQuote = (product) => {
    setQuoteProduct(product)
    setQuoteOpen(true)
  }

  return (
    <div className="min-h-screen bg-white text-[#2D545D]">
      <Header onQuoteClick={openQuote} />
      <Hero onQuoteClick={openQuote} />
      <Showroom onQuoteClick={openQuote} />

      <section id="about" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-[#2D545D]/15 bg-[#E6F8FF] p-6">
            <h3 className="text-[#2D545D] font-semibold">B2B focus</h3>
            <p className="text-[#2D545D]/80 mt-2 text-sm">We work with offices, co-working, and enterprise teams. Volume pricing and account management included.</p>
          </div>
          <div className="rounded-2xl border border-[#2D545D]/15 bg-[#E6F8FF] p-6">
            <h3 className="text-[#2D545D] font-semibold">Showroom-first</h3>
            <p className="text-[#2D545D]/80 mt-2 text-sm">Explore options online, finalize in person. Arrange on-site trials and sample units.</p>
          </div>
          <div className="rounded-2xl border border-[#2D545D]/15 bg-[#E6F8FF] p-6">
            <h3 className="text-[#2D545D] font-semibold">Service & warranty</h3>
            <p className="text-[#2D545D]/80 mt-2 text-sm">White-glove delivery, installation, and multi-year warranty support nationwide.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2D545D]/10 mt-4">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#2D545D]/70">© {new Date().getFullYear()} ergolife</div>
          <div className="text-[#2D545D]/70 text-sm">Sales by quote • Visit our showroom to purchase</div>
        </div>
      </footer>

      <QuoteModal open={quoteOpen} product={quoteProduct} onClose={() => setQuoteOpen(false)} />
    </div>
  )
}

export default App
