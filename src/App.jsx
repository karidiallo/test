import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LivingMap } from './components/LivingMap.jsx'
import { TopographicLogo } from './components/TopographicLogo.jsx'
import { diagnosis, faqs, industries, offers, processSteps, projects, symptoms, team, toolGroups } from './content.js'

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
        <a href="#offer">Oferta</a>
        <a href="#work">Realizacje</a>
      </nav>
      <a className="header-cta" href="#scan">Sprawdź swoją firmę <Arrow /></a>
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
      title: <>Czy Twoja firma jest <span className="accent-text">widoczna wtedy, kiedy klient szuka?</span></>,
      copy: 'Sprawdzamy, czy docierasz do właściwych ludzi przy właściwej potrzebie — w Google, Maps, reklamach i nowych kanałach wyszukiwania.',
      proof: 'Google · SEO · Maps · Ads · AI Search',
    },
    {
      no: 'STRONA I OFERTA',
      title: <>Klient trafia na stronę. <span className="accent-text">Czy od razu wie, dlaczego ma wybrać właśnie Ciebie?</span></>,
      copy: 'Sprawdzamy ofertę, komunikację, UX i CTA. Dobry ruch nic nie daje, jeśli klient nie rozumie wartości albo nie wie, co zrobić dalej.',
      proof: 'Oferta · komunikacja · UX · CTA · landing page',
    },
    {
      no: 'SOCIAL & CONTENT',
      title: <>Publikujesz regularnie. <span className="accent-text">Czy treści pomagają klientowi podjąć decyzję?</span></>,
      copy: 'Sprawdzamy, czy content buduje zaufanie, pokazuje wartość i prowadzi dalej — czy tylko generuje aktywność bez wpływu na wynik.',
      proof: 'Social · content · proof · droga do kontaktu',
    },
    {
      no: 'ZAUFANIE',
      title: <>Klient już Cię zna. <span className="accent-text">Czy ma wystarczający powód, żeby Ci zaufać?</span></>,
      copy: 'Sprawdzamy opinie, dowody, reputację, eksperckość i sposób prezentowania przewagi firmy.',
      proof: 'Opinie · case studies · reputacja · przewaga',
    },
    {
      no: 'KONWERSJA',
      title: <>Jest zainteresowanie. <span className="accent-text">Gdzie klient odpada przed kontaktem?</span></>,
      copy: 'Łączymy wcześniejsze etapy i sprawdzamy drogę od zainteresowania do zapytania, konsultacji lub zakupu.',
      proof: 'Formularz · kontakt · lead · konsultacja · sprzedaż',
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
    <section className="story story--strategy-map story--fixed-narrative" id="top" ref={storyRef}>
      <div className="story-canvas-wrap">
        <LivingMap progressRef={progressRef} onSelectZone={goToZone} />

        <div className="strategy-story-ui">
          {stage ? (
            <article ref={cardRef} className="strategy-story-card strategy-story-card--zone">
              <div className="eyebrow">{stage.no}</div>
              <h2>{stage.title}</h2>
              <p>{stage.copy}</p>
              <div className="strategy-zone-proof"><i />{stage.proof}</div>
              {stage.cta && <div className="strategy-zone-action"><span>Sprawdź swój proces pozyskania klienta.</span><a className="strategy-zone-cta" href="#scan">Zacznij od Mini Mapy — 0 zł <Arrow /></a></div>}
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
              <p className="hero-lead">DigitalMap patrzy na całą drogę klienta — od widoczności i pierwszego kliknięcia, przez ofertę i zaufanie, aż po kontakt lub zakup. Dzięki temu wiesz, co ogranicza wynik teraz i co warto zrobić najpierw.</p>
              <div className="hero-actions">
                <a className="button button--dark" href="#scan">Sprawdź swoją firmę <Arrow /></a>
                <a className="button button--ghost" href="#sample">Zobacz przykładową Mapę</a>
              </div>
              <div className="micro-proof"><span>Mini Mapa 0 zł</span><span>5 obszarów diagnozy</span><span>Bez karty</span></div>
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
    <section className="process-section" id="process">
      <div className="section-shell process-layout">
        <div className="process-intro">
          <div className="eyebrow">JAK POWSTAJE MAPA</div>
          <h2>Od firmy do decyzji <span className="accent-text">w czterech krokach.</span></h2>
          <p>Nie zaczynamy od rekomendowania usług. Najpierw zawężamy problem, sprawdzamy dowody i ustalamy właściwą kolejność działań.</p>
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
    ['plan', 'Plan działania'],
  ]

  return (
    <section className="sample-section" id="sample">
      <div className="section-shell">
        <div className="section-heading section-heading--split sample-heading">
          <div className="eyebrow">PRZYKŁADOWY WYNIK DIAGNOZY</div>
          <div>
            <h2>Zobacz co dostajesz <span className="accent-text">razem z DigitalMap.</span></h2>
            <p>Przejdź przez przykładową diagnozę: od problemu i dowodów, przez drogę klienta, aż po plan działania i końcową decyzję.</p>
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
            <div className="sample-map-badge">PRZYKŁADOWA MAPA</div><small>ZOBACZ, GDZIE TWOJA FIRMA TRACI KLIENTÓW.</small>
          </aside>

          <div className="diagnosis-main">
            <div className="diagnosis-top"><span>DIGITALMAP / DIAGNOZA MARKETINGOWA</span><b>status: zakończona</b></div>

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
                <div className="evidence-detail"><span>{diagnosis.evidence[evidenceIndex].label}</span><b className="confidence-pill">{diagnosis.evidence[evidenceIndex].confidence}</b><p>{diagnosis.evidence[evidenceIndex].detail}</p></div>
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
                <div className="view-intro"><span>DOWODY</span><h3>Dlaczego właśnie ten problem jest priorytetem?</h3><p>Kliknij sygnał. Pokazujemy obserwację, znaczenie biznesowe i poziom pewności.</p></div>
                <div className="evidence-browser">
                  <div className="evidence-browser-nav">
                    {diagnosis.evidence.map((item, index) => <button key={item.label} className={evidenceIndex === index ? 'active' : ''} onClick={() => setEvidenceIndex(index)}><span>0{index + 1}</span>{item.label}</button>)}
                  </div>
                  <div className="evidence-browser-main"><span>{diagnosis.evidence[evidenceIndex].label}</span><b className="confidence-pill">{diagnosis.evidence[evidenceIndex].confidence}</b><h4>{diagnosis.evidence[evidenceIndex].value}</h4><p>{diagnosis.evidence[evidenceIndex].detail}</p></div>
                </div>
              </div>
            )}

            {view === 'plan' && (
              <div className="map-view map-view--plan">
                <div className="view-intro"><span>PLAN DZIAŁANIA</span><h3>Najpierw ruch, który odblokowuje resztę.</h3><p>Nie próbujemy poprawiać wszystkiego jednocześnie. Plan pokazuje kolejność następnych ruchów.</p></div>
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
  const points = [
    ['01', 'Bez gotowego rozwiązania na wejściu', 'Nie zaczynamy od założenia, że potrzebujesz SEO, Ads, social mediów albo nowej strony. Najpierw ustalamy, gdzie naprawdę zatrzymuje się wynik.'],
    ['02', 'Decyzja przed wydatkiem', 'Problem, dowody i priorytet są pierwsze. Dopiero później wiadomo, na co warto przeznaczyć czas i budżet.'],
    ['03', 'Bez zobowiązań', 'Rekomendację możesz wdrożyć z nami, własnym zespołem, freelancerem, obecną agencją albo innym wykonawcą.'],
  ]

  return (
    <section className="principle principle--v7">
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
  const [activeGroup, setActiveGroup] = useState(toolGroups[0].id)
  const group = toolGroups.find((item) => item.id === activeGroup) || toolGroups[0]

  return (
    <section className="method-v6" id="method">
      <div className="section-shell">
        <div className="method-v6-head">
          <div className="eyebrow">METODA</div>
          <div><h2>Dane pokazują, co się dzieje. <span className="accent-text">My ustalamy, co z tym zrobić.</span></h2><p>Łączymy dane, research i obserwację rynku. Narzędzia pomagają znaleźć sygnały. Priorytet wynika jednak z kontekstu biznesowego — nie z automatycznego score'u.</p></div>
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
            <div className="method-pipeline"><span>Źródła</span><i>→</i><span>Sygnały</span><i>→</i><span>Kontekst</span><i>→</i><b>Priorytet</b><i>→</i><b>Decyzja</b></div>
          </div>

          <aside className="human-decision-card">
            <div className="human-orbit"><i /><i /><i /><b /></div>
            <span>HUMAN REVIEW</span>
            <h3>Nie każdy sygnał jest problemem wartym rozwiązania.</h3>
            <p>Dlatego Mapa nie kończy się automatycznym score'em. Oddzielamy to, co potwierdzone, od silnych sygnałów i hipotez — a dopiero później ustalamy priorytet.</p>
            <div className="human-decision-foot"><span>POTWIERDZONE</span><span>SILNY SYGNAŁ</span><span>HIPOTEZA</span><strong>DECYZJA</strong></div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Evidence() {
  const items = [
    ['01', 'Strona i oferta', 'Czy klient szybko rozumie, co oferujesz, dla kogo jest oferta i dlaczego warto wybrać właśnie Ciebie?'],
    ['02', 'Google i lokalność', 'Czy firma jest widoczna tam, gdzie klient jej szuka — i jak wygląda obok konkurencji?'],
    ['03', 'Social media i content', 'Czy treści zwiększają zaufanie i prowadzą do kolejnego kroku?'],
    ['04', 'Widoczność i ruch', 'Skąd przychodzą potencjalni klienci i czy ruch ma odpowiednią intencję?'],
    ['05', 'Reklamy', 'Czy wydawany budżet prowadzi do jakościowych zapytań i gdzie po drodze tracony jest wynik?'],
    ['06', 'Zaufanie i reputacja', 'Czy klient ma wystarczające dowody, aby podjąć decyzję?'],
  ]

  return (
    <section className="section evidence-section" id="scope">
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
  return (
    <section className="industries" id="industries">
      <div className="section-shell industries-layout">
        <div className="industries-copy">
          <div className="eyebrow">DLA KOGO</div>
          <h2>Branża zmienia kontekst. <span className="accent-text">Nie logikę diagnozy.</span></h2>
          <p>Pracujemy z firmami usługowymi, lokalnymi, eksperckimi, cyfrowymi, B2B i B2C. Branża zmienia kontekst, ale logika pozostaje ta sama: kontakt z marką → ocena → decyzja → kontakt lub zakup. Poniżej tylko przykłady — nie zamknięta lista branż.</p>
          <a href="#scan" className="text-link">Nie widzisz swojej branży? Sprawdź firmę <Arrow /></a>
        </div>
        <div className="industry-grid">
          {industries.map((industry) => (
            <article key={industry.name}>
              <h3>{industry.name}</h3>
              <p>{industry.tag}</p>
            </article>
          ))}
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
                <div className="work-copy"><div className="work-type">{project.type}</div><h3>{project.name}</h3><p>{project.description}</p><div className="work-case-copy"><div><span>PROBLEM</span><p>{project.problem}</p></div><div><span>NASZA ROLA</span><p>{project.role}</p></div><div><span>STATUS / REZULTAT</span><p>{project.result}</p></div></div><div className="work-scope">{project.scope}</div></div>
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
    <section className="team" id="team">
      <div className="section-shell">
        <div className="team-heading">
          <div className="eyebrow">ZESPÓŁ</div>
          <div><h2>Diagnoza wymaga <span className="accent-text">więcej niż jednej perspektywy.</span></h2><p>Strategia, marketing, development, płatne pozyskanie i social media pokazują różne fragmenty drogi klienta. Łączymy je po to, żeby rekomendacja wynikała z całego procesu — nie z kompetencji jednego działu.</p></div>
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
    <section className="offer-v6" id="offer">
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
              <a className="offer-main-cta" href="#scan" onClick={() => onChoose(offer)}><span>Wybieram tę Mapę</span><i aria-hidden="true">↗</i></a>
            </div>
          </article>
        </div>

        <div className="offer-support-grid">
          <article className="offer-support-card">
            <span>Nie wiesz, którą Mapę wybrać?</span>
            <p>Nie musisz tego oceniać samodzielnie. Zostaw firmę i objaw — jeśli wystarczy bezpłatna Mini Mapa albo krótszy zakres, powiemy to wprost.</p>
            <a href="#scan">Pomóżcie mi wybrać <Arrow /></a>
          </article>
          <article className="offer-support-card offer-support-card--dark">
            <span>Masz już agencję, freelancera albo własny marketing team?</span>
            <p>DigitalMap działa także jako niezależne drugie spojrzenie. Chodzi o to, żebyś wiedział, gdzie naprawdę jest problem, co jest priorytetem i jakie działanie ma sens jako następne.</p>
            <strong>Przed: „może więcej Ads?” → Po Mapie: teraz / później / nie teraz.</strong>
          </article>
        </div>
        <div className="offer-cost-note">Mapa ma pomóc lepiej wydać większy budżet na stronę, SEO, kampanie, content albo wdrożenie. Dlatego najpierw ustalamy problem, a dopiero później rekomendujemy rozwiązanie.</div>
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
    <section className="faq-section" id="faq">
      <div className="section-shell">
        <div className="faq-layout-premium">
          <aside className="faq-intro-panel">
            <div className="eyebrow">FAQ / PRZED DECYZJĄ</div>
            <h2>Najważniejsze pytania <span className="accent-text">przed zakupem Mapy.</span></h2>
            <p>Bez ukrytych zobowiązań i bez zgadywania, co właściwie kupujesz. Odpowiedzi mają pomóc Ci szybko ocenić, czy DigitalMap pasuje do sytuacji Twojej firmy.</p>
            <a href="#scan" className="faq-intro-link">Nie widzisz swojego pytania? Napisz nam <Arrow /></a>
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
          <div className="final-cta-actions"><a className="button button--primary-light" href="#scan">Sprawdź swoją firmę <Arrow /></a><a className="button button--outline-light" href="#offer">Zobacz zakres i ofertę</a></div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-grid">
        <div className="footer-brand"><TopographicLogo inverted /><p>DigitalMap pomaga ustalić, co naprawdę blokuje pozyskiwanie klientów, zanim firma wyda więcej na marketing.</p></div>
        <div className="footer-column"><h3>Oferta</h3><a href="#offer">Mini Mapa</a><a href="#offer">Mapa Start</a><a href="#offer">Mapa Strategiczna</a><a href="#offer">Mapa AI</a><a href="#offer">Wdrożenie / Monitoring</a></div>
        <div className="footer-column"><h3>Firma</h3><a href="#process">Jak działamy</a><a href="#industries">Dla kogo</a><a href="#work">Realizacje</a><a href="#team">Zespół</a><a href="#method">Metoda</a><a href="#faq">FAQ</a></div>
        <div className="footer-column"><h3>Kontakt</h3><a href="mailto:kontakt@digitalmap.pl">kontakt@digitalmap.pl</a><a href="#scan">Formularz</a></div>
        <div className="footer-column footer-formal"><h3>Formalności</h3><span>Polityka prywatności</span><span>Regulamin</span><span>Cookies</span><small>Dokumenty formalne podłączymy przed publikacją produkcyjną.</small></div>
      </div>
      <div className="footer-slogan">Najpierw diagnoza. <span>Potem decyzja. Dopiero później wydatek.</span></div>
      <div className="footer-bottom"><span>© 2026 DigitalMap&nbsp;&nbsp;·&nbsp;&nbsp;Diagnoza → decyzja → działanie → pomiar.</span><a href="#top">Wróć na górę ↑</a></div>
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
