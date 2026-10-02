import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LivingMap } from './components/LivingMap.jsx'
import { TopographicLogo } from './components/TopographicLogo.jsx'
import { faqs, industries, offers, processSteps, projects, symptoms, team } from './content.js'

gsap.registerPlugin(ScrollTrigger)

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function MicroIcon({ type }) {
  if (type === 'contract') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7 4.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6A1.5 1.5 0 0 1 7.5 4.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M14 4.5V9h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M9 12.5h6M9 16h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    )
  }

  if (type === 'card') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3.5" y="6" width="17" height="12" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M3.5 10h17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M7.5 14.5h3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 8.5v7M8.5 12h7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function accentTitle(title, accent) {
  const [before, after = ''] = title.split(accent)
  return <>{before}<span className="accent-text">{accent}</span>{after}</>
}

function JourneyRail({ items, label = 'ŚCIEŻKA KLIENTA', emphasizeLast = false }) {
  return (
    <div className="journey-rail" aria-label={label}>
      <div className="journey-rail__label">{label}</div>
      <div className="journey-rail__track">
        {items.map((item, index) => (
          <div
            className={`journey-rail__item ${emphasizeLast && index === items.length - 1 ? 'is-active' : ''}`}
            key={item}
          >
            <span className="journey-rail__node" aria-hidden="true" />
            <b>{item}</b>
          </div>
        ))}
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="header">
      <TopographicLogo />
      <nav aria-label="Główna nawigacja">
        <a href="#problem">Problem</a>
        <a href="#jak-dzialamy">Jak działamy</a>
        <a href="#przykladowa-mapa">Mapa</a>
        <a href="#dla-kogo">Dla kogo</a>
        <a href="#oferta">Oferta</a>
        <a href="#realizacje">Realizacje</a>
      </nav>
      <a className="header-cta" href="#sprawdz-swoja-firme">Sprawdź swoją firmę <Arrow /></a>
    </header>
  )
}

