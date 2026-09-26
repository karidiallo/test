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

export const processSteps = [
  {
    no: '01',
    title: 'Pokazujesz nam firmę',
    accent: 'firmę',
    copy: 'Domena + krótki kontekst. Na start wystarczy to, co już masz.',
  },
  {
    no: '02',
    title: 'Mapujemy drogę klienta',
    accent: 'drogę klienta',
    copy: 'Badamy rynek, widoczność, zaufanie, ofertę, konwersję i konkurencję.',
  },
  {
    no: '03',
    title: 'Znajdujemy problem #1',
    accent: 'problem #1',
    copy: 'Oddzielamy fakty, silne sygnały i hipotezy. Nie traktujemy każdego błędu jak priorytetu.',
  },
  {
    no: '04',
    title: 'Dostajesz decyzję',
    accent: 'decyzję',
    copy: 'Priorytet, pierwszy ruch, plan, „nie teraz” i sposób pomiaru.',
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

export const tools = [
  { code: 'GA4', name: 'Analytics', detail: 'Ruch, zachowanie użytkowników, konwersje i punkty odpływu.' },
  { code: 'GSC', name: 'Search Console', detail: 'Widoczność organiczna, zapytania, strony wejścia i problemy indeksacji.' },
  { code: 'GBP', name: 'Google Profile', detail: 'Widoczność lokalna, opinie, kategorie i obecność obok konkurencji.' },
  { code: 'ADS', name: 'Google / Meta', detail: 'Koszt ruchu, jakość leadów, kampanie i miejsca utraty efektywności.' },
  { code: 'SEO', name: 'Screaming Frog', detail: 'Warstwa techniczna strony, architektura, crawl i błędy wpływające na widoczność.' },
  { code: 'AH', name: 'Ahrefs', detail: 'Konkurencja, profil linków, potencjał tematów i różnice w widoczności.' },
  { code: 'AI', name: 'ChatGPT / Gemini / Claude', detail: 'Wsparcie researchu i syntezy. AI nie podejmuje za nas decyzji strategicznej.' },
  { code: 'AUTO', name: 'n8n', detail: 'Automatyzacje, przepływ danych i powtarzalne procesy, gdy faktycznie mają sens.' },
]

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
  members: [
    {
      initials: 'A',
      name: 'Artur',
      role: 'Founder',
      bio:
        'Odpowiada za kierunek DigitalMap, rozwój firmy i spójność między diagnozą, decyzją biznesową a dalszym wdrożeniem.',
      photo: '',
      featured: true,
    },
    {
      initials: 'K',
      name: 'Kari',
      role: 'Head of Marketing',
      bio:
        'Odpowiada za strategię marketingową, komunikację, pozycjonowanie oferty oraz doświadczenie klienta od pierwszego kontaktu do decyzji.',
      photo: '',
    },
    {
      initials: 'R',
      name: 'Roman',
      role: 'Web Development & Technical SEO',
      bio:
        'Łączy warstwę techniczną stron z wydajnością, wdrożeniem i fundamentami technicznego SEO.',
      photo: '',
    },
    {
      initials: 'G',
      name: 'Gerard',
      role: 'PPC Specialist',
      bio:
        'Odpowiada za płatne kampanie, jakość ruchu i ocenę tego, czy budżet reklamowy prowadzi do realnego wyniku biznesowego.',
      photo: '',
    },
    {
      initials: 'A',
      name: 'Anna',
      role: 'Social Media Manager',
      bio:
        'Odpowiada za social media, spójność komunikacji i treści, które budują zaufanie oraz wspierają decyzję klienta.',
      photo: '',
    },
  ],
}

export const offers = [
  {
    code: '01 / START',
    name: 'Mini Mapa',
    price: '0 zł',
    copy:
      'Szybki pierwszy obraz: gdzie warto przyjrzeć się bliżej, zanim zaczniesz wydawać.',
    details: 'Pierwsze sygnały · potencjalne wąskie gardło · kierunek dalszej diagnozy',
    cta: 'Sprawdź firmę',
  },
  {
    code: '02 / SZYBKA DIAGNOZA',
    name: 'Mapa Start',
    price: '249 zł',
    copy:
      'Dla firmy, która potrzebuje znaleźć pierwszy priorytet bez analizowania całego procesu pozyskania klienta.',
    details: 'Problem #1 · najważniejsze sygnały · pierwszy ruch · co odpuścić na teraz',
    cta: 'Wybieram Start',
  },
  {
    code: '03 / GŁÓWNY PRODUKT',
    name: 'Mapa Strategiczna',
    price: '499 zł',
    copy:
      'Diagnoza procesu pozyskania klienta i jasna hierarchia decyzji: co zrobić najpierw, czego nie ruszać i jak mierzyć efekt.',
    details: 'Pełna droga klienta · priorytety · plan działania · mierniki · „nie teraz”',
    cta: 'Zamów Mapę',
    featured: true,
  },
  {
    code: '04 / AI SEARCH',
    name: 'Mapa AI',
    price: '199 zł',
    copy:
      'Analiza tego, czy i jak firma pojawia się w odpowiedziach ChatGPT, Gemini i Claude oraz jakie sygnały wpływają na ten obraz.',
    details: 'Widoczność AI · sposób przedstawiania marki · luki informacyjne · rekomendacje',
    cta: 'Sprawdź AI',
  },
  {
    code: '05 / PO DIAGNOZIE',
    name: 'Wdrożenie / Monitoring',
    price: 'zakres po diagnozie',
    copy:
      'Jeśli rekomendacja wymaga działania, możesz wdrożyć ją samodzielnie, z własnym zespołem albo z DigitalMap. Monitoring ma sens dopiero wtedy, gdy wiadomo, co warto kontrolować.',
    details: 'Wdrożenie priorytetu · pomiar · monitoring zmian · kolejna decyzja',
    cta: 'Zapytaj o zakres',
  },
]
