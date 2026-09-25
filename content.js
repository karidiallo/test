export const symptoms = [
  {
    id: 'acquisition',
    label: 'Za mało klientów',
    short: 'Pozyskanie',
    description: 'Nie wiadomo, czy problem zaczyna się w widoczności, ofercie czy dopiero przy kontakcie.',
    focus: 0.28,
  },
  {
    id: 'conversion',
    label: 'Ruch jest. Zapytań nie ma.',
    short: 'Konwersja',
    description: 'Ruch już istnieje, ale oferta, zaufanie albo ścieżka kontaktu nie domykają zainteresowania.',
    focus: 0.62,
  },
  {
    id: 'competition',
    label: 'Konkurencja wygrywa',
    short: 'Zaufanie',
    description: 'Klient widzi Cię, ale ktoś inny wygląda bezpieczniej lub komunikuje wartość prościej.',
    focus: 0.46,
  },
  {
    id: 'efficiency',
    label: 'Marketing kosztuje. Nie wiem co działa.',
    short: 'Efektywność',
    description: 'Budżet jest rozproszony, a kanały są oceniane osobno zamiast jako jedna droga do przychodu.',
    focus: 0.77,
  },
]

export const diagnosis = {
  problem: 'Oferta i ścieżka kontaktu nie wykorzystują istniejącego ruchu.',
  evidence: [
    ['Ruch', 'Popyt i wejścia już istnieją'],
    ['Oferta', 'Przewaga nie jest czytelna wystarczająco szybko'],
    ['Kontakt', 'CTA i formularz tworzą niepotrzebne tarcie'],
  ],
  decision: 'Nie zwiększać budżetu na pozyskanie. Najpierw poprawić ofertę i ścieżkę kontaktu.',
  doNow: 'Uprościć proposition + CTA powyżej folda.',
  notNow: 'Nie skalować jeszcze Google Ads.',
  measure: 'Konwersja do jakościowego zapytania.',
}

export const offers = [
  {
    code: 'SCAN',
    name: 'Mini Mapa',
    price: '0 zł',
    copy: 'Pierwszy sygnał: gdzie warto przyjrzeć się bliżej, zanim zaczniesz wydawać.',
    cta: 'Sprawdź firmę',
  },
  {
    code: 'DIAGNOSE',
    name: 'Mapa Strategiczna',
    price: '499 zł',
    copy: 'Problem #1, dowody, priorytet, pierwszy ruch, „nie teraz” i miernik efektu.',
    cta: 'Zamów diagnozę',
    featured: true,
  },
  {
    code: 'ACT',
    name: 'Wdrożenie / Monitoring',
    price: 'po diagnozie',
    copy: 'Naprawa właściwego problemu — własnym zespołem, z DigitalMap albo w modelu mieszanym.',
    cta: 'Zobacz dalszy krok',
  },
]
