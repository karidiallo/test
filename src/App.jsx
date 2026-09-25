import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LivingMap } from './components/LivingMap.jsx'
import { TopographicLogo } from './components/TopographicLogo.jsx'
import { diagnosis, offers, symptoms } from './content.js'

gsap.registerPlugin(ScrollTrigger)

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function Header() {
  return (
    <header className="header">
      <TopographicLogo />
      <nav aria-label="Główna nawigacja">
        <a href="#system">Jak pomagamy</a>
        <a href="#sample">Przykładowa Mapa</a>
        <a href="#offer">Oferta</a>
      </nav>
      <a className="header-cta" href="#scan">Sprawdź swoją firmę <Arrow /></a>
    </header>
  )
}

function Story({ progressRef, selectedFocusRef, onSelectSymptom }) {
  const storyRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progressRef.current = 0.65
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: storyRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => { progressRef.current = self.progress },
    })

    return () => trigger.kill()
  }, [progressRef])

  return (
    <section className="story" id="top" ref={storyRef}>
      <div className="story-canvas-wrap">
        <LivingMap progressRef={progressRef} selectedFocusRef={selectedFocusRef} />
      </div>

      <div className="story-steps">
        <div className="story-step hero-step">
          <div className="step-copy step-copy--hero">
            <div className="eyebrow">DIAGNOSTYKA MARKETINGOWA</div>
            <h1>Zanim wydasz więcej na marketing,<br /><span>sprawdź, co naprawdę blokuje Twój wzrost.</span></h1>
            <p className="hero-lead">DigitalMap analizuje drogę od widoczności do klienta, znajduje najważniejsze wąskie gardło i pokazuje, <b>co zrobić najpierw — oraz czego na razie nie ruszać.</b></p>
            <div className="hero-actions">
              <a className="button button--dark" href="#scan">Sprawdź swoją firmę <Arrow /></a>
              <a className="button button--ghost" href="#sample">Zobacz przykładową Mapę</a>
            </div>
            <div className="micro-proof"><span>Mini Mapa · 0 zł</span><span>Bez abonamentu</span><span>Bez obowiązku wdrożenia</span></div>
          </div>
        </div>

        <div className="story-step" id="system">
          <div className="step-copy step-copy--panel">
            <div className="eyebrow">01 / PROBLEM Z MARKETINGIEM</div>
            <h2>Objaw nie mówi jeszcze, gdzie naprawdę zaczyna się problem.</h2>
            <p>Masz za mało klientów, ruch nie zamienia się w zapytania albo konkurencja wygrywa? Zamiast zgadywać kanał, najpierw ustalamy, gdzie naprawdę zaczyna się strata.</p>
            <div className="symptom-mini-list">
              {symptoms.map((item) => (
                <button key={item.id} onClick={() => onSelectSymptom(item)}>{item.label}<Arrow /></button>
              ))}
            </div>
          </div>
        </div>

        <div className="story-step">
          <div className="step-copy step-copy--panel step-copy--right">
            <div className="eyebrow">02 / JAK MAPUJEMY WZROST</div>
            <h2>Mapujemy całą drogę od widoczności do klienta.</h2>
            <p>Badamy rynek, widoczność, zaufanie, ofertę, konwersję i konkurencję. Szukamy miejsca, które dziś najbardziej ogranicza wynik — nie listy wszystkiego, co można poprawić.</p>
            <div className="signal-line"><i /> PROBLEM #1 <span>oferta / ścieżka kontaktu</span></div>
          </div>
        </div>

        <div className="story-step">
          <div className="step-copy step-copy--panel">
            <div className="eyebrow">03 / CO DOSTAJESZ</div>
            <h2>Nie listę błędów. <span className="accent-text">Jasną hierarchię decyzji.</span></h2>
            <p>Problem #1, dowody, priorytet, pierwszy ruch, plan działania, rzeczy „nie teraz” i miernik, po którym można ocenić efekt zmiany.</p>
            <a className="text-link" href="#sample">Zobacz przykładową Mapę <Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

function SampleMap() {
  const [tab, setTab] = useState('decision')
  const tabs = {
    decision: ['DECYZJA', diagnosis.decision],
    now: ['PIERWSZY RUCH', diagnosis.doNow],
    later: ['NIE TERAZ', diagnosis.notNow],
    measure: ['MIERNIK', diagnosis.measure],
  }

  return (
    <section className="section section--dark" id="sample">
      <div className="section-shell">
        <div className="section-heading section-heading--split">
          <div className="eyebrow">04 / PRZYKŁADOWA MAPA</div>
          <div>
            <h2>Zobacz, jak wygląda <span className="accent-text">decyzja zamiast listy błędów.</span></h2>
            <p>Przykładowy format wyniku dla firmy usługowej. Mapa ma odpowiedzieć: co zrobić najpierw, czego teraz nie ruszać i po czym poznać, że zmiana działa.</p>
          </div>
        </div>

        <div className="diagnosis-ui">
          <aside className="diagnosis-rail">
            <TopographicLogo inverted />
            <div className="rail-nav">
              <button className="active">Przegląd</button>
              <button>Droga klienta</button>
              <button>Dowody</button>
              <button>Plan 30 dni</button>
            </div>
            <small>PRZYKŁADOWY FORMAT / firma usługowa</small>
          </aside>

          <div className="diagnosis-main">
            <div className="diagnosis-top"><span>STATUS ANALIZY</span><b>zakończona</b></div>
            <div className="priority-layout">
              <div className="priority-copy">
                <span className="priority-no">PROBLEM #1</span>
                <h3>{diagnosis.problem}</h3>
                <p>Ruch już dociera na stronę, ale użytkownik nie dostaje wystarczającego powodu ani wystarczająco prostej drogi do kontaktu.</p>
              </div>
              <div className="evidence-stack">
                {diagnosis.evidence.map(([name, text]) => (
                  <div className="evidence-row" key={name}><span>{name}</span><strong>{text}</strong></div>
                ))}
              </div>
            </div>
            <div className="decision-tabs">
              {Object.entries(tabs).map(([key, [label]]) => (
                <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>{label}</button>
              ))}
            </div>
            <div className="decision-output">
              <div><span>{tabs[tab][0]}</span><strong>{tabs[tab][1]}</strong></div>
              <a href="#scan">Sprawdź swoją firmę <Arrow /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Principle() {
  return (
    <section className="principle">
      <div className="principle-inner">
        <div className="eyebrow">CZYM DIGITALMAP RÓŻNI SIĘ OD AGENCJI</div>
        <h2>Najpierw diagnoza.<br /><span>Dopiero potem rozwiązanie.</span></h2>
        <div className="principle-grid">
          <p>Nie zaczynamy od sprzedaży kanału. Najpierw diagnozujemy, gdzie faktycznie zatrzymuje się wynik.</p>
          <p>Dopiero potem można zdecydować, czy potrzebne jest SEO, Ads, redesign, CRO czy zupełnie inny ruch.</p>
          <p>Rekomendacje możesz wdrożyć samodzielnie, z własnym zespołem, inną firmą albo z DigitalMap.</p>
        </div>
      </div>
    </section>
  )
}

function Evidence() {
  const items = [
    ['01', 'Strona i oferta', 'Czy klient w kilka sekund rozumie, co oferujesz, dla kogo to jest i dlaczego ma wybrać właśnie Ciebie?'],
    ['02', 'Wizytówka Google', 'Sprawdzamy widoczność lokalną, kompletność profilu, opinie, kategorie i to, jak firma wygląda obok konkurencji.'],
    ['03', 'Social media', 'Czy kanały społecznościowe budują zaufanie i wspierają decyzję klienta, czy tylko generują aktywność bez biznesowego efektu?'],
    ['04', 'Widoczność i ruch', 'Patrzymy, skąd przychodzą klienci, gdzie firma znika z pola widzenia i czy pozyskiwany ruch ma właściwą intencję.'],
    ['05', 'Reklamy i marketing', 'Nie pytamy tylko, czy kampania ma kliknięcia. Sprawdzamy, czy budżet prowadzi do jakościowych zapytań i gdzie wynik się urywa.'],
    ['06', 'Zaufanie i reputacja', 'Opinie, dowody, komunikacja i spójność marki często decydują o wyborze wcześniej niż sam cennik czy zakres usługi.'],
  ]

  return (
    <section className="section section--paper">
      <div className="section-shell">
        <div className="section-heading section-heading--split">
          <div className="eyebrow">05 / CO SPRAWDZAMY</div>
          <div><h2>Patrzymy na cały system, <span className="accent-text">nie jeden kanał.</span></h2><p>Łączymy sygnały z całej drogi klienta, żeby ustalić, co jest dziś problemem #1, a co tylko kolejną rzeczą, którą można byłoby poprawić.</p></div>
        </div>
        <div className="evidence-grid">
          {items.map(([no, title, copy]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>
  )
}

function Offer() {
  return (
    <section className="section section--ink" id="offer">
      <div className="section-shell">
        <div className="section-heading section-heading--split">
          <div className="eyebrow">06 / OFERTA</div>
          <div><h2>Najpierw ustal, co ma sens. <span className="accent-text">Potem wybierz kolejny ruch.</span></h2><p>Nie musisz sam diagnozować, którego produktu potrzebujesz. Możesz zacząć od pierwszego sygnału albo wejść od razu w pełną diagnozę procesu pozyskania klienta.</p></div>
        </div>
        <div className="offer-grid">
          {offers.map((offer) => (
            <article className={`offer-card ${offer.featured ? 'offer-card--featured' : ''}`} key={offer.code}>
              <div className="offer-top"><span>{offer.code}</span>{offer.featured && <b>GŁÓWNY PRODUKT</b>}</div>
              <h3>{offer.name}</h3>
              <p>{offer.copy}</p>
              <div className="offer-price">{offer.price}</div>
              <a href="#scan">{offer.cta} <Arrow /></a>
            </article>
          ))}
        </div>
        <div className="special-paths"><span>Nie wiesz, czego potrzebujesz?</span> Wyślij firmę — pomożemy dobrać właściwy zakres. Mapa Start i Mapa AI zostają jako ścieżki specjalistyczne.</div>
      </div>
    </section>
  )
}

function ScanForm({ selectedSymptom }) {
  const [step, setStep] = useState(0)
  const [domain, setDomain] = useState('')
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (step === 0 && domain.trim()) setStep(1)
    else if (step === 1) setStep(2)
    else if (step === 2 && email.includes('@')) setDone(true)
  }

  return (
    <section className="scan" id="scan">
      <div className="scan-shell">
        <div className="scan-copy">
          <div className="eyebrow">07 / MINI MAPA</div>
          <h2>Sprawdź swoją firmę, zanim wydasz więcej.</h2>
          <p>Zacznij od pierwszego sygnału. Na start wystarczy domena i krótki kontekst — bez abonamentu i bez obowiązku kupowania wdrożenia.</p>
          <div className="scan-steps"><span className={step >= 0 ? 'active' : ''}>01 FIRMA</span><span className={step >= 1 ? 'active' : ''}>02 PROBLEM</span><span className={step >= 2 ? 'active' : ''}>03 KONTAKT</span></div>
        </div>

        <form className="scan-card" onSubmit={submit}>
          {!done && step === 0 && <>
            <span className="form-kicker">MINI MAPA / 0 ZŁ</span>
            <h3>Od jakiej firmy zaczynamy?</h3>
            <label>Domena / nazwa firmy</label>
            <input autoFocus value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="twojafirma.pl" />
            <button type="submit">Sprawdź swoją firmę <Arrow /></button>
            <small>Bez abonamentu. Bez obowiązku wdrożenia.</small>
          </>}

          {!done && step === 1 && <>
            <span className="form-kicker">KRÓTKI KONTEKST</span>
            <h3>Z czym dziś najbardziej się mierzysz?</h3>
            <div className="form-options">
              {symptoms.map((item) => <button key={item.id} type="button" className={selectedSymptom.id === item.id ? 'active' : ''} onClick={() => { selectedSymptom.set(item); setStep(2) }}>{item.label}</button>)}
            </div>
            <small>Ta odpowiedź nie jest diagnozą — pomaga tylko ustawić pierwszy kierunek analizy.</small>
          </>}

          {!done && step === 2 && <>
            <span className="form-kicker">MINI MAPA</span>
            <h3>Gdzie mamy wrócić z pierwszym kierunkiem?</h3>
            <div className="domain-confirm"><span>{domain || 'twojafirma.pl'}</span><b>{selectedSymptom.value.short}</b></div>
            <label>E-mail</label>
            <input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="kontakt@twojafirma.pl" />
            <button type="submit">Wyślij pierwszy kierunek <Arrow /></button>
            <small>Wersja testowa strony — wysyłkę formularza podłączymy przed publikacją produkcyjną.</small>
          </>}

          {done && <div className="form-success"><span>✓</span><h3>Dzięki.</h3><p>W docelowej wersji w tym miejscu potwierdzimy zgłoszenie i wrócimy z pierwszym kierunkiem analizy.</p><button type="button" onClick={() => { setDone(false); setStep(0) }}>Sprawdź inną firmę</button></div>}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return <footer><TopographicLogo inverted /><p>Najpierw znajdź problem. Potem zdecyduj, na co warto wydać pieniądze.</p><span>© 2026 DigitalMap</span></footer>
}

export default function App() {
  const progressRef = useRef(0)
  const selectedFocusRef = useRef(0.62)
  const [selectedSymptomValue, setSelectedSymptomValue] = useState(symptoms[1])

  function selectSymptom(item) {
    setSelectedSymptomValue(item)
    selectedFocusRef.current = item.focus
  }

  return (
    <>
      <Header />
      <main>
        <Story progressRef={progressRef} selectedFocusRef={selectedFocusRef} onSelectSymptom={selectSymptom} />
        <SampleMap />
        <Principle />
        <Evidence />
        <Offer />
        <ScanForm selectedSymptom={{ id: selectedSymptomValue.id, value: selectedSymptomValue, set: selectSymptom }} />
      </main>
      <Footer />
    </>
  )
}
