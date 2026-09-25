export const symptoms = [
  {
    id: 'acquisition',
    label: 'Masz za mało klientów',
    short: 'Pozyskanie',
    description:
      'Nie wiadomo jeszcze, czy problemem jest widoczność, oferta, zaufanie czy sama droga do kontaktu.',
    focus: 0.28,
  },
  {
    id: 'conversion',
    label: 'Ruch jest. Zapytań nadal za mało.',
    short: 'Konwersja',
    description:
      'Użytkownicy trafiają na stronę, ale oferta, CTA albo formularz nie domykają istniejącego zainteresowania.',
    focus: 0.62,
  },
  {
    id: 'competition',
    label: 'Klienci wybierają konkurencję',
    short: 'Zaufanie',
    description:
      'Jesteś widoczny, ale ktoś inny wygląda bezpieczniej, komunikuje wartość prościej albo daje mocniejszy powód do decyzji.',
    focus: 0.46,
  },
  {
    id: 'efficiency',
    label: 'Marketing kosztuje. Nie wiesz, co działa.',
    short: 'Efektywność',
    description:
      'Budżet jest rozproszony, a wynik nie pokazuje jasno, który element procesu naprawdę ogranicza wzrost.',
    focus: 0.77,
  },
]

export const diagnosis = {
  problem: 'Oferta i ścieżka kontaktu nie wykorzystują istniejącego ruchu.',
  evidence: [
    ['Problem', 'Za mało osób przechodzi od wejścia na stronę do kontaktu.'],
    ['Dowody', 'Ruch istnieje, ale CTA, oferta i formularz tworzą tarcie.'],
    ['Priorytet', 'Uprościć komunikację oferty i ścieżkę konwersji.'],
  ],
  decision:
    'Najpierw poprawić ofertę i ścieżkę kontaktu. Nie zwiększać ruchu, dopóki obecny nie jest lepiej wykorzystywany.',
  doNow: 'Przenieść główną przewagę i CTA powyżej folda.',
  notNow: 'Nie zwiększać jeszcze budżetu Google Ads.',
  measure: 'Współczynnik konwersji + liczba jakościowych zapytań.',
}

export const projects = [
  {
    index: '01',
    name: 'CostWarden',
    type: 'AI SaaS / Product / Web',
    status: 'PRE-LAUNCH',
    scope: 'Landing · product strategy · positioning · UX/UI · GTM',
    description:
      'Produkt SaaS budowany od pozycjonowania i architektury informacji po doświadczenie strony i komunikację wejścia na rynek.',
    url: '',
    image: '',
  },
  {
    index: '02',
    name: 'GymWrld',
    type: 'Fitness app / Product UX',
    status: 'IN DEVELOPMENT',
    scope: 'Product direction · UX · gamification',
    description:
      'Kierunek produktu i doświadczenia aplikacji fitness, z naciskiem na mechaniki zaangażowania i czytelną ścieżkę użytkownika.',
    url: '',
    image: '',
  },
  {
    index: '03',
    name: 'Anna Bagrowska / Psycholog',
    type: 'Website / UX / SEO',
    status: 'W REALIZACJI',
    scope: 'Website V2 · copy · layout · SEO',
    description:
      'Przebudowa strony eksperckiej: komunikacja oferty, struktura treści, UX oraz fundament pod widoczność organiczną.',
    url: '',
    image: '',
  },
  {
    index: '04',
    name: 'Do Poznania',
    type: 'Landing / Lead flow',
    status: 'PRZED PUBLIKACJĄ',
    scope: 'Landing · formularz · mailbox · lead flow',
    description:
      'Landing z prostą ścieżką kontaktu i obsługą formularza, przygotowany do finalnej weryfikacji przed publikacją.',
    url: '',
    image: '',
  },
]

export const team = {
  founder: {
    initials: 'K',
    name: 'Kari',
    role: 'Founder / Strategy & UX',
    bio:
      'Łączy diagnozę biznesową, UX, komunikację i marketing w jedną hierarchię decyzji. Odpowiada za kierunek Mapy i za to, żeby rekomendacja prowadziła do konkretnego ruchu, a nie kolejnej listy zadań.',
    photo: '',
  },
  capabilities: [
    ['Strategia i diagnoza', 'Problem #1 · priorytety · decyzje'],
    ['UX i konwersja', 'Oferta · ścieżka klienta · CRO'],
    ['Widoczność', 'SEO · Google · AI Search · reputacja'],
    ['Wdrożenie', 'Web · tracking · automatyzacje · kampanie'],
  ],
}

export const offers = [
  {
    code: '01 / START',
    name: 'Mini Mapa',
    price: '0 zł',
    copy:
      'Szybki pierwszy obraz: gdzie warto przyjrzeć się bliżej, zanim zaczniesz wydawać.',
    cta: 'Sprawdź firmę',
  },
  {
    code: '02 / GŁÓWNY PRODUKT',
    name: 'Mapa Strategiczna',
    price: '499 zł',
    copy:
      'Diagnoza procesu pozyskania klienta i jasna hierarchia decyzji: co zrobić najpierw, czego nie ruszać i jak mierzyć efekt.',
    cta: 'Zamów Mapę',
    featured: true,
  },
  {
    code: '03 / PO DIAGNOZIE',
    name: 'Wdrożenie / Monitoring',
    price: 'zakres po diagnozie',
    copy:
      'Jeśli rekomendacja wymaga działania, możesz wdrożyć ją samodzielnie, z własnym zespołem albo z DigitalMap. Monitoring ma sens dopiero wtedy, gdy wiadomo, co warto kontrolować.',
    cta: 'Zobacz dalszy krok',
  },
]
