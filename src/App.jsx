import { useCallback, useEffect, useMemo, useState } from 'react'
import { categories, categoryLabel, legal, money, productImageStyle, products } from './data'

function readCart() {
  try {
    const stored = JSON.parse(localStorage.getItem('boyue-cart') || '[]')
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

function Brand() {
  return <span className="brand">BOYUÉ <small>HOME ESSENTIALS</small></span>
}

function Header({ onOpenCart, cartCount }) {
  return <>
    <div className="topbar">Complimentary delivery on orders over $500 <span>·</span> Designed for considered living</div>
    <header className="site-header">
      <a href="#home" aria-label="BOYUÉ home"><Brand /></a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#shop">Shop all</a><a href="#shop?category=seating">Seating</a><a href="#shop?category=lighting">Lighting</a><a href="#shop?category=tabletop">Tabletop</a><a href="#shop?category=textiles">Textiles</a><a href="#shop?category=storage">Storage</a>
      </nav>
      <div className="header-actions"><button className="icon-btn" type="button" aria-label="Search" onClick={() => { window.location.hash = '#shop' }}>⌕</button><a href="#admin" className="icon-btn" aria-label="Account">◯</a><button className="cart-trigger" type="button" onClick={onOpenCart}>Bag <span>{cartCount}</span></button></div>
    </header>
  </>
}

function Hero() {
  return <section id="home" className="hero">
    <div className="hero-copy"><p className="eyebrow">THE QUIET EDIT · 2026</p><h1>Objects with<br /><em>presence.</em></h1><p className="hero-text">A restrained collection of furniture and small rituals for rooms that feel like your own.</p><a href="#shop" className="button button-dark">Explore the collection <span>↗</span></a></div>
    <div className="hero-image"><img src="/assets/home-collection.png" alt="Curated home interiors featuring a boucle chair, pendant light, travertine table, linen bedding and oak console" /></div>
    <div className="hero-note">Five pieces. One point of view.<br /><b>Hong Kong · Est. 2024</b></div>
  </section>
}

function IntroSection() {
  return <section className="intro section-pad"><div><p className="eyebrow">A slower kind of home</p><h2>Made to stay<br />in the room.</h2></div><div className="intro-copy"><p>BOYUÉ brings together honest materials, tactile forms, and everyday objects with a little more intention. Each piece is selected for the way it settles into a space — quietly, over time.</p><a href="#about">Read our story →</a></div></section>
}

function CategoryStrip() {
  return <section className="category-strip section-pad"><div className="section-heading"><div><p className="eyebrow">Browse by mood</p><h2>The collection</h2></div><a href="#shop" className="text-link">View all pieces ↗</a></div><div className="category-grid">{categories.slice(1).map(([key, label, crop]) => <a className="category-card" href={`#shop?category=${key}`} key={key}><div className={`image-crop ${crop}`} /><span className="label">{label} <small>↗</small></span></a>)}</div></section>
}

function FeatureBanner() {
  return <section className="feature-banner section-pad"><div className="feature-image image-crop crop-3" /><div className="feature-copy"><p className="eyebrow">Material study / 04</p><h2>Warm stone,<br />soft edges.</h2><p>Natural travertine carries the marks of its making. We like the imperfect, the grounding, the things that become more beautiful with use.</p><a href="#shop?category=tabletop" className="button button-light">Shop tabletop <span>↗</span></a></div></section>
}

function Filters({ active }) {
  return <div className="filters">{categories.map(([key, label]) => <a className={`filter ${active === key ? 'active' : ''}`} href={`#shop${key === 'all' ? '' : `?category=${key}`}`} key={key}>{label}</a>)}</div>
}

function ProductCard({ product, position, onAdd }) {
  return <article className="product-card">
    <a href={`#product=${product.id}`}>
      <div className="product-media"><div className={`image-crop ${product.crop}`} style={productImageStyle(product)} />{position < 4 && <span className="badge">NEW ARRIVAL</span>}<button className="quick-add" type="button" onClick={(event) => { event.preventDefault(); onAdd(product.id) }} aria-label={`Add ${product.name}`}>+</button></div>
    </a>
    <div className="product-info"><div><strong>{product.name}</strong><p>{categoryLabel(product.category)} / {String(product.index + 1).padStart(2, '0')}</p></div><span className="price">{money(product.price)}</span></div>
  </article>
}

function Shop({ activeCategory, onAdd }) {
  const visibleProducts = useMemo(() => activeCategory === 'all' ? products : products.filter((product) => product.category === activeCategory), [activeCategory])
  const title = activeCategory === 'all' ? 'All pieces' : categories.find(([key]) => key === activeCategory)?.[1] || 'All pieces'

  return <section id="shop" className="shop section-pad"><div className="section-heading shop-heading"><div><p className="eyebrow">The edit</p><h2>{title}</h2></div><Filters active={activeCategory} /></div><div className="product-grid">{visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} position={index} onAdd={onAdd} />)}</div></section>
}

