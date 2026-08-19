import React, { useState } from 'react'

function Header({ onOpen }){
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo"><img src="/images/logo.svg" alt="CamelShoes"/></div>
        <nav className="nav">
          <a href="#produtos">Produtos</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#contato">Contato</a>
        </nav>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={onOpen}>Entrar na fila</button>
        </div>
      </div>
    </header>
  )
}

function ProductCard({img, imgFallback, title, price, desc, onAction, badge, delay}){
  const style = delay ? { ['--delay']: `${delay}s` } : {}
  return (
    <article className="card fade-in" style={style}>
      {/* If img is a React element, render it directly; otherwise use FallbackImg */}
      {React.isValidElement(img) ? img : <FallbackImg className="" srcPrimary={img} srcFallback={imgFallback} alt={title} />}
      <div className="card-body">
        {badge ? <div className="badge" style={{marginBottom:12}}>{badge}</div> : null}
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="muted">{desc}</p>
        <button className="btn btn-primary" onClick={onAction}>Comprar</button>
      </div>
    </article>
  )
}

function Modal({open, onClose, children}){
  if(!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  )
}

function FallbackImg({srcPrimary, srcFallback, alt, className}){
  const [src, setSrc] = React.useState(srcPrimary)
  React.useEffect(()=>{
    setSrc(srcPrimary)
  },[srcPrimary])

  // render wrapped figure with overlay for better visual treatment
  return (
    <figure className={`img-figure ${className || ''}`} aria-hidden={false}>
      <img className="img-figure-img" src={src} alt={alt} onError={() => setSrc(srcFallback)} loading="lazy" />
    </figure>
  )
}

