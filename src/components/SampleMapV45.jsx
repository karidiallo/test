import { useState } from 'react'
import styles from './SampleMapV45.module.css'

const channels = [
  {
    name: 'Google i Mapy',
    impact: 'Wysoki',
    tone: 'high',
    finding: 'Profil firmy jest widoczny, ale nie pokazuje całej oferty ani najmocniejszych powodów wyboru.',
    business: 'Mniej telefonów i wejść od osób, które już aktywnie szukają takiej usługi.',
    action: 'Uzupełnić usługi, zdjęcia, opinie i elementy zwiększające zaufanie.'
  },
  {
    name: 'SEO',
    impact: 'Wysoki',
    tone: 'high',
    finding: 'Najważniejsze usługi nie mają wystarczająco mocnych stron pod konkretne potrzeby klientów.',
    business: 'Część wartościowego ruchu organicznego przejmuje konkurencja.',
    action: 'Rozbudować strony kluczowych usług zamiast publikować przypadkowe treści.'
  },
  {
    name: 'Reklamy',
    impact: 'Krytyczny',
    tone: 'critical',
    finding: 'Kampanie sprowadzają ruch, ale strona nie zamienia go w wystarczającą liczbę jakościowych zapytań.',
    business: 'Większy budżet zwiększa koszt bez rozwiązania głównego problemu.',
    action: 'Nie skalować wydatków przed poprawą oferty i konwersji.'
  },
  {
    name: 'Wyszukiwanie AI',
    impact: 'Średni',
    tone: 'medium',
    finding: 'Firma rzadko pojawia się jako konkretna rekomendacja przy pytaniach o usługę.',
    business: 'Marka traci część nowego źródła odkrywania firm.',
    action: 'Wzmocnić eksperckie treści i spójność informacji o firmie.'
  },
  {
    name: 'Strona i Oferta',
    impact: 'Krytyczny',
    tone: 'critical',
    finding: 'Klient zbyt długo szuka odpowiedzi, dlaczego ma wybrać właśnie tę firmę.',
    business: 'Ruch jest, ale za mało osób przechodzi od zainteresowania do kontaktu.',
    action: 'Wyostrzyć ofertę, przewagi i kolejność informacji na kluczowych stronach.'
  },
  {
    name: 'Media Społecznościowe',
    impact: 'Średni',
    tone: 'medium',
    finding: 'Treści mają zasięg, ale zbyt rzadko prowadzą do konkretnej usługi lub następnego kroku.',
    business: 'Firma buduje uwagę, której nie zamienia w większą pulę potencjalnych klientów.',
    action: 'Połączyć treści z ofertą, dowodami i jasną drogą do kontaktu.'
  },
  {
    name: 'Opinie i Zaufanie',
    impact: 'Wysoki',
    tone: 'high',
    finding: 'Firma ma dobre opinie i realizacje, ale są one za daleko od miejsca decyzji.',
    business: 'Klient porównujący oferty nie widzi najmocniejszych dowodów jakości w odpowiednim momencie.',
    action: 'Przenieść opinie i efekty bliżej oferty oraz formularza.'
  },
  {
    name: 'Konwersja i Kontakt',
    impact: 'Krytyczny',
    tone: 'critical',
    finding: 'Kilka równorzędnych wezwań do działania i zbyt długi formularz zwiększają tarcie przed kontaktem.',
    business: 'Firma traci osoby, które są już zainteresowane i najbliżej zostania klientem.',
    action: 'Uprościć drogę do kontaktu i mierzyć jakość pozyskiwanych zapytań.'
  }
]

export function SampleMapV45() {
  const [activeIndex, setActiveIndex] = useState(4)
  const active = channels[activeIndex]

  return (
    <section className={styles.section} id="sample">
      <div className={styles.shell}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>PRZYKŁADOWA MAPA FIRMY</span>
          <div>
            <h2>Zobacz, co sprawdzamy i <em>co z tego wynika.</em></h2>
            <p>Każdy obszar kończy się konkretnym wnioskiem biznesowym — nie listą rzeczy do poprawy.</p>
          </div>
        </div>

        <div className={styles.summary}>
          <div>
            <span>NAJWIĘKSZE WĄSKIE GARDŁO</span>
            <strong>Strona i Konwersja</strong>
          </div>
          <div>
            <span>DECYZJA</span>
            <strong>Nie Skalować Reklam</strong>
          </div>
          <div>
            <span>CEL</span>
            <strong>Więcej Jakościowych Zapytań</strong>
          </div>
        </div>

        <div className={styles.map}>
          <div className={styles.channelList} role="tablist" aria-label="Obszary analizy DigitalMap">
            {channels.map((channel, index) => (
              <button
                key={channel.name}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                className={`${styles.channel} ${index === activeIndex ? styles.active : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <span className={styles.channelNumber}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.channelName}>{channel.name}</span>
                <span className={`${styles.impact} ${styles[channel.tone]}`}>{channel.impact}</span>
              </button>
            ))}
          </div>

          <div className={styles.detail} role="tabpanel" aria-live="polite">
            <div className={styles.detailHeader} key={`${active.name}-header`}>
              <span>{String(activeIndex + 1).padStart(2, '0')} / {String(channels.length).padStart(2, '0')}</span>
              <div>
                <h3>{active.name}</h3>
                <span className={`${styles.detailImpact} ${styles[active.tone]}`}>Wpływ Biznesowy: {active.impact}</span>
              </div>
            </div>

            <div className={styles.detailGrid} key={active.name}>
              <article>
                <span>CO ZNALEŹLIŚMY</span>
                <p>{active.finding}</p>
              </article>
              <article>
                <span>WPŁYW NA BIZNES</span>
                <p>{active.business}</p>
              </article>
              <article className={styles.actionCard}>
                <span>CO ROBIMY Z TYM DALEJ</span>
                <p>{active.action}</p>
              </article>
            </div>
          </div>
        </div>

        <div className={styles.conclusion}>
          <span>WNIOSEK Z CAŁEJ MAPY</span>
          <strong>Firma nie potrzebuje teraz więcej ruchu. Najpierw trzeba lepiej zamieniać obecne zainteresowanie w zapytania.</strong>
          <a href="#scan">Sprawdź Swoją Firmę <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}
