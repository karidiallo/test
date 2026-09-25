# DigitalMap — Living Decision Map / V1

Interaktywny koncept homepage dla DigitalMap: **produkt diagnostyczny zamiast klasycznego agency landing page**.

## Co jest w V1

- scroll-driven hero z prawdziwą sceną 3D (React Three Fiber),
- topograficzna „Living Map” drogi klienta,
- animowany bottleneck + impulsy reprezentujące klientów,
- wybór symptomu przesuwający punkt diagnozy na mapie,
- produktowy mockup przykładowej Mapy,
- mocny blok „anti-agency positioning”,
- evidence matrix,
- uproszczona oferta SCAN → DIAGNOSE → ACT,
- progressive form: domena → problem → e-mail,
- własny topographic mark zamiast generycznego cube/GPS,
- desktop + mobile + `prefers-reduced-motion`.

## Stack

- Vite 8
- React 19
- React Three Fiber 9 / Three.js
- Drei
- GSAP ScrollTrigger

## Uruchomienie

Wymagany Node.js 20.19+ lub 22.12+ (zgodnie z Vite 8).


```bash
npm install
npm run dev
```

Build produkcyjny:

```bash
npm run build
npm run preview
```

## Ważne

To jest **concept / V1**, nie finalna strona produkcyjna. Formularz celowo nie wysyła danych; po ostatnim kroku pokazuje demo success state. W produkcji podepnij endpoint/CRM/automatyzację Mini Mapy.

## Co zrobić w V2

1. Podpiąć realny backend Mini Mapy i analytics events.
2. Dodać prawdziwe case studies / proof — bez wymyślonych wyników.
3. Przenieść copy do CMS lub prostego configu.
4. Dopracować mapę 3D w Blenderze / custom shaderach, jeśli V1 przejdzie test jakościowy.
5. Zrobić WebGL performance budget i osobny 2.5D fallback dla low-end mobile.
6. Dodać realne screenshots / human proof zamiast stocków.

## Gdzie edytować copy

- `src/content.js` — symptomy, sample diagnosis, oferta.
- `src/App.jsx` — główna narracja strony.
- `src/styles.css` — cały design system.
- `src/components/LivingMap.jsx` — geometria, kamera, route i bottleneck.