function Manifesto() {
  return <section id="about" className="manifesto section-pad"><div className="manifesto-mark">B</div><div><p className="eyebrow">About BOYUÉ</p><h2>Less noise.<br />More feeling.</h2><p>We believe a home is built from repeat encounters: the chair you reach for, the lamp you switch on first, the bowl that always finds its way to the table. BOYUÉ is a considered edit of those encounters.</p><a href="#contact" className="text-link">Talk to us →</a></div></section>
}

function Footer() {
  return <footer id="contact" className="site-footer"><div className="footer-top"><div className="footer-brand"><Brand /><p>Considered objects for everyday rooms.</p></div><div><h4>Explore</h4><a href="#shop">Shop all</a><a href="#shop?category=seating">Seating</a><a href="#shop?category=lighting">Lighting</a><a href="#shop?category=tabletop">Tabletop</a><a href="#shop?category=textiles">Textiles</a><a href="#shop?category=storage">Storage</a></div><div><h4>Care</h4><a href="#payment">Payment</a><a href="#returns">Returns & refunds</a><a href="#shipping">Shipping policy</a><a href="#tracking">Order tracking</a><a href="#cancellation">Cancellation policy</a></div><div><h4>Company</h4><a href="#about">About us</a><a href="#terms">Terms of service</a><a href="#privacy">Privacy policy</a><a href="#dmca">DMCA</a><a href="#admin">Admin portal</a></div></div><div className="footer-legal"><div><b>博裕貿易發展有限公司</b><br />381-383 Lockhart Road, Wan Chai District, Hong Kong Special Administrative Region<br />Registration no.: [to be completed by the legal entity]</div><div>boyumaoyifazhan@outlook.com<br />© 2026 BOYUÉ. All rights reserved.</div></div></footer>
}

function CartDrawer({ cart, isOpen, onClose, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  return <><aside className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}><div className="drawer-head"><div><p className="eyebrow">Your selection</p><h2>Shopping bag</h2></div><button type="button" onClick={onClose} className="close-btn" aria-label="Close shopping bag">×</button></div><div className="cart-items">{!cart.length ? <p className="empty-cart">Your bag is waiting for something with presence.<br /><br />Explore the collection to begin.</p> : cart.map((item) => <div className="cart-line" key={item.id}><div className="image-crop" style={productImageStyle(item)} /><div><h4>{item.name}</h4><p>{money(item.price)} · Qty {item.qty}</p></div><button type="button" className="remove-line" onClick={() => onRemove(item.id)}>Remove</button></div>)}</div><div className="drawer-foot"><div className="total-row"><span>Subtotal</span><strong>{money(total)}</strong></div><p className="fine-print">Taxes and delivery calculated at checkout.</p><button type="button" className="button button-dark full" onClick={onCheckout}>Proceed to checkout <span>→</span></button></div></aside><button type="button" className={`scrim ${isOpen ? 'open' : ''}`} aria-label="Close shopping bag" onClick={onClose} /></>
}

function TermsContent({ text }) {
  const sections = ['1. Acceptance', '2. Eligibility', '3. Accounts', '4. Products and descriptions', '5. Prices and availability', '6. Orders and acceptance', '7. Payment', '8. Delivery', '9. Returns and refunds', '10. Cancellation', '11. Intellectual property', '12. User content', '13. Prohibited use', '14. Disclaimers', '15. Limitation of liability', '16. Indemnity', '17. Governing law and contact']
  return <><p>By using this site or placing an order, you agree to the following 17 sections.</p>{sections.map((section) => <div key={section}><h3>{section}</h3><p>{text} This section is subject to applicable law and the company details shown below.</p></div>)}<h3>Company details</h3><p>博裕貿易發展有限公司 · 381-383 Lockhart Road, Wan Chai District, Hong Kong Special Administrative Region · boyumaoyifazhan@outlook.com</p></>
}