/* Inline SVG components to guarantee visuals even if file serving fails */
function HorseSVG(){
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="product-art floating">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="#d9c2ff" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#fff" rx="24" />
      <g transform="translate(120,80) scale(1.2)">
        <path d="M260 40c90 0 170 72 170 160s-80 160-170 160S90 290 90 200 170 40 260 40z" fill="url(#g)" stroke="#2b0036" strokeWidth="8"/>
        <g fill="#fff" opacity="0.95">
          <circle cx="130" cy="160" r="12"/>
          <circle cx="200" cy="115" r="12"/>
          <circle cx="280" cy="115" r="12"/>
          <circle cx="350" cy="160" r="12"/>
          <circle cx="260" cy="210" r="12"/>
        </g>
        <path d="M140 110c35-28 200-28 235 0" fill="none" stroke="#ffffff66" strokeWidth="18" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

function BlacksmithSVG(){
  return (
    <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fff" rx="20" />
      <g transform="translate(60,60)" fill="#5b1fa6">
        <rect x="40" y="360" width="140" height="40" rx="8" />
        <path d="M260 80c50 0 100 50 100 100s-50 100-100 100-100-50-100-100 50-100 100-100z"/>
      </g>
    </svg>
  )
}

function CamelSVG(){
  return (
    <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fff" rx="20" />
      <g transform="translate(60,80)" fill="#2b0036">
        <path d="M120 220c40-30 90-30 140-30s120-20 160-20 90 20 120 20 80-10 110-20 50-30 80-40 40-30 40-30v200H120z"/>
      </g>
    </svg>
  )
}

function TestimonialSVG(){
  return (
    <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="16" fill="#f6f0ff" />
      <g transform="translate(30,40)" fill="#2b0036">
        <ellipse cx="260" cy="140" rx="120" ry="70" />
        <path d="M360 80c8 8 16 24 10 32-6 8-26 12-34 6s-8-26 0-34 12-8 24-4z" />
      </g>
    </svg>
  )
}

function CarouselHero(){
  const slides = [
    { img: '/images/hero-hi.jpg', fallback: '/images/hero.jpg', kicker: 'Nova coleção', title: 'Ferraduras feitas para camelos.', lede: 'Conforto, tração e durabilidade — projetadas para longas jornadas no deserto.', cta: 'Ver produtos' },
    { img: '/images/desert-pro-hi.jpg', fallback: '/images/desert-pro2.jpg', kicker: 'Destaque', title: 'Desert Pro — resistência e leveza', lede: 'Aço tratado e perfis antideslizantes para quem enfrenta as rotas mais exigentes.', cta: 'Conheça o Desert Pro' },
    { img: '/images/long-ride-hi.jpg', fallback: '/images/long-ride2.jpg', kicker: 'Personalize', title: 'Ferraduras customizadas', lede: 'Ajuste sob medida para camelos com necessidades especiais.', cta: 'Encomende agora' }
  ]

  const [idx, setIdx] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [transitioning, setTransitioning] = React.useState(false)

  // autoplay with fade transition
  React.useEffect(()=>{
    if(paused) return
    const t = setInterval(()=>{
      setTransitioning(true)
      setTimeout(()=>{
        setIdx(i=> (i+1) % slides.length)
        setTransitioning(false)
      }, 350)
    }, 6000)
    return ()=> clearInterval(t)
  }, [paused])

  // keyboard navigation
  React.useEffect(()=>{
    function onKey(e){
      if(e.key === 'ArrowLeft'){
        setTransitioning(true); setTimeout(()=>{ setIdx(i=> (i-1+slides.length)%slides.length); setTransitioning(false) }, 180)
      }
      if(e.key === 'ArrowRight'){
        setTransitioning(true); setTimeout(()=>{ setIdx(i=> (i+1)%slides.length); setTransitioning(false) }, 180)
      }
    }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [])

  // pause autoplay when tab not visible
  React.useEffect(()=>{
    function onVis(){ if(document.hidden) setPaused(true); else setPaused(false) }
    document.addEventListener('visibilitychange', onVis)
    return ()=> document.removeEventListener('visibilitychange', onVis)
  }, [])

  // preload slide images for smoother transitions
  React.useEffect(()=>{
    slides.forEach(s=>{
      const img = new Image()
      img.src = s.img
    })
  }, [])

  const touchStartX = React.useRef(null)

  function handleTouchStart(e){
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX
  }
  function handleTouchEnd(e){
    if(touchStartX.current === null) return
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const diff = endX - touchStartX.current
    const threshold = 40
    if(diff > threshold) {
      // swipe right -> prev
      setTransitioning(true); setTimeout(()=>{ setIdx(i=> (i-1+slides.length)%slides.length); setTransitioning(false) }, 180)
    } else if(diff < -threshold) {
      // swipe left -> next
      setTransitioning(true); setTimeout(()=>{ setIdx(i=> (i+1)%slides.length); setTransitioning(false) }, 180)
    }
    touchStartX.current = null
  }

  return (
    <section className="hero hero-carousel" aria-roledescription="carousel">
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="kicker">{slides[idx].kicker}</div>
          <h1>{slides[idx].title}</h1>
          <p className="lede">{slides[idx].lede}</p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#produtos">{slides[idx].cta}</a>
            <a className="btn btn-ghost" href="#como-funciona">Como funciona</a>
          </div>
          <ul className="hero-features">
            <li>Leve e resistente</li>
            <li>Fixação profissional</li>
            <li>Para longas rotas</li>
          </ul>
        </div>

        <div className="hero-media" aria-hidden="true" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="device-mock">
            <FallbackImg
              className={`product-art floating ${transitioning? 'fade-out':''}`}
              srcPrimary={slides[idx].img}
              srcFallback={'/images/horseshoe-detailed.svg'}
              alt={slides[idx].title}
            />
            <div className="device-glow" aria-hidden="true"></div>
          </div>

          <button className="carousel-arrow left" aria-label="Anterior" onClick={()=>{ setTransitioning(true); setTimeout(()=>{ setIdx(i=> (i-1+slides.length)%slides.length); setTransitioning(false) }, 200) }}>&lt;</button>
          <button className="carousel-arrow right" aria-label="Próximo" onClick={()=>{ setTransitioning(true); setTimeout(()=>{ setIdx(i=> (i+1)%slides.length); setTransitioning(false) }, 200) }}>&gt;</button>

          <div className="carousel-indicators" role="tablist">
            {slides.map((s,i)=> (
              <button key={i} className={i===idx? 'active': ''} onClick={()=>{ setTransitioning(true); setTimeout(()=>{ setIdx(i); setTransitioning(false) }, 200) }} aria-label={`Slide ${i+1}`}></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App(){
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')

  // small parallax effect for the hero product art
  React.useEffect(()=>{
    const el = document.querySelector('.device-mock .product-art')
    if(!el) return
    let rafId = null
    function onScroll(){
      if(rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(()=>{
        const rect = el.getBoundingClientRect()
        const winH = window.innerHeight
        // progress from -1 to 1 where 0 is center
        const progress = ((rect.top + rect.height/2) - winH/2) / (winH/2)
        const translate = Math.max(Math.min(progress * -10, 12), -12)
        el.style.transform = `translateY(${translate}px) scale(1)`
      })
    }
    window.addEventListener('scroll', onScroll, {passive:true})
    onScroll()
    return ()=>{
      window.removeEventListener('scroll', onScroll)
      if(rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  function handleJoin(){
    setOpen(true)
  }

  function handlePurchase(name){
    setMsg(`Obrigado! Produto ${name} adicionado à sua compra (simulação).`)
    setOpen(true)
  }

  return (
    <div>
      <Header onOpen={handleJoin} />

      <main>
        <CarouselHero />

        <section id="produtos" className="section container products">
          <h2 className="section-title">Nossos modelos</h2>
          <p className="section-sub">Escolha entre modelos para diferentes tipos de terreno e distâncias.</p>

          <div className="product-grid">
            <ProductCard img={'/images/desert-pro-hi.jpg'} imgFallback={'/images/desert-pro2.jpg'} title="Desert Pro" price="R$ 349,00" desc="Aço tratado, perfis antideslizantes" onAction={()=>handlePurchase('Desert Pro')} badge={'Novo'} delay={0.06} />
            <ProductCard img={'/images/long-ride-hi.jpg'} imgFallback={'/images/long-ride2.jpg'} title="Long Ride" price="R$ 699,00" desc="Almofadada e absorção de impacto" onAction={()=>handlePurchase('Long Ride')} delay={0.16} />
            <ProductCard img={'/images/hero-hi.jpg'} imgFallback={'/images/hero.jpg'} title="Custom" price="R$ 1.499,00" desc="Ajuste sob medida para camelos" onAction={()=>handlePurchase('Custom')} delay={0.26} />
          </div>
        </section>

        <section className="banner-section" aria-hidden="false">
          <div className="banner">
            <div className="banner-copy">
              <h2>Projetado para o deserto</h2>
              <p className="muted">Materiais de alta resistência e um encaixe preciso para jornadas longas — testado em condições reais.</p>
              <div className="banner-cta"><a className="btn btn-primary" href="#produtos">Saiba mais</a></div>
            </div>
            <div className="banner-media">
              <FallbackImg srcPrimary={'/images/desert-pro-hi.jpg'} srcFallback={'/images/desert-pro2.jpg'} alt="Ferradura Desert Pro" />
            </div>
          </div>
        </section>

        <section id="como-funciona" className="section how container">
          <h2 className="section-title">Como funciona</h2>
          <div className="how-grid">
            <div className="how-step"><h4>1. Escolha o modelo</h4><p className="muted">Selecione o modelo e tamanho.</p></div>
            <div className="how-step"><h4>2. Medida e ajuste</h4><p className="muted">Tire as medidas com nosso guia ou solicite visita técnica.</p></div>
            <div className="how-step"><h4>3. Aplicação profissional</h4><p className="muted">Aplicação por especialista para máxima durabilidade.</p></div>
          </div>
        </section>

        <section className="section container testimonial">
        <div className="testimonial-inner">
            <FallbackImg srcPrimary={'/images/camel-testimonial-hi.jpg'} srcFallback={'/images/camel-testimonial.jpg'} alt="Camelo satisfeito" />
            <blockquote>
              "Desde que uso as ferraduras CamelShoes, minhas viagens ficaram mais estáveis."<cite>— Ahmed, caravaneiro</cite>
            </blockquote>
          </div>
        </section>

        <section className="section container faq">
          <h2 className="section-title">FAQ</h2>
          <details>
            <summary>Como escolho o tamanho?</summary>
            <p className="muted">Use nosso guia de medidas ou solicite visita técnica para medição precisa.</p>
          </details>
          <details>
            <summary>Qual o prazo de entrega?</summary>
            <p className="muted">Produção em até 7 dias úteis + frete (simulado).</p>
          </details>
          <details>
            <summary>Tem garantia?</summary>
            <p className="muted">Garantia de 90 dias para defeitos de produção (simulado).</p>
          </details>
        </section>
      </main>

      <footer id="contato" className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>CamelShoes</strong>
            <p className="muted">Ferraduras para camelo — design e resistência</p>
          </div>
          <div className="footer-links">
            <a href="#">Suporte</a>
            <a href="#">Política de privacidade</a>
          </div>
        </div>
      </footer>

      <Modal open={open} onClose={()=>setOpen(false)}>
        <div style={{padding:20}}>
          <h3>Fila / Simulação de compra</h3>
          <p className="muted">{msg || 'Insira seu e-mail para entrar na fila (simulação).'}</p>
          <form onSubmit={(e)=>{e.preventDefault(); setMsg('Registrado! Você entrou na fila (simulado).')}}>
            <input name="email" placeholder="Seu e-mail" style={{width:'100%',padding:'10px',marginTop:12,borderRadius:8,border:'1px solid #e6e0f8'}} />
            <div style={{display:'flex',justifyContent:'flex-end',marginTop:12}}>
              <button className="btn btn-ghost" type="button" onClick={()=>setOpen(false)} style={{marginRight:8}}>Cancelar</button>
              <button className="btn btn-primary" type="submit">Entrar na fila</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}
