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
        <a href="#system">System</a>
        <a href="#sample">Przykład</a>
        <a href="#offer">Oferta</a>
      </nav>
      <a className="header-cta" href="#scan">Zmapuj firmę <Arrow /></a>
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
            <div className="eyebrow">DIGITALMAP / DIAGNOZA PRZED WYDATKIEM</div>
            <h1>Marketing ma wiele kanałów.<br /><span>Wzrost blokuje jedno najważniejsze miejsce.</span></h1>
            <p className="hero-lead">DigitalMap analizuje drogę od pierwszego kontaktu do przychodu, znajduje problem #1 i daje Ci jasną decyzję: <b>co zrobić teraz, czego nie ruszać i po czym poznać, że zadziałało.</b></p>
            <div className="hero-actions">
              <a className="button button--dark" href="#scan">Zmapuj moją firmę <Arrow /></a>
              <a className="button button--ghost" href="#sample">Otwórz przykładową diagnozę</a>
            </div>
            <div className="micro-proof"><span>Mini Mapa · 0 zł</span><span>Bez abonamentu</span><span>Bez obowiązku wdrożenia</span></div>
          </div>
        </div>

        <div className="story-step" id="system">
          <div className="step-copy step-copy--panel">
            <div className="eyebrow">01 / SYMPTOM ≠ PRZYCZYNA</div>
            <h2>Co widzisz po swojej stronie?</h2>
            <p>Wybierz objaw. Mapa pokaże miejsce, które warto sprawdzić — nie będziemy udawać, że sam objaw jest już diagnozą.</p>
            <div className="symptom-mini-list">
              {symptoms.map((item) => (
                <button key={item.id} onClick={() => onSelectSymptom(item)}>{item.label}<Arrow /></button>
              ))}
            </div>
          </div>
        </div>

        <div className="story-step">
          <div className="step-copy step-copy--panel step-copy--right">
            <div className="eyebrow">02 / BOTTLENECK</div>
            <h2>Problem rzadko zaczyna się tam, gdzie go widać.</h2>
            <p>Więcej ruchu nie naprawi słabej oferty. Lepszy landing nie naprawi braku zaufania. DigitalMap szuka miejsca, w którym realnie urywa się wynik.</p>
            <div className="signal-line"><i /> WĄSKIE GARDŁO <span>oferta / kontakt</span></div>
          </div>
        </div>

        <div className="story-step">
          <div className="step-copy step-copy--panel">
            <div className="eyebrow">03 / DECYZJA</div>
            <h2>Dane nie są diagnozą. <span className="accent-text">Potrzebujesz kolejności.</span></h2>
            <p>Dlatego outputem nie jest 80-punktowa lista błędów. To decyzja: problem #1 → dowody → priorytet → pierwszy ruch → „nie teraz” → miernik.</p>
            <a className="text-link" href="#sample">Zobacz, jak wygląda wynik <Arrow /></a>
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
    now: ['ZRÓB TERAZ', diagnosis.doNow],
    later: ['NIE TERAZ', diagnosis.notNow],
    measure: ['MIERNIK', diagnosis.measure],
  }

  return (
    <section className="section section--dark" id="sample">
      <div className="section-shell">
        <div className="section-heading section-heading--split">
          <div className="eyebrow">04 / PRZYKŁADOWA MAPA</div>
          <div>
            <h2>Nie raport. <span className="accent-text">Interfejs do podjęcia decyzji.</span></h2>
            <p>Ta sekcja ma wyglądać jak produkt, nie jak PDF sprzedawany przez agencję.</p>
          </div>
        </div>

        <div className="diagnosis-ui">
          <aside className="diagnosis-rail">
            <TopographicLogo inverted />
            <div className="rail-nav">
              <button className="active">Overview</button>
              <button>Customer path</button>
              <button>Evidence</button>
              <button>30 days</button>
            </div>
            <small>DEMO / firma usługowa</small>
          </aside>

          <div className="diagnosis-main">
            <div className="diagnosis-top"><span>STATUS ANALIZY</span><b>zakończona</b></div>
            <div className="priority-layout">
              <div className="priority-copy">
                <span className="priority-no">PRIORITY 01</span>
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
              <a href="#scan">Uruchom dla swojej firmy <Arrow /></a>
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
        <div className="eyebrow">NASZA ZASADA</div>
        <h2>Jeśli problemem nie jest SEO,<br /><span>nie sprzedamy Ci SEO.</span></h2>
        <div className="principle-grid">
          <p>Jeśli więcej ruchu nie zwiększy sprzedaży, nie każemy Ci kupować więcej ruchu.</p>
          <p>Jeśli coś działa, nie będziemy tego naprawiać tylko po to, żeby mieć co wdrożyć.</p>
          <p>DigitalMap istnieje po to, żeby znaleźć właściwą decyzję — nie właściwą usługę do sprzedania.</p>
        </div>
      </div>
    </section>
  )
}

