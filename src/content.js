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
    [
      'Problem',
      'Za mało osób przechodzi od wejścia na stronę do kontaktu.',
    ],
    [
      'Dowody',
      'Ruch istnieje, ale CTA, oferta i formularz tworzą tarcie.',
    ],
    [
      'Priorytet',
      'Uprościć komunikację oferty i ścieżkę konwersji.',
    ],
  ],

  decision:
    'Najpierw poprawić ofertę i ścieżkę kontaktu. Nie zwiększać ruchu, dopóki obecny nie jest lepiej wykorzystywany.',

  doNow:
    'Przenieść główną przewagę i CTA powyżej folda.',

  notNow:
    'Nie zwiększać jeszcze budżetu Google Ads.',

  measure:
    'Współczynnik konwersji + liczba jakościowych zapytań.',
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