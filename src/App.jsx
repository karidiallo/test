import { useEffect, useMemo, useRef, useState } from 'react'

import gsap from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { LivingMap } from './components/LivingMap.jsx'

import { TopographicLogo } from './components/TopographicLogo.jsx'

import costWardenPreview from './assets/costwarden-preview.png'
import annaBagrowskaPreview from './assets/anna-bagrowska-preview.webp'
import './v90-overrides.css'

import { faqs, industries, offers, processSteps, projects, symptoms, team } from './content.js'
import { FORMSPREE_ENDPOINT } from './formConfig.js'



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

        <a href="#z-jakim-problemem-przychodzisz">Problem</a>
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
              <svg
                className="sample-atlas-route"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="atlasRouteGradient" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f59a72" />
                    <stop offset="42%" stopColor="#ff6f7f" />
                    <stop offset="72%" stopColor="#d93f73" />
                    <stop offset="100%" stopColor="#ef7f56" />
                  </linearGradient>
                  <filter id="atlasRouteGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.25" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g className="sample-atlas-route__glow" fill="none" stroke="url(#atlasRouteGradient)" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 22 Q24 16 36 14 Q49 15 62 20 Q72 18 83 13" />
                  <path d="M14 22 Q13 45 17 67 Q30 62 45 52 Q58 55 70 63 Q79 70 84 82" />
                  <path d="M36 14 Q40 32 45 52" />
                  <path d="M62 20 Q56 37 45 52" />
                  <path d="M83 13 Q80 40 70 63" />
                </g>

                <g className="sample-atlas-route__line" fill="none" stroke="url(#atlasRouteGradient)" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 22 Q24 16 36 14 Q49 15 62 20 Q72 18 83 13" />
                  <path d="M14 22 Q13 45 17 67 Q30 62 45 52 Q58 55 70 63 Q79 70 84 82" />
                  <path d="M36 14 Q40 32 45 52" />
                  <path d="M62 20 Q56 37 45 52" />
                  <path d="M83 13 Q80 40 70 63" />
                </g>
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
    {
      title: 'Strona i oferta',
      question: 'Czy klient od razu rozumie, co oferujesz, dla kogo jest oferta i dlaczego warto wybrać właśnie Ciebie?',
      detail: 'Patrzymy na hierarchię informacji, komunikat wartości, ofertę, CTA i miejsca, w których użytkownik może stracić intencję.',
      cue: 'Pierwsze wrażenie → decyzja',
      x: 71,
      y: 19,
    },
    {
      title: 'Google i lokalność',
      question: 'Czy klient znajdzie Cię, kiedy szuka właśnie takiej usługi — i co zobaczy, gdy już Cię znajdzie?',
      detail: 'Sprawdzamy widoczność w Google, wyniki lokalne, profil firmy, spójność informacji i pierwsze sygnały zaufania.',
      cue: 'Wyszukiwanie → znalezienie',
      x: 86,
      y: 39,
    },
    {
      title: 'Social Media i Treści',
      question: 'Czy Twoje treści zwiększają zainteresowanie ofertą, budują zaufanie i prowadzą do kolejnego kroku?',
      detail: 'Analizujemy profil, sposób komunikacji, tematy treści, powtarzalność przekazu i przejście od zainteresowania do działania.',
      cue: 'Uwaga → zainteresowanie',
      x: 74,
      y: 65,
    },
    {
      title: 'Widoczność i ruch',
      question: 'Skąd przychodzą potencjalni klienci i czy docierają osoby rzeczywiście zainteresowane ofertą?',
      detail: 'Patrzymy na źródła ruchu, intencję użytkowników, SEO i jakość wejść — nie tylko samą liczbę odwiedzin.',
      cue: 'Ruch → właściwi ludzie',
      x: 52,
      y: 80,
    },
    {
      title: 'Reklamy',
      question: 'Czy budżet reklamowy prowadzi do wartościowych zapytań i gdzie można poprawić wynik?',
      detail: 'Sprawdzamy kampanie, jakość ruchu, landing page i przejście od kliknięcia do zapytania.',
      cue: 'Budżet → zapytanie',
      x: 33,
      y: 64,
    },
    {
      title: 'Zaufanie i reputacja',
      question: 'Co klient widzi przed kontaktem z firmą — i czy to wystarcza, żeby wybrał właśnie Ciebie?',
      detail: 'Oceniamy opinie, case study, dowody społeczne, spójność marki i sygnały bezpieczeństwa przed kontaktem.',
      cue: 'Zaufanie → kontakt',
      x: 43,
      y: 31,
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const active = items[activeIndex]

  return (
    <section className="section evidence-section evidence-section--map" id="zakres-diagnozy">
      <div className="section-shell">
        <div className="section-heading section-heading--split">
          <div className="eyebrow">ZAKRES DIAGNOZY</div>
          <div>
            <h2>Patrzymy na całą drogę klienta, <span className="accent-text">nie jeden kanał.</span></h2>
            <p>Nie szukamy największej liczby błędów. Szukamy elementu, który dziś najbardziej ogranicza wynik.</p>
          </div>
        </div>

        <div className="diagnostic-map">
          <div className="diagnostic-map__copy" key={active.title}>
            <span className="diagnostic-map__eyebrow">{active.cue}</span>
            <h3>{active.title}</h3>
            <p>{active.question}</p>
            <div className="diagnostic-map__detail">
              <span>Co sprawdzamy</span>
              <p>{active.detail}</p>
            </div>
          </div>

          <div className="diagnostic-map__field" aria-label="Obszary diagnozy">
            <svg className="diagnostic-map__route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M43 31 C56 14 74 13 84 32 C92 47 86 64 73 72 C61 82 48 84 37 71 C28 60 30 43 43 31"
                pathLength="1"
              />
              <path
                className="diagnostic-map__route-active"
                d="M43 31 C56 14 74 13 84 32 C92 47 86 64 73 72 C61 82 48 84 37 71 C28 60 30 43 43 31"
                pathLength="1"
              />
            </svg>

            <div className="diagnostic-map__pulse" style={{ '--pulse-x': `${active.x}%`, '--pulse-y': `${active.y}%` }} />

            {items.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={`diagnostic-map__node ${activeIndex === index ? 'is-active' : ''}`}
                style={{ '--node-x': `${item.x}%`, '--node-y': `${item.y}%` }}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                aria-pressed={activeIndex === index}
              >
                <span />
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>

          <div className="diagnostic-map__mobile-list">
            {items.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={activeIndex === index ? 'is-active' : ''}
                onClick={() => setActiveIndex(index)}
              >
                <span>{item.title}</span>
                <i>↗</i>
              </button>
            ))}
          </div>
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

          <div className="eyebrow">OSTATNIE REALIZACJE</div>

          <div>

            <h2>Decyzja ma wartość dopiero wtedy, <span className="accent-text">gdy można przełożyć ją na działanie.</span></h2>

            <p>Wybrane produkty i strony, przy których pracowaliśmy nad strategią, komunikacją, doświadczeniem użytkownika lub wdrożeniem. Zakres i status każdego projektu pokazujemy wprost.</p>

          </div>

        </div>



        <div className="work-grid">

          {projects.map((project, index) => (

            <article className={`work-card ${index === 0 ? 'work-card--featured' : ''}`} key={project.name}>

              <div className="work-preview">

                {project.name === 'CostWarden' ? (
                  <div className="browser-mock browser-mock--costwarden">
                    <div className="browser-bar browser-bar--costwarden">
                      <i /><i /><i /><span>costwarden.co</span>
                    </div>
                    <div className="browser-page browser-page--costwarden">
                      <img src={costWardenPreview} alt="Podgląd strony CostWarden" />
                    </div>
                  </div>
                              ) : project.name === 'Anna Bagrowska / Psycholog' ? (
                <div className="browser-mock browser-mock--anna">
                  <div className="browser-bar browser-bar--anna">
                    <i /><i /><i /><span>Psycholożka Poznania</span>
                  </div>
                  <div className="browser-page browser-page--anna">
                    <img src={annaBagrowskaPreview} alt="Podgląd strony Psycholożka Poznania — Anna Bagrowska" />
                  </div>
                </div>
              ) : project.image ? (
                <img src={project.image} alt={`Podgląd realizacji ${project.name}`} />
              ) : (
                  <div className="browser-mock" aria-hidden="true">
                    <div className="browser-bar"><i /><i /><i /><span>{project.name.toLowerCase().replaceAll(' ', '')}</span></div>
                    <div className="browser-page"><div className="browser-kicker">{project.type}</div><strong>{project.name}</strong><div className="browser-lines"><i /><i /><i /></div><div className="browser-cta" /></div>
                  </div>
                )}

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
  const existing = Object.fromEntries(team.members.map((member) => [member.name, member]))

  const founder = {
    ...(existing.Bartosz || {}),
    initials: existing.Bartosz?.initials || 'B',
    name: 'Bartosz',
    role: existing.Bartosz?.role || 'Founder',
    bio: existing.Bartosz?.bio || 'Kierunek firmy, perspektywa biznesowa i odpowiedzialność za to, żeby końcowa rekomendacja prowadziła do konkretnej decyzji.',
    featured: true,
  }

  const kari = {
    ...(existing.Kari || {}),
    initials: 'K',
    name: 'Kari',
    role: 'Co-Founder | Marketing',
    bio: 'Współtworzy kierunek DigitalMap i odpowiada za marketing, komunikację oraz doświadczenie klienta w procesie.',
    featured: true,
  }

  const specialistDefaults = {
    Kasia: {
      initials: 'K',
      role: 'Sales | Customer Delivery',
      bio: 'Prowadzi klientów od pierwszej rozmowy przez ustalenie potrzeb po sprawne przekazanie i domknięcie procesu. Dba o jasny zakres, komunikację i kolejne kroki.',
    },
    Oliwia: {
      initials: 'O',
      role: 'Marketing',
      bio: 'Wspiera strategię komunikacji, content i działania marketingowe marki. Pilnuje spójności przekazu i tego, żeby marketing prowadził odbiorcę do kolejnego kroku.',
    },
    Michał: {
      initials: 'M',
      role: 'Web Dev | Tech SEO',
      bio: 'Łączy development z technicznym SEO. Odpowiada za wydajność, strukturę, indeksowalność i techniczne elementy serwisu wpływające na widoczność i konwersję.',
    },
    Eva: {
      initials: 'E',
      role: 'SEO | Link Building',
      bio: 'Odpowiada za off-site SEO, profil linków i budowanie autorytetu domeny. Analizuje jakość źródeł i możliwości wzmacniania pozycji marki w wynikach wyszukiwania.',
    },
    Kacper: {
      initials: 'K',
      role: 'Web Dev | Design',
      bio: 'Projektuje i rozwija strony, łącząc estetykę z użytecznością i konwersją. Przekłada wnioski z diagnozy na rozwiązania, które dobrze wyglądają i dobrze działają.',
    },
    Natalia: {
      initials: 'N',
      role: 'Marketing',
      bio: 'Wspiera działania marketingowe i komunikację marki w kanałach digital. Dba o spójność kampanii, treści i kontaktu z odbiorcą na różnych etapach ścieżki.',
    },
    Paulina: {
      initials: 'P',
      role: 'Sales',
      bio: 'Wspiera sprzedaż od kwalifikacji zapytania po rozmowę o właściwym zakresie współpracy. Dba o to, żeby klient rozumiał wartość, zakres i kolejny krok.',
    },
    Matt: {
      initials: 'M',
      role: 'SEO',
      bio: 'Pracuje nad widocznością organiczną od analizy intencji po strukturę i treści. Wskazuje, gdzie SEO traci potencjał i które zmiany mogą przynieść największy efekt.',
    },
  }
  const specialistNames = ['Kasia', 'Oliwia', 'Michał', 'Eva', 'Kacper', 'Natalia', 'Paulina', 'Matt']

  const specialists = specialistNames.map((name) => ({
    ...specialistDefaults[name],
    ...(existing[name] || {}),
    name,
    initials: existing[name]?.initials || specialistDefaults[name].initials,
    role: specialistDefaults[name].role,
    bio: specialistDefaults[name].bio,
    featured: false,
  }))

  const members = [founder, kari, ...specialists]

  return (
    <section className="team" id="zespol">
      <div className="section-shell">
        <div className="team-heading">
          <div className="eyebrow">ZESPÓŁ</div>
          <div>
            <h2>Diagnoza wymaga <span className="accent-text">więcej niż jednej perspektywy.</span></h2>
            <p>Strategia, marketing, rozwój stron, płatne pozyskanie i social media pokazują różne fragmenty drogi klienta. Łączymy je po to, żeby rekomendacja wynikała z całego procesu — nie z kompetencji jednego działu.</p>
          </div>
        </div>

        <div className="team-members team-members--text-only">
          {members.map((member, index) => (
            <article className={`team-member team-member--text ${member.featured ? 'team-member--featured' : ''}`} key={member.name}>
              <div className="team-member-card-top">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div className="team-member-role">{member.role}</div>
              </div>
              <h3>{member.name}</h3>
              {member.bio && <>
                <div className="team-member-scope-label">Zakres działań</div>
                <p>{member.bio}</p>
              </>}
            </article>
          ))}
        </div>

        <div className="team-trustline">
          <span>Jedna diagnoza.</span>
          <span>Wspólny kierunek.</span>
          <span>Jasna odpowiedzialność za rekomendację.</span>
        </div>
      </div>
    </section>
  )
}



function Offer({ onChoose }) {

  const [activeOffer, setActiveOffer] = useState('strategic')

  const offer = useMemo(() => offers.find((item) => item.id === activeOffer) || offers[0], [activeOffer])



  return (

    <section className="offer-v70" id="oferta">

      <div className="section-shell">

        <div className="offer-v70-head">

          <div className="eyebrow">OFERTA</div>

          <div>

            <h2>Najpierw ustal, <span className="accent-text">czego naprawdę potrzebujesz.</span></h2>

            <p>Nie zaczynamy od wyboru usługi. Zaczynamy od pytania, na które potrzebujesz odpowiedzi.</p>

          </div>

        </div>



        <div className="offer-v70-question-label">

          <span>WYBIERZ PYTANIE, NA KTÓRE CHCESZ ODPOWIEDZI</span>

          <small>{String(offers.findIndex((item) => item.id === activeOffer) + 1).padStart(2, '0')} / {String(offers.length).padStart(2, '0')}</small>

        </div>



        <div className="offer-v70-nav" role="tablist" aria-label="Wybierz zakres Mapy">

          {offers.map((item, index) => {

            const active = item.id === activeOffer

            return (

              <button

                key={item.id}

                type="button"

                role="tab"

                aria-selected={active}

                className={`offer-v70-nav__item ${active ? 'is-active' : ''}`}

                onClick={() => setActiveOffer(item.id)}

                onMouseEnter={() => setActiveOffer(item.id)}

                onFocus={() => setActiveOffer(item.id)}

              >

                <span className="offer-v70-nav__no">{String(index + 1).padStart(2, '0')}</span>

                <span className="offer-v70-nav__copy">

                  <b>{item.name}</b>

                  <strong>{item.question}</strong>

                </span>

                <span className="offer-v70-nav__price">{item.price}</span>

                <i aria-hidden="true">↗</i>

              </button>

            )

          })}

        </div>



        <article className="offer-v70-panel" key={offer.id}>

          <div className="offer-v70-panel__glow" aria-hidden="true" />

          <div className="offer-v70-panel__topline">

            <span>{offer.name.toUpperCase()}</span>

            {offer.featured && <b>NAJCZĘŚCIEJ WYBIERANA</b>}

          </div>



          <div className="offer-v70-panel__hero">

            <div className="offer-v70-panel__intro">

              <h3>{offer.question}</h3>

              <p>{offer.copy}</p>

            </div>

            <strong className="offer-v70-panel__price">{offer.price}</strong>

          </div>



          <div className="offer-v70-choose-if">

            <span>WYBIERZ, JEŚLI</span>

            <p>{offer.chooseIf}</p>

          </div>



          <div className="offer-v70-details">

            <div className="offer-v70-audience">

              <span>DLA KOGO</span>

              <p>{offer.audience}</p>

            </div>



            <div className="offer-v70-includes">

              <span>CO DOSTAJESZ</span>

              <div className="offer-v70-includes__grid">

                {offer.includes.map((item, index) => (

                  <div className="offer-v70-includes__item" key={item}>

                    <i>{String(index + 1).padStart(2, '0')}</i>

                    <strong>{item}</strong>

                  </div>

                ))}

              </div>

            </div>

          </div>



          <div className="offer-v70-result">

            <div>

              <span>PO TEJ MAPIE</span>

              <strong>{offer.result}</strong>

            </div>

            <a

              className="offer-v70-cta"

              href="#sprawdz-swoja-firme"

              onClick={() => onChoose(offer)}

            >

              {offer.cta} <Arrow />

            </a>

          </div>

        </article>



        <div className="offer-v70-after">

          <div className="offer-v70-after__copy">

            <div className="eyebrow">PO DIAGNOZIE</div>

            <h3>Wiesz już, co robić. <span>Teraz możesz to wdrożyć.</span></h3>

            <p>Rekomendacje możesz wdrożyć samodzielnie, z własnym zespołem, z innym wykonawcą albo z DigitalMap.</p>

            <strong>Zakres wdrożenia wynika z diagnozy — nie jest ustalany z góry.</strong>

          </div>



          <div className="offer-v70-after__route" aria-label="Możliwe drogi wdrożenia po diagnozie">

            <div><i>01</i><span>Samodzielnie</span></div>

            <div><i>02</i><span>Własny zespół</span></div>

            <div><i>03</i><span>Inny wykonawca</span></div>

            <div className="is-accent"><i>04</i><span>DigitalMap</span></div>

          </div>

        </div>

      </div>

    </section>

  )

}



function ScanForm({ selectedSymptom, selectedOffer }) {
  const [step, setStep] = useState(0)
  const [selectedPath, setSelectedPath] = useState(null)
  const [problem, setProblem] = useState(null)
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [editingPath, setEditingPath] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!selectedOffer) {
      setSelectedPath(null)
      setStep(0)
      return
    }

    setSelectedPath(selectedOffer)
    setStep((current) => (current === 0 ? 1 : current))
  }, [selectedOffer])

  const journey = [
    { id: 0, number: '01', label: 'Ścieżka', value: selectedPath?.name || 'Wybierz zakres' },
    { id: 1, number: '02', label: 'Firma', value: company || 'Nazwa lub domena' },
    { id: 2, number: '03', label: 'Problem', value: problem?.label || 'Co ogranicza wynik?' },
    { id: 3, number: '04', label: 'Kontakt', value: email || 'Gdzie odpisać?' },
  ]

  function canOpenJourneyStep(target) {
    if (target === 0) return true
    if (target === 1) return Boolean(selectedPath)
    if (target === 2) return Boolean(selectedPath && company.trim())
    if (target === 3) return Boolean(selectedPath && company.trim() && problem)
    return false
  }

  function choosePath(item, stayOnContact = false) {
    setSelectedPath(item)
    setSubmitError('')
    if (stayOnContact) {
      setEditingPath(false)
    } else {
      setStep(1)
    }
  }

  function chooseProblem(item) {
    setProblem(item)
    selectedSymptom.set(item)
    setSubmitError('')
    setStep(3)
  }

  async function submit(e) {
    e.preventDefault()
    setSubmitError('')

    if (step === 1) {
      if (company.trim()) setStep(2)
      return
    }

    if (step !== 3) return

    if (!selectedPath) {
      setSubmitError('Wybierz ścieżkę, zanim wyślesz zgłoszenie.')
      setStep(0)
      return
    }

    if (!problem) {
      setSubmitError('Wybierz problem, który dziś najbardziej ogranicza wynik.')
      setStep(2)
      return
    }

    if (!email.includes('@')) {
      setSubmitError('Podaj poprawny adres e-mail.')
      return
    }

    if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      setSubmitError('Formularz jest gotowy, ale trzeba jeszcze wkleić endpoint Formspree w src/formConfig.js.')
      return
    }

    const formData = new FormData(e.currentTarget)
    setSubmitting(true)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) {
        throw new Error('Formspree rejected the submission')
      }

      setDone(true)
    } catch (error) {
      setSubmitError('Nie udało się wysłać zgłoszenia. Spróbuj ponownie albo napisz na kontakt@digitalmap.pl.')
    } finally {
      setSubmitting(false)
    }
  }

  function resetForm() {
    setDone(false)
    setStep(0)
    setSelectedPath(null)
    setProblem(null)
    setCompany('')
    setEmail('')
    setNote('')
    setEditingPath(false)
    setSubmitError('')
  }

  return (
    <section className="scan" id="sprawdz-swoja-firme">
      <div className={`scan-shell ${done ? 'is-done' : ''}`}>
        <div className="scan-copy">
          <div className="eyebrow">ZACZNIJ OD FIRMY</div>
          <h2>Pokaż nam firmę. <span className="accent-text">Nie musisz wiedzieć, czego potrzebujesz.</span></h2>
          <p>Najpierw wybierz zakres, później pokaż nam firmę i problem. Na końcu zostaw kontakt — wszystko możesz jeszcze zmienić przed wysłaniem.</p>

          <div className="scan-compact-meta">
            <span>4 kroki</span>
            <span>2–3 min</span>
            <span>Bez zobowiązań</span>
          </div>
        </div>

        <form className={`scan-card scan-card--v6 scan-card--journey ${done ? 'is-done' : ''}`} onSubmit={submit}>
          {!done && (
            <div className="scan-progress-compact" aria-label="Postęp formularza">
              {journey.map((item, index) => {
                const complete = index < step
                const current = index === step
                const available = canOpenJourneyStep(index)

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`${complete ? 'is-complete' : ''} ${current ? 'is-current' : ''}`}
                    disabled={!available}
                    onClick={() => available && setStep(index)}
                    aria-label={`${item.number}. ${item.label}`}
                  >
                    <span>{complete ? '✓' : item.number}</span>
                    <b>{item.label}</b>
                  </button>
                )
              })}
            </div>
          )}
          <input type="hidden" name="sciezka" value={selectedPath?.name || ''} />
          <input type="hidden" name="cena" value={selectedPath?.price || ''} />
          <input type="hidden" name="firma" value={company} />
          <input type="hidden" name="problem" value={problem?.label || ''} />
          <input type="hidden" name="problem_krotko" value={problem?.short || ''} />
          <input type="hidden" name="zrodlo" value="DigitalMap — formularz strony" />
          <input className="form-honeypot" type="text" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" />

          {!done && step === 0 && <>
            <span className="form-kicker">KROK 01 / WYBIERZ ŚCIEŻKĘ</span>
            <h3>Od czego chcesz zacząć?</h3>
            <p className="path-choice-intro">Jeśli nie wybrałaś ścieżki wyżej, możesz zrobić to tutaj. Zmienisz ją również przed wysłaniem.</p>

            <div className="path-choice-grid">
              {offers.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`path-choice ${selectedPath?.id === item.id ? 'is-selected' : ''}`}
                  onClick={() => choosePath(item)}
                >
                  <span className="path-choice__top">
                    <i>{item.code}</i>
                    <b>{item.price}</b>
                  </span>
                  <strong>{item.name}</strong>
                  <small>{item.question}</small>
                  <em>Wybierz ↗</em>
                </button>
              ))}
            </div>
          </>}

          {!done && step === 1 && <>
            <span className="form-kicker">KROK 02 / FIRMA</span>
            <h3>Gdzie Twoja firma może tracić klientów?</h3>
            <label>Nazwa firmy albo domena</label>
            <input
              autoFocus
              name="company_visible"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="twojafirma.pl lub Nazwa Firmy"
            />
            <p className="field-help">Nie masz jeszcze strony? Wpisz nazwę firmy — możemy zacząć od rynku, widoczności, oferty i publicznie dostępnych sygnałów.</p>
            <button type="submit">Dalej: wybierz problem <Arrow /></button>
            <button className="form-back" type="button" onClick={() => setStep(0)}>← Zmień ścieżkę</button>
          </>}

          {!done && step === 2 && <>
            <span className="form-kicker">KROK 03 / PROBLEM</span>
            <h3>Co dziś najbardziej ogranicza wynik?</h3>
            <div className="form-options form-options--v6">
              {symptoms.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={problem?.id === item.id ? 'active' : ''}
                  onClick={() => chooseProblem(item)}
                >
                  <span>{item.label}</span>
                  <i>↗</i>
                </button>
              ))}
            </div>
            <button className="form-back" type="button" onClick={() => setStep(1)}>← Wróć do firmy</button>
          </>}

          {!done && step === 3 && <>
            <span className="form-kicker">KROK 04 / KONTAKT</span>
            <h3>Gdzie wysłać wynik?</h3>

            <div className="contact-route">
              <div>
                <span>WYBRANA ŚCIEŻKA</span>
                <strong>{selectedPath?.name}</strong>
                <small>{selectedPath?.price}</small>
              </div>
              <button type="button" onClick={() => setEditingPath((value) => !value)}>
                {editingPath ? 'Zamknij' : 'Zmień ścieżkę'}
              </button>
            </div>

            {editingPath && (
              <div className="path-choice-grid path-choice-grid--compact">
                {offers.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`path-choice ${selectedPath?.id === item.id ? 'is-selected' : ''}`}
                    onClick={() => choosePath(item, true)}
                  >
                    <span className="path-choice__top">
                      <i>{item.code}</i>
                      <b>{item.price}</b>
                    </span>
                    <strong>{item.name}</strong>
                  </button>
                ))}
              </div>
            )}

            <div className="contact-summary">
              <button type="button" onClick={() => setStep(1)}>
                <span>FIRMA</span><strong>{company}</strong><i>Zmień</i>
              </button>
              <button type="button" onClick={() => setStep(2)}>
                <span>PROBLEM</span><strong>{problem?.short || problem?.label}</strong><i>Zmień</i>
              </button>
            </div>

            <label>E-mail</label>
            <input
              autoFocus
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ty@firma.pl"
              required
            />

            <label className="optional-label">Dodatkowy kontekst <span>opcjonalnie</span></label>
            <textarea
              name="kontekst"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Np. reklamy kosztują coraz więcej, ale liczba zapytań nie rośnie..."
            />

            {submitError && <div className="form-submit-error" role="alert">{submitError}</div>}

            <button type="submit" disabled={submitting}>
              {submitting ? 'Wysyłamy zgłoszenie…' : <>Wyślij firmę do analizy <Arrow /></>}
            </button>
            <small>Dane wykorzystamy wyłącznie do odpowiedzi w sprawie wybranej Mapy.</small>
          </>}

          {done && (
            <div className="form-success form-success--premium">
              <span className="form-success__mark">✓</span>
              <span className="form-success__eyebrow">ZGŁOSZENIE WYSŁANE</span>
              <h3>Dzięki. Mamy to.</h3>
              <p>Twoje zgłoszenie jest już po naszej stronie. Wrócimy na <strong>{email}</strong> z odpowiedzią dotyczącą wybranej ścieżki.</p>

              <div className="form-success__summary">
                <span>
                  <small>ŚCIEŻKA</small>
                  <strong>{selectedPath?.name}</strong>
                </span>
                <span>
                  <small>FIRMA</small>
                  <strong>{company}</strong>
                </span>
              </div>

              <button type="button" onClick={resetForm}>
                <span>Sprawdź inną firmę</span>
                <i>↗</i>
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}



function FAQ({ onChoose }) {
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

        <div className="final-cta-v14 final-cta-premium final-cta-premium--routes">
          <div className="final-cta-copy">
            <span>NAJPIERW DIAGNOZA</span>
            <h3>Zanim wydasz więcej na marketing, upewnij się, że rozwiązujesz właściwy problem.</h3>
            <p>Wybierz, od jakiego poziomu diagnozy chcesz zacząć. Jeśli nie masz pewności, Mini Mapa jest bezpłatnym punktem wejścia.</p>
          </div>

          <div className="final-route-actions">
            <a
              href="#sprawdz-swoja-firme"
              className="final-route-action final-route-action--primary"
              onClick={() => onChoose(offers.find((item) => item.name === 'Mini Mapa'))}
            >
              <span className="final-route-action__eyebrow">NAJPROSTSZY START</span>
              <span className="final-route-action__main">
                <strong>Zacznij od Mini Mapy</strong>
                <b>0 zł</b>
              </span>
              <span className="final-route-action__foot">
                <small>Sprawdzimy, gdzie może być problem.</small>
                <i>↗</i>
              </span>
            </a>

            <a
              href="#sprawdz-swoja-firme"
              className="final-route-action final-route-action--secondary"
              onClick={() => onChoose(null)}
            >
              <span className="final-route-action__eyebrow">MASZ KONKRETNY CEL?</span>
              <span className="final-route-action__main">
                <strong>Wybierz inną ścieżkę</strong>
                <b>3 opcje</b>
              </span>
              <span className="final-route-action__foot">
                <small>Start · Strategiczna · AI</small>
                <i>→</i>
              </span>
            </a>

            <p className="final-route-actions__note">
              Nie musisz decydować teraz. W formularzu możesz jeszcze zmienić wybór.
            </p>
          </div>
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

        <div className="footer-column"><h3>Oferta</h3><a href="#oferta">Mini Mapa</a><a href="#oferta">Mapa Start</a><a href="#oferta">Mapa Strategiczna</a><a href="#oferta">Mapa AI</a><a href="#oferta">Po diagnozie</a></div>

        <div className="footer-column"><h3>Firma</h3><a href="#jak-powstaje-mapa">Jak działamy</a><a href="#dla-kogo">Dla kogo</a><a href="#realizacje">Realizacje</a><a href="#zespol">Zespół</a><a href="#metoda">Metoda</a><a href="#najczestsze-pytania">Najczęstsze Pytania</a></div>

        <div className="footer-column"><h3>Kontakt</h3><a href="mailto:kontakt@digitalmap.pl">kontakt@digitalmap.pl</a><a href="#sprawdz-swoja-firme">Formularz</a></div>

        <div className="footer-column footer-formal"><h3>Formalności</h3><a href={`${import.meta.env.BASE_URL}polityka-prywatnosci/`}>Polityka prywatności</a><a href={`${import.meta.env.BASE_URL}regulamin/`}>Regulamin</a><a href={`${import.meta.env.BASE_URL}cookies/`}>Cookies</a></div>

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

  const [selectedOffer, setSelectedOffer] = useState(null)



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

        <FAQ onChoose={setSelectedOffer} />

        <ScanForm selectedOffer={selectedOffer} selectedSymptom={{ id: selectedSymptomValue.id, value: selectedSymptomValue, set: selectSymptom }} />

      </main>

      <Footer />

    </>

  )

}
