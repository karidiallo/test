export function TopographicLogo({ inverted = false }) {
  return (
    <a className={`brand ${inverted ? 'brand--inverted' : ''}`} href="#top" aria-label="DigitalMap — strona główna">
      <svg className="brand-mark" viewBox="0 0 54 54" role="img" aria-hidden="true">
        <path d="M27 5C15 5 7 13 7 25s8 24 20 24c11 0 20-7 20-18 0-10-8-17-18-17-9 0-15 6-15 14 0 7 5 12 12 12 6 0 10-4 10-9 0-4-3-7-7-7-3 0-5 2-5 5" />
        <path className="brand-route" d="M13 38C19 33 22 30 27 24c4-5 8-8 14-10" />
        <circle cx="41" cy="14" r="2.6" />
      </svg>
      <span className="brand-word">digital<span>map</span></span>
    </a>
  )
}