function Evidence() {
  const items = [
    ['01', 'Strona', 'Oferta, UX, CTA, formularze i ścieżka kontaktu.'],
    ['02', 'Widoczność', 'Google, SEO, lokalność, AI Search i źródła ruchu.'],
    ['03', 'Zaufanie', 'Opinie, reputacja, proof, komunikacja i przewagi.'],
    ['04', 'Marketing', 'Ads, social, koszt, jakość leadów i spójność kanałów.'],
    ['05', 'Konkurencja', 'Co sprawia, że inny wybór jest dla klienta prostszy.'],
    ['06', 'Ekonomia', 'Gdzie wynik kończy się na aktywności zamiast przychodzie.'],
  ]

  return (
    <section className="section section--paper">
      <div className="section-shell">
        <div className="section-heading section-heading--split">
          <div className="eyebrow">05 / EVIDENCE</div>
          <div><h2>Każda rekomendacja musi mieć <span className="accent-text">podstawę.</span></h2><p>Nie dodajemy kanałów do oferty. Łączymy sygnały z całej drogi klienta.</p></div>
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
          <div><h2>Wybierasz głębokość diagnozy. <span className="accent-text">Nie katalog usług.</span></h2><p>Na homepage pokazujemy trzy logiczne etapy zamiast zmuszać klienta do samodzielnego diagnozowania, którego produktu potrzebuje.</p></div>
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
        <div className="special-paths"><span>Ścieżki specjalistyczne:</span> Mapa AI · Mapa Start · zakres dobierany po pierwszym sygnale</div>
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
          <div className="eyebrow">07 / START</div>
          <h2>Uruchom DigitalMap dla swojej firmy.</h2>
          <p>V1 używa progressive form: najpierw działanie, potem kontekst, na końcu kontakt. Dzięki temu nie wygląda jak klasyczny formularz leadowy agencji.</p>
          <div className="scan-steps"><span className={step >= 0 ? 'active' : ''}>01 DOMENA</span><span className={step >= 1 ? 'active' : ''}>02 PROBLEM</span><span className={step >= 2 ? 'active' : ''}>03 WYNIK</span></div>
        </div>

        <form className="scan-card" onSubmit={submit}>
          {!done && step === 0 && <>
            <span className="form-kicker">MINI MAPA / 0 ZŁ</span>
            <h3>Jaki biznes mamy zmapować?</h3>
            <label>Domena / nazwa firmy</label>
            <input autoFocus value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="twojafirma.pl" />
            <button type="submit">Zmapuj <Arrow /></button>
            <small>Bez abonamentu. Bez obowiązku wdrożenia.</small>
          </>}

          {!done && step === 1 && <>
            <span className="form-kicker">SYMPTOM</span>
            <h3>Co dziś najbardziej boli?</h3>
            <div className="form-options">
              {symptoms.map((item) => <button key={item.id} type="button" className={selectedSymptom.id === item.id ? 'active' : ''} onClick={() => { selectedSymptom.set(item); setStep(2) }}>{item.label}</button>)}
            </div>
            <small>Nie traktujemy tej odpowiedzi jako diagnozy. To tylko punkt startu.</small>
          </>}

          {!done && step === 2 && <>
            <span className="form-kicker">WYNIK</span>
            <h3>Gdzie wysłać pierwszy kierunek?</h3>
            <div className="domain-confirm"><span>{domain || 'twojafirma.pl'}</span><b>{selectedSymptom.value.short}</b></div>
            <label>E-mail</label>
            <input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="kontakt@twojafirma.pl" />
            <button type="submit">Wyślij pierwszy kierunek <Arrow /></button>
            <small>Demo V1: formularz nie wysyła danych do backendu.</small>
          </>}

          {done && <div className="form-success"><span>✓</span><h3>Flow gotowy.</h3><p>W produkcji tutaj podpinamy Twój endpoint / CRM / automatyzację Mini Mapy.</p><button type="button" onClick={() => { setDone(false); setStep(0) }}>Uruchom ponownie</button></div>}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return <footer><TopographicLogo inverted /><p>Diagnoza przed wydatkiem. Decyzja przed wdrożeniem.</p><span>DigitalMap / concept V1 · 2026</span></footer>
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
