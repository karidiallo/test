import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LivingMap } from './components/LivingMap.jsx'
import { TopographicLogo } from './components/TopographicLogo.jsx'
import { diagnosis, industries, offers, processSteps, projects, symptoms, team, toolGroups } from './content.js'

gsap.registerPlugin(ScrollTrigger)

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function accentTitle(title, accent) {
  const [before, after = ''] = title.split(accent)
  return <>{before}<span className="accent-text">{accent}</span>{after}</>
}

function Header() {
  return (
    <header className="header">
      <TopographicLogo />
      <nav aria-label="Główna nawigacja">
        <a href="#system">Problem</a>
        <a href="#process">Jak działamy</a>
        <a href="#sample">Mapa</a>
        <a href="#industries">Dla kogo</a>
        <a href="#work">Realizacje</a>
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
            <h2>Objaw nie mówi jeszcze, <span className="accent-text">gdzie naprawdę zaczyna się problem.</span></h2>
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

function Process() {
  return (
    <section className="process-section" id="process">
      <div className="section-shell process-layout">
        <div className="process-intro">
          <div className="eyebrow">04 / JAK TO DZIAŁA</div>
          <h2>Od firmy do decyzji <span className="accent-text">w czterech krokach.</span></h2>
          <p>Bez warsztatu na trzy godziny. Bez wdrożenia w ciemno. Najpierw zawężamy problem, później ustalamy kolejność.</p>
        </div>
        <div className="process-timeline">
          {processSteps.map((step) => (
            <article className="process-step" key={step.no}>
              <div className="process-dot" />
              <span className="process-no">{step.no}</span>
              <h3>{accentTitle(step.title, step.accent)}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SampleMap() {
  const [view, setView] = useState('overview')
  const [decisionTab, setDecisionTab] = useState('decision')
  const [evidenceIndex, setEvidenceIndex] = useState(0)

  const decisionTabs = {
    decision: ['DECYZJA', diagnosis.decision],
    now: ['PIERWSZY RUCH', diagnosis.doNow],
    later: ['NIE TERAZ', diagnosis.notNow],
    measure: ['MIERNIK', diagnosis.measure],
  }

  const views = [
    ['overview', 'Przegląd'],
    ['journey', 'Droga klienta'],
    ['evidence', 'Dowody'],
    ['plan', 'Plan 30 dni'],
  ]

  return (
    <section className="sample-section" id="sample">
      <div className="section-shell">
        <div className="section-heading section-heading--split sample-heading">
          <div className="eyebrow">05 / PRZYKŁADOWA MAPA</div>
          <div>
            <h2>Nie raport do odłożenia. <span className="accent-text">Interaktywna hierarchia decyzji.</span></h2>
            <p>Kliknij po przykładowej diagnozie firmy usługowej. Każdy ekran odpowiada na inne pytanie: gdzie jest problem, co go potwierdza, co zrobić teraz i czego nie dotykać.</p>
          </div>
        </div>

        <div className="diagnosis-ui diagnosis-ui--interactive">
          <aside className="diagnosis-rail">
            <TopographicLogo inverted />
            <div className="rail-nav">
              {views.map(([key, label]) => (
                <button key={key} className={view === key ? 'active' : ''} onClick={() => setView(key)}>
                  <span>{label}</span><Arrow />
                </button>
              ))}
            </div>
            <small>DEMO MAPY / firma usługowa</small>
          </aside>

          <div className="diagnosis-main">
            <div className="diagnosis-top"><span>DIGITALMAP / DIAGNOSIS 01</span><b>status: zakończona</b></div>

            {view === 'overview' && (
              <div className="map-view map-view--overview">
                <div className="priority-layout">
                  <div className="priority-copy">
                    <span className="priority-no">PROBLEM #1</span>
                    <h3>{diagnosis.problem}</h3>
                    <p>{diagnosis.summary}</p>
                  </div>
                  <div className="evidence-stack">
                    {diagnosis.evidence.map((item, index) => (
                      <button className={evidenceIndex === index ? 'evidence-row active' : 'evidence-row'} key={item.label} onClick={() => setEvidenceIndex(index)}>
                        <span>{item.label}</span><strong>{item.value}</strong><i>↗</i>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="evidence-detail"><span>{diagnosis.evidence[evidenceIndex].label}</span><p>{diagnosis.evidence[evidenceIndex].detail}</p></div>
              </div>
            )}

            {view === 'journey' && (
              <div className="map-view map-view--journey">
                <div className="view-intro"><span>DROGA KLIENTA</span><h3>Gdzie zatrzymuje się wynik?</h3><p>Etapy nie są oceniane jako „dobre / złe”. Szukamy miejsca, które najbardziej ogranicza kolejny etap.</p></div>
                <div className="journey-grid">
                  {diagnosis.stages.map((stage, index) => (
                    <button key={stage.name} className={stage.status === 'wąskie gardło' ? 'journey-stage critical' : 'journey-stage'} onClick={() => setEvidenceIndex(Math.min(index, diagnosis.evidence.length - 1))}>
                      <span>0{index + 1}</span><b>{stage.name}</b><strong>{stage.score}</strong><em>{stage.status}</em><p>{stage.note}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {view === 'evidence' && (
              <div className="map-view map-view--evidence">
                <div className="view-intro"><span>DOWODY</span><h3>Co potwierdza priorytet?</h3><p>Kliknij sygnał. Pokazujemy nie tylko obserwację, ale też dlaczego ma znaczenie biznesowe.</p></div>
                <div className="evidence-browser">
                  <div className="evidence-browser-nav">
                    {diagnosis.evidence.map((item, index) => <button key={item.label} className={evidenceIndex === index ? 'active' : ''} onClick={() => setEvidenceIndex(index)}><span>0{index + 1}</span>{item.label}</button>)}
                  </div>
                  <div className="evidence-browser-main"><span>{diagnosis.evidence[evidenceIndex].label}</span><h4>{diagnosis.evidence[evidenceIndex].value}</h4><p>{diagnosis.evidence[evidenceIndex].detail}</p></div>
                </div>
              </div>
            )}

            {view === 'plan' && (
              <div className="map-view map-view--plan">
                <div className="view-intro"><span>PLAN 30 DNI</span><h3>Najpierw ruch, który odblokowuje resztę.</h3><p>Plan ma kolejność. Nie próbujemy wdrażać wszystkiego naraz.</p></div>
                <div className="plan-grid">{diagnosis.plan.map((item) => <article key={item.no}><span>{item.no}</span><h4>{item.title}</h4><p>{item.copy}</p></article>)}</div>
              </div>
            )}

            <div className="decision-tabs">
              {Object.entries(decisionTabs).map(([key, [label]]) => <button key={key} className={decisionTab === key ? 'active' : ''} onClick={() => setDecisionTab(key)}>{label}</button>)}
            </div>
            <div className="decision-output">
              <div><span>{decisionTabs[decisionTab][0]}</span><strong>{decisionTabs[decisionTab][1]}</strong></div>
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
    <section className="principle principle--dark">
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

function Method() {
  const [activeGroup, setActiveGroup] = useState(toolGroups[0].id)
  const group = toolGroups.find((item) => item.id === activeGroup) || toolGroups[0]

  return (
    <section className="method-v6" id="method">
      <div className="section-shell">
        <div className="method-v6-head">
          <div className="eyebrow">06 / METODA</div>
          <div><h2>Narzędzia mają znaleźć sygnał. <span className="accent-text">Nie podjąć decyzję za firmę.</span></h2><p>Łączymy dane, research i obserwację rynku. Potem człowiek ocenia znaczenie sygnałów, odrzuca szum i ustala kolejność działań.</p></div>
        </div>

        <div className="method-command">
          <div className="method-group-nav" role="tablist" aria-label="Grupy narzędzi">
            {toolGroups.map((item) => (
              <button key={item.id} className={activeGroup === item.id ? 'active' : ''} onClick={() => setActiveGroup(item.id)}>
                <span>{item.no}</span><strong>{item.title}</strong><i>↗</i>
              </button>
            ))}
          </div>

          <div className="method-stage">
            <div className="method-stage-head"><span>{group.no} / {group.title}</span><h3>{group.copy}</h3></div>
            <div className="method-tools-live">
              {group.tools.map((tool) => (
                <article key={tool.code}>
                  <span>{tool.code}</span><div><strong>{tool.name}</strong><p>{tool.detail}</p></div>
                </article>
              ))}
            </div>
            <div className="method-pipeline"><span>Źródła</span><i>→</i><span>Sygnały</span><i>→</i><span>Kontekst</span><i>→</i><b>Priorytet</b></div>
          </div>

          <aside className="human-decision-card">
            <div className="human-orbit"><i /><i /><i /><b /></div>
            <span>HUMAN REVIEW</span>
            <h3>Dane nie wiedzą, co jest najważniejsze dla Twojego biznesu.</h3>
            <p>Dlatego wynik nie jest automatycznym score'em. Oddzielamy fakty od hipotez, łączymy sygnały z kontekstem i dopiero wtedy wskazujemy problem #1.</p>
            <div className="human-decision-foot"><span>fakty</span><span>sygnały</span><span>hipotezy</span><strong>decyzja</strong></div>
          </aside>
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
    <section className="section evidence-section" id="scope">
      <div className="section-shell">
        <div className="section-heading section-heading--split">
          <div className="eyebrow">07 / CO SPRAWDZAMY</div>
          <div><h2>Patrzymy na cały system, <span className="accent-text">nie jeden kanał.</span></h2><p>Łączymy sygnały z całej drogi klienta, żeby ustalić, co jest dziś problemem #1, a co tylko kolejną rzeczą, którą można byłoby poprawić.</p></div>
        </div>
        <div className="evidence-grid evidence-grid--hover">
          {items.map(([no, title, copy]) => <article key={no}><span>{no}</span><div className="evidence-arrow">↗</div><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>
  )
}

function Industries() {
  return (
    <section className="industries" id="industries">
      <div className="section-shell industries-layout">
        <div className="industries-copy">
          <div className="eyebrow">08 / DLA KOGO</div>
          <h2>Branża zmienia kontekst. <span className="accent-text">Nie logikę diagnozy.</span></h2>
          <p>Pracujemy międzybranżowo — z firmami lokalnymi, eksperckimi, usługowymi i cyfrowymi. Jeśli da się prześledzić drogę od widoczności do decyzji klienta, możemy znaleźć miejsce, które ogranicza wynik.</p>
          <a href="#scan" className="text-link">Nie widzisz swojej branży? Sprawdź firmę <Arrow /></a>
        </div>
        <div className="industry-grid">
          {industries.map((industry, index) => <article key={industry.name}><span>{String(index + 1).padStart(2, '0')}</span><h3>{industry.name}</h3><p>{industry.tag}</p></article>)}
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="work" id="work">
      <div className="section-shell">
        <div className="section-heading section-heading--split work-heading">
          <div className="eyebrow">09 / WYBRANE REALIZACJE</div>
          <div>
            <h2>Nie tylko rekomendujemy. <span className="accent-text">Projektujemy i budujemy.</span></h2>
            <p>Wybrane produkty i strony, przy których pracowaliśmy nad pozycjonowaniem, doświadczeniem użytkownika, komunikacją albo wdrożeniem. Status projektu pokazujemy wprost.</p>
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
                <div className="work-copy"><div className="work-type">{project.type}</div><h3>{project.name}</h3><p>{project.description}</p><div className="work-scope">{project.scope}</div></div>
                {project.url ? <a className="work-link" href={project.url} target="_blank" rel="noreferrer">Zobacz projekt <Arrow /></a> : <span className="work-link work-link--muted">Case preview</span>}
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
    <section className="team" id="team">
      <div className="section-shell">
        <div className="team-heading">
          <div className="eyebrow">10 / ZESPÓŁ</div>
          <div><h2>Za DigitalMap stoją <span className="accent-text">konkretni ludzie.</span></h2><p>Pięć osób, pięć uzupełniających się kompetencji. Strategia, marketing, technologia, płatne pozyskanie i social media spotykają się przy jednym celu: znaleźć właściwy problem i przełożyć go na właściwy ruch.</p></div>
        </div>

        <div className="team-members">
          {team.members.map((member, index) => (
            <article className={`team-member ${member.featured ? 'team-member--featured' : ''}`} key={member.name}>
              <div className="team-member-portrait">{member.photo ? <img src={member.photo} alt={member.name} /> : <span>{member.initials}</span>}<div className="team-member-number">0{index + 1}</div></div>
              <div className="team-member-info"><div className="team-member-role">{member.role}</div><h3>{member.name}</h3><p>{member.bio}</p></div>
            </article>
          ))}
        </div>
        <div className="team-trustline"><span>Jedna diagnoza.</span><span>Wspólna odpowiedzialność za kierunek.</span><span>Bez anonimowego przekazywania projektu między działami.</span></div>
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
    <section className="offer-v6" id="offer">
      <div className="section-shell">
        <div className="offer-v6-head">
          <div className="eyebrow">11 / OFERTA</div>
          <div><h2>Nie wybieraj „pakietu”. <span className="accent-text">Wybierz poziom problemu.</span></h2><p>Każdy produkt odpowiada na inną sytuację firmy. Kliknij opcję, żeby od razu zobaczyć, dla kogo jest, kiedy ma sens i jaki wynik dostajesz.</p></div>
        </div>

        <div className="offer-chooser">
          <div className="offer-selector">
            {offers.map((item) => (
              <button key={item.id} className={activeOffer === item.id ? 'active' : ''} onClick={() => choose(item)}>
                <span>{item.code}</span><div><strong>{item.name}</strong><small>{item.label}</small></div><b>{item.price}</b><i>↗</i>
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
            <div className="offer-includes"><span>W ZAKRESIE</span><div>{offer.includes.map((item) => <b key={item}>{item}</b>)}</div></div>
            <a className="offer-main-cta" href="#scan" onClick={() => onChoose(offer)}>{offer.cta} <Arrow /></a>
          </article>
        </div>

        <div className="offer-help"><span>Nie wiesz, czego potrzebujesz?</span><p>Nie musisz diagnozować się samodzielnie. Zostaw firmę i problem — jeśli wystarczy bezpłatna Mini Mapa, powiemy to wprost.</p><a href="#scan">Pomóżcie mi wybrać <Arrow /></a></div>
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
    <section className="scan" id="scan">
      <div className="scan-shell">
        <div className="scan-copy">
          <div className="eyebrow">12 / ZACZNIJ OD FIRMY</div>
          <h2>Nie musisz wiedzieć, <span className="accent-text">której usługi potrzebujesz.</span></h2>
          <p>Podaj stronę albo po prostu nazwę firmy, wybierz problem i zostaw e-mail. Jeśli nie masz strony — to nie blokuje diagnozy. Najpierw ustalimy, od czego warto zacząć.</p>
          <div className="scan-selected"><span>WYBRANA ŚCIEŻKA</span><strong>{selectedOffer?.name || 'Mini Mapa'}</strong><small>{selectedOffer?.price || '0 zł'}</small></div>
          <div className="scan-steps"><span className={step >= 0 ? 'active' : ''}>01 FIRMA</span><span className={step >= 1 ? 'active' : ''}>02 PROBLEM</span><span className={step >= 2 ? 'active' : ''}>03 KONTAKT</span></div>
        </div>

        <form className="scan-card scan-card--v6" onSubmit={submit}>
          {!done && step === 0 && <>
            <span className="form-kicker">KROK 01 / FIRMA</span>
            <h3>Co mamy sprawdzić?</h3>
            <label>Domena albo nazwa firmy</label>
            <input autoFocus value={company} onChange={(e) => setCompany(e.target.value)} placeholder="twojafirma.pl lub Nazwa Firmy" />
            <p className="field-help">Nie masz strony? Wpisz samą nazwę firmy — możemy zacząć od rynku, widoczności i dostępnych publicznie sygnałów.</p>
            <button type="submit">Dalej: wybierz problem <Arrow /></button>
          </>}

          {!done && step === 1 && <>
            <span className="form-kicker">KROK 02 / PROBLEM</span>
            <h3>Co dziś najbardziej Cię blokuje?</h3>
            <div className="form-options form-options--v6">
              {symptoms.map((item) => <button key={item.id} type="button" className={selectedSymptom.id === item.id ? 'active' : ''} onClick={() => { selectedSymptom.set(item); setStep(2) }}><span>{item.label}</span><i>↗</i></button>)}
            </div>
            <button className="form-back" type="button" onClick={() => setStep(0)}>← Wróć</button>
          </>}

          {!done && step === 2 && <>
            <span className="form-kicker">KROK 03 / KONTAKT</span>
            <h3>Gdzie mamy wrócić z pierwszym kierunkiem?</h3>
            <div className="domain-confirm"><span>{company}</span><b>{selectedSymptom.value.short}</b></div>
            <label>E-mail</label>
            <input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ty@firma.pl" />
            <label className="optional-label">Dodatkowy kontekst <span>opcjonalnie</span></label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Np. reklamy kosztują coraz więcej, ale liczba zapytań nie rośnie..." />
            <button type="submit">Wyślij firmę do analizy <Arrow /></button>
            <small>Dane wykorzystamy wyłącznie do odpowiedzi w sprawie wybranej Mapy.</small>
          </>}

          {done && <div className="form-success"><span>✓</span><h3>Dzięki.</h3><p>Zgłoszenie ma komplet informacji potrzebnych do pierwszego spojrzenia: firma, problem i kontakt.</p><button type="button" onClick={() => { setDone(false); setStep(0); setCompany(''); setEmail(''); setNote('') }}>Sprawdź inną firmę</button></div>}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-grid">
        <div className="footer-brand"><TopographicLogo inverted /><p>DigitalMap to warstwa diagnostyczno-decyzyjna przed wydawaniem pieniędzy na marketing. Najpierw znajdujemy problem #1. Dopiero potem wybieramy rozwiązanie.</p><span>© 2026 DigitalMap</span></div>
        <div className="footer-column"><h3>Oferta</h3><a href="#offer">Mini Mapa</a><a href="#offer">Mapa Start</a><a href="#offer">Mapa Strategiczna</a><a href="#offer">Mapa AI</a><a href="#offer">Wdrożenie / Monitoring</a></div>
        <div className="footer-column"><h3>Firma</h3><a href="#process">Jak działamy</a><a href="#industries">Dla kogo</a><a href="#work">Realizacje</a><a href="#team">Zespół</a><a href="#method">Metoda</a></div>
        <div className="footer-column"><h3>Kontakt</h3><a href="mailto:kontakt@digitalmap.pl">kontakt@digitalmap.pl</a><a href="#scan">Formularz</a></div>
        <div className="footer-column footer-formal"><h3>Formalności</h3><span>Polityka prywatności</span><span>Regulamin</span><span>Cookies</span><small>Dokumenty formalne podłączymy przed publikacją produkcyjną.</small></div>
      </div>
      <div className="footer-bottom"><span>Diagnoza → decyzja → wdrożenie → pomiar.</span><a href="#top">Wróć na górę ↑</a></div>
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
        <Process />
        <SampleMap />
        <Principle />
        <Method />
        <Evidence />
        <Industries />
        <Work />
        <Team />
        <Offer onChoose={setSelectedOffer} />
        <ScanForm selectedOffer={selectedOffer} selectedSymptom={{ id: selectedSymptomValue.id, value: selectedSymptomValue, set: selectSymptom }} />
      </main>
      <Footer />
    </>
  )
}