function Story({ progressRef }) {
  const storyRef = useRef(null)
  const stepRefs = useRef([])
  const cardRef = useRef(null)
  const [activeStage, setActiveStage] = useState(-1)

  const stages = [
    {
      no: 'WIDOCZNOŚĆ',
      title: <>Czy klienci trafiają do Ciebie <span className="accent-text">wtedy, kiedy naprawdę Cię potrzebują?</span></>,
      copy: 'DigitalMap pokazuje, co widzi potencjalny klient, zanim zdecyduje się na kontakt — i gdzie po drodze tracisz jego uwagę lub zaufanie.',
      proof: 'Google · SEO · Mapy Google · Reklamy · Wyszukiwanie AI',
    },
    {
      no: 'STRONA I OFERTA',
      title: <>Masz ruch. <span className="accent-text">Ale czy strona prowadzi ludzi do kontaktu?</span></>,
      copy: 'Sprawdzamy, co dzieje się po wejściu na stronę — od pierwszego wrażenia po decyzję o kontakcie. Wskazujemy miejsca, które mogą odbierać Ci zapytania.',
      proof: 'Oferta · Komunikacja · UX · Wezwanie Do Działania · Strona Docelowa',
    },
    {
      no: 'SOCIAL MEDIA I TREŚCI',
      title: <>Publikujesz regularnie. <span className="accent-text">Ale czy Twoje treści przyciągają właściwe osoby?</span></>,
      copy: 'Sprawdzamy, czy Twoje treści przyciągają właściwe osoby, budują zainteresowanie ofertą i prowadzą je bliżej decyzji o kontakcie.',
      proof: 'Social Media · Treści · Dowody Zaufania · Droga Do Kontaktu',
    },
    {
      no: 'ZAUFANIE',
      title: <>Klient Cię znalazł. <span className="accent-text">Ale czy Ci zaufa?</span></>,
      copy: 'Sprawdzamy, co buduje wiarygodność Twojej firmy i co widzi klient, zanim zdecyduje się wybrać właśnie Ciebie.',
      proof: 'Opinie · Case Study · Reputacja · Dowody Zaufania',
    },
    {
      no: 'KONWERSJA',
      title: <>Klient jest zainteresowany. <span className="accent-text">Co decyduje o jego dalszej decyzji?</span></>,
      copy: 'Analizujemy drogę od zainteresowania ofertą do kontaktu i wskazujemy elementy, które mogą mieć wpływ na tę decyzję.',
      proof: 'Formularz · Kontakt · Zapytanie · Konsultacja · Sprzedaż',
      cta: true,
    },
  ]
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progressRef.current = 0.5
      setActiveStage(2)
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: storyRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progressRef.current = self.progress
        const breaks = [0.14, 0.31, 0.48, 0.65, 0.82]
        let next = -1
        for (let i = breaks.length - 1; i >= 0; i -= 1) {
          if (self.progress >= breaks[i]) { next = i; break }
        }
        setActiveStage((prev) => (prev === next ? prev : next))
      },
    })

    return () => trigger.kill()
  }, [progressRef])

  useEffect(() => {
    if (!cardRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.killTweensOf(cardRef.current)
    gsap.fromTo(
      cardRef.current,
      { autoAlpha: 0.35, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.46, ease: 'power2.out', overwrite: true },
    )
  }, [activeStage])

  function goToZone(index) {
    stepRefs.current[index + 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const stage = activeStage >= 0 ? stages[activeStage] : null

  return (
    <section className="story story--strategy-map story--fixed-narrative" id="start" ref={storyRef}>
      <div className="story-canvas-wrap">
        <LivingMap progressRef={progressRef} onSelectZone={goToZone} />

        <div className={`strategy-story-ui ${stage ? 'strategy-story-ui--zone' : 'strategy-story-ui--hero'}`}>
          {stage ? (
            <article ref={cardRef} className="strategy-story-card strategy-story-card--zone">
              <div className="eyebrow">{stage.no}</div>
              <h2>{stage.title}</h2>
              <p>{stage.copy}</p>
              <JourneyRail
                items={stage.proof.split(' · ')}
                label={stage.no === 'KONWERSJA' ? 'ŚCIEŻKA DO SPRZEDAŻY' : 'CO SPRAWDZAMY'}
                emphasizeLast={stage.no === 'KONWERSJA'}
              />
              {stage.cta && <div className="strategy-zone-action"><span>Sprawdź swój proces pozyskania klienta.</span><a className="strategy-zone-cta" href="#sprawdz-swoja-firme">Zacznij od Mini Mapy — 0 zł <Arrow /></a></div>}
            </article>
          ) : (
            <article ref={cardRef} className="strategy-story-card strategy-story-card--hero">
              <div className="eyebrow">DIGITALMAP / DIAGNOZA PRZED WYDATKIEM</div>
              <h1 className="hero-title-clean">
                <span className="hero-title-line">Zanim wydasz</span>
                <span className="hero-title-line">więcej na marketing,</span>
                <span className="hero-title-line hero-title-line--accent">sprawdź, gdzie Twoja firma</span>
                <span className="hero-title-line hero-title-line--accent">traci klientów.</span>
              </h1>
              <p className="hero-lead">DigitalMap analizuje Twoją firmę od strony internetowej, przez opinie i social media, po Google i wyszukiwanie AI. Dzięki temu wiesz, jakie działania marketingowe najlepiej pasują do Twojej firmy i od czego warto zacząć.</p>
              <div className="hero-actions">
                <a className="button button--dark" href="#sprawdz-swoja-firme">Sprawdź swoją firmę <Arrow /></a>
                <a className="button button--hero-secondary" href="#przykladowa-mapa">Zobacz przykładową Mapę <Arrow /></a>
              </div>
              <div className="micro-proof">
                <span><i className="micro-proof-icon"><MicroIcon type="free" /></i>Mini Mapa 0 zł</span>
                <span><i className="micro-proof-icon"><MicroIcon type="contract" /></i>Bez zobowiązań</span>
                <span><i className="micro-proof-icon"><MicroIcon type="card" /></i>Bez karty</span>
              </div>
            </article>
          )}
        </div>
      </div>

      <div className="story-steps story-scroll-spacers" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            className="story-step story-scroll-spacer"
            key={index}
            ref={(el) => { stepRefs.current[index] = el }}
          />
        ))}
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="process-section" id="jak-powstaje-mapa">
      <div className="section-shell process-layout">
        <div className="process-intro">
          <div className="eyebrow">JAK POWSTAJE MAPA</div>
          <h2>Od firmy do decyzji <span className="accent-text">w czterech krokach.</span></h2>
          <p>Nie zaczynamy od rekomendowania usług. Najpierw zawężamy problem, sprawdzamy dane i ustalamy właściwą kolejność działań.</p>
        </div>
        <div className="process-timeline">
          {processSteps.map((step) => (
            <article className="process-step" key={step.no}>
              <div className="process-dot" />
              <h3>{accentTitle(step.title, step.accent)}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Problems() {
  const visibleProblems = symptoms.filter((item) => item.id !== 'other')
  const [activeProblem, setActiveProblem] = useState(0)
  const active = visibleProblems[activeProblem]
  const sourceMap = {
    acquisition: ['Widoczność', 'Social Media', 'Oferta', 'Konwersja'],
    conversion: ['Oferta', 'Strona', 'Zaufanie', 'Konwersja'],
    ads: ['Reklamy', 'Strona', 'Oferta', 'Konwersja'],
    website: ['Oferta', 'UX', 'Zaufanie', 'Kontakt'],
    competition: ['Widoczność', 'Oferta', 'Zaufanie', 'Treści'],
    unclear: ['Widoczność', 'Reklamy', 'Oferta', 'Konwersja'],
  }
  const sources = sourceMap[active.id] || ['Widoczność', 'Oferta', 'Zaufanie', 'Konwersja']

  return (
    <section className="problems-section problems-section--diagnostic" id="z-jakim-problemem-przychodzisz">
      <div className="section-shell problems-diagnostic-shell">
        <div className="problems-diagnostic-intro">
          <div className="eyebrow">Z JAKIM PROBLEMEM PRZYCHODZISZ?</div>
          <h2>Co dziś najbardziej <span className="accent-text">ogranicza Twój marketing?</span></h2>
          <p>Nie musisz wiedzieć, czy problemem jest SEO, reklama, oferta czy strona.</p>
        </div>

        <div className="problem-diagnostic-console">
          <div className="problem-signal-list" role="tablist" aria-label="Najczęstsze problemy marketingowe">
            <div className="problem-signal-caption">
              <span>Wybierz sytuację</span>
              <span>{String(visibleProblems.length).padStart(2, '0')} możliwości</span>
            </div>

            {visibleProblems.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={index === activeProblem}
                key={item.id}
                className={`problem-signal ${index === activeProblem ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveProblem(index)}
                onFocus={() => setActiveProblem(index)}
                onClick={() => setActiveProblem(index)}
              >
                <span className="problem-signal-no">{String(index + 1).padStart(2, '0')}</span>
                <span className="problem-signal-label">{item.label}</span>
                <span className="problem-signal-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>

          <div className="problem-diagnostic-result" role="tabpanel" aria-live="polite">
            <div className="problem-result-topline">
              <span>ANALIZA SYGNAŁU</span>
              <span>{String(activeProblem + 1).padStart(2, '0')} / {String(visibleProblems.length).padStart(2, '0')}</span>
            </div>

            <div className="problem-result-body" key={active.id}>
              <div className="problem-result-status"><i aria-hidden="true" /> WYBRANA SYTUACJA</div>
              <h3>{active.label}</h3>
              <p>{active.description}</p>

              <div className="problem-source-block">
                <span className="problem-source-label">Najczęstsze źródła tego problemu</span>
                <div className="problem-source-map" aria-label="Obszary, które sprawdzamy w pierwszej kolejności">
                  {sources.map((source, index) => (
                    <span className="problem-source-node" key={source} style={{ '--source-i': index }}>
                      <i aria-hidden="true" />
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              <a className="problem-result-cta" href="#sprawdz-swoja-firme">Sprawdź ten problem w swojej firmie <Arrow /></a>
            </div>

            <div className="problem-diagnostic-scan" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}

function SampleMap() {
  const areas = [
    {
      id: 'google',
      no: '01',
      name: 'Google i Mapy',
      status: 'Dobra baza',
      level: 'good',
      x: 14,
      y: 22,
      finding: 'Firma jest widoczna na kluczowe zapytania lokalne.',
      impact: 'Ten kanał już dostarcza wartościowy ruch.',
      action: 'Utrzymać pozycje i rozwijać najlepiej działające zapytania.',
    },
    {
      id: 'seo',
      no: '02',
      name: 'SEO',
      status: 'Szansa',
      level: 'opportunity',
      x: 36,
      y: 14,
      finding: 'Część usług nie ma jeszcze własnych stron i widoczności.',
      impact: 'Firma oddaje konkurencji ruch z zapytań o wysokiej intencji.',
      action: 'Rozbudować treści wokół usług, które najczęściej prowadzą do zapytania.',
    },
    {
      id: 'ads',
      no: '03',
      name: 'Reklamy',
      status: 'Wstrzymać skalowanie',
      level: 'warning',
      x: 62,
      y: 20,
      finding: 'Kampanie generują ruch, ale dalsza ścieżka traci zbyt wielu klientów.',
      impact: 'Większy budżet zwiększyłby koszt bez naprawy głównego problemu.',
      action: 'Nie zwiększać budżetu, dopóki nie poprawi się konwersja.',
    },
    {
      id: 'ai',
      no: '04',
      name: 'Wyszukiwanie AI',
      status: 'Do rozwinięcia',
      level: 'opportunity',
      x: 83,
      y: 13,
      finding: 'Marka pojawia się rzadko w odpowiedziach narzędzi AI.',
      impact: 'Firma może tracić część nowych sposobów odkrywania usług.',
      action: 'Wzmocnić eksperckość, dane o firmie i treści odpowiadające na pytania klientów.',
    },
    {
      id: 'social',
      no: '05',
      name: 'Social Media i Treści',
      status: 'Niewykorzystany zasięg',
      level: 'opportunity',
      x: 17,
      y: 67,
      finding: 'Treści pokazują realizacje, ale rzadko prowadzą odbiorcę dalej.',
      impact: 'Zasięg buduje uwagę, lecz zbyt słabo zasila zapytania.',
      action: 'Połączyć treści z konkretnymi usługami, dowodami i następnym krokiem.',
    },
    {
      id: 'offer',
      no: '06',
      name: 'Strona i Oferta',
      status: 'Główne wąskie gardło',
      level: 'critical',
      x: 45,
      y: 52,
      finding: 'Klient zbyt długo szuka powodu, żeby wybrać właśnie tę firmę.',
      impact: 'Ruch trafia na stronę, ale zbyt mało osób przechodzi do kontaktu.',
      action: 'Wyostrzyć ofertę, hierarchię informacji i jeden główny następny krok.',
    },
    {
      id: 'trust',
      no: '07',
      name: 'Opinie i Zaufanie',
      status: 'Dobra baza',
      level: 'good',
      x: 70,
      y: 63,
      finding: 'Opinie są mocne, ale najważniejsze dowody są słabo widoczne na stronie.',
      impact: 'Firma ma wiarygodność, której nie wykorzystuje w momencie decyzji.',
      action: 'Przenieść najlepsze dowody bliżej oferty i formularza kontaktowego.',
    },
    {
      id: 'conversion',
      no: '08',
      name: 'Kontakt i Sprzedaż',
      status: 'Największa strata',
      level: 'critical',
      x: 84,
      y: 82,
      finding: 'Za dużo osób odpada między zainteresowaniem a wysłaniem zapytania.',
      impact: 'Firma traci część klientów, których już pozyskała marketingiem.',
      action: 'Uprościć formularz i skrócić drogę od decyzji do kontaktu.',
    },
  ]

  const [activeArea, setActiveArea] = useState('offer')
  const selected = areas.find((area) => area.id === activeArea) ?? areas[0]

  return (
    <section className="sample-section sample-section--atlas" id="przykladowa-mapa">
      <div className="section-shell">
        <div className="section-heading section-heading--split sample-heading sample-heading--atlas">
          <div className="eyebrow">PRZYKŁADOWA MAPA FIRMY</div>
          <div>
            <h2>Wejdź w obszar i zobacz, <span className="accent-text">co znaleźliśmy.</span></h2>
            <p>Jedna firma, osiem miejsc, które sprawdzamy. Kliknij wybrany obszar, żeby zobaczyć problem, wpływ na biznes i następny ruch.</p>
          </div>
        </div>

        <div className="sample-atlas-shell">
          <div className="sample-atlas-topline">
            <div>
              <span>PRZYKŁADOWA FIRMA</span>
              <strong>Klinika usług premium</strong>
            </div>
            <div className="sample-atlas-summary">
              <span>GŁÓWNY WNIOSEK</span>
              <strong>Najpierw konwersja. Potem większy ruch.</strong>
            </div>
          </div>

          <div className="sample-atlas-layout">
            <div className="sample-atlas-map" aria-label="Interaktywna mapa obszarów marketingu">
              <svg className="sample-atlas-route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path d="M14 22 C24 16 28 14 36 14 S53 18 62 20 S76 13 83 13 M14 22 C15 39 15 52 17 67 C28 63 36 56 45 52 C55 54 63 59 70 63 C78 66 81 74 84 82 M45 52 C54 43 60 30 62 20 M70 63 C76 48 80 28 83 13" />
              </svg>

              <div className="sample-atlas-contours" aria-hidden="true" />
              <div className="sample-atlas-compass" aria-hidden="true"><span>N</span><i /></div>

              {areas.map((area) => {
                const isActive = area.id === selected.id
                return (
                  <button
                    type="button"
                    className={`sample-map-node sample-map-node--${area.level}${isActive ? ' is-active' : ''}`}
                    style={{ '--node-x': `${area.x}%`, '--node-y': `${area.y}%` }}
                    key={area.id}
                    onClick={() => setActiveArea(area.id)}
                    onMouseEnter={() => setActiveArea(area.id)}
                    onFocus={() => setActiveArea(area.id)}
                    aria-pressed={isActive}
                  >
                    <span className="sample-map-node-dot"><i /></span>
                    <span className="sample-map-node-copy">
                      <b>{area.name}</b>
                      <small>{area.status}</small>
                    </span>
                  </button>
                )
              })}

              <div className="sample-atlas-legend" aria-hidden="true">
                <span><i className="is-good" />Działa</span>
                <span><i className="is-opportunity" />Szansa</span>
                <span><i className="is-warning" />Uwaga</span>
                <span><i className="is-critical" />Priorytet</span>
              </div>
            </div>

            <aside className={`sample-atlas-detail sample-atlas-detail--${selected.level}`} key={selected.id}>
              <div className="sample-atlas-detail-head">
                <span>{selected.no} / 08</span>
                <em>{selected.status}</em>
              </div>
              <h3>{selected.name}</h3>

              <div className="sample-atlas-detail-grid">
                <div>
                  <span>CO ZNALEŹLIŚMY</span>
                  <p>{selected.finding}</p>
                </div>
                <div>
                  <span>WPŁYW NA BIZNES</span>
                  <p>{selected.impact}</p>
                </div>
                <div className="sample-atlas-next">
                  <span>NASTĘPNY RUCH</span>
                  <p>{selected.action}</p>
                </div>
              </div>

              <div className="sample-atlas-detail-foot">
                <span>Wybierz kolejny punkt na mapie</span>
                <b>{areas.findIndex((area) => area.id === selected.id) + 1} / {areas.length}</b>
              </div>
            </aside>
          </div>

          <div className="sample-atlas-footer">
            <p><strong>Nie dostajesz ośmiu osobnych raportów.</strong> Dostajesz jedną Mapę, która pokazuje, gdzie jest największa strata i co powinno wydarzyć się najpierw.</p>
            <a href="#sprawdz-swoja-firme">Sprawdź swoją firmę <Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Principle() {
  const points = [
    ['01', 'Bez gotowego rozwiązania na wejściu', 'Nie zaczynamy od założenia, że potrzebujesz SEO, reklam, mediów społecznościowych albo nowej strony. Najpierw ustalamy, co naprawdę ogranicza wynik.'],
    ['02', 'Decyzja przed wydatkiem', 'Najpierw ustalamy problem i priorytet. Dopiero później wiadomo, na co warto przeznaczyć czas i budżet.'],
    ['03', 'Bez zobowiązań', 'Rekomendację możesz wdrożyć z nami, własnym zespołem albo dowolnym wykonawcą.'],
  ]

  return (
    <section className="principle principle--v7" id="dlaczego-digitalmap">
      <div className="principle-inner">
        <div className="principle-kicker-row">
          <div className="eyebrow">DLACZEGO DIGITALMAP</div>
          <span>DIAGNOZA → DECYZJA → DOPIERO POTEM WDROŻENIE</span>
        </div>
        <h2>Najpierw diagnoza.<br/><span className="accent-text">Dopiero potem rozwiązanie.</span></h2>
        <div className="principle-editorial">
          {points.map(([no, title, copy]) => (
            <article key={no}>
              <span className="principle-editorial-no">{no}</span>
              <div className="principle-editorial-copy">
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
        <div className="principle-signature">Najpierw właściwy problem. Potem właściwa inwestycja.</div>
      </div>
    </section>
  )
}

function Method() {
  const tools = ['GA4', 'Google Search Console', 'Google Ads', 'Meta', 'Ahrefs', 'Screaming Frog', 'wyszukiwanie AI']

  return (
    <section className="method-v6 method-v6--simple" id="metoda">
      <div className="section-shell method-simple-shell">
        <div className="method-simple-copy">
          <div className="eyebrow">METODA</div>
          <h2>Dane nie podejmują decyzji. <span className="accent-text">Pomagają ją podjąć.</span></h2>
          <p>Korzystamy z różnych źródeł danych, ale żadne z nich nie daje gotowej odpowiedzi. Łączymy informacje i interpretujemy je w kontekście Twojej firmy, żeby ustalić, co naprawdę ogranicza wynik i co powinno wydarzyć się dalej.</p>
          <strong>Nie dostajesz raportu z narzędzia. Dostajesz interpretację, priorytet i następny krok.</strong>
        </div>
        <div className="method-simple-tools" aria-label="Przykładowe źródła danych">
          <span>PRZYKŁADOWE ŹRÓDŁA DANYCH</span>
          <div>{tools.map((tool) => <b key={tool}>{tool}</b>)}</div>
        </div>
      </div>
    </section>
  )
}

function Evidence() {
  const items = [
    ['01', 'Strona i oferta', 'Czy klient od razu rozumie, co oferujesz, dla kogo jest oferta i dlaczego warto wybrać właśnie Ciebie?'],
    ['02', 'Google i lokalność', 'Czy klient znajdzie Cię, kiedy szuka właśnie takiej usługi — i co zobaczy, gdy już Cię znajdzie?'],
    ['03', 'Social Media i Treści', 'Czy Twoje treści zwiększają zainteresowanie ofertą, budują zaufanie i prowadzą do kolejnego kroku?'],
    ['04', 'Widoczność i ruch', 'Skąd przychodzą potencjalni klienci i czy docierają osoby rzeczywiście zainteresowane ofertą?'],
    ['05', 'Reklamy', 'Czy budżet reklamowy prowadzi do wartościowych zapytań i gdzie można poprawić wynik?'],
    ['06', 'Zaufanie i reputacja', 'Co klient widzi przed kontaktem z firmą — i czy to wystarcza, żeby wybrał właśnie Ciebie?'],
  ]

  return (
    <section className="section evidence-section" id="zakres-diagnozy">
      <div className="section-shell">
        <div className="section-heading section-heading--split">
          <div className="eyebrow">ZAKRES DIAGNOZY</div>
          <div><h2>Patrzymy na całą drogę klienta, <span className="accent-text">nie jeden kanał.</span></h2><p>Nie szukamy największej liczby błędów. Szukamy elementu, który dziś najbardziej ogranicza wynik.</p></div>
        </div>
        <div className="evidence-grid evidence-grid--hover">
          {items.map(([no, title, copy]) => <article key={no}><span>{no}</span><div className="evidence-arrow">↗</div><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>
  )
}

function Industries() {
  const [activeIndustry, setActiveIndustry] = useState(0)
  const active = industries[activeIndustry] || industries[0]
  const focusAreas = [
    ['Widoczność', 'Zaufanie', 'Kontakt'],
    ['Google', 'Opinie', 'Rezerwacja'],
    ['Social Media', 'Zaufanie', 'Rezerwacja'],
    ['Oferta', 'Prezentacja', 'Zapytanie'],
    ['Eksperckość', 'Zaufanie', 'Kontakt'],
    ['Lokalność', 'Oferta', 'Kontakt'],
    ['Ruch', 'Produkt', 'Zakup'],
    ['Komunikacja', 'Wartość', 'Demo'],
    ['Pozycjonowanie', 'Zaufanie', 'Zapytanie'],
    ['Widoczność', 'Opinie', 'Rezerwacja'],
    ['Lokalność', 'Oferta', 'Kontakt'],
    ['Komunikacja', 'Dowody', 'Rozmowa'],
  ]
  const activeFocus = focusAreas[activeIndustry] || focusAreas[0]

  return (
    <section className="industries industries--atlas" id="dla-kogo">
      <div className="section-shell industries-atlas-shell">
        <div className="industries-atlas-head">
          <div className="eyebrow">DLA KOGO</div>
          <div className="industries-atlas-head__copy">
            <h2>Dla firm, które chcą wiedzieć, <span className="accent-text">gdzie tracą klientów.</span></h2>
            <p>Wybierz branżę i zobacz, który moment decyzji klienta najczęściej warto sprawdzić jako pierwszy.</p>
          </div>
        </div>

        <div className="industries-atlas-grid">
          <div className="industry-index" role="list" aria-label="Branże, dla których sprawdza się DigitalMap">
            {industries.map((industry, index) => {
              const isActive = activeIndustry === index
              const no = String(index + 1).padStart(2, '0')
              return (
                <button
                  type="button"
                  className={`industry-index__item ${isActive ? 'is-active' : ''}`}
                  key={industry.name}
                  role="listitem"
                  aria-pressed={isActive}
                  onMouseEnter={() => setActiveIndustry(index)}
                  onFocus={() => setActiveIndustry(index)}
                  onClick={() => setActiveIndustry(index)}
                >
                  <span className="industry-index__no">{no}</span>
                  <span className="industry-index__name">{industry.name}</span>
                  <span className="industry-index__arrow" aria-hidden="true">↗</span>
                </button>
              )
            })}
          </div>

          <aside className="industry-lens" aria-live="polite">
            <div className="industry-lens__visual" aria-hidden="true">
              <span className="industry-lens__orbit industry-lens__orbit--one" />
              <span className="industry-lens__orbit industry-lens__orbit--two" />
              <span className="industry-lens__orbit industry-lens__orbit--three" />
              <span className="industry-lens__pulse" />
              <span className="industry-lens__axis industry-lens__axis--x" />
              <span className="industry-lens__axis industry-lens__axis--y" />
            </div>

            <div className="industry-lens__topline">
              <span>WYBRANY BIZNES</span>
              <b>{String(activeIndustry + 1).padStart(2, '0')} / {String(industries.length).padStart(2, '0')}</b>
            </div>

            <div className="industry-lens__content" key={activeIndustry}>
              <h3>{active.name}</h3>
              <div className="industry-lens__label">KLUCZOWY MOMENT DECYZJI</div>
              <p>{active.decision}</p>

              <div className="industry-lens__route" aria-label="Obszary, które warto sprawdzić">
                {activeFocus.map((item, index) => (
                  <span key={item}>
                    <i>{String(index + 1).padStart(2, '0')}</i>
                    <b>{item}</b>
                  </span>
                ))}
              </div>

              <a href="#sprawdz-swoja-firme" className="industry-lens__cta">Sprawdź swoją firmę <Arrow /></a>
            </div>
          </aside>
        </div>

        <div className="industries-atlas-foot">
          <span>Nie widzisz swojej branży?</span>
          <a href="#sprawdz-swoja-firme">Sprawdź firmę <Arrow /></a>
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="work" id="realizacje">
      <div className="section-shell">
        <div className="section-heading section-heading--split work-heading">
          <div className="eyebrow">WYBRANE REALIZACJE</div>
          <div>
            <h2>Decyzja ma wartość dopiero wtedy, <span className="accent-text">gdy można przełożyć ją na działanie.</span></h2>
            <p>Wybrane produkty i strony, przy których pracowaliśmy nad strategią, komunikacją, doświadczeniem użytkownika lub wdrożeniem. Zakres i status każdego projektu pokazujemy wprost.</p>
          </div>
        </div>

        <div className="work-grid">
          {projects.map((project, index) => (
            <article className={`work-card ${index === 0 ? 'work-card--featured' : ''}`} key={project.name}>
              <div className="work-preview">
                {project.image ? <img src={project.image} alt={`Podgląd realizacji ${project.name}`} /> : (
                  <div className="browser-mock" aria-hidden="true">
                    <div className="browser-bar"><i /><i /><i /><span>{project.name.toLowerCase().replaceAll(' ', '')}</span></div>
                    <div className="browser-page"><div className="browser-kicker">{project.type}</div><strong>{project.name}</strong><div className="browser-lines"><i /><i /><i /></div><div className="browser-cta" /></div>
                  </div>
                )}
                <span className="work-status">{project.status}</span>
              </div>
              <div className="work-meta">
                <div className="work-index">{project.index}</div>
                <div className="work-copy"><div className="work-type">{project.type}</div><h3>{project.name}</h3><p>{project.description}</p><div className="work-case-copy"><div><span>PROBLEM</span><p>{project.problem}</p></div><div><span>NASZA ROLA</span><p>{project.role}</p></div><div><span>STATUS / WYNIK</span><p>{project.result}</p></div></div><div className="work-scope">{project.scope}</div></div>
                {project.url ? <a className="work-link" href={project.url} target="_blank" rel="noreferrer">Zobacz projekt <Arrow /></a> : <span className="work-link work-link--muted">Zakres projektu</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section className="team" id="zespol">
      <div className="section-shell">
        <div className="team-heading">
          <div className="eyebrow">ZESPÓŁ</div>
          <div><h2>Diagnoza wymaga <span className="accent-text">więcej niż jednej perspektywy.</span></h2><p>Strategia, marketing, rozwój stron, płatne pozyskanie i social media pokazują różne fragmenty drogi klienta. Łączymy je po to, żeby rekomendacja wynikała z całego procesu — nie z kompetencji jednego działu.</p></div>
        </div>

        <div className="team-members team-members--text-only">
          {team.members.map((member, index) => (
            <article className={`team-member team-member--text ${member.featured ? 'team-member--featured' : ''}`} key={member.name}>
              <div className="team-member-card-top">
                <span>0{index + 1}</span>
                <div className="team-member-role">{member.role}</div>
              </div>
              <h3>{member.name}</h3>
              <div className="team-member-scope-label">Zakres działań</div>
              <p>{member.bio}</p>
            </article>
          ))}
        </div>
        <div className="team-trustline"><span>Jedna diagnoza.</span><span>Wspólny kierunek.</span><span>Jasna odpowiedzialność za rekomendację.</span></div>
      </div>
    </section>
  )
}

function Offer({ onChoose }) {
  const [activeOffer, setActiveOffer] = useState('strategic')
  const offer = useMemo(() => offers.find((item) => item.id === activeOffer) || offers[0], [activeOffer])

  function choose(item) {
    setActiveOffer(item.id)
    onChoose(item)
  }

  return (
    <section className="offer-v6" id="oferta">
      <div className="section-shell">
        <div className="offer-v6-head">
          <div className="eyebrow">OFERTA</div>
          <div><h2>Nie wybieraj usługi w ciemno. <span className="accent-text">Wybierz zakres diagnozy.</span></h2><p>Od pierwszego sygnału po pełną analizę procesu pozyskania klienta. Każdy poziom odpowiada na inne pytanie i kończy się konkretnym następnym krokiem.</p></div>
        </div>

        <div className="offer-chooser">
          <div className="offer-selector">
            {offers.map((item) => (
              <button key={item.id} className={activeOffer === item.id ? 'active' : ''} onClick={() => choose(item)}>
                <div className="offer-selector-main"><strong>{item.name}</strong><small>{item.label}</small></div>
                <div className="offer-selector-meta"><b>{item.price}</b><i>↗</i></div>
              </button>
            ))}
          </div>

          <article className="offer-focus-card">
            <div className="offer-focus-top"><span>{offer.label}</span>{offer.featured && <b>NAJCZĘŚCIEJ WYBIERANA</b>}</div>
            <div className="offer-focus-title"><div><h3>{offer.name}</h3><p>{offer.copy}</p></div><strong>{offer.price}</strong></div>
            <div className="offer-fit-grid">
              <div><span>DLA KOGO</span><strong>{offer.audience}</strong></div>
              <div><span>NAJLEPSZA, GDY</span><strong>{offer.bestFor}</strong></div>
              <div><span>WYNIK</span><strong>{offer.result}</strong></div>
            </div>
            <div className="offer-deliverables">
              <span>CO DOSTAJESZ</span>
              <div className="offer-deliverables-grid">
                {offer.includes.map((item) => (
                  <article key={item} className="offer-deliverable">
                    <i>✓</i>
                    <strong>{item}</strong>
                  </article>
                ))}
              </div>
            </div>
            {offer.anchor && <div className="offer-value-anchor">{offer.anchor}</div>}
            <div className="offer-cta-row">
              <div className="offer-cta-context"><span>WYBRANY ZAKRES</span><strong>{offer.name}</strong><small>Najpierw diagnoza. Wdrożenie jest osobną decyzją.</small></div>
              <a className="offer-main-cta" href="#sprawdz-swoja-firme" onClick={() => onChoose(offer)}><span>Wybieram tę Mapę</span><i aria-hidden="true">↗</i></a>
            </div>
          </article>
        </div>

        <div className="offer-support-grid">
          <article className="offer-support-card">
            <span>Nie wiesz, którą Mapę wybrać?</span>
            <p>Nie musisz tego oceniać samodzielnie. Zostaw firmę i objaw — jeśli wystarczy bezpłatna Mini Mapa albo krótszy zakres, powiemy to wprost.</p>
            <a href="#sprawdz-swoja-firme">Pomóżcie mi wybrać <Arrow /></a>
          </article>
          <article className="offer-support-card offer-support-card--dark">
            <span>Masz już agencję, niezależnego specjalistę albo własny zespół marketingowy?</span>
            <p>DigitalMap działa także jako niezależne drugie spojrzenie. Chodzi o to, żebyś wiedział, gdzie naprawdę jest problem, co jest priorytetem i jakie działanie ma sens jako następne.</p>
            <strong>Przed: „może więcej reklam?” → Po Mapie: teraz / później / nie teraz.</strong>
          </article>
        </div>
        <div className="offer-cost-note">Mapa ma pomóc lepiej wydać większy budżet na stronę, SEO, kampanie, treści albo wdrożenie. Dlatego najpierw ustalamy problem, a dopiero później rekomendujemy rozwiązanie.</div>
      </div>
    </section>
  )
}

function ScanForm({ selectedSymptom, selectedOffer }) {
  const [step, setStep] = useState(0)
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [done, setDone] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (step === 0 && company.trim()) setStep(1)
    else if (step === 1) setStep(2)
    else if (step === 2 && email.includes('@')) setDone(true)
  }

  return (
    <section className="scan" id="sprawdz-swoja-firme">
      <div className="scan-shell">
        <div className="scan-copy">
          <div className="eyebrow">ZACZNIJ OD FIRMY</div>
          <h2>Pokaż nam firmę. <span className="accent-text">Nie musisz wiedzieć, czego potrzebujesz.</span></h2>
          <p>Podaj domenę lub nazwę firmy, wybierz problem i zostaw kontakt. Jeśli nie masz strony, nadal możemy zacząć od rynku, widoczności i publicznie dostępnych sygnałów.</p>
          <div className="scan-selected"><span>WYBRANA ŚCIEŻKA</span><strong>{selectedOffer?.name || 'Mini Mapa'}</strong><small>{selectedOffer?.price || '0 zł'}</small></div>
          <div className="scan-steps"><span className={step >= 0 ? 'active' : ''}>01 FIRMA</span><span className={step >= 1 ? 'active' : ''}>02 PROBLEM</span><span className={step >= 2 ? 'active' : ''}>03 KONTAKT</span></div>
        </div>

        <form className="scan-card scan-card--v6" onSubmit={submit}>
          {!done && step === 0 && <>
            <span className="form-kicker">KROK 01 / FIRMA</span>
            <h3>Gdzie Twoja firma może tracić klientów?</h3>
            <label>Nazwa firmy albo domena</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="twojafirma.pl lub Nazwa Firmy" />
            <p className="field-help">Nie masz jeszcze strony? To nie problem. Wpisz nazwę firmy — zaczniemy od rynku, widoczności, oferty i publicznie dostępnych sygnałów.</p>
            <button type="submit">Dalej: pokaż problem <Arrow /></button>
          </>}

          {!done && step === 1 && <>
            <span className="form-kicker">KROK 02 / PROBLEM</span>
            <h3>Co dziś najbardziej ogranicza wynik?</h3>
            <div className="form-options form-options--v6">
              {symptoms.map((item) => <button key={item.id} type="button" className={selectedSymptom.id === item.id ? 'active' : ''} onClick={() => { selectedSymptom.set(item); setStep(2) }}><span>{item.label}</span><i>↗</i></button>)}
            </div>
            <button className="form-back" type="button" onClick={() => setStep(0)}>← Wróć</button>
          </>}

          {!done && step === 2 && <>
            <span className="form-kicker">KROK 03 / KONTAKT</span>
            <h3>Gdzie wysłać wynik?</h3>
            <div className="domain-confirm"><span>{company}</span><b>{selectedSymptom.value.short}</b></div>
            <label>E-mail</label>
            <input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ty@firma.pl" />
            <label className="optional-label">Dodatkowy kontekst <span>opcjonalnie</span></label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Np. reklamy kosztują coraz więcej, ale liczba zapytań nie rośnie..." />
            <button type="submit">Wyślij firmę do analizy <Arrow /></button>
            <small>Dane wykorzystamy wyłącznie do odpowiedzi w sprawie wybranej Mapy.</small>
          </>}

          {done && <div className="form-success"><span>✓</span><h3>Dzięki. Mamy to.</h3><p>Firma, problem i kontakt wystarczą, żeby zacząć od pierwszych sygnałów. Odpowiedź dostaniesz na podany e-mail — bez obietnicy sztucznego terminu, którego nie możemy konsekwentnie utrzymać.</p><button type="button" onClick={() => { setDone(false); setStep(0); setCompany(''); setEmail(''); setNote('') }}>Sprawdź inną firmę</button></div>}
        </form>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="faq-section" id="najczestsze-pytania">
      <div className="section-shell">
        <div className="faq-layout-premium">
          <aside className="faq-intro-panel">
            <div className="eyebrow">NAJCZĘSTSZE PYTANIA / PRZED DECYZJĄ</div>
            <h2>Najważniejsze pytania <span className="accent-text">przed zakupem Mapy.</span></h2>
            <p>Bez ukrytych zobowiązań i bez zgadywania, co właściwie kupujesz. Odpowiedzi mają pomóc Ci szybko ocenić, czy DigitalMap pasuje do sytuacji Twojej firmy.</p>
            <a href="#sprawdz-swoja-firme" className="faq-intro-link">Nie widzisz swojego pytania? Napisz nam <Arrow /></a>
          </aside>
          <div className="faq-list-v14 faq-list-premium">
            {faqs.map((item, index) => (
              <details key={item.q}>
                <summary><span className="faq-number">{String(index + 1).padStart(2, '0')}</span><span>{item.q}</span><i>+</i></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="final-cta-v14 final-cta-premium">
          <div className="final-cta-copy"><span>NAJPIERW DIAGNOZA</span><h3>Zanim wydasz więcej na marketing, upewnij się, że rozwiązujesz właściwy problem.</h3><p>Zacznij od bezpłatnej Mini Mapy albo wybierz Mapę Strategiczną, jeśli potrzebujesz diagnozy całego procesu i konkretnego planu działania.</p></div>
          <div className="final-cta-actions"><a className="button button--primary-light" href="#sprawdz-swoja-firme">Sprawdź swoją firmę <Arrow /></a><a className="button button--outline-light" href="#oferta">Zobacz zakres i ofertę</a></div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer" id="stopka">
      <div className="footer-grid">
        <div className="footer-brand"><TopographicLogo inverted /><p>DigitalMap pomaga ustalić, co naprawdę blokuje pozyskiwanie klientów, zanim firma wyda więcej na marketing.</p></div>
        <div className="footer-column"><h3>Oferta</h3><a href="#oferta">Mini Mapa</a><a href="#oferta">Mapa Podstawowa</a><a href="#oferta">Mapa Strategiczna</a><a href="#oferta">Mapa AI</a><a href="#oferta">Wdrożenie / Monitorowanie</a></div>
        <div className="footer-column"><h3>Firma</h3><a href="#jak-powstaje-mapa">Jak działamy</a><a href="#dla-kogo">Dla kogo</a><a href="#realizacje">Realizacje</a><a href="#zespol">Zespół</a><a href="#metoda">Metoda</a><a href="#najczestsze-pytania">Najczęstsze Pytania</a></div>
        <div className="footer-column"><h3>Kontakt</h3><a href="mailto:kontakt@digitalmap.pl">kontakt@digitalmap.pl</a><a href="#sprawdz-swoja-firme">Formularz</a></div>
        <div className="footer-column footer-formal"><h3>Formalności</h3><span>Polityka prywatności</span><span>Regulamin</span><span>Cookies</span><small>Dokumenty formalne podłączymy przed publikacją produkcyjną.</small></div>
      </div>
      <div className="footer-slogan"><span className="footer-slogan-line">Najpierw diagnoza. Potem decyzja.</span><span className="footer-slogan-line footer-slogan-line--accent">Dopiero później wydatek.</span></div>
      <div className="footer-bottom"><span>© 2026 DigitalMap&nbsp;&nbsp;·&nbsp;&nbsp;Diagnoza → decyzja → działanie → pomiar.</span><a href="#start">Wróć na górę ↑</a></div>
    </footer>
  )
}

export default function App() {
  const progressRef = useRef(0)
  const selectedFocusRef = useRef(0.62)
  const [selectedSymptomValue, setSelectedSymptomValue] = useState(symptoms[1])
  const [selectedOffer, setSelectedOffer] = useState(offers.find((item) => item.featured) || offers[0])

  function selectSymptom(item) {
    setSelectedSymptomValue(item)
    selectedFocusRef.current = item.focus
  }

  return (
    <>
      <Header />
      <main>
        <Story progressRef={progressRef} selectedFocusRef={selectedFocusRef} onSelectSymptom={selectSymptom} />
        <Problems />
        <Process />
        <SampleMap />
        <Principle />
        <Method />
        <Evidence />
        <Industries />
        <Offer onChoose={setSelectedOffer} />
        <Work />
        <Team />
        <FAQ />
        <ScanForm selectedOffer={selectedOffer} selectedSymptom={{ id: selectedSymptomValue.id, value: selectedSymptomValue, set: selectSymptom }} />
      </main>
      <Footer />
    </>
  )
}