function Modal({ modal, onClose, onAdd, onLogin }) {
  if (!modal) return null
  let content
  if (modal.type === 'product') {
    const product = modal.product
    content = <><p className="eyebrow">{categoryLabel(product.category)} / {String(product.index + 1).padStart(2, '0')}</p><p>Designed for daily rituals, made with honest materials and a quiet silhouette.</p><h3>{money(product.price)}</h3><button type="button" className="button button-dark" onClick={() => onAdd(product.id)}>Add to cart <span>→</span></button></>
  } else if (modal.type === 'admin') {
    content = <div className="login-box"><p>Demo dashboard access for store management.</p><label htmlFor="admin-email">Email</label><input id="admin-email" defaultValue="admin@boyuehome.com" /><label htmlFor="admin-password">Password</label><input id="admin-password" type="password" defaultValue="Boyue2026!" /><button type="button" className="button button-dark full" onClick={onLogin}>Sign in <span>→</span></button><p className="fine-print">Demo credentials are shown for this prototype only. Connect a real auth provider before production.</p></div>
  } else if (modal.type === 'checkout') {
    content = <><p>Your order is ready. Choose a payment method to continue.</p><div className="payment-options"><button type="button" className="button button-dark full">PayPal <span>→</span></button><button type="button" className="button button-dark full">Visa / Credit card <span>→</span></button></div><p className="fine-print">Payment processing is a demo in this prototype. Add your PayPal or card processor keys to activate live payments.</p></>
  } else if (modal.type === 'legal') {
    const [title, text] = legal[modal.key] || legal.terms
    content = modal.key === 'terms' ? <TermsContent text={text} /> : <><p>{text}</p><h3>Company details</h3><p>博裕貿易發展有限公司<br />381-383 Lockhart Road, Wan Chai District, Hong Kong Special Administrative Region<br />boyumaoyifazhan@outlook.com</p></>
    return <div className="page-modal open"><div className="modal-card"><button type="button" className="close-btn" onClick={onClose} aria-label="Close information">×</button><div><p className="eyebrow">BOYUÉ / INFORMATION</p><h2>{title}</h2>{content}</div></div></div>
  }
  return <div className="page-modal open"><div className="modal-card"><button type="button" className="close-btn" onClick={onClose} aria-label="Close information">×</button><div><p className="eyebrow">BOYUÉ / INFORMATION</p><h2>{modal.title}</h2>{content}</div></div></div>
}

function App() {
  const [cart, setCart] = useState(readCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [hash, setHash] = useState(() => window.location.hash || '#home')
  const [modal, setModal] = useState(null)
  const activeCategory = useMemo(() => hash.startsWith('#shop') ? hash.split('?category=')[1] || 'all' : 'all', [hash])

  const showToast = useCallback((message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }, [])

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || '#home')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => localStorage.setItem('boyue-cart', JSON.stringify(cart)), [cart])

  useEffect(() => {
    if (hash.startsWith('#shop')) {
      window.requestAnimationFrame(() => document.querySelector('#shop')?.scrollIntoView())
      setModal(null)
    } else if (hash.startsWith('#product=')) {
      const product = products.find((item) => item.id === hash.split('=')[1])
      setModal(product ? { type: 'product', title: product.name, product } : null)
    } else if (legal[hash.slice(1)]) {
      setModal({ type: 'legal', key: hash.slice(1) })
    } else if (hash === '#admin') {
      setModal({ type: 'admin', title: 'Admin portal' })
    } else {
      setModal(null)
    }
  }, [hash])

  const addToCart = useCallback((id) => {
    const product = products.find((item) => item.id === id)
    if (!product) return
    setCart((current) => {
      const existing = current.find((item) => item.id === id)
      return existing ? current.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item) : [...current, { ...product, qty: 1 }]
    })
    showToast(`${product.name} added to your bag`)
    setCartOpen(true)
  }, [showToast])

  const closeModal = () => { setModal(null); window.history.pushState({}, '', window.location.pathname + window.location.search) }
  const checkout = () => cart.length ? setModal({ type: 'checkout', title: 'Secure checkout' }) : showToast('Your bag is empty')

  return <>
    <Header onOpenCart={() => setCartOpen(true)} cartCount={cart.reduce((total, item) => total + item.qty, 0)} />
    <main id="app"><Hero /><IntroSection /><CategoryStrip /><FeatureBanner /><Shop activeCategory={activeCategory} onAdd={addToCart} /><Manifesto /></main>
    <Footer />
    <CartDrawer cart={cart} isOpen={cartOpen} onClose={() => setCartOpen(false)} onRemove={(id) => setCart((current) => current.filter((item) => item.id !== id))} onCheckout={checkout} />
    <Modal modal={modal} onClose={closeModal} onAdd={addToCart} onLogin={() => showToast('Demo dashboard signed in')} />
    <div className={`toast ${toast ? 'show' : ''}`} role="status">{toast}</div>
  </>
}

export default App
